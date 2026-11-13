-- =====================================================================
-- ရွှေဇာတ်ခုံ (ShwezatKhon) v11 – Supabase SQL အပြည့်အစုံ
-- Supabase > SQL Editor > New query ထဲ အကုန် paste လုပ်ပြီး Run နှိပ်ပါ။
-- အရင် SQL တွေ Run ပြီးသားဖြစ်ဖြစ်၊ မ Run ရသေးဘဲဖြစ်ဖြစ် ဒါတစ်ခုတည်း Run ရင်ရပါတယ်
-- (ထပ်ခါတလဲလဲ Run လည်း ဒေတာမပျက်ပါ)။
-- v11: "permission denied for table dramas" ကို GRANT + RLS Policy ပြန်ဆောက်ပြီး ပြင်ထားတယ်
-- =====================================================================

-- ---------- ၀။ Schema / Default privileges (table အသစ်ဆောက်တိုင်း role တွေကို အလိုအလျောက်ပေး) ----------
grant usage on schema public to anon, authenticated;
alter default privileges in schema public grant all on tables    to anon, authenticated;
alter default privileges in schema public grant all on sequences to anon, authenticated;
alter default privileges in schema public grant all on functions to anon, authenticated;

-- ---------- ၁။ Tables ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text, email text,
  coins int not null default 0,
  is_admin boolean not null default false,
  is_vip boolean not null default false,
  streak int not null default 0,
  last_checkin date,
  created_at timestamptz default now()
);
alter table public.profiles add column if not exists email text;
alter table public.profiles add column if not exists is_vip boolean not null default false;
alter table public.profiles add column if not exists created_at timestamptz default now();

create table if not exists public.dramas (
  id bigint generated always as identity primary key,
  title text not null, genre text,
  eps int not null default 20,
  color_a text default '#3a2a5a', color_b text default '#c06a8a',
  views bigint not null default 0,
  created_at timestamptz default now()
);
alter table public.dramas add column if not exists cover_path text;
alter table public.dramas add column if not exists price int not null default 30;     -- coin ဈေး (0 = အားလုံးအခမဲ့)
alter table public.dramas add column if not exists free_eps int not null default 10;  -- အခမဲ့ကြည့်ရမယ့် အပိုင်းရေ

create table if not exists public.episodes (
  drama_id bigint references public.dramas(id) on delete cascade,
  n int,
  video_path text not null,
  primary key (drama_id, n)
);

create table if not exists public.unlocked_episodes (
  user_id uuid references auth.users(id) on delete cascade,
  drama_id bigint references public.dramas(id) on delete cascade,
  n int,
  primary key (user_id, drama_id, n)
);

create table if not exists public.my_list (
  user_id uuid references auth.users(id) on delete cascade,
  drama_id bigint references public.dramas(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, drama_id)
);

-- အရင်ဗားရှင်းက unlocks table ရှိရင် ဒေတာကို ကူးပေးမယ်
do $$
begin
  if to_regclass('public.unlocks') is not null then
    insert into public.unlocked_episodes (user_id, drama_id, n)
    select user_id, drama_id, n from public.unlocks
    on conflict do nothing;
  end if;
end $$;

-- ---------- ၂။ Admin စစ်တဲ့ function ----------
create or replace function public.is_admin() returns boolean
language sql security definer stable set search_path = public as
$$ select coalesce((select is_admin from public.profiles where id = auth.uid()), false) $$;

-- ---------- ၃။ GRANT (anon + authenticated အတွက် အကုန်ပေး – တကယ်ကာကွယ်တာ RLS Policy ပါ) ----------
grant usage on schema public to anon, authenticated;
grant all on all tables    in schema public to anon, authenticated;
grant all on all sequences in schema public to anon, authenticated;
grant all on all functions in schema public to anon, authenticated;

-- ---------- ၄။ Row Level Security (Policy အဟောင်းအားလုံးဖျက်ပြီး သေသေချာချာ ပြန်ဆောက်) ----------
alter table public.profiles          enable row level security;
alter table public.dramas            enable row level security;
alter table public.episodes          enable row level security;
alter table public.unlocked_episodes enable row level security;
alter table public.my_list           enable row level security;

do $$
declare r record;
begin
  for r in select policyname, tablename from pg_policies
           where schemaname = 'public'
             and tablename in ('profiles','dramas','episodes','unlocked_episodes','my_list')
  loop
    execute format('drop policy if exists %I on public.%I', r.policyname, r.tablename);
  end loop;
end $$;

-- profiles: ကိုယ့်ဟာကိုယ်ဖတ်၊ Admin က အကုန်ဖတ် (ပြင်တာကို function တွေကပဲ လုပ်ခွင့်ရှိ – write policy မရှိတာ ရည်ရွယ်ချက်ရှိ)
create policy "own profile"          on public.profiles for select to authenticated using (id = auth.uid());
create policy "admin read profiles"  on public.profiles for select to authenticated using (public.is_admin());

