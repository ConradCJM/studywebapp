"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";

export default function ProfilePage() {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setUsername(null);
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();

      setUsername(profile?.username ?? null);
      setLoading(false);
    }

    loadProfile();
  }, []);

  return (
    <>
      <Navbar />

      <main className="pt-24 p-6">
        {loading && <p>Loading…</p>}

        {!loading && !username && (
          <h1 className="text-xl font-semibold">Not logged in</h1>
        )}

        {!loading && username && (
          <>
            <h1 className="text-2xl font-bold">Profile</h1>
            <p className="mt-4 text-lg">
              Username: <span className="font-semibold">{username}</span>
            </p>
          </>
        )}
      </main>
    </>
  );
}
