-- =====================================================
-- PulseOS Database Schema
-- AI Restaurant Operating System
-- PostgreSQL / Supabase
-- =====================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- =====================================================
-- ENUM TYPES
-- =====================================================

create type user_role as enum (
  'customer',
  'waiter',
  'kitchen',
  'admin'
);

create type table_status as enum (
  'available',
  'occupied',
  'reserved',
  'cleaning'
);

create type order_status as enum (
  'pending',
  'preparing',
  'ready',
  'served',
  'paid'
);

create type notification_type as enum (
  'info',
  'warning',
  'success',
  'error'
);
-- =====================================================
-- RESTAURANTS
-- =====================================================

create table restaurants (
    id uuid primary key default gen_random_uuid(),

    name text not null,

    address text,

    phone text,

    created_at timestamptz default now()
);
-- =====================================================
-- PROFILES
-- =====================================================

create table profiles (
    id uuid primary key references auth.users(id) on delete cascade,

    restaurant_id uuid not null references restaurants(id) on delete cascade,

    full_name text not null,

    email text not null unique,

    role user_role not null default 'customer',

    created_at timestamptz default now()
);
-- =====================================================
-- MENU ITEMS
-- =====================================================

create table menu_items (
    id uuid primary key default gen_random_uuid(),

    restaurant_id uuid not null
        references restaurants(id)
        on delete cascade,

    name text not null,

    description text,

    category text not null,

    price numeric(10,2) not null,

    prep_time integer not null default 15,

    is_veg boolean default true,

    spice_level integer default 1
        check (spice_level between 1 and 5),

    available boolean default true,

    image_url text,

    created_at timestamptz default now()
);
-- =====================================================
-- RESTAURANT TABLES
-- =====================================================

create table restaurant_tables (
    id uuid primary key default gen_random_uuid(),

    restaurant_id uuid not null
        references restaurants(id)
        on delete cascade,

    table_number integer not null,

    capacity integer not null
        check (capacity > 0),

    status table_status not null default 'available',

    qr_code text unique,

    created_at timestamptz default now(),

    unique (restaurant_id, table_number)
);
-- =====================================================
-- ORDERS
-- =====================================================

create table orders (
    id uuid primary key default gen_random_uuid(),

    restaurant_id uuid not null
        references restaurants(id)
        on delete cascade,

    customer_id uuid
        references profiles(id)
        on delete set null,

    table_id uuid
        references restaurant_tables(id)
        on delete set null,

    status order_status not null default 'pending',

    total numeric(10,2) not null default 0,

    ordered_at timestamptz default now(),

    cooking_started_at timestamptz,

    ready_at timestamptz,

    served_at timestamptz,

    created_at timestamptz default now()
);
-- =====================================================
-- ORDER ITEMS
-- =====================================================

create table order_items (
    id uuid primary key default gen_random_uuid(),

    order_id uuid not null
        references orders(id)
        on delete cascade,

    menu_item_id uuid not null
        references menu_items(id)
        on delete restrict,

    quantity integer not null
        check (quantity > 0),

    unit_price numeric(10,2) not null,

    subtotal numeric(10,2) not null,

    special_instructions text,

    created_at timestamptz default now()
);
-- =====================================================
-- INVENTORY
-- =====================================================

create table inventory (
    id uuid primary key default gen_random_uuid(),

    restaurant_id uuid not null
        references restaurants(id)
        on delete cascade,

    ingredient_name text not null,

    quantity numeric(10,2) not null default 0,

    minimum_stock numeric(10,2) not null default 0,

    unit text not null,

    last_restocked_at timestamptz,

    expiry_date date,

    created_at timestamptz default now()
);
-- =====================================================
-- NOTIFICATIONS
-- =====================================================

create table notifications (
    id uuid primary key default gen_random_uuid(),

    restaurant_id uuid not null
        references restaurants(id)
        on delete cascade,

    user_id uuid
        references profiles(id)
        on delete cascade,

    title text not null,

    message text not null,

    type notification_type not null default 'info',

    is_read boolean not null default false,

    created_at timestamptz default now()
);
-- =====================================================
-- REVIEWS
-- =====================================================

create table reviews (
    id uuid primary key default gen_random_uuid(),

    restaurant_id uuid not null
        references restaurants(id)
        on delete cascade,

    customer_id uuid
        references profiles(id)
        on delete set null,

    order_id uuid
        references orders(id)
        on delete cascade,

    rating integer not null
        check (rating between 1 and 5),

    comment text,

    created_at timestamptz default now(),

    unique(order_id)
);
-- =====================================================
-- INDEXES
-- =====================================================

create index idx_profiles_restaurant
on profiles(restaurant_id);

create index idx_menu_restaurant
on menu_items(restaurant_id);

create index idx_tables_restaurant
on restaurant_tables(restaurant_id);

create index idx_orders_restaurant
on orders(restaurant_id);

create index idx_orders_customer
on orders(customer_id);

create index idx_order_items_order
on order_items(order_id);

create index idx_inventory_restaurant
on inventory(restaurant_id);

create index idx_notifications_user
on notifications(user_id);

create index idx_reviews_restaurant
on reviews(restaurant_id);
-- =====================================================
-- AUTO CREATE PROFILE
-- =====================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
    insert into public.profiles (
        id,
        restaurant_id,
        full_name,
        email,
        role
    )
    values (
        new.id,
        (select id from restaurants limit 1),
        coalesce(new.raw_user_meta_data->>'full_name', 'New User'),
        new.email,
        'customer'
    );

    return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
-- =====================================================
-- SEED DATA
-- =====================================================

insert into restaurants (
    name,
    address,
    phone
)
values (
    'PulseOS Demo Restaurant',
    'Guntur, Andhra Pradesh',
    '+91 9876543210'
);
