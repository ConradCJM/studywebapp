"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {supabase} from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {

        async function loadUser() {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
        }

        loadUser();

        // Listen for login/logout events
        const { data: listener } = supabase.auth.onAuthStateChange(() => {
            loadUser();
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    return (
        <nav className="w-full border-b bg-[#DCCCAC] backdrop-blur-md fixed top-0 left-0 z-50">

            <div className="max-w-7xl mx-auto px-0 py-4 flex items-center justify-between">

                {/* LEFT — Logo */}
                <Link
                    href="/"
                    className="text-2xl font-bold tracking-tight text-[#546B41] whitespace-nowrap"
                >
                    StudyWebApp
                </Link>

                {/* RIGHT — Desktop Links */}
                <div className="hidden md:flex items-center gap-8 text-[#546B41]">

                    {!user ? (
                        <>
                            <Link
                                href="/login"
                                className="px-4 py-2 bg-[#FFF8EC] text-[#546B41] rounded-lg hover:bg-[#99AD7A] transition"
                            >
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="px-4 py-2 bg-[#546B41] text-[#FFF8EC] rounded-lg hover:bg-[#99AD7A] transition"
                            >
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/" className="hover:text-[#99AD7A] transition">Home</Link>
                            <Link href="/dashboard" className="hover:text-[#99AD7A] transition">Dashboard</Link>
                            <Link href="/garden" className="hover:text-[#99AD7A] transition">Garden</Link>
                            <Link href="/profile" className="hover:text-[#99AD7A] transition">Profile</Link>
                            <Link href="/settings" className="hover:text-[#99AD7A] transition">Settings</Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-[#546B41]"
                    onClick={() => setOpen(!open)}
                >
                    {open ? "✕" : "☰"}
                </button>
            </div>

            {/* RIGHT SLIDE-IN SIDEBAR */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-[#FFF8EC] shadow-xl transform transition-transform duration-300 md:hidden ${
                    open ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex flex-col p-6 gap-6 text-[#546B41] text-lg">

                    {!user ? (
                        <>
                            <Link href="/login" onClick={() => setOpen(false)}>
                                Login
                            </Link>
                            <Link href="/signup" onClick={() => setOpen(false)}>
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
                            <Link href="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
                            <Link href="/garden" onClick={() => setOpen(false)}>Garden</Link>
                            <Link href="/profile" onClick={() => setOpen(false)}>Profile</Link>
                            <Link href="/settings" onClick={() => setOpen(false)}>Settings</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
