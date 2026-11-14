-- ရွှေဇာတ်ခုံ (ShwezatKhon) v30 – Supabase SQL Editor မှာ တစ်ကြိမ် Run ပါ
-- Hero Banner "တစ်ပတ်အတွင်း ကြည့်ရှုမှု အများဆုံး Top 6" အတွက် View log + RPC ၂ ခု
-- (ရှိပြီးသား table / function / RLS policy ကို မထိပါ – additive only)

-- 1) View log table (user တစ်ယောက်၊ ဇာတ်လမ်း/အပိုင်း တစ်ခုကို ၂၄ နာရီမှာ ၁ ကြိမ်သာ မှတ်)
create table if not exists public.drama_view_log (
  id         bigint generated always as identity primary key,
  drama_id   bigint      not null,
  n          int         not null default 1,
  user_id    uuid        not null,
  created_at timestamptz not null default now()
);

create index if not exists drama_view_log_created_idx on public.drama_view_log (created_at desc);
create index if not exists drama_view_log_drama_idx   on public.drama_view_log (drama_id, created_at desc);
create index if not exists drama_view_log_user_idx    on public.drama_view_log (user_id, drama_id, n, created_at desc);

-- RLS ဖွင့်ပြီး policy မပေးထား = client က table ကို တိုက်ရိုက် ဖတ်/ရေး မရ (အောက်က function နှစ်ခုကနေပဲ)
alter table public.drama_view_log enable row level security;
revoke all on public.drama_view_log from anon, authenticated;

-- 2) ကြည့်ရှုမှု မှတ်တမ်းတင် (login ဝင်ထားသူ၊ ၂၄ နာရီ dedupe)
create or replace function public.log_drama_view(p_drama bigint, p_n int default 1)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  ep  int  := coalesce(p_n, 1);
begin
  if uid is null then return; end if;
  if not exists (select 1 from public.dramas where id = p_drama) then return; end if;
  if exists (
    select 1 from public.drama_view_log
     where user_id = uid and drama_id = p_drama and n = ep
       and created_at > now() - interval '24 hours'
  ) then return; end if;

  insert into public.drama_view_log (drama_id, n, user_id) values (p_drama, ep, uid);

  -- ရက် ၃၀ ကျော် log ကို ရံဖန်ရံခါ ရှင်း (table ကြီးမလာအောင်)
  if random() < 0.01 then
    delete from public.drama_view_log where created_at < now() - interval '30 days';
  end if;
end;
$$;

-- 3) လွန်ခဲ့သော ၇ ရက် View အများဆုံး ဇာတ်လမ်းများ
create or replace function public.get_weekly_top_dramas(p_limit int default 6)
returns table (drama_id bigint, views bigint)
language sql
stable
security definer
set search_path = public
as $$
  select l.drama_id, count(*)::bigint as views
    from public.drama_view_log l
    join public.dramas d on d.id = l.drama_id
   where l.created_at >= now() - interval '7 days'
   group by l.drama_id
   order by count(*) desc, l.drama_id
   limit greatest(1, least(coalesce(p_limit, 6), 20));
$$;

revoke all on function public.log_drama_view(bigint, int)   from public;
revoke all on function public.get_weekly_top_dramas(int)    from public;
grant execute on function public.log_drama_view(bigint, int)  to authenticated;
grant execute on function public.get_weekly_top_dramas(int)   to anon, authenticated;

notify pgrst, 'reload schema';