-- dramas: လူတိုင်းဖတ်၊ Admin ပဲ ထည့်/ပြင်/ဖျက်
create policy "read dramas"          on public.dramas for select to anon, authenticated using (true);
create policy "admin insert dramas"  on public.dramas for insert to authenticated with check (public.is_admin());
create policy "admin update dramas"  on public.dramas for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin delete dramas"  on public.dramas for delete to authenticated using (public.is_admin());

-- episodes: လူတိုင်းဖတ်၊ Admin ပဲ ထည့်/ပြင်/ဖျက်
create policy "read episodes"          on public.episodes for select to anon, authenticated using (true);
create policy "admin insert episodes"  on public.episodes for insert to authenticated with check (public.is_admin());
create policy "admin update episodes"  on public.episodes for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin delete episodes"  on public.episodes for delete to authenticated using (public.is_admin());

-- unlocked_episodes: ကိုယ့်ဟာကိုယ်ပဲ ဖတ်ခွင့် (ထည့်တာကို unlock_episode() function က လုပ်)
create policy "own unlocked" on public.unlocked_episodes for select to authenticated using (user_id = auth.uid());

-- my_list: ကိုယ့်စာရင်းကို ကိုယ်တိုင် ဖတ်/ထည့်/ဖျက်
create policy "own list select" on public.my_list for select to authenticated using (user_id = auth.uid());
create policy "own list insert" on public.my_list for insert to authenticated with check (user_id = auth.uid());
create policy "own list delete" on public.my_list for delete to authenticated using (user_id = auth.uid());

-- ---------- ၅။ အကောင့်အသစ် (Google / Email) ဖြစ်တာနဲ့ profile အလိုအလျောက်ဖန်တီး ----------
-- moskovpro320@gmail.com က အလိုအလျောက် Admin ဖြစ်မယ်။ Trigger မှာ error တက်လည် Sign Up ကို မတားပါ။
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  begin
    insert into public.profiles (id, name, is_admin, email)
    values (
      new.id,
      coalesce(nullif(new.raw_user_meta_data->>'name',''),
               nullif(new.raw_user_meta_data->>'full_name',''),
               split_part(new.email,'@',1)),
      lower(coalesce(new.email,'')) = 'moskovpro320@gmail.com',
      new.email
    )
    on conflict (id) do update set email = excluded.email,
      is_admin = public.profiles.is_admin or excluded.is_admin;
  exception when others then
    raise warning 'handle_new_user failed: %', sqlerrm;
  end;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ဝင်ပြီးသား user တွေထဲ profile မရှိသေးတာတွေကို ဖြည့်မယ်
insert into public.profiles (id, name, is_admin, email)
select u.id,
       coalesce(nullif(u.raw_user_meta_data->>'name',''), nullif(u.raw_user_meta_data->>'full_name',''), split_part(u.email,'@',1)),
       lower(coalesce(u.email,'')) = 'moskovpro320@gmail.com', u.email
from auth.users u
where not exists (select 1 from public.profiles p where p.id = u.id);

create or replace function public.ensure_profile() returns void
language plpgsql security definer set search_path = public as $$
declare u auth.users%rowtype;
begin
  if auth.uid() is null then return; end if;
  select * into u from auth.users where id = auth.uid();
  insert into public.profiles (id, name, is_admin, email)
  values (
    u.id,
    coalesce(nullif(u.raw_user_meta_data->>'name',''), nullif(u.raw_user_meta_data->>'full_name',''), split_part(u.email,'@',1)),
    lower(coalesce(u.email,'')) = 'moskovpro320@gmail.com',
    u.email
  )
  on conflict (id) do update set email = excluded.email,
    is_admin = public.profiles.is_admin or (lower(coalesce(excluded.email,'')) = 'moskovpro320@gmail.com');
end $$;

-- moskovpro320@gmail.com ကို Admin (is_admin = true) တစ်ခါတည်း ပေးထားမယ်
update public.profiles set is_admin = true where lower(email) = 'moskovpro320@gmail.com';

-- ---------- ၆။ နေ့စဉ် check-in ----------
create or replace function public.checkin() returns json
language plpgsql security definer set search_path = public as $$
declare p public.profiles; r int[] := array[20,40,25,25,50,20,80]; i int;
begin
  select * into p from public.profiles where id = auth.uid() for update;
  if p.id is null then raise exception 'not logged in'; end if;
  if p.last_checkin = current_date then raise exception 'already checked in'; end if;
  if p.last_checkin = current_date - 1 and p.streak < 7 then i := p.streak; else i := 0; end if;
  update public.profiles set coins = coins + r[i+1], streak = i+1, last_checkin = current_date where id = p.id;
  return json_build_object('coins', p.coins + r[i+1], 'streak', i+1, 'gain', r[i+1]);
end $$;

