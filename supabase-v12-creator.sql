

-- =====================================================================
-- v12: VIP Creator / Moderation / Earnings / Withdrawal
-- Run this AFTER the existing v11 SQL. Idempotent migration.
-- Creator earnings are disabled until Admin sets a non-zero rate.
-- =====================================================================

-- 1) Ownership and moderation state. Existing Admin content remains approved.
alter table public.dramas add column if not exists owner_id uuid references auth.users(id) on delete set null;
alter table public.dramas add column if not exists moderation_status text not null default 'approved';
alter table public.dramas add column if not exists moderation_note text;
alter table public.dramas add column if not exists submitted_at timestamptz;
alter table public.dramas add column if not exists reviewed_at timestamptz;

alter table public.episodes add column if not exists uploaded_by uuid references auth.users(id) on delete set null;
alter table public.episodes add column if not exists moderation_status text not null default 'approved';
alter table public.episodes add column if not exists moderation_note text;
alter table public.episodes add column if not exists submitted_at timestamptz;
alter table public.episodes add column if not exists reviewed_at timestamptz;

do $$ begin
  if not exists (select 1 from pg_constraint where conname='dramas_moderation_status_check') then
    alter table public.dramas add constraint dramas_moderation_status_check
      check (moderation_status in ('pending','approved','rejected'));
  end if;
  if not exists (select 1 from pg_constraint where conname='episodes_moderation_status_check') then
    alter table public.episodes add constraint episodes_moderation_status_check
      check (moderation_status in ('pending','approved','rejected'));
  end if;
end $$;

-- 2) Creator settings. rate_per_1000 defaults to 0 until the Admin configures it.
create table if not exists public.creator_settings (
  id int primary key default 1 check (id=1),
  rate_per_1000 numeric(12,4) not null default 0 check (rate_per_1000 >= 0),
  min_withdrawal numeric(12,2) not null default 10000 check (min_withdrawal >= 0),
  currency_code text not null default 'MMK',
  updated_at timestamptz not null default now()
);
insert into public.creator_settings(id) values(1) on conflict(id) do nothing;
alter table public.creator_settings enable row level security;
drop policy if exists "creator settings read" on public.creator_settings;
create policy "creator settings read" on public.creator_settings
  for select to authenticated using (true);
drop policy if exists "creator settings admin read" on public.creator_settings;
create policy "creator settings admin read" on public.creator_settings
  for select to anon using (false);

-- 3) Deduplicated view events: one authenticated viewer can count once per episode per day.
create table if not exists public.creator_view_events (
  id bigint generated always as identity primary key,
  viewer_id uuid not null references auth.users(id) on delete cascade,
  drama_id bigint not null references public.dramas(id) on delete cascade,
  episode_n int not null,
  viewed_on date not null default current_date,
  created_at timestamptz not null default now(),
  unique(viewer_id, drama_id, episode_n, viewed_on),
  foreign key (drama_id, episode_n) references public.episodes(drama_id,n) on delete cascade
);
alter table public.creator_view_events enable row level security;
drop policy if exists "admin read creator views" on public.creator_view_events;
create policy "admin read creator views" on public.creator_view_events
  for select to authenticated using (public.is_admin());

-- 4) Earnings ledger. Immutable to users; entries are written only by the view RPC.
create table if not exists public.creator_earnings (
  id bigint generated always as identity primary key,
  creator_id uuid not null references auth.users(id) on delete cascade,
  drama_id bigint references public.dramas(id) on delete set null,
  episode_n int,
  view_event_id bigint unique references public.creator_view_events(id) on delete set null,
  amount numeric(12,4) not null default 0 check (amount >= 0),
  currency_code text not null default 'MMK',
  created_at timestamptz not null default now()
);
create index if not exists creator_earnings_creator_date_idx
  on public.creator_earnings(creator_id, created_at desc);
