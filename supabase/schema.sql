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
