"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";


export default function SignupPage() {

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
    const [checkingUsername, setCheckingUsername] = useState(false);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmError, setConfirmError] = useState("");

    const [signupError, setSignupError] = useState("");
    const [signupSuccess, setSignupSuccess] = useState("");

    // email validation
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(emailRegex.test(email) ? "" : "Please enter a valid email address.");
    };

    // password validation
    const validatePassword = (password: string) => {
        const strong =
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[^A-Za-z0-9]/.test(password);

        setPasswordError(
            strong
                ? ""
                : "Password must be 8+ chars, include upper/lowercase, a number, and a symbol"
        );
    };

    // confirm password validation
    const validateConfirmPassword = (confirmPassword: string) => {
        setConfirmError(
            confirmPassword === password ? "" : "Passwords do not match."
        );
    };

    // username validation
    const validateUsername = (username: string) => {
        if (username.length < 3) {
            setUsernameError("Username must be at least 3 characters.");
        } else if (!/^[a-z0-9_]+$/.test(username)) {
            setUsernameError("Only lowercase letters, numbers, and underscores allowed.");
        } else {
            setUsernameError("");
        }
    };

    // LIVE USERNAME CHECK (debounced)
    useEffect(() => {
        if (!username || usernameError) {
            setUsernameAvailable(null);
            return;
        }

        const delay = setTimeout(async () => {
            setCheckingUsername(true);

            const { data, error } = await supabase
                .from("profiles")
                .select("username")
                .eq("username", username)
                .maybeSingle();

            console.log("Live username check:", { data, error });

            if (error) {
                setUsernameAvailable(null);
                setCheckingUsername(false);
                return;
            }

            setUsernameAvailable(!data);
            setCheckingUsername(false);
        }, 300);

        return () => clearTimeout(delay);
    }, [username, usernameError]);

    const formIsValid =
        email &&
        username &&
        password &&
        confirmPassword &&
        !emailError &&
        !usernameError &&
        !passwordError &&
        !confirmError &&
        usernameAvailable !== false;

    //signup handler
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSignupError("");
        setSignupSuccess("");

        if (!formIsValid) {
            setSignupError("Please fix the errors above before submitting.");
            return;
        }

        //final username check
        const { data: existingUser, error: existingUserError } = await supabase
            .from("profiles")
            .select("username")
            .eq("username", username)
            .maybeSingle();

        console.log("Final username check:", { existingUser, existingUserError });

        if (existingUserError) {
            setSignupError("Error checking username. See console.");
            return;
        }

        if (existingUser) {
            setUsernameError("This username is already taken.");
            return;
        }

        //create auth user
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        });

        console.log("Auth signup result:", { authData, authError });

        if (authError) {
            setSignupError(authError.message);
            return;
        }

        const userId = authData.user?.id;
        if (!userId) {
            setSignupError("Unexpected error: no user ID returned.");
            return;
        }

        //insert username into profiles table
        const { error: profileError } = await supabase
            .from("profiles")
            .insert([{ id: userId, username }]);

        console.log("Profile insert result:", { profileError });

        if (profileError) {
            await supabase.auth.admin.deleteUser(userId);
            setSignupError("Username already taken or invalid.");
            return;
        }

        setSignupSuccess(
            "Account created! Check your email to verify your account."
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

                        {/* Username */}
                        <div className="text-left">
                            <label className="block text-sm font-medium mb-1">Username</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                                placeholder="your username"
                                value={username}
                                onChange={(e) => {
                                    const value = e.target.value.toLowerCase();
                                    setUsername(value);
                                    validateUsername(value);
                                }}
                                required
                            />

                            {/* Validation errors */}
                            {usernameError && (
                                <p className="text-red-600 text-sm mt-1">{usernameError}</p>
                            )}

                            {/* Live availability */}
                            {!usernameError && username && (
                                <p className="text-sm mt-1">
                                    {checkingUsername && (
                                        <span className="text-gray-500">Checking availability…</span>
                                    )}

                                    {!checkingUsername && usernameAvailable === true && (
                                        <span className="text-green-600">Username is available</span>
                                    )}

                                    {!checkingUsername && usernameAvailable === false && (
                                        <span className="text-red-600">Username is already taken</span>
                                    )}
                                </p>
                            )}
                        </div>

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
                            <label className="block text-sm font-medium mb-1">Confirm Password</label>
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
                            className={`w-full py-3 rounded-lg font-medium transition ${
                                formIsValid
                                    ? "bg-black text-white hover:bg-gray-800"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                        >
                            Sign Up
                        </button>

                        {/* Errors */}
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
