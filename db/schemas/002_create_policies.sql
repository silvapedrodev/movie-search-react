-- Enable Row Level Security

alter table profiles enable row level security;
alter table user_media enable row level security;

-- Profiles:
create policy "User can view and edit own profile"
on profiles
for all
using (auth.uid() = id)
with check (auth.uid() = id);

-- User media (watchlist and seen):
create policy "User can manage own media"
on user_media
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);