alter table public.creator_earnings enable row level security;
drop policy if exists "creator read own earnings" on public.creator_earnings;
create policy "creator read own earnings" on public.creator_earnings
  for select to authenticated using (creator_id = auth.uid() or public.is_admin());

-- 5) Withdrawal requests. Payouts are manual and Admin-controlled.
create table if not exists public.creator_withdrawals (
  id bigint generated always as identity primary key,
  creator_id uuid not null references auth.users(id) on delete cascade,
  amount numeric(12,2) not null check (amount > 0),
  currency_code text not null default 'MMK',
  payout_method text not null,
  payout_account text not null,
  status text not null default 'pending' check (status in ('pending','approved','paid','rejected')),
  admin_note text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);
create index if not exists creator_withdrawals_creator_date_idx
  on public.creator_withdrawals(creator_id, created_at desc);
alter table public.creator_withdrawals enable row level security;
drop policy if exists "creator read own withdrawals" on public.creator_withdrawals;
create policy "creator read own withdrawals" on public.creator_withdrawals
  for select to authenticated using (creator_id = auth.uid() or public.is_admin());

-- 6) Replace public read policies with moderation-aware rules.
drop policy if exists "read dramas" on public.dramas;
create policy "read approved or owned dramas" on public.dramas
  for select to anon, authenticated
  using (moderation_status = 'approved' or public.is_admin() or owner_id = auth.uid());

drop policy if exists "admin insert dramas" on public.dramas;
create policy "admin or vip creator insert dramas" on public.dramas
  for insert to authenticated
  with check (
    public.is_admin()
    or (owner_id = auth.uid()
        and moderation_status = 'pending'
        and exists(select 1 from public.profiles p where p.id=auth.uid() and p.is_vip))
  );

drop policy if exists "admin update dramas" on public.dramas;
create policy "admin update dramas" on public.dramas
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin delete dramas" on public.dramas;
create policy "admin or own pending delete dramas" on public.dramas
  for delete to authenticated
  using (public.is_admin() or (owner_id=auth.uid() and moderation_status='pending'));

drop policy if exists "read episodes" on public.episodes;
create policy "read approved or owned episodes" on public.episodes
  for select to anon, authenticated
  using (
    (moderation_status='approved' and exists(
      select 1 from public.dramas d where d.id=episodes.drama_id and d.moderation_status='approved'
    ))
    or public.is_admin()
    or exists(select 1 from public.dramas d where d.id=episodes.drama_id and d.owner_id=auth.uid())
  );

drop policy if exists "admin insert episodes" on public.episodes;
create policy "admin or vip creator insert episodes" on public.episodes
  for insert to authenticated
  with check (
    public.is_admin()
    or (
      uploaded_by=auth.uid()
      and moderation_status='pending'
      and exists(select 1 from public.profiles p where p.id=auth.uid() and p.is_vip)
      and exists(select 1 from public.dramas d where d.id=episodes.drama_id and d.owner_id=auth.uid())
    )
  );

drop policy if exists "admin update episodes" on public.episodes;
create policy "admin update episodes" on public.episodes
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin delete episodes" on public.episodes;
create policy "admin or own pending delete episodes" on public.episodes
  for delete to authenticated
  using (
    public.is_admin()
    or (uploaded_by=auth.uid() and moderation_status='pending'
        and exists(select 1 from public.dramas d where d.id=episodes.drama_id and d.owner_id=auth.uid()))
  );

-- 7) Creator view RPC. Called only after 30 seconds of playback by the app.
-- It still deduplicates at the database level, so repeat calls do not earn again.
create or replace function public.record_episode_view(p_drama bigint, p_n int)
returns json
language plpgsql security definer set search_path = public as $$
declare
  v_uid uuid := auth.uid();
  v_owner uuid;
  v_rate numeric(12,4);
  v_currency text;
  v_event bigint;
  v_amount numeric(12,4) := 0;
