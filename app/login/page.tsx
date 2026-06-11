"use client";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";


export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");



    const handleLogin = async (
        e: React.SyntheticEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setError("");

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            return;
        }

        router.push("/dashboard");
    };



    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col items-center bg-[#FFF8EC]">
                {/* Page container */}
                <div className="w-full max-w-md mt-24 p-8 rounded-xl shadow-lg bg-white border border-[#DCCCAC]">
                    <h1 className="text-3xl font-bold text-[#546B41] mb-6 text-center">
                        Login
                    </h1>

                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[#546B41]">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="enter your email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full mt-1 p-3 border border-[#DCCCAC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#99AD7A]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#546B41]">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="enter your password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full mt-1 p-3 border border-[#DCCCAC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#99AD7A]"
                            />
                        </div>

                        {error && (
                            <p className="text-red-600 text-sm text-center">{error}</p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-[#546B41] text-white py-3 rounded-lg font-semibold hover:bg-[#435733] transition"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="text-center text-sm mt-4 text-[#546B41]">
                        Don’t have an account?{" "}
                        <a href="/signup" className="underline font-medium">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}