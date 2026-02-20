-- Enable Row Level Security

alter table profiles enable row level security;
alter table watchlist enable row level security;
alter table seen_movies enable row level security;

-- Profiles:
create policy "User can view and edit own profile"
on profiles
for all
using (auth.uid() = id)
with check (auth.uid() = id);

-- Watchlist: 
create policy "User can manage own watchlist"
on watchlist
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Seen movies: 
create policy "User can manage own seen movies"
on seen_movies
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);