begin
  if v_uid is null then raise exception 'login required'; end if;
  select d.owner_id into v_owner
    from public.dramas d
    join public.episodes e on e.drama_id=d.id
   where d.id=p_drama and e.n=p_n
     and d.moderation_status='approved'
     and e.moderation_status='approved';
  if not found then raise exception 'video not approved'; end if;

  insert into public.creator_view_events(viewer_id,drama_id,episode_n,viewed_on)
  values(v_uid,p_drama,p_n,current_date)
  on conflict(viewer_id,drama_id,episode_n,viewed_on) do nothing
  returning id into v_event;

  if v_event is null then
    return json_build_object('counted',false,'earned',0);
  end if;

  update public.dramas set views=views+1 where id=p_drama;

  if v_owner is not null and v_owner <> v_uid then
    select rate_per_1000,currency_code into v_rate,v_currency
      from public.creator_settings where id=1;
    v_amount := coalesce(v_rate,0)/1000.0;
    if v_amount > 0 then
      insert into public.creator_earnings(creator_id,drama_id,episode_n,view_event_id,amount,currency_code)
      values(v_owner,p_drama,p_n,v_event,v_amount,coalesce(v_currency,'MMK'));
    end if;
  end if;
  return json_build_object('counted',true,'earned',v_amount);
end $$;

-- Disable the old unauthenticated increment endpoint; the new RPC is the counted-view path.
revoke execute on function public.add_view(bigint) from public, anon, authenticated;

-- 8) Creator withdrawal request: balance is calculated on the server.
create or replace function public.request_creator_withdrawal(
  p_amount numeric, p_method text, p_account text
) returns bigint
language plpgsql security definer set search_path = public as $$
declare
  v_uid uuid := auth.uid();
  v_earned numeric(12,2);
  v_reserved numeric(12,2);
  v_min numeric(12,2);
  v_currency text;
  v_id bigint;
begin
  if v_uid is null then raise exception 'login required'; end if;
  if not exists(select 1 from public.profiles where id=v_uid and is_vip) then
    raise exception 'VIP creator only';
  end if;
  if p_amount is null or p_amount <= 0 or length(trim(coalesce(p_method,'')))=0
     or length(trim(coalesce(p_account,'')))<3 then
    raise exception 'invalid withdrawal details';
  end if;

  select min_withdrawal,currency_code into v_min,v_currency from public.creator_settings where id=1;
  select coalesce(sum(amount),0) into v_earned from public.creator_earnings where creator_id=v_uid;
  select coalesce(sum(amount),0) into v_reserved from public.creator_withdrawals
    where creator_id=v_uid and status in ('pending','approved','paid');
  if p_amount < coalesce(v_min,10000) then raise exception 'below minimum withdrawal'; end if;
  if p_amount > (v_earned-v_reserved) then raise exception 'insufficient creator balance'; end if;

  insert into public.creator_withdrawals(creator_id,amount,currency_code,payout_method,payout_account)
  values(v_uid,round(p_amount,2),coalesce(v_currency,'MMK'),trim(p_method),trim(p_account))
  returning id into v_id;
  return v_id;
end $$;

-- 9) Admin-only moderation and finance controls.
create or replace function public.admin_review_drama(p_drama bigint,p_approved boolean,p_note text default null)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'admin only'; end if;
  update public.dramas
     set moderation_status=case when p_approved then 'approved' else 'rejected' end,
         moderation_note=nullif(trim(coalesce(p_note,'')),''),
         reviewed_at=now()
   where id=p_drama;
  update public.episodes
     set moderation_status=case when p_approved then 'approved' else 'rejected' end,
         moderation_note=nullif(trim(coalesce(p_note,'')),''),
         reviewed_at=now()
   where drama_id=p_drama and moderation_status='pending';
end $$;

