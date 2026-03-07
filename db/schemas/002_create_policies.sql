-- Enable Row Level Security

alter table profiles enable row level security;
alter table user_media enable row level security;

-- Profiles:
create policy "User can view and edit own profile"
on profiles
for all
using (auth.uid() = id)
with check (auth.uid() = id);


-- user preferences policies
alter table user_preferences enable row level security;

create policy "Select own preferences"
on user_preferences
for select
using (user_id = auth.uid());

create policy "Insert own preferences"
on user_preferences
for insert
with check (user_id = auth.uid());

create policy "Update own preferences"
on user_preferences
for update
using (user_id = auth.uid())
with check (user_id = auth.uid());

-- User media (watchlist and seen):
create policy "User can manage own media"
on user_media
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- User daily watch policies
alter table user_daily_watch enable row level security;

create policy "Select own daily watch"
on user_daily_watch for select
using (user_id = auth.uid());

create policy "Insert own daily watch"
on user_daily_watch for insert
with check (user_id = auth.uid());

create policy "Update own daily watch"
on user_daily_watch for update
using (user_id = auth.uid())
with check (user_id = auth.uid());