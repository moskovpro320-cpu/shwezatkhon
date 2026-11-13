-- =====================================================================
-- v15 patch (v14 ပြီးမှ Run – Idempotent)
--   Avatar link ကို Catbox တစ်ခုတည်း မစစ်တော့ဘဲ https:// နဲ့ စတဲ့ link ဘယ်ဟာမဆို လက်ခံမယ်
--   (Pixeldrain: https://pixeldrain.com/api/file/xxxx အပါအဝင်)
-- =====================================================================
create or replace function public.set_my_avatar(p_url text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'login required'; end if;
  if p_url is not null and (p_url !~* '^https://[^[:space:]"''<>]+$' or length(p_url) > 2000) then
    raise exception 'invalid avatar link';
  end if;
  update public.profiles set avatar_url = p_url where id = auth.uid();
end $$;

revoke execute on function public.set_my_avatar(text) from public, anon;
grant  execute on function public.set_my_avatar(text) to authenticated;

notify pgrst, 'reload schema';
