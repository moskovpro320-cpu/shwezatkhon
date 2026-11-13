-- =====================================================================
-- v19 patch (v11 → v15 ပြီးမှ Run – Idempotent)
--   ❤️ Like စနစ် + 💬 Comment စနစ်
--
-- မှတ်ချက် – project ထဲမှာ "videos" ဇယား မရှိပါ။ ကြည့်ရတဲ့ ဗီဒီယိုတွေက
--   public.dramas  (id bigint identity)  ←  public.episodes (drama_id bigint, n int)
--   ဖြစ်တာကြောင့် Like/Comment ကို  dramas.id (bigint)  နဲ့ ချိတ်ထားပါတယ်။
--   (SQL ထဲက video_id = dramas.id ၊ အတွင်းက type = bigint)
-- =====================================================================

-- 1) ရေတွက်ကော်လံများ
alter table public.dramas add column if not exists likes_count    bigint not null default 0;
alter table public.dramas add column if not exists comments_count bigint not null default 0;

-- 2) Likes ---------------------------------------------------------------
create table if not exists public.video_likes (
  video_id   bigint not null references public.dramas(id)   on delete cascade,
  user_id    uuid   not null references auth.users(id)      on delete cascade,
  created_at timestamptz not null default now(),
  primary key (video_id, user_id)
);
create index if not exists video_likes_user_idx on public.video_likes(user_id);

alter table public.video_likes enable row level security;
drop policy if exists "own likes select" on public.video_likes;
-- ကိုယ့် Like ကိုပဲ ဖတ်ခွင့် (ထည့်/ဖျက်ကို toggle_video_like() function ကပဲ လုပ်)
create policy "own likes select" on public.video_likes
  for select to authenticated using (user_id = auth.uid());

-- Like အရေအတွက် trigger
create or replace function public.video_likes_count_trg()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' then
    update public.dramas set likes_count = likes_count + 1 where id = new.video_id;
    return new;
  else
    update public.dramas set likes_count = greatest(0, likes_count - 1) where id = old.video_id;
    return old;
  end if;
end $$;

drop trigger if exists video_likes_count on public.video_likes;
create trigger video_likes_count
  after insert or delete on public.video_likes
  for each row execute function public.video_likes_count_trg();

-- Like နှိပ်/ပြန်နှိပ် (toggle) → {liked, likes_count}
create or replace function public.toggle_video_like(p_video_id bigint)
returns jsonb language plpgsql security definer set search_path = public as $$
declare v_uid uuid := auth.uid(); v_liked boolean; v_cnt bigint;
begin
  if v_uid is null then raise exception 'login required'; end if;
  -- မမြင်ရတဲ့ (pending/rejected) ဇာတ်လမ်းကို Like မပေး – dramas RLS နဲ့ ကိုက်အောင် စစ်
  if not exists (select 1 from public.dramas
                  where id = p_video_id
                    and (moderation_status = 'approved' or owner_id = v_uid or public.is_admin())) then
    raise exception 'video not found';
  end if;

  delete from public.video_likes where video_id = p_video_id and user_id = v_uid;
  if found then
    v_liked := false;
  else
    insert into public.video_likes(video_id, user_id) values (p_video_id, v_uid)
      on conflict do nothing;
    v_liked := true;
  end if;
  select likes_count into v_cnt from public.dramas where id = p_video_id;
  return jsonb_build_object('liked', v_liked, 'likes_count', coalesce(v_cnt, 0));
end $$;

revoke execute on function public.toggle_video_like(bigint) from public, anon;
grant  execute on function public.toggle_video_like(bigint) to authenticated;

-- 3) Comments ------------------------------------------------------------
create table if not exists public.video_comments (
  id          bigint generated always as identity primary key,
  video_id    bigint not null references public.dramas(id) on delete cascade,
  user_id     uuid   not null default auth.uid() references auth.users(id) on delete cascade,
  user_name   text,
  user_avatar text,
  content     text   not null,
  created_at  timestamptz not null default now(),
  constraint video_comments_content_len check (char_length(btrim(content)) between 1 and 500)
);
create index if not exists video_comments_video_idx on public.video_comments(video_id, created_at desc);
create index if not exists video_comments_user_idx  on public.video_comments(user_id);

alter table public.video_comments enable row level security;
drop policy if exists "read comments"          on public.video_comments;
drop policy if exists "insert own comment"     on public.video_comments;
drop policy if exists "delete own or admin"    on public.video_comments;

-- ဇာတ်လမ်းကို မြင်ခွင့်ရှိသူ (dramas RLS) က မှတ်ချက်ဖတ်နိုင်
create policy "read comments" on public.video_comments
  for select to anon, authenticated
  using (exists (select 1 from public.dramas d where d.id = video_id));

create policy "insert own comment" on public.video_comments
  for insert to authenticated
  with check (user_id = auth.uid()
              and exists (select 1 from public.dramas d where d.id = video_id));

create policy "delete own or admin" on public.video_comments
  for delete to authenticated
  using (user_id = auth.uid() or public.is_admin());
-- UPDATE policy မရှိ → မှတ်ချက်ပြင်ခွင့်မရှိ (ဖျက်ပြီး ပြန်ရေး)

-- user_name / user_avatar ကို client ပေးတာမယုံဘဲ profiles ကနေ server မှာ ဖြည့် (အယောင်ဆောင်မရအောင်)
create or replace function public.video_comments_fill_trg()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_name text; v_av text;
begin
  select case when p.name like '%@%' then split_part(p.name,'@',1) else p.name end, p.avatar_url
    into v_name, v_av
    from public.profiles p where p.id = new.user_id;
  new.user_name   := coalesce(nullif(btrim(v_name), ''), 'User');
  new.user_avatar := v_av;
  new.content     := btrim(new.content);
  return new;
end $$;

drop trigger if exists video_comments_fill on public.video_comments;
create trigger video_comments_fill
  before insert on public.video_comments
  for each row execute function public.video_comments_fill_trg();

-- Comment အရေအတွက် တိုး/လျှော့ trigger
create or replace function public.video_comments_count_trg()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' then
    update public.dramas set comments_count = comments_count + 1 where id = new.video_id;
    return new;
  else
    update public.dramas set comments_count = greatest(0, comments_count - 1) where id = old.video_id;
    return old;
  end if;
end $$;

drop trigger if exists video_comments_count on public.video_comments;
create trigger video_comments_count
  after insert or delete on public.video_comments
  for each row execute function public.video_comments_count_trg();

-- 4) ရှိပြီးသား ဒေတာနဲ့ ရေတွက်ချက် ပြန်ညှိ (ပထမအကြိမ် Run အတွက် လုံခြုံ)
update public.dramas d set
  likes_count    = (select count(*) from public.video_likes    l where l.video_id = d.id),
  comments_count = (select count(*) from public.video_comments c where c.video_id = d.id);

notify pgrst, 'reload schema';
