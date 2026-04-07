alter table user_daily_watch
add column if not exists timezone text not null default 'UTC',
add column if not exists utc_offset_minutes integer not null default 0;