-- ---------- ၇။ အပိုင်းဖွင့်ခြင်း (ဇာတ်လမ်းတစ်ခုချင်းစီရဲ့ ဈေးနဲ့) ----------
-- VIP / Admin / ဈေး 0 / အခမဲ့အပိုင်း ဆိုရင် coin မနှုတ်ပါ
create or replace function public.unlock_episode(p_drama bigint, p_n int) returns int
language plpgsql security definer set search_path = public as $$
declare c int; v boolean; a boolean; pr int; fr int;
begin
  select coins, is_vip, is_admin into c, v, a from public.profiles where id = auth.uid() for update;
  if c is null then raise exception 'not logged in'; end if;
  select price, free_eps into pr, fr from public.dramas where id = p_drama;
  if pr is null then raise exception 'drama not found'; end if;
  if v or a or pr <= 0 or p_n <= fr
     or exists (select 1 from public.unlocked_episodes where user_id = auth.uid() and drama_id = p_drama and n = p_n)
  then return c; end if;
  if c < pr then raise exception 'not enough coins'; end if;
  update public.profiles set coins = coins - pr where id = auth.uid();
  insert into public.unlocked_episodes (user_id, drama_id, n) values (auth.uid(), p_drama, p_n) on conflict do nothing;
  return c - pr;
end $$;

create or replace function public.add_view(p_drama bigint) returns void
language sql security definer set search_path = public as
$$ update public.dramas set views = views + 1 where id = p_drama $$;

-- ---------- ၈။ Admin လုပ်ဆောင်ချက်များ ----------
create or replace function public.admin_grant_coins(p_user uuid, p_amount int) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'admin only'; end if;
  update public.profiles set coins = greatest(0, coins + p_amount) where id = p_user;
end $$;

create or replace function public.admin_set_vip(p_user uuid, p_vip boolean) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'admin only'; end if;
  update public.profiles set is_vip = p_vip where id = p_user;
end $$;

-- ---------- ၉။ Function အသစ်တွေအပါအဝင် GRANT ပြန်ပေး + Login မလိုတဲ့သူ (anon) မခေါ်သင့်တာတွေ ပိတ် ----------
grant all on all tables    in schema public to anon, authenticated;
grant all on all sequences in schema public to anon, authenticated;
grant all on all functions in schema public to anon, authenticated;

revoke execute on function public.ensure_profile()                  from public, anon;
revoke execute on function public.checkin()                         from public, anon;
revoke execute on function public.unlock_episode(bigint, int)       from public, anon;
revoke execute on function public.admin_grant_coins(uuid, int)      from public, anon;
revoke execute on function public.admin_set_vip(uuid, boolean)      from public, anon;
grant  execute on function public.ensure_profile()                  to authenticated;
grant  execute on function public.checkin()                         to authenticated;
grant  execute on function public.unlock_episode(bigint, int)       to authenticated;
grant  execute on function public.admin_grant_coins(uuid, int)      to authenticated;
grant  execute on function public.admin_set_vip(uuid, boolean)      to authenticated;
-- RLS Policy ထဲက is_admin() ကို anon/authenticated နှစ်ခုလုံး ခေါ်နိုင်ရမယ်
grant  execute on function public.is_admin()                        to anon, authenticated;
grant  execute on function public.add_view(bigint)                  to anon, authenticated;

-- ---------- ၁၀။ Storage bucket 'shwezat-media' (ဗီဒီယို + Cover ပုံ) – Public ----------
insert into storage.buckets (id, name, public)
values ('shwezat-media', 'shwezat-media', true)
on conflict (id) do update set public = true;

-- Storage API က user role နဲ့ အလုပ်လုပ်ဖို့ လိုတဲ့ privilege (မပေးနိုင်ရင် ကျော်သွားမယ်)
do $$
begin
  begin
    grant usage on schema storage to anon, authenticated;
    grant select on storage.buckets to anon, authenticated;
    grant select on storage.objects to anon, authenticated;
    grant insert, update, delete on storage.objects to authenticated;
  exception when others then
    raise notice 'storage grant skipped: %', sqlerrm;
  end;
end $$;

drop policy if exists "shwezat read"         on storage.objects;
drop policy if exists "shwezat admin insert" on storage.objects;
drop policy if exists "shwezat admin update" on storage.objects;
drop policy if exists "shwezat admin delete" on storage.objects;

-- လူတိုင်း ဖတ်/ကြည့်ခွင့် (public bucket)
create policy "shwezat read" on storage.objects for select to anon, authenticated
  using (bucket_id = 'shwezat-media');
-- Admin ပဲ upload / update / delete လုပ်ခွင့်
create policy "shwezat admin insert" on storage.objects for insert to authenticated
  with check (bucket_id = 'shwezat-media' and public.is_admin());
create policy "shwezat admin update" on storage.objects for update to authenticated
  using (bucket_id = 'shwezat-media' and public.is_admin())
  with check (bucket_id = 'shwezat-media' and public.is_admin());
create policy "shwezat admin delete" on storage.objects for delete to authenticated
  using (bucket_id = 'shwezat-media' and public.is_admin());

-- ---------- ၁၁။ API cache ကို ချက်ချင်း refresh လုပ် (GRANT ပြောင်းတာ ချက်ချင်းသက်ရောက်စေဖို့) ----------
notify pgrst, 'reload schema';
notify pgrst, 'reload config';

-- ---------- ၁၂။ Admin ထပ်ထည့်ချင်ရင် (လိုမှသာ) ----------
-- update public.profiles set is_admin = true where email = 'တခြားemail@gmail.com';
