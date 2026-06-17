-- Nexo Base Schema (MVP)
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Tenants (Empresas/Marcas)
create table public.tenants (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Profiles (Usuarios y Roles)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  tenant_id uuid references public.tenants(id) on delete cascade not null,
  email text not null,
  full_name text,
  role text check (role in ('admin', 'gerente', 'cajero')) default 'cajero' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Proveedores
create table public.providers (
  id uuid default uuid_generate_v4() primary key,
  tenant_id uuid references public.tenants(id) on delete cascade not null,
  name text not null,
  lead_time_days integer default 7 not null, -- Tiempo estimado de entrega
  contact_email text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Productos (Catálogo Base)
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  tenant_id uuid references public.tenants(id) on delete cascade not null,
  provider_id uuid references public.providers(id) on delete set null,
  name text not null,
  description text,
  category text,
  base_price numeric(10,2) not null,
  base_cost numeric(10,2) not null,
  service_level numeric(4,2) default 0.95 not null, -- Nivel de servicio deseado (ej. 95%)
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Variantes (SKUs reales: Talla, Color, etc.)
create table public.variants (
  id uuid default uuid_generate_v4() primary key,
  tenant_id uuid references public.tenants(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete cascade not null,
  sku text not null,
  attributes jsonb not null default '{}'::jsonb, -- Ej: {"talla": "M", "color": "Rojo"}
  current_stock integer default 0 not null,
  rop integer default 0 not null, -- Reorder Point (Calculado/Estático MVP)
  safety_stock integer default 0 not null, -- Stock de Seguridad
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(tenant_id, sku)
);

-- RLS (Row Level Security)
alter table public.tenants enable row level security;
alter table public.profiles enable row level security;
alter table public.providers enable row level security;
alter table public.products enable row level security;
alter table public.variants enable row level security;

-- Policies (Simplified for MVP: Usuarios solo ven datos de su tenant)
create policy "Usuarios ven su propio tenant" on public.tenants
  for select using (id in (select tenant_id from public.profiles where auth.uid() = id));

create policy "Usuarios ven perfiles de su tenant" on public.profiles
  for all using (tenant_id in (select tenant_id from public.profiles where auth.uid() = id));

create policy "Usuarios ven proveedores de su tenant" on public.providers
  for all using (tenant_id in (select tenant_id from public.profiles where auth.uid() = id));

create policy "Usuarios ven productos de su tenant" on public.products
  for all using (tenant_id in (select tenant_id from public.profiles where auth.uid() = id));

create policy "Usuarios ven variantes de su tenant" on public.variants
  for all using (tenant_id in (select tenant_id from public.profiles where auth.uid() = id));
