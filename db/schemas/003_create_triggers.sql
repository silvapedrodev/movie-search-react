-- Automatically create profile after user signup
create function public.create_profile()
returns trigger as $$
begin
    insert into profiles (id, email, username)
    values (new.id, new.email, new.email); -- default username = email
    return new;
end;
$$ language plpgsql;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.create_profile();