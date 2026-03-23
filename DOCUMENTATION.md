# Site Documentation — Movie Search

This document explains **how the app works**, its **routes**, **TMDB/Supabase integrations**, and how to set up the **database schema** using the SQL files in `db/schemas/`.

## Overview

Movie Search is a **Next.js (App Router)** application that:

- Consumes the **TMDB API** to list **movies and TV shows**, support **search**, and display a **details page**.
- Supports viewing **cast**, **recommendations**, and **official trailers** (when available).
- Lets authenticated users save titles to a personal library (**watch later / watchlist / seen**).
- Tracks how much time a user watched per **day**, and summarizes consumption per **month** and **year**.
- Uses **Supabase Auth** for sign up / sign in and password recovery, and **Supabase Postgres** to persist user data.

## Feature breakdown

### TMDB features (content layer)

The app fetches TMDB data server-side with a small wrapper and exposes helpers for:

- **Trending lists**
  - `getAllTrending(timeWindow?: "day" | "week")`
  - `getPopular(type: "movie" | "tv", timeWindow?: "day" | "week")`
- **Search**
  - `searchMulti(query: string)` (simple)
  - `searchMultiPaginated(query: string, page: number)` (filters results to `movie` and `tv`)
- **Details page data**
  - `getItemByTmdbId(type: "movie" | "tv", id: number)`
  - `getImages(type: string, id: number)`
  - `getCast(type: "movie" | "tv", id: number)`
  - `getRecommendedMedia(type: "movie" | "tv", id: number)`
  - `getVideosById(type: "movie" | "tv", id: number)` (tries to pick an official YouTube trailer)
  - `getRating(type: "movie" | "tv", id: number, country?: string)`

### Authentication & session (Supabase)

- **Sign up / sign in** using Supabase Auth
- **Forgot password / update password**
- **Protected areas**:
  - `/profile/*`
  - `/api/*`
  - If the user is not authenticated, they are redirected to `/auth/login`

Note: email confirmation is optional in Supabase and can be enabled/disabled in your project settings.

### User library (watchlist / seen)

Users can toggle items into:

- **watchlist** (watch later)
- **seen**

Persistence:

- Stored in Supabase table `user_media`.
- The toggle logic uses an RPC function `toggle_media_status(...)` that:
  - Removes the row if the item is already in the target status (toggle off)
  - Otherwise inserts/updates the item to the target status (atomic upsert)

API:

- `GET /api/user/library`
  - Returns `{ seen: UserMediaItem[], watchlist: UserMediaItem[] }`
  - Each item is enriched with TMDB details server-side.

### Watch-time tracking (daily goal + consumption)

Users can:

- Set a **daily goal** (minutes) in `user_preferences.daily_goal_minutes`
- Log minutes watched per day in `user_daily_watch`
- See progress summarized as:
  - **Daily** (today)
  - **Weekly** (calendar)
  - **Chart** in periods: `days | months | years`

## Routes

### Public pages

- `/` — Home (trending + popular sections)
- `/:type/:id` — Details page (where `type` is `movie` or `tv`)
- `/auth/login`
- `/auth/signup`
- `/auth/forgot-password`
- `/auth/update-password`
- `/auth/error`

### Protected pages

- `/profile` — Dashboard
- `/profile/edit` — Edit profile (username)

### API routes

- `GET /api/user/library` — user library grouped by `seen` and `watchlist`

## Project structure (high level)

- `src/app/` — routes (App Router)
- `src/actions/` — Server Actions (business logic + Supabase)
- `src/lib/` — integrations (TMDB, Supabase, helpers)
- `src/context/` — client contexts (auth, media status)
- `db/schemas/` — Supabase SQL (tables, RLS policies, triggers, functions)

## Environment variables

Create `.env.local` based on `.env.example` and fill in:

### Supabase

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only; required for account deletion)

### TMDB

- `TMDB_API_URL` (default: `https://api.themoviedb.org/3`)
- `TMDB_ACCESS_TOKEN`

## Supabase setup (database schema)

### 1) Create a Supabase project

In Supabase dashboard:

- **Project Settings → API**
  - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
  - `anon public` → `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
  - `service_role` → `SUPABASE_SERVICE_ROLE_KEY` (server-only)

### 2) Run SQL scripts from `db/schemas/`

Open **SQL Editor** and run the files **in this order**:

1. `db/schemas/001_create_tables.sql`
   - Creates:
     - `profiles`
     - `user_preferences`
     - `user_media`
     - `user_daily_watch`
   - Adds unique index on `(user_id, media_id, media_type)` for `user_media`

2. `db/schemas/002_create_policies.sql`
   - Enables RLS and creates policies for:
     - `profiles`
     - `user_preferences`
     - `user_media`
     - `user_daily_watch`

3. `db/schemas/003_create_triggers.sql`
   - Creates a trigger that automatically creates a row in `profiles` when a new user signs up

4. `db/schemas/004_create_functions.sql`
   - Creates RPC: `toggle_media_status(p_user_id, p_media_id, p_media_type, p_target_status)`
   - Return values: `'watchlist' | 'seen' | 'removed'`

### RPC note (permissions / behavior)

`toggle_media_status` is defined as `security definer`. Ensure that:

- Your RLS policies on `user_media` are correct
- The RPC is called with `p_user_id` matching the authenticated user

## Database model

### `profiles`

- `id` (uuid, PK) → references `auth.users(id)` on delete cascade
- `username` (text, required)
- `email` (text, required)
- `created_at` (timestamptz)

### `user_preferences`

- `user_id` (uuid, PK) → references `auth.users(id)` on delete cascade
- `library_sort_mode` (text, default `'random'`)
- `daily_goal_minutes` (integer, nullable)
- `updated_at` (timestamptz)

### `user_media`

- `id` (uuid, PK)
- `user_id` (uuid) → references `profiles(id)` on delete cascade
- `media_id` (text) — TMDB id stored as string
- `media_type` (text) — `'movie' | 'tv'`
- `status` (text) — `'watchlist' | 'seen'`
- `created_at` / `updated_at`

Unique index: `(user_id, media_id, media_type)`

### `user_daily_watch`

- `id` (uuid, PK)
- `user_id` (uuid) → references `auth.users(id)` on delete cascade
- `date` (date, default current_date)
- `total_minutes` (integer, nullable)
- `goal_met` (boolean, default false)
- `created_at` / `updated_at`

Unique constraint: `(user_id, date)`

## Production notes

- Do not expose `SUPABASE_SERVICE_ROLE_KEY` in client code.
- Keep `.env.local` uncommitted.

