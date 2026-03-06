-- Profiles table
create table
    if not exists profiles (
        id uuid primary key references auth.users (id) on delete cascade,
        username text not null,
        email text not null,
        created_at timestamptz default now ()
    );

-- User preferences
create table
    if not exists user_preferences (
        user_id uuid primary key references auth.users (id) on delete cascade,
        library_sort_mode text not null default 'random',
        daily_goal_minutes integer,
        updated_at timestamptz not null default now ()
    );

-- User media table (watchlist and seen)
create table
    if not exists user_media (
        id uuid primary key default gen_random_uuid (),
        user_id uuid not null references profiles (id) on delete cascade,
        media_id text not null,
        media_type text not null check (media_type in ('movie', 'tv')),
        status text not null check (status in ('watchlist', 'seen')),
        created_at timestamptz not null default now (),
        updated_at timestamptz not null default now ()
    );

-- Ensure a user has only one row per media item
create unique index if not exists user_media_user_media_unique on user_media (user_id, media_id, media_type);