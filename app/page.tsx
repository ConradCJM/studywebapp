import Navbar from "@/components/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FFF8EC] text-[#546B41] pt-24">
        {/* Hero Section */}
        <section className="px-6 py-24 md:py-32 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#546B41]">
            Grow study habits that actually stick.
          </h1>

          <p className="mt-6 text-lg md:text-xl text-[#99AD7A]">
            Your notes become quizzes. Your progress becomes a garden. Your consistency becomes growth.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <a
              href="/signup"
              className="px-6 py-3 rounded-lg bg-[#546B41] text-[#FFF8EC] font-medium hover:bg-[#99AD7A] transition"
            >
              Get Started
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-20 bg-[#DCCCAC]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12 text-center">
            <div>
              <h3 className="text-xl font-semibold text-[#546B41]">
                AI‑Generated Quizzes From Your Notes
              </h3>
              <p className="mt-3 text-[#546B41]/70">
                Upload your notes and instantly get personalized quizzes designed to reinforce what matters most.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#546B41]">
                Daily Study Sets That Keep You Consistent
              </h3>
              <p className="mt-3 text-[#546B41]/70">
                Your study routine is broken into small, manageable daily sets - making it easier to stay on track without burning out.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#546B41]">
                Grow a Plant for Every Course
              </h3>
              <p className="mt-3 text-[#546B41]/70">
                Each course has its own plant that evolves through growth stages. Rare plants take longer to grow, giving you long‑term goals to work toward.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#546B41]">
                Collect Rare Plants & Build Your Garden
              </h3>
              <p className="mt-3 text-[#546B41]/70">
                Fully grown plants are added to your collection. Study consistently to unlock uncommon, rare, and legendary plant species.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#546B41]">
                Organized Notes & Study History
              </h3>
              <p className="mt-3 text-[#546B41]/70">
                All your uploads, quizzes, and plant progress are neatly stored so you can revisit material anytime.
              </p>
            </div>

          </div>
        </section>

        
      </main>
    </>
  );
}
