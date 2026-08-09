"use client";

import Link from "next/link";
import React from "react";
import { useWeather } from "@/app/contexts/WeatherContext";
import CityAutocomplete from "./CityAutocomplete";
import SearchEngine from "./SearchEngine";
import { FiMapPin, FiInfo } from "react-icons/fi";

export default function Topbar() {
  const {
    isCelsius,
    toggleTemperatureUnit,
    fetchUserLocationWeather,
  } = useWeather();

  return (
    <header className="relative z-40 w-full bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 px-4 lg:px-8 py-3.5 flex items-center justify-between transition-colors">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-tighter title text-zinc-900 dark:text-zinc-100 hover:opacity-80 transition-opacity"
        >
          wayther.
        </Link>
      </div>

      <div className="hidden md:block w-72 lg:w-96 relative z-[50]">
        <CityAutocomplete placeholder="Search city..." />
      </div>

      <div className="flex items-center gap-2">
        <div className="md:hidden">
          <SearchEngine />
        </div>

        <button
          type="button"
          onClick={fetchUserLocationWeather}
          className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 transition-all duration-150 cursor-pointer"
          title="Use current location"
        >
          <FiMapPin className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={toggleTemperatureUnit}
          className="flex items-center p-0.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl cursor-pointer font-bold text-xs"
          title="Toggle temperature unit"
        >
          <span
            className={`px-2.5 py-1.5 rounded-lg transition-all duration-150 ${
              isCelsius
                ? "bg-black text-white dark:bg-white dark:text-black shadow-sm"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            °C
          </span>
          <span
            className={`px-2.5 py-1.5 rounded-lg transition-all duration-150 ${
              !isCelsius
                ? "bg-black text-white dark:bg-white dark:text-black shadow-sm"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            °F
          </span>
        </button>

        <Link
          href="/pages/About"
          className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 transition-all duration-150"
          title="About Wayther"
        >
          <FiInfo className="w-4 h-4" />
        </Link>
      </div>
    </header>
  );
}
