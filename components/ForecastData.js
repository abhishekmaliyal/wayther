"use client";

import { useWeather } from "@/app/contexts/WeatherContext";
import React from "react";
import WeatherIcons from "./WeatherIcons";
import { FiCalendar } from "react-icons/fi";

export default function ForecastData() {
  const { forecastData, convertTemperature, formatDay } = useWeather();

  if (!forecastData || forecastData.length === 0) {
    return null;
  }

  const allMins = forecastData.map((d) => d.temperature.minimum);
  const allMaxs = forecastData.map((d) => d.temperature.maximum);
  const globalMin = Math.min(...allMins, 0);
  const globalMax = Math.max(...allMaxs, 35);
  const range = Math.max(1, globalMax - globalMin);

  return (
    <div className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 lg:p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5 pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <FiCalendar className="w-4 h-4 text-zinc-500" />
        <h3 className="text-lg font-bold text-black dark:text-white tracking-wide">5-Day Forecast</h3>
      </div>

      <div className="flex flex-col gap-3">
        {forecastData.map((day) => {
          const minTemp = day.temperature.minimum;
          const maxTemp = day.temperature.maximum;
          const leftPercent = Math.max(0, Math.min(80, ((minTemp - globalMin) / range) * 100));
          const widthPercent = Math.max(15, Math.min(100 - leftPercent, ((maxTemp - minTemp) / range) * 100));

          return (
            <div
              key={day.time}
              className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-white transition-all duration-150"
            >
              <div className="w-28 flex-shrink-0">
                <p className="font-bold text-sm text-black dark:text-white">{formatDay(day.time)}</p>
                <p className="text-[11px] text-zinc-500 capitalize truncate">
                  {day.condition.description}
                </p>
              </div>

              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                <WeatherIcons
                  icon={day.condition.icon}
                  description={day.condition.description}
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>

              <div className="flex items-center gap-3 w-36 sm:w-44 justify-end">
                <span className="text-xs font-semibold text-zinc-400 w-7 text-right">
                  {convertTemperature(minTemp)}°
                </span>

                <div className="relative flex-1 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-black dark:bg-white rounded-full"
                    style={{
                      left: `${leftPercent}%`,
                      width: `${widthPercent}%`,
                    }}
                  />
                </div>

                <span className="text-xs font-bold text-black dark:text-white w-7 text-left">
                  {convertTemperature(maxTemp)}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
