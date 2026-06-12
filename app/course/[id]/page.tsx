"use client";

import { useParams, useRouter } from "next/navigation";

export default function CoursePage() {
    const params = useParams();
    const id = (params?.id as string) ?? "unknown-course";

    const router = useRouter();

    // Placeholder data for now
    const course = {
        name: id.toString().replace(/-/g, " ").toUpperCase(),
        streak: 4,
        plant: {
            rarity: "Rare",
            stage: 2,
            maxStage: 5,
        },
        dailySetCompleted: false,
    };

    const growthPercent = (course.plant.stage / course.plant.maxStage) * 100;

    return (
        <div className="min-h-screen bg-[#FFF8EC] px-6 py-10 pt-24">
            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="mb-6 text-[#546B41] hover:underline"
            >
                ← Back
            </button>

            {/* Course Title */}
            <h1 className="text-4xl font-bold text-[#546B41] mb-6">
                {course.name}
            </h1>

            {/* Streak */}
            <div className="mb-6">
                <p className="text-xl text-[#546B41]">
                    Current streak:{" "}
                    <span className="font-semibold">{course.streak} days</span>
                </p>
            </div>

            {/* Plant Section */}
            <div className="bg-white border border-[#DCCCAC] rounded-xl p-6 shadow-md mb-8">
                <h2 className="text-2xl font-semibold text-[#546B41] mb-4">
                    Your Plant
                </h2>

                <p className="text-[#546B41] mb-2">
                    Rarity: <span className="font-semibold">{course.plant.rarity}</span>
                </p>

                <p className="text-[#546B41] mb-4">
                    Growth Stage:{" "}
                    <span className="font-semibold">
                        {course.plant.stage} / {course.plant.maxStage}
                    </span>
                </p>

                {/* Growth Bar */}
                <div className="w-full bg-[#DCCCAC] h-4 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#546B41]"
                        style={{ width: `${growthPercent}%` }}
                    />
                </div>
            </div>

            {/* Daily Set Button */}
            <button
                className={`px-6 py-3 rounded-lg text-white text-lg shadow transition ${course.dailySetCompleted
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#546B41] hover:bg-[#435733]"
                    }`}
            >
                {course.dailySetCompleted ? "Daily Set Completed" : "Start Daily Set"}
            </button>
        </div>
    );
}
