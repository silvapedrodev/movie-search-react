-- Toggle the status of a media item for a given user.
-- Logic:
--   - If the item already has the target status → delete it (toggle off)
--   - Otherwise → upsert with the new target status (insert or update)
-- Returns the final status as text: 'watchlist' | 'seen' | 'removed'
create or replace function toggle_media_status(
  p_user_id      uuid,
  p_media_id     text,
  p_media_type   text,
  p_target_status text
) returns text
language plpgsql
security definer
as $$
declare
  v_existing_status text;
begin
  -- Fetch current status for this user + media combination
  select status into v_existing_status
  from user_media
  where user_id   = p_user_id
    and media_id  = p_media_id
    and media_type = p_media_type;

  -- If the item is already set to the target status, remove it (toggle off)
  if v_existing_status = p_target_status then
    delete from user_media
    where user_id   = p_user_id
      and media_id  = p_media_id
      and media_type = p_media_type;

    return 'removed';
  end if;

  -- Otherwise, insert or update to the target status atomically
  insert into user_media (user_id, media_id, media_type, status)
  values (p_user_id, p_media_id, p_media_type, p_target_status)
  on conflict (user_id, media_id, media_type)
  do update set
    status     = excluded.status,
    updated_at = now();

  return p_target_status;
end;
$$;