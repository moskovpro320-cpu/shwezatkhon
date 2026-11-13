-- =====================================================================
-- v14 patch (v11 → v12 → v13 ပြီးမှ Run – Idempotent)
--   Profile ပုံ (avatar_url) + Creator နာမည်/ပုံ ပြသရန် function
-- =====================================================================
alter table public.profiles add column if not exists avatar_url text;

-- User က ကိုယ့် avatar ကိုပဲ ပြင်နိုင် (Catbox လင့်ခ်သာ လက်ခံ)
create or replace function public.set_my_avatar(p_url text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'login required'; end if;
  if p_url is not null and p_url !~ '^https://files\.catbox\.moe/[A-Za-z0-9._-]+$' then
    raise exception 'invalid avatar link';
  end if;
  update public.profiles set avatar_url = p_url where id = auth.uid();
end $$;

-- ဇာတ်လမ်းတင်ဆက်သူ (Creator) နာမည် + ပုံ – Approved ဇာတ်လမ်းပိုင်ရှင်၊ ကိုယ်တိုင်၊ Admin ကြည့်ရင်သာ
-- (Email ပေါ်မသွားအောင် နာမည်မှာ @ ပါရင် @ အရှေ့ပိုင်းပဲ ပြ)
create or replace function public.get_public_profiles(p_ids uuid[])
returns table(id uuid, name text, avatar_url text)
language sql security definer stable set search_path = public as $$
  select p.id,
         case when p.name like '%@%' then split_part(p.name,'@',1) else p.name end,
         p.avatar_url
    from public.profiles p
   where p.id = any(p_ids)
     and ( public.is_admin() or p.id = auth.uid()
           or exists(select 1 from public.dramas d where d.owner_id = p.id and d.moderation_status = 'approved') )
$$;

revoke execute on function public.set_my_avatar(text) from public, anon;
grant  execute on function public.set_my_avatar(text) to authenticated;
revoke execute on function public.get_public_profiles(uuid[]) from public;
grant  execute on function public.get_public_profiles(uuid[]) to anon, authenticated;

notify pgrst, 'reload schema';
