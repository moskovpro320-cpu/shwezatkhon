-- ရွှေဇာတ်ခုံ v38 – Admin View Editor (Password ဖြင့်)
-- Supabase > SQL Editor မှာ တစ်ကြိမ် Run ပါ။
create extension if not exists pgcrypto with schema extensions;

create table if not exists public.admin_secret (
  id int primary key default 1 check (id = 1),
  hash text not null
);
alter table public.admin_secret enable row level security;
revoke all on public.admin_secret from anon, authenticated;

-- ★ Password ကို ဒီမှာ ပြောင်းပါ (1234 က လွယ်လွန်းလို့ ပိုခက်တာနဲ့ အစားထိုးပါ)
insert into public.admin_secret (id, hash)
values (1, extensions.crypt('1234', extensions.gen_salt('bf')))
on conflict (id) do nothing;
-- ပြောင်းချင်ရင်: update public.admin_secret set hash = extensions.crypt('PASSWORD_အသစ်', extensions.gen_salt('bf')) where id = 1;

create or replace function public.admin_check_pass(p_pass text)
returns boolean language plpgsql security definer set search_path = public, extensions as $$
declare ok boolean;
begin
  select (hash = extensions.crypt(coalesce(p_pass,''), hash)) into ok from public.admin_secret where id = 1;
  if not coalesce(ok, false) then perform pg_sleep(1); end if;
  return coalesce(ok, false);
end $$;

create or replace function public.admin_set_views(p_pass text, p_drama bigint, p_views bigint)
returns bigint language plpgsql security definer set search_path = public, extensions as $$
begin
  if not public.admin_check_pass(p_pass) then raise exception 'wrong password'; end if;
  if p_views < 0 or p_views > 2000000000 then raise exception 'views out of range'; end if;
  update public.dramas set views = p_views where id = p_drama;
  if not found then raise exception 'drama not found'; end if;
  return p_views;
end $$;

revoke all on function public.admin_check_pass(text) from public;
revoke all on function public.admin_set_views(text, bigint, bigint) from public;
grant execute on function public.admin_check_pass(text) to anon, authenticated;
grant execute on function public.admin_set_views(text, bigint, bigint) to anon, authenticated;
