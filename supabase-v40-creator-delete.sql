-- ရွှေဇာတ်ခုံ v40 – VIP Creator က ကိုယ်တင်ထားတဲ့ ဗီဒီယို/ဇာတ်လမ်း ဖျက်ခွင့်
-- Supabase > SQL Editor မှာ တစ်ကြိမ် Run ပါ။

-- 1) ဖျက်မယ့် ဖိုင်လမ်းကြောင်းတွေ ပြန်ပေး (Storage ရှင်းဖို့) – ပိုင်ရှင် VIP သာ
create or replace function public.creator_item_paths(p_drama bigint, p_n int default null)
returns text[] language plpgsql security definer set search_path = public as $$
declare v text[];
begin
  if not exists (
    select 1 from public.dramas d join public.profiles p on p.id = auth.uid()
    where d.id = p_drama and d.owner_id = auth.uid() and p.is_vip
  ) then raise exception 'not allowed'; end if;
  select coalesce(array_agg(video_path), '{}') into v
    from public.episodes
   where drama_id = p_drama and (p_n is null or n = p_n) and video_path is not null;
  if p_n is null then
    v := v || coalesce((select array[cover_path] from public.dramas where id = p_drama and cover_path is not null), '{}');
  end if;
  return v;
end $$;

-- 2) ဇာတ်လမ်းတစ်ခုလုံး (Episode အားလုံးပါ) ဖျက်
create or replace function public.creator_delete_drama(p_drama bigint)
returns boolean language plpgsql security definer set search_path = public as $$
begin
  if not exists (
    select 1 from public.dramas d join public.profiles p on p.id = auth.uid()
    where d.id = p_drama and d.owner_id = auth.uid() and p.is_vip
  ) then raise exception 'not allowed'; end if;
  delete from public.episodes where drama_id = p_drama;
  delete from public.dramas where id = p_drama and owner_id = auth.uid();
  return true;
exception when foreign_key_violation then
  raise exception 'ဆက်စပ်မှတ်တမ်း ရှိနေလို့ မဖျက်နိုင်ပါ';
end $$;

-- 3) Episode တစ်ပိုင်းတည်း ဖျက်
create or replace function public.creator_delete_episode(p_drama bigint, p_n int)
returns boolean language plpgsql security definer set search_path = public as $$
begin
  if not exists (
    select 1 from public.dramas d join public.profiles p on p.id = auth.uid()
    where d.id = p_drama and d.owner_id = auth.uid() and p.is_vip
  ) then raise exception 'not allowed'; end if;
  delete from public.episodes where drama_id = p_drama and n = p_n;
  return true;
end $$;

revoke all on function public.creator_item_paths(bigint, int) from public;
revoke all on function public.creator_delete_drama(bigint) from public;
revoke all on function public.creator_delete_episode(bigint, int) from public;
grant execute on function public.creator_item_paths(bigint, int) to authenticated;
grant execute on function public.creator_delete_drama(bigint) to authenticated;
grant execute on function public.creator_delete_episode(bigint, int) to authenticated;

-- 4) Storage: ကိုယ့်ဇာတ်လမ်းရဲ့ ဗီဒီယို/Cover ဖိုင်ကိုသာ ဖျက်ခွင့် (bucket အမည်ကို လိုရင်ပြင်ပါ)
drop policy if exists "creator delete own media" on storage.objects;
create policy "creator delete own media" on storage.objects for delete to authenticated
using (
  bucket_id = 'shwezat-media' and (
    exists (select 1 from public.episodes e join public.dramas d on d.id = e.drama_id
            where d.owner_id = auth.uid() and e.video_path = storage.objects.name)
    or exists (select 1 from public.dramas d
            where d.owner_id = auth.uid() and d.cover_path = storage.objects.name)
  )
);
