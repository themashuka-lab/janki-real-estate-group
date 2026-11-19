create extension if not exists pgcrypto;

create type public.app_role as enum ('admin', 'staff');
create type public.listing_status as enum ('draft', 'published', 'sold');
create type public.lead_status as enum ('new', 'contacted', 'visit_scheduled', 'negotiation', 'won', 'lost');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role public.app_role not null default 'staff',
  created_at timestamptz not null default now()
);
create table public.properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null check (category in ('Apartments','Villas & Houses','Plots')),
  location text not null,
  price text not null,
  description text not null default '',
  status public.listing_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table public.property_media (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  media_url text not null,
  media_type text not null default 'image' check (media_type in ('image','video')),
  alt_text text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null default '',
  message text not null default '',
  property_interest text not null default '',
  source text not null default 'website',
  status public.lead_status not null default 'new',
  created_at timestamptz not null default now()
);
create table public.site_visits (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  property_id uuid references public.properties(id) on delete set null,
  scheduled_at timestamptz not null,
  status text not null default 'scheduled',
  notes text not null default '',
  created_at timestamptz not null default now()
);
create table public.followups (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  due_at timestamptz not null,
  note text not null default '',
  completed_at timestamptz,
  created_at timestamptz not null default now()
);
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  body text not null,
  rating smallint not null default 5 check (rating between 1 and 5),
  approved boolean not null default false,
  created_at timestamptz not null default now()
);
create table public.content_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null default '',
  channel text not null default 'instagram',
  status text not null default 'idea',
  scheduled_at timestamptz,
  created_at timestamptz not null default now()
);
create table public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email, ''),
    'staff'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_auth_user();

alter table public.profiles enable row level security;
alter table public.properties enable row level security;
alter table public.property_media enable row level security;
alter table public.leads enable row level security;
alter table public.site_visits enable row level security;
alter table public.followups enable row level security;
alter table public.reviews enable row level security;
alter table public.content_posts enable row level security;
alter table public.activity_logs enable row level security;

create policy "Users can read own profile" on public.profiles for select to authenticated using (id = (select auth.uid()));
create policy "Admins manage profiles" on public.profiles for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Public can view published properties" on public.properties for select to anon, authenticated using (status = 'published' or public.is_admin());
create policy "Admins manage properties" on public.properties for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Public can view media for published listings" on public.property_media for select to anon, authenticated using (exists(select 1 from public.properties p where p.id = property_id and p.status = 'published') or public.is_admin());
create policy "Admins manage property media" on public.property_media for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Visitors can send enquiries" on public.leads for insert to anon, authenticated with check (status = 'new' and char_length(name) between 2 and 100 and char_length(phone) between 7 and 30 and source = 'website');
create policy "Admins manage leads" on public.leads for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage site visits" on public.site_visits for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage followups" on public.followups for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Public can view approved reviews" on public.reviews for select to anon, authenticated using (approved = true or public.is_admin());
create policy "Admins manage reviews" on public.reviews for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage content calendar" on public.content_posts for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins read activity logs" on public.activity_logs for select to authenticated using (public.is_admin());
create policy "Admins add activity logs" on public.activity_logs for insert to authenticated with check (public.is_admin());

gr ant usage on schema public to anon, authenticated;
grant select on public.properties, public.property_media, public.reviews to anon, authenticated;
grant insert on public.leads to anon, authenticated;
grant all on public.profiles, public.properties, public.property_media, public.leads, public.site_visits, public.followups, public.reviews, public.content_posts, public.activity_logs to authenticated;
