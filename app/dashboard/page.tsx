"use client";

import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DashboardPage() {
    const router = useRouter();

    const [showModal, setShowModal] = useState(false);
    const [courseName, setCourseName] = useState("");

    // Placeholder course data (IDs updated to match slug format)
    const courses = [
        {
            id: "cps420",
            name: "CPS420",
            streak: 4,
            plant: { rarity: "Rare", stage: 2 },
            dailySet: false,
        },
        {
            id: "cps590",
            name: "CPS590",
            streak: 1,
            plant: { rarity: "Common", stage: 1 },
            dailySet: true,
        },
    ];

    const handleSubmit = () => {
        if (!courseName.trim()) return;

        // Create slug-like ID
        const newCourseId = courseName.toLowerCase().replace(/\s+/g, "-");

        setCourseName("");
        setShowModal(false);

        // Redirect to the new course page
        router.push(`/course/${newCourseId}`);
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-[#FFF8EC] px-6 py-10 pt-24">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-bold text-[#546B41]">
                        Your Courses
                    </h1>

                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-[#546B41] text-white px-4 py-2 rounded-lg shadow hover:bg-[#435733] transition"
                    >
                        + Add Course
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            onClick={() => router.push(`/course/${course.id}`)}
                            className="cursor-pointer bg-white border border-[#DCCCAC] rounded-xl p-6 shadow-md hover:shadow-lg transition"
                        >
                            <h2 className="text-2xl font-semibold text-[#546B41]">
                                {course.name}
                            </h2>

                            <div className="mt-4 space-y-2 text-[#546B41]">
                                <p>
                                    <span className="font-medium">Current streak:</span>{" "}
                                    {course.streak} days
                                </p>

                                <p>
                                    <span className="font-medium">Current plant:</span>{" "}
                                    {course.plant.rarity} (Stage {course.plant.stage})
                                </p>

                                <p>
                                    <span className="font-medium">Daily set:</span>{" "}
                                    {course.dailySet ? "Completed" : "Not completed"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal (no dark overlay) */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                    <div className="pointer-events-auto bg-white rounded-xl p-6 w-80 shadow-xl border border-[#DCCCAC]">
                        <h2 className="text-2xl font-semibold text-[#546B41] mb-4">
                            Add Course
                        </h2>

                        <input
                            type="text"
                            placeholder="Course name"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                            className="w-full px-3 py-2 border border-[#DCCCAC] rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#99AD7A]"
                        />

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => {
                                    setCourseName("");
                                    setShowModal(false);
                                }}
                                className="px-4 py-2 rounded-lg border border-[#DCCCAC] text-[#546B41] hover:bg-[#F3E9D7] transition"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 rounded-lg bg-[#546B41] text-white hover:bg-[#435733] transition"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
