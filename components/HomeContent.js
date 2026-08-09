"use client";

import { useWeather } from "@/app/contexts/WeatherContext";
import Topbar from "./Topbar";
import CurrentDay from "./CurrentDay";
import CompleteWeather from "./CompleteWeather";
import { ModeToggle } from "./theme/darkmode";
import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

export default function HomeContent() {
  const { weatherData, fetchWeatherData } = useWeather();
  const { data, error, errorMessage, loading } = weatherData;

  const displaySubtitle = data?.state && data?.state.toLowerCase() !== data?.city.toLowerCase()
    ? data?.state
    : data?.country;

  return (
    <div className="min-h-screen w-full flex flex-col bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 transition-colors duration-300 relative overflow-x-hidden">
      <Topbar />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-black dark:text-white">
            {data?.city || "Loading..."}
            {displaySubtitle && (
              <span className="text-zinc-400 dark:text-zinc-500 font-normal text-xl sm:text-2xl lg:text-3xl ml-2">
                , {displaySubtitle}
              </span>
            )}
          </h1>
        </div>

        <div className="flex items-center gap-3 text-sm sm:text-base font-semibold text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-1.5 rounded-xl shadow-sm">
          <CurrentDay dt={data?.dt} timezone={data?.timezone} />
        </div>
      </div>

      <div className="flex-1 w-full pb-16">
        {loading ? (
          <div className="flex flex-col justify-center items-center h-96 gap-4">
            <div className="w-10 h-10 border-2 border-black dark:border-white border-t-transparent rounded-full animate-spin" />
            <p className="text-base font-semibold text-zinc-500 animate-pulse">
              Loading weather details...
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-96 gap-4 px-4 text-center">
            <FiAlertCircle className="w-14 h-14 text-black dark:text-white animate-bounce" />
            <h3 className="text-2xl font-bold">Location Not Found</h3>
            <p className="text-zinc-500 max-w-md">
              {errorMessage || "We couldn't find weather data for that city. Please try another city."}
            </p>
            <button
              type="button"
              onClick={() => fetchWeatherData("Dehradun")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold transition-all shadow-md cursor-pointer"
            >
              <FiRefreshCw className="w-4 h-4" />
              <span>Reset to Default City</span>
            </button>
          </div>
        ) : (
          <CompleteWeather />
        )}
      </div>

      <ModeToggle />
    </div>
  );
}
