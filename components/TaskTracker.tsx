"use client";

import { useCallback, useEffect, useState } from "react";
import { getSupabase, type Task } from "@/lib/supabase";

export default function TaskTracker() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = () =>
    getSupabase().from("tasks").select("id, title, done").order("id");

  const applyResult = useCallback(
    ({ data, error }: Awaited<ReturnType<typeof fetchTasks>>) => {
      if (error) setError(error.message);
      else {
        setTasks(data);
        setError(null);
      }
      setLoading(false);
    },
    [],
  );

  const load = () => fetchTasks().then(applyResult);

  useEffect(() => {
    let active = true;
    fetchTasks().then((result) => {
      if (active) applyResult(result);
    });
    return () => {
      active = false;
    };
  }, [applyResult]);

  async function addTask(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    const { error } = await getSupabase().from("tasks").insert({ title: trimmed });
    if (error) return setError(error.message);
    setTitle("");
    load();
  }

  async function markDone(id: number) {
    const { error } = await getSupabase().from("tasks").update({ done: true }).eq("id", id);
    if (error) return setError(error.message);
    load();
  }

  const done = tasks.filter((t) => t.done).length;
  const percent = tasks.length === 0 ? 0 : Math.round((done / tasks.length) * 100);

  return (
    <section>
      <h1 className="text-3xl font-extrabold tracking-tight">Task Tracker</h1>

      <div className="mt-6">
        <div className="mb-2 flex items-baseline justify-between font-semibold">
          <span>
            {done} of {tasks.length} done
          </span>
          <span className="text-2xl text-emerald-300">{percent}%</span>
        </div>
        <div
          role="progressbar"
          aria-label="Tasks completed"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          className="h-4 overflow-hidden rounded-full bg-neutral-800"
        >
          <div
            className="h-full rounded-full bg-emerald-400 transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <form onSubmit={addTask} className="mt-6 flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task"
          aria-label="New task title"
          className="min-w-0 flex-1 rounded-xl border-2 border-neutral-600 bg-black px-4 py-3 text-base text-white placeholder:text-neutral-400 focus:border-emerald-400 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-xl bg-emerald-400 px-5 py-3 font-bold text-black active:bg-emerald-300"
        >
          Add
        </button>
      </form>

      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-950 p-3 text-red-200">
          {error}
        </p>
      )}

      <ul className="mt-6 space-y-3">
        {loading && <li className="text-neutral-400">Loading…</li>}
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between gap-3 rounded-xl border-2 border-neutral-700 p-4"
          >
            <span className={task.done ? "text-neutral-500 line-through" : "font-medium"}>
              {task.title}
            </span>
            {task.done ? (
              <span className="shrink-0 font-bold text-emerald-300">✓ Done</span>
            ) : (
              <button
                onClick={() => markDone(task.id)}
                className="shrink-0 rounded-lg border-2 border-emerald-400 px-3 py-2 text-sm font-bold text-emerald-300 active:bg-emerald-400 active:text-black"
              >
                Mark done
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