create or replace function public.admin_review_withdrawal(p_withdrawal bigint,p_status text,p_note text default null)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'admin only'; end if;
  if p_status not in ('approved','paid','rejected') then raise exception 'invalid status'; end if;
  update public.creator_withdrawals
     set status=p_status,admin_note=nullif(trim(coalesce(p_note,'')),''),
         reviewed_at=now()
   where id=p_withdrawal and status in ('pending','approved');
  if not found then raise exception 'withdrawal not found or already finalized'; end if;
end $$;

create or replace function public.admin_set_creator_settings(p_rate numeric,p_min numeric)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'admin only'; end if;
  if p_rate is null or p_rate<0 or p_min is null or p_min<0 then raise exception 'invalid creator settings'; end if;
  update public.creator_settings set rate_per_1000=p_rate,min_withdrawal=p_min,updated_at=now() where id=1;
end $$;

-- 10) Storage: preserve public reads; allow VIP creators to upload only under their own UID folder.
drop policy if exists "shwezat admin insert" on storage.objects;
create policy "shwezat admin or vip creator insert" on storage.objects
  for insert to authenticated
  with check (
    bucket_id='shwezat-media'
    and (
      public.is_admin()
      or (
        name like 'creators/' || auth.uid()::text || '/%'
        and exists(select 1 from public.profiles p where p.id=auth.uid() and p.is_vip)
      )
    )
  );
drop policy if exists "shwezat admin update" on storage.objects;
create policy "shwezat admin update" on storage.objects
  for update to authenticated
  using (bucket_id='shwezat-media' and public.is_admin())
  with check (bucket_id='shwezat-media' and public.is_admin());
drop policy if exists "shwezat admin delete" on storage.objects;
create policy "shwezat admin delete" on storage.objects
  for delete to authenticated
  using (bucket_id='shwezat-media' and public.is_admin());

-- 11) Grants and RPC exposure.
grant select on public.creator_settings,public.creator_earnings,public.creator_withdrawals,public.creator_view_events to authenticated;
grant select,insert,update,delete on public.dramas,public.episodes to authenticated;
grant select on public.dramas,public.episodes to anon;
grant usage,select on all sequences in schema public to authenticated;

revoke execute on function public.record_episode_view(bigint,int) from public,anon;
revoke execute on function public.request_creator_withdrawal(numeric,text,text) from public,anon;
revoke execute on function public.admin_review_drama(bigint,boolean,text) from public,anon;
revoke execute on function public.admin_review_withdrawal(bigint,text,text) from public,anon;
revoke execute on function public.admin_set_creator_settings(numeric,numeric) from public,anon;
grant execute on function public.record_episode_view(bigint,int) to authenticated;
grant execute on function public.request_creator_withdrawal(numeric,text,text) to authenticated;
grant execute on function public.admin_review_drama(bigint,boolean,text) to authenticated;
grant execute on function public.admin_review_withdrawal(bigint,text,text) to authenticated;
grant execute on function public.admin_set_creator_settings(numeric,numeric) to authenticated;

notify pgrst, 'reload schema';
notify pgrst, 'reload config';


create or replace function public.creator_submit_episode(p_drama bigint,p_n int,p_video_path text)
returns void language plpgsql security definer set search_path = public as $$
declare v_uid uuid := auth.uid();
begin
  if v_uid is null then raise exception 'login required'; end if;
  if not exists(select 1 from public.profiles where id=v_uid and is_vip) then raise exception 'VIP creator only'; end if;
  if p_n is null or p_n<1 or p_n>200 then raise exception 'invalid episode number'; end if;
  if p_video_path not like 'creators/' || v_uid::text || '/%' then raise exception 'invalid storage path'; end if;
  if not exists(select 1 from public.dramas where id=p_drama and owner_id=v_uid) then raise exception 'not your drama'; end if;
  if exists(select 1 from public.episodes where drama_id=p_drama and n=p_n) then raise exception 'episode already exists'; end if;
  insert into public.episodes(drama_id,n,video_path,uploaded_by,moderation_status,submitted_at)
  values(p_drama,p_n,p_video_path,v_uid,'pending',now());
  update public.dramas set eps=greatest(eps,p_n) where id=p_drama and owner_id=v_uid;
