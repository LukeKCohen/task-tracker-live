import ConnectSupabase from "@/components/ConnectSupabase";
import TaskTracker from "@/components/TaskTracker";
import { isSupabaseConfigured } from "@/lib/supabase";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-4 py-10">
      {isSupabaseConfigured ? <TaskTracker /> : <ConnectSupabase />}
    </main>
  );
}
