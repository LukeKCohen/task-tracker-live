import { createClient } from "@supabase/supabase-js";

// Literal process.env.NEXT_PUBLIC_* references are required so Next.js can inline them.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(url && key);

export function getSupabase() {
  if (!url || !key) throw new Error("Supabase environment variables are missing");
  return createClient(url, key);
}

export type Task = {
  id: number;
  title: string;
  done: boolean;
};
