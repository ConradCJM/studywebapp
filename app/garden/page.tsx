"use client";
import Navbar from "@/components/Navbar";

export default function GardenPage() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-[#FFF8EC]">
                <h1 className="text-4xl font-bold text-[#546B41]">
                    Welcome to your Garden!
                </h1>
            </div>
        </>
    );
}