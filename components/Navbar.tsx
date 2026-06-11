"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

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
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-[#546B41]"
                    onClick={() => setOpen(!open)}
                >
                    {open ? "✕" : "☰"}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden px-6 pb-4 flex flex-col gap-4 text-[#546B41]">
                    <Link href="/login" className="hover:text-[#99AD7A] transition">
                        Login
                    </Link>
                    <Link
                        href="/signup"
                        className="px-4 py-2 bg-[#546B41] text-[#FFF8EC] rounded-lg hover:bg-[#99AD7A] transition text-center"
                    >
                        Sign Up
                    </Link>
                </div>
            )}
        </nav>
    );
}
