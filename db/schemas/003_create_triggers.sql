-- Automatically create profile after user signup
create or replace function public.create_profile()
returns trigger
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, username)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'username', new.email)
  );

  return new;
end;
$$ language plpgsql;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.create_profile();