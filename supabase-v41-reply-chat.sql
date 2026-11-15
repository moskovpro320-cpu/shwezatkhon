-- ရွှေဇာတ်ခုံ v41 – (1) Threaded Comment Reply  (2) 1-on-1 Chat (စာသားသက်သက်)
-- Supabase > SQL Editor မှာ တစ်ကြိမ် Run ပါ။

/* =====================  1) Comment Reply  ===================== */
alter table public.video_comments
  add column if not exists parent_id bigint references public.video_comments(id) on delete cascade;
create index if not exists video_comments_parent_idx on public.video_comments(parent_id);

-- Reply ကို Reply ပြန်ရင် အောက်ဆုံးအဆင့် (Top-level မှတ်ချက်) အောက်ကို အလိုအလျောက် ပေါင်း၊ တခြား video ရဲ့ မှတ်ချက်ကို Reply မပေး
create or replace function public.video_comments_fix_parent()
returns trigger language plpgsql as $$
declare pv bigint; pp bigint;
begin
  if new.parent_id is not null then
    select video_id, parent_id into pv, pp from public.video_comments where id = new.parent_id;
    if not found or pv is distinct from new.video_id then
      raise exception 'invalid parent comment';
    end if;
    if pp is not null then new.parent_id := pp; end if;
  end if;
  return new;
end $$;

drop trigger if exists trg_video_comments_fix_parent on public.video_comments;
create trigger trg_video_comments_fix_parent before insert on public.video_comments
  for each row execute function public.video_comments_fix_parent();

/* =====================  2) 1-on-1 Chat  ===================== */
create table if not exists public.chat_messages (
  id bigint generated always as identity primary key,
  sender_id uuid not null references auth.users(id) on delete cascade,
  receiver_id uuid not null references auth.users(id) on delete cascade,
  content text not null check (char_length(content) between 1 and 1000),
  created_at timestamptz not null default now(),
  read_at timestamptz,
  check (sender_id <> receiver_id)
);
create index if not exists chat_msg_pair_a on public.chat_messages (sender_id, receiver_id, id desc);
create index if not exists chat_msg_pair_b on public.chat_messages (receiver_id, sender_id, id desc);
create index if not exists chat_msg_unread on public.chat_messages (receiver_id) where read_at is null;

alter table public.chat_messages enable row level security;
drop policy if exists "chat read own" on public.chat_messages;
create policy "chat read own" on public.chat_messages for select to authenticated
  using (auth.uid() = sender_id or auth.uid() = receiver_id);
drop policy if exists "chat send own" on public.chat_messages;
create policy "chat send own" on public.chat_messages for insert to authenticated
  with check (sender_id = auth.uid());
-- update/delete policy မပေးထား (Client က စာပြင်/ဖျက် မလုပ်နိုင်) – "ဖတ်ပြီး" ကို chat_mark_read() နဲ့သာ မှတ်

-- စာပို့မြန်လွန်းတာ တားဆီး (၁ စက္ကန့်အတွင်း တစ်စောင်ထက်မပို)
create or replace function public.chat_rate_limit()
returns trigger language plpgsql as $$
begin
  new.content := btrim(new.content);
  if exists (select 1 from public.chat_messages
              where sender_id = new.sender_id and created_at > now() - interval '1 second') then
    raise exception 'too fast';
  end if;
  return new;
end $$;
drop trigger if exists trg_chat_rate_limit on public.chat_messages;
create trigger trg_chat_rate_limit before insert on public.chat_messages
  for each row execute function public.chat_rate_limit();

-- Inbox: လူတစ်ယောက်ချင်းစီနဲ့ နောက်ဆုံးစာ + မဖတ်ရသေးတဲ့အရေအတွက်
create or replace function public.chat_inbox()
returns table(peer_id uuid, peer_name text, peer_avatar text, last_content text, last_at timestamptz, last_mine boolean, unread bigint)
language sql stable security definer set search_path = public as $$
  with m as (
    select case when sender_id = auth.uid() then receiver_id else sender_id end as peer, id, sender_id, content, created_at
      from public.chat_messages where auth.uid() in (sender_id, receiver_id)
  ),
  lastm as (
    select distinct on (peer) peer, content, created_at, sender_id from m order by peer, id desc
  ),
  un as (
    select sender_id as peer, count(*) as c from public.chat_messages
     where receiver_id = auth.uid() and read_at is null group by sender_id
  )
  select l.peer, coalesce(p.name, 'User'), p.avatar_url, l.content, l.created_at, (l.sender_id = auth.uid()), coalesce(u.c, 0)
    from lastm l
    left join public.profiles p on p.id = l.peer
    left join un u on u.peer = l.peer
   order by l.created_at desc
   limit 50;
$$;

-- အမည်နဲ့ လူရှာ (အနည်းဆုံး ၂ လုံး၊ ကိုယ့်ကိုယ်ကို မပါ)
create or replace function public.chat_search_users(p_q text)
returns table(id uuid, name text, avatar_url text)
language plpgsql stable security definer set search_path = public as $$
declare q text := btrim(coalesce(p_q, ''));
begin
  if auth.uid() is null or char_length(q) < 2 then return; end if;
  q := replace(replace(replace(q, '\', '\\'), '%', '\%'), '_', '\_');
  return query
    select p.id, p.name, p.avatar_url from public.profiles p
     where p.id <> auth.uid() and p.name ilike '%' || q || '%'
     order by p.name limit 20;
end $$;

create or replace function public.chat_mark_read(p_peer uuid)
returns void language sql security definer set search_path = public as $$
  update public.chat_messages set read_at = now()
   where receiver_id = auth.uid() and sender_id = p_peer and read_at is null;
$$;

create or replace function public.chat_unread()
returns bigint language sql stable security definer set search_path = public as $$
  select count(*) from public.chat_messages where receiver_id = auth.uid() and read_at is null;
$$;

revoke all on function public.chat_inbox() from public;
revoke all on function public.chat_search_users(text) from public;
revoke all on function public.chat_mark_read(uuid) from public;
revoke all on function public.chat_unread() from public;
grant execute on function public.chat_inbox() to authenticated;
grant execute on function public.chat_search_users(text) to authenticated;
grant execute on function public.chat_mark_read(uuid) to authenticated;
grant execute on function public.chat_unread() to authenticated;

-- Realtime (စာဝင်တာနဲ့ ချက်ချင်းပေါ်ဖို့) – မဖွင့်ရင်လည်း App က ၅ စက္ကန့်တစ်ခါ စစ်ပါတယ်
do $$ begin
  alter publication supabase_realtime add table public.chat_messages;
exception when duplicate_object then null;
         when undefined_object then null;
end $$;
