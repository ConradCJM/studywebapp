"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";


export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmError, setConfirmError] = useState("");

    const [signupError, setSignupError] = useState("");
    const [signupSuccess, setSignupSuccess] = useState("");


    //email validation 
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address.");
        } else {
            setEmailError("");
        }
    };

    //password validation
    const validatePassword = (password: string) => {
        const strong =
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[^A-Za-z0-9]/.test(password);
        if (!strong) {
            setPasswordError("Password must be 8+ chars, include upper/lowercase, a number, and a symbol");
        }
        else {
            setPasswordError("");
        }
    };

    //confirm password validation
    const validateConfirmPassword = (confirmPassword: string) => {
        if (confirmPassword !== password) {
            setConfirmError("Passwords do not match.");
        } else {
            setConfirmError("");
        }
    };

    const formIsValid = email && password && confirmPassword && !emailError && !passwordError && !confirmError;

    //signup handler
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSignupError("");
        setSignupSuccess("");

        if (!formIsValid) {
            setSignupError("Please fix the errors above before submitting.");
            return;
        }

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setSignupError(error.message);
            return;
        }

        setSignupSuccess(
            "Account created! Check your email to authenticate your account. If you don't see an email, check your spam folder or maybe you already have an account."
        );
    };
    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-white text-gray-900 pt-24 px-6">
                <section className="max-w-md mx-auto text-center">
                    <h1 className="text-4xl font-bold">Create an Account</h1>
                    <p className="mt-3 text-gray-600">
                        Sign up to start uploading notes and generating daily study sets.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                        {/* Email */}
                        <div className="text-left">
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    validateEmail(e.target.value);
                                }}
                                required
                            />
                            {emailError && (
                                <p className="text-red-600 text-sm mt-1">{emailError}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="text-left">
                            <label className="block text-sm font-medium mb-1">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                                placeholder="enter a strong password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    validatePassword(e.target.value);
                                }}
                                required
                            />
                            {passwordError && (
                                <p className="text-red-600 text-sm mt-1">{passwordError}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="text-left">
                            <label className="block text-sm font-medium mb-1">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                                placeholder="re-enter your password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    validateConfirmPassword(e.target.value);
                                }}
                                required
                            />
                            {confirmError && (
                                <p className="text-red-600 text-sm mt-1">{confirmError}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={!formIsValid}
                            className={`w-full py-3 rounded-lg font-medium transition ${formIsValid
                                    ? "bg-black text-white hover:bg-gray-800"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                        >
                            Sign Up
                        </button>

                        {/* Supabase errors */}
                        {signupError && (
                            <p className="text-red-600 text-sm mt-2">{signupError}</p>
                        )}

                        {/* Success */}
                        {signupSuccess && (
                            <p className="text-green-600 text-sm mt-2">{signupSuccess}</p>
                        )}
                    </form>

                    <p className="mt-6 text-gray-600">
                        Already have an account?{" "}
                        <a href="/login" className="text-black font-medium underline">
                            Log in
                        </a>
                    </p>
                </section>
            </main>
        </>
    );
}