end $$;
revoke execute on function public.creator_submit_episode(bigint,int,text) from public,anon;
grant execute on function public.creator_submit_episode(bigint,int,text) to authenticated;

drop policy if exists "creator update own pending dramas" on public.dramas;
create policy "creator update own pending dramas" on public.dramas
  for update to authenticated
  using (owner_id=auth.uid() and moderation_status='pending')
  with check (owner_id=auth.uid() and moderation_status='pending');
notify pgrst, 'reload schema';

drop policy if exists "creator read own view events" on public.creator_view_events;
create policy "creator read own view events" on public.creator_view_events
  for select to authenticated
  using (exists(select 1 from public.dramas d where d.id=creator_view_events.drama_id and d.owner_id=auth.uid()));
notify pgrst, 'reload schema';

-- Compatibility safeguard: keep the existing public bucket behavior so the
-- currently distributed v11 APK continues to play existing videos.
-- The app's catalogue still hides pending creator uploads until Admin approval.
update storage.buckets set public=true where id='shwezat-media';
drop policy if exists "shwezat read approved or owned media" on storage.objects;
drop policy if exists "shwezat read" on storage.objects;
create policy "shwezat read" on storage.objects for select to anon, authenticated
  using (bucket_id='shwezat-media');
notify pgrst, 'reload schema';

-- 13) Keep Creator earnings/dashboard accessible after VIP expires.
alter table public.profiles add column if not exists is_creator boolean not null default false;
create or replace function public.mark_profile_as_creator() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.owner_id is not null then
    update public.profiles set is_creator=true where id=new.owner_id;
  end if;
  return new;
end $$;
drop trigger if exists mark_creator_on_drama_insert on public.dramas;
create trigger mark_creator_on_drama_insert after insert on public.dramas
  for each row execute function public.mark_profile_as_creator();

-- Withdrawal is allowed for a former VIP Creator who still has an earned balance.
create or replace function public.request_creator_withdrawal(
  p_amount numeric, p_method text, p_account text
) returns bigint
language plpgsql security definer set search_path = public as $$
declare
  v_uid uuid := auth.uid();
  v_earned numeric(12,2);
  v_reserved numeric(12,2);
  v_min numeric(12,2);
  v_currency text;
  v_id bigint;
begin
  if v_uid is null then raise exception 'login required'; end if;
  if not exists(select 1 from public.profiles where id=v_uid and is_creator) then
    raise exception 'creator account required';
  end if;
  if p_amount is null or p_amount <= 0 or length(trim(coalesce(p_method,'')))=0
     or length(trim(coalesce(p_account,'')))<3 then
    raise exception 'invalid withdrawal details';
  end if;
  select min_withdrawal,currency_code into v_min,v_currency from public.creator_settings where id=1;
  select coalesce(sum(amount),0) into v_earned from public.creator_earnings where creator_id=v_uid;
  select coalesce(sum(amount),0) into v_reserved from public.creator_withdrawals
    where creator_id=v_uid and status in ('pending','approved','paid');
  if p_amount < coalesce(v_min,10000) then raise exception 'below minimum withdrawal'; end if;
  if p_amount > (v_earned-v_reserved) then raise exception 'insufficient creator balance'; end if;
  insert into public.creator_withdrawals(creator_id,amount,currency_code,payout_method,payout_account)
  values(v_uid,round(p_amount,2),coalesce(v_currency,'MMK'),trim(p_method),trim(p_account))
  returning id into v_id;
  return v_id;
end $$;
grant execute on function public.request_creator_withdrawal(numeric,text,text) to authenticated;
notify pgrst, 'reload schema';
