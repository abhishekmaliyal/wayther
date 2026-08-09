"use client";

import { useWeather } from "@/app/contexts/WeatherContext";
import WeatherIcons from "./WeatherIcons";
import { FiClock, FiDroplet } from "react-icons/fi";

export default function HourlyForecast() {
  const { hourlyData, convertTemperature } = useWeather();

  if (!hourlyData || hourlyData.length === 0) {
    return null;
  }

  return (
    <div className="w-full mt-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <FiClock className="w-4 h-4 text-zinc-500" />
        <h3 className="text-base font-bold text-black dark:text-white tracking-wide">
          24-Hour Hourly Forecast
        </h3>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 pt-1">
        {hourlyData.map((item, idx) => (
          <div
            key={item.time || idx}
            className="flex-shrink-0 flex flex-col items-center justify-between min-w-[5.2rem] py-3 px-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xs hover:border-black dark:hover:border-white transition-all duration-150"
          >
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              {idx === 0 ? "Now" : item.hourLabel}
            </span>

            <div className="my-2 relative w-10 h-10 flex items-center justify-center">
              <WeatherIcons
                icon={item.icon}
                description={item.description}
                width={40}
                height={40}
                className="object-contain"
              />
            </div>

            <div className="flex flex-col items-center gap-0.5">
              <span className="text-sm font-bold text-black dark:text-white">
                {convertTemperature(item.temp)}°
              </span>
              {item.humidity !== undefined && (
                <div className="flex items-center gap-0.5 text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">
                  <FiDroplet className="w-2.5 h-2.5" />
                  <span>{item.humidity}%</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
