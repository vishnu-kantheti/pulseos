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
