-- Profiles table
create table if not exists profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    username text not null,
    email text not null,
    created_at timestamptz default now()
);

-- Watchlist table
create table if not exists watchlist (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references profiles(id) on delete cascade,
    movie_id text not null,
    created_at timestamptz default now()
);

-- Seen movies table
create table if not exists seen_movies (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references profiles(id) on delete cascade,
    movie_id text not null,
    created_at timestamptz default now()
);