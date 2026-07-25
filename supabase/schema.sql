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
