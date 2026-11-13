-- =====================================================================
-- v13 patch  (v11 → v12 ပြီးမှ Run ပါ – Idempotent၊ ထပ်Run လည်း ရတယ်)
--   ၁) Creator ဗီဒီယိုကို Link (URL) နဲ့ တင်နိုင်အောင် creator_submit_episode ပြင်
--   ၂) VIP ဝယ်ယူခြင်း (Coin) + VIP လျှောက်လွှာ (Admin approve)
--   ၃) View Anti-Spam: User တစ်ယောက်လျှင် ဗီဒီယို(Episode) တစ်ခုကို ၂၄ နာရီအတွင်း ၁ View သာ
-- =====================================================================

-- ---------- ၁) Video URL ----------
create or replace function public.creator_submit_episode(p_drama bigint,p_n int,p_video_path text)
returns void language plpgsql security definer set search_path = public as $$
declare v_uid uuid := auth.uid();
begin
  if v_uid is null then raise exception 'login required'; end if;
  if not exists(select 1 from public.profiles where id=v_uid and is_vip) then raise exception 'VIP creator only'; end if;
  if p_n is null or p_n<1 or p_n>200 then raise exception 'invalid episode number'; end if;
  -- https:// လင့်ခ် (အသစ်) သို့မဟုတ် မိမိ UID folder ထဲက Storage path (အဟောင်း) သာ လက်ခံ
  if p_video_path is null
     or not ( (p_video_path ~* '^https://[^[:space:]"''<>]+$' and length(p_video_path) <= 2000)
              or p_video_path like 'creators/' || v_uid::text || '/%' ) then
    raise exception 'invalid video link';
  end if;
  if not exists(select 1 from public.dramas where id=p_drama and owner_id=v_uid) then raise exception 'not your drama'; end if;
  if exists(select 1 from public.episodes where drama_id=p_drama and n=p_n) then raise exception 'episode already exists'; end if;
  insert into public.episodes(drama_id,n,video_path,uploaded_by,moderation_status,submitted_at)
  values(p_drama,p_n,p_video_path,v_uid,'pending',now());
  update public.dramas set eps=greatest(eps,p_n) where id=p_drama and owner_id=v_uid;
end $$;
revoke execute on function public.creator_submit_episode(bigint,int,text) from public,anon;
grant  execute on function public.creator_submit_episode(bigint,int,text) to authenticated;

-- ---------- ၂) VIP ဝယ်ယူခြင်း / လျှောက်လွှာ ----------
alter table public.creator_settings add column if not exists vip_coin_price int not null default 0;
do $$ begin
  if not exists (select 1 from pg_constraint where conname='creator_settings_vip_coin_price_check') then
    alter table public.creator_settings add constraint creator_settings_vip_coin_price_check check (vip_coin_price >= 0);
  end if;
end $$;

-- Admin: VIP Coin ဈေး သတ်မှတ် (0 = Coin နဲ့ မရောင်း)
create or replace function public.admin_set_vip_price(p_price int)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'admin only'; end if;
  if p_price is null or p_price < 0 then raise exception 'invalid price'; end if;
  update public.creator_settings set vip_coin_price=p_price, updated_at=now() where id=1;
end $$;

-- User: Coin နဲ့ VIP ဝယ်ယူ (Server မှာပဲ coin နှုတ်၊ ပြန်ပေးစရာမလို)
create or replace function public.buy_vip()
returns json language plpgsql security definer set search_path = public as $$
declare v_uid uuid := auth.uid(); v_coins int; v_vip boolean; v_price int;
begin
  if v_uid is null then raise exception 'login required'; end if;
  select coins, is_vip into v_coins, v_vip from public.profiles where id=v_uid for update;
  if v_coins is null then raise exception 'profile not found'; end if;
  if v_vip then return json_build_object('coins',v_coins,'is_vip',true); end if;
  select vip_coin_price into v_price from public.creator_settings where id=1;
  if coalesce(v_price,0) <= 0 then raise exception 'vip purchase is not open'; end if;
  if v_coins < v_price then raise exception 'not enough coins'; end if;
  update public.profiles set coins = coins - v_price, is_vip = true where id=v_uid;
  return json_build_object('coins', v_coins - v_price, 'is_vip', true);
end $$;

-- VIP လျှောက်လွှာ
create table if not exists public.vip_applications (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  message text,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  admin_note text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);
create unique index if not exists vip_app_one_pending on public.vip_applications(user_id) where status='pending';
alter table public.vip_applications enable row level security;
drop policy if exists "own or admin read vip applications" on public.vip_applications;
create policy "own or admin read vip applications" on public.vip_applications
  for select to authenticated using (user_id = auth.uid() or public.is_admin());
grant select on public.vip_applications to authenticated;

