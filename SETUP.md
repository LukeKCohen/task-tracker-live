# Setup guide: Supabase, GitHub and Vercel

Follow these in order. Dashboard labels change now and then, so if a menu name differs slightly, look for the nearest match.

## Before you start

- Node.js installed (`node -v`)
- A [Supabase](https://supabase.com) account
- A [GitHub](https://github.com) account
- A [Vercel](https://vercel.com) account (sign in with GitHub, which makes importing the repo one click)

## 1. Create the Supabase project

1. In the Supabase dashboard, click **New project**.
2. Pick your organization, then fill in:
   - **Name:** `task-tracker-live`
   - **Database password:** click Generate and save it in your password manager. This app never uses it, but you can't view it again later.
   - **Region:** the one closest to you.
3. Click **Create new project** and wait about a minute for it to finish provisioning.

## 2. Create the table and seed data

1. In the left sidebar, open **SQL Editor** and click **New query**.
2. Paste the whole contents of `supabase/schema.sql` and click **Run**.
3. You should see "Success. No rows returned".
4. Check it: open **Table Editor** > `tasks`. You should see 3 rows, one of them done.

Run the script only once. Running it again fails on the duplicate policies and would add the seed rows twice.

## 3. Get your project URL and publishable key

1. Open **Project Settings** (gear icon) > **API Keys**. The **Connect** button at the top of the project page shows the same values.
2. Copy the **Project URL**. It looks like `https://abcdefghijkl.supabase.co`.
3. Copy the **publishable key**, which starts with `sb_publishable_`. If your project only shows the older **anon** key under "Legacy API keys", that one works too in the same variable.

**Never use the secret key or `service_role` key in this app.** The variables are prefixed `NEXT_PUBLIC_`, so their values are shipped to every visitor's browser.

## 4. Link the project locally

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your values:

```
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijkl.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Then run it:

```bash
npm install
npm run dev
```

Open http://localhost:3000. You should see your 3 tasks and a 33% progress bar. Add a task and mark one done, then confirm the change shows up in Supabase's Table Editor. If you still see "Connect Supabase to get started", the env vars weren't picked up: check the file name (`.env.local`) and restart `npm run dev`.

## 5. Put the code on GitHub

1. On GitHub, click **New repository**. Name it `task-tracker-live`, leave it empty (no README, no .gitignore), and create it.
2. In the project folder:

```bash
git add -A
git commit -m "Task tracker with Supabase"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/task-tracker-live.git
git push -u origin main
```

Check on GitHub that `.env.local` is **not** in the repo. The `.gitignore` excludes it.

## 6. Deploy on Vercel

1. In Vercel, click **Add New...** > **Project**.
2. Under **Import Git Repository**, find `task-tracker-live` and click **Import**. If it isn't listed, click **Adjust GitHub App Permissions** and grant access to the repo.
3. Vercel detects Next.js automatically. Leave the build settings alone.
4. Expand **Environment Variables** and add both, using the same values as `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
5. Click **Deploy**. After about a minute you get a live URL such as `task-tracker-live.vercel.app`.
6. Open the URL on your phone and check that tasks load and can be completed.

From now on, every `git push` to `main` redeploys automatically.

### Alternative: deploy from the CLI

```bash
npm i -g vercel
vercel login
vercel link
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
vercel --prod
```

For each `vercel env add`, paste the value when asked and select Production, Preview and Development.

## Troubleshooting

| Symptom | Cause and fix |
| --- | --- |
| Live site shows "Connect Supabase to get started" | The env vars are missing in Vercel, or you added them after the build. Add them under Project > Settings > Environment Variables, then **Redeploy**. `NEXT_PUBLIC_` values are baked in at build time. |
| Red error banner mentioning "permission denied" or "row-level security" | The policies in `schema.sql` weren't created. Re-run just the three `create policy` statements. |
| Banner says "Invalid API key" | Wrong or truncated key. Re-copy the publishable key. |
| Empty list but no error | The seed `insert` didn't run, or you're pointing at a different Supabase project. |
| Works locally, not on Vercel | `.env.local` is not deployed. The variables must be set in Vercel itself. |

## Resetting between takes when filming

In the Supabase SQL Editor:

```sql
delete from public.tasks;
insert into public.tasks (title, done) values
  ('Create a Supabase project', true),
  ('Deploy to Vercel', false),
  ('Share the live link', false);
```

Reload the live site and you're back at 33%.
