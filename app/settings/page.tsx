"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";

export default function SettingsPage() {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-xl mx-auto mt-20 p-6 bg-white shadow rounded-lg">
        <h1 className="text-2xl font-semibold text-black mb-6">Settings</h1>

        <button
          onClick={handleSignOut}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
