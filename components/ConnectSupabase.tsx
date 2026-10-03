export default function ConnectSupabase() {
  return (
    <section className="rounded-2xl border-2 border-white p-6">
      <h1 className="text-2xl font-extrabold">
        Connect the project to Supabase to get started
      </h1>
      <p className="mt-3 text-neutral-300">
        This app stores its tasks in Supabase, but no connection is configured
        yet.
      </p>
      <ol className="mt-5 list-decimal space-y-2 pl-5 text-neutral-100">
        <li>
          Create a Supabase project and run{" "}
          <code className="font-mono text-emerald-300">
            supabase/schema.sql
          </code>{" "}
          in the SQL editor.
        </li>
        <li>
          Copy <code className="font-mono text-emerald-300">.env.example</code>{" "}
          to <code className="font-mono text-emerald-300">.env.local</code> and
          fill in your project URL and publishable key.
        </li>
        <li>
          Restart the dev server, or add the same variables in your Vercel
          project and redeploy.
        </li>
      </ol>
    </section>
  );
}
