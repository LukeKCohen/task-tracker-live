# task-tracker-live

A small task tracker built with Next.js (App Router, TypeScript, Tailwind) and Supabase, made to deploy on Vercel. List tasks, add one, mark it done, and watch the progress bar.

> **Not production-safe.** `supabase/schema.sql` lets anonymous users read, insert and update every task. That is fine for a throwaway demo; add authentication and tighter row level security before using it for real data.

## Setup

1. **Create a Supabase project** at [supabase.com](https://supabase.com).
2. **Create the table:** open the SQL editor, paste [supabase/schema.sql](supabase/schema.sql) and run it. This creates `tasks`, 3 seed tasks and the demo policies.
3. **Get your keys:** in Project Settings > API Keys, copy the project URL and the publishable key (`sb_publishable_...`).
4. **Configure env vars:**
   ```bash
   cp .env.example .env.local
   ```
   Fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
5. **Run it:**
   ```bash
   npm install
   npm run dev
   ```
   Open http://localhost:3000. Without the env vars you will see a "Connect Supabase to get started" screen.

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, choose **Add New > Project** and import the repo.
3. Under Environment Variables, add the same two `NEXT_PUBLIC_SUPABASE_*` values.
4. Deploy. The live URL is your final shot.

`NEXT_PUBLIC_` values are inlined at build time, so redeploy after changing them.
