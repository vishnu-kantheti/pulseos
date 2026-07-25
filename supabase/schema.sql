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
