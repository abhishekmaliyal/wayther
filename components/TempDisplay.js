"use client";

import React from "react";
import WeatherIcons from "./WeatherIcons";
import { useWeather } from "@/app/contexts/WeatherContext";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";

export default function TempDisplay() {
  const { weatherData, convertTemperature } = useWeather();
  const data = weatherData?.data;

  if (!data) return null;

  const currentTemp = convertTemperature(data.temperature?.current);
  const minTemp = convertTemperature(data.temperature?.min);
  const maxTemp = convertTemperature(data.temperature?.max);
  const feelsLike = convertTemperature(data.temperature?.feels_like);

  return (
    <div className="relative flex flex-col items-center w-full py-4">
      <div className="relative flex items-center justify-center w-52 h-52 sm:w-64 sm:h-64 my-2">
        {data.condition?.icon && (
          <WeatherIcons
            icon={data.condition.icon}
            description={data.condition.description}
            width={280}
            height={280}
            className="object-contain drop-shadow-md z-10 hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      <div className="z-10 flex flex-col items-center mt-2">
        <div className="flex items-start">
          <span className="text-8xl sm:text-9xl lg:text-[11rem] font-black tracking-tighter text-black dark:text-white leading-none">
            {currentTemp}
          </span>
          <span className="text-4xl sm:text-6xl font-bold text-zinc-400 dark:text-zinc-600 mt-2">°</span>
        </div>

        <div className="mt-4 px-5 py-2 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm">
          <p className="text-base sm:text-lg font-bold text-black dark:text-white capitalize tracking-wide">
            &quot;{data.condition?.description || "Clear Sky"}&quot;
          </p>
        </div>

        <div className="flex items-center gap-4 mt-5 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          <div className="flex items-center gap-1">
            <FiArrowDown className="w-4 h-4 text-zinc-400" />
            <span>H: {maxTemp}°</span>
          </div>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <div className="flex items-center gap-1">
            <FiArrowUp className="w-4 h-4 text-zinc-400" />
            <span>L: {minTemp}°</span>
          </div>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <div>
            <span>Feels like {feelsLike}°</span>
          </div>
        </div>
      </div>
    </div>
  );
}