create or replace function public.apply_for_vip(p_message text default null)
returns bigint language plpgsql security definer set search_path = public as $$
declare v_uid uuid := auth.uid(); v_id bigint;
begin
  if v_uid is null then raise exception 'login required'; end if;
  if exists(select 1 from public.profiles where id=v_uid and is_vip) then raise exception 'already vip'; end if;
  if exists(select 1 from public.vip_applications where user_id=v_uid and status='pending') then raise exception 'application already pending'; end if;
  if length(coalesce(p_message,'')) > 500 then raise exception 'message too long'; end if;
  insert into public.vip_applications(user_id,message) values(v_uid, nullif(trim(coalesce(p_message,'')),''))
  returning id into v_id;
  return v_id;
end $$;

create or replace function public.admin_review_vip_application(p_id bigint,p_approved boolean,p_note text default null)
returns void language plpgsql security definer set search_path = public as $$
declare v_user uuid;
begin
  if not public.is_admin() then raise exception 'admin only'; end if;
  update public.vip_applications
     set status=case when p_approved then 'approved' else 'rejected' end,
         admin_note=nullif(trim(coalesce(p_note,'')),''), reviewed_at=now()
   where id=p_id and status='pending'
   returning user_id into v_user;
  if v_user is null then raise exception 'application not found or already reviewed'; end if;
  if p_approved then update public.profiles set is_vip=true where id=v_user; end if;
end $$;

-- ---------- ၃) View Anti-Spam: ၂၄ နာရီ rolling window ----------
-- အရင်ကတော့ "ပြက္ခဒိန်နေ့" အလိုက်ပဲ စစ်တာမို့ သန်းခေါင်ကျော်ရင် ၂၄ နာရီမပြည့်ခင် ထပ်ရေတွက်နိုင်ခဲ့တယ်။
create or replace function public.record_episode_view(p_drama bigint, p_n int)
returns json language plpgsql security definer set search_path = public as $$
declare
  v_uid uuid := auth.uid();
  v_owner uuid;
  v_rate numeric(12,4);
  v_currency text;
  v_event bigint;
  v_last timestamptz;
  v_amount numeric(12,4) := 0;
begin
  if v_uid is null then raise exception 'login required'; end if;
  select d.owner_id into v_owner
    from public.dramas d join public.episodes e on e.drama_id=d.id
   where d.id=p_drama and e.n=p_n and d.moderation_status='approved' and e.moderation_status='approved';
  if not found then raise exception 'video not approved'; end if;

  -- တစ်ပြိုင်နက် ခေါ်တာတွေကို တန်းစီခိုင်း (user+video တစ်ခုချင်း)
  perform pg_advisory_xact_lock(hashtextextended(v_uid::text || ':' || p_drama::text || ':' || p_n::text, 0));

  select max(created_at) into v_last from public.creator_view_events
   where viewer_id=v_uid and drama_id=p_drama and episode_n=p_n;
  if v_last is not null and v_last > now() - interval '24 hours' then
    return json_build_object('counted',false,'earned',0,'reason','within_24h');
  end if;

  insert into public.creator_view_events(viewer_id,drama_id,episode_n,viewed_on)
  values(v_uid,p_drama,p_n,current_date)
  on conflict(viewer_id,drama_id,episode_n,viewed_on) do nothing
  returning id into v_event;
  if v_event is null then
    return json_build_object('counted',false,'earned',0,'reason','duplicate');
  end if;

  update public.dramas set views=views+1 where id=p_drama;

  if v_owner is not null and v_owner <> v_uid then
    select rate_per_1000,currency_code into v_rate,v_currency from public.creator_settings where id=1;
    v_amount := coalesce(v_rate,0)/1000.0;
    if v_amount > 0 then
      insert into public.creator_earnings(creator_id,drama_id,episode_n,view_event_id,amount,currency_code)
      values(v_owner,p_drama,p_n,v_event,v_amount,coalesce(v_currency,'MMK'));
    end if;
  end if;
  return json_build_object('counted',true,'earned',v_amount);
end $$;

-- ---------- Grants ----------
revoke execute on function public.admin_set_vip_price(int) from public,anon;
revoke execute on function public.buy_vip() from public,anon;
revoke execute on function public.apply_for_vip(text) from public,anon;
revoke execute on function public.admin_review_vip_application(bigint,boolean,text) from public,anon;
revoke execute on function public.record_episode_view(bigint,int) from public,anon;
grant  execute on function public.admin_set_vip_price(int) to authenticated;
grant  execute on function public.buy_vip() to authenticated;
grant  execute on function public.apply_for_vip(text) to authenticated;
grant  execute on function public.admin_review_vip_application(bigint,boolean,text) to authenticated;
grant  execute on function public.record_episode_view(bigint,int) to authenticated;

notify pgrst, 'reload schema';
notify pgrst, 'reload config';
