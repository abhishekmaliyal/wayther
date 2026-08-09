"use client";

import { ModeToggle } from "@/components/theme/darkmode";
import Topbar from "@/components/Topbar";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <Topbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12 flex flex-col justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-8 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Back to Weather</span>
        </Link>

        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 sm:p-12 shadow-sm flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white text-xs font-bold uppercase tracking-wider w-fit">
              <span>About Wayther</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tighter leading-tight text-black dark:text-white">
              A modern, intuitive weather app built for clear{" "}
              <span className="underline underline-offset-8">at-a-glance</span> reports.
            </h1>

            <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Wayther delivers live weather conditions, 24-hour hourly forecasts, 5-day daily forecasts, and real-time city autocomplete search powered by OpenWeather and Open-Meteo services.
            </p>

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500 mb-3 uppercase tracking-wider">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {["Next.js 15", "Tailwind CSS", "OpenWeather API", "Open-Meteo", "Context API", "Framer Motion"].map(
                  (tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-900 dark:text-zinc-100"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Links to LinkedIn, GitHub, and Portfolio commented out */}
          {/*
          <div className="flex flex-col gap-4 w-full md:w-64">
            <Link
              href="https://www.linkedin.com/in/abhishek-maliyal-a3113b217/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 transition-all shadow-xs group text-black dark:text-white"
            >
              <GrLinkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-sm">LinkedIn</span>
            </Link>

            <Link
              href="https://github.com/abhishekmaliyal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 transition-all shadow-xs group text-black dark:text-white"
            >
              <GrGithub className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-sm">GitHub</span>
            </Link>

            <Link
              href="https://abhishekmaliyal.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 transition-all shadow-xs group text-black dark:text-white"
            >
              <BsGlobe2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-sm">Portfolio</span>
            </Link>
          </div>
          */}
        </div>
      </main>

      <ModeToggle />
    </div>
  );
}
