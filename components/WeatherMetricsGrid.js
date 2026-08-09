"use client";

import { useWeather } from "@/app/contexts/WeatherContext";
import {
  FiWind,
  FiDroplet,
  FiEye,
  FiCompass,
  FiSunrise,
  FiSunset,
  FiThermometer,
} from "react-icons/fi";

function getWindDirection(deg) {
  if (deg === undefined || deg === null) return "N";
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return directions[Math.round(deg / 45) % 8];
}

function formatTime(timestamp, timezoneOffset = 0) {
  if (!timestamp) return "--:--";
  const date = new Date((timestamp + timezoneOffset) * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });
}

export default function WeatherMetricsGrid() {
  const { weatherData, convertTemperature } = useWeather();
  const data = weatherData?.data;

  if (!data) return null;

  const windSpeed = data.wind?.speed ?? 0;
  const windDeg = data.wind?.deg ?? 0;
  const humidity = data.temperature?.humidity ?? 0;
  const feelsLike = data.temperature?.feels_like;
  const pressure = data.temperature?.pressure ?? 1013;
  const visibility = data.visibility ?? 10;

  const timezone = data.timezone || 0;
  const sunriseTime = formatTime(data.sys?.sunrise, timezone);
  const sunsetTime = formatTime(data.sys?.sunset, timezone);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 mt-6">
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex flex-col justify-between shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-wider">
            <FiWind className="w-4 h-4 text-zinc-400" />
            <span>Wind</span>
          </div>
          <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md border border-zinc-200 dark:border-zinc-700">
            {getWindDirection(windDeg)}
          </span>
        </div>
        <div className="my-3 flex items-baseline gap-1">
          <span className="text-3xl font-black text-black dark:text-white">{windSpeed}</span>
          <span className="text-sm font-semibold text-zinc-500">m/s</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
          <FiCompass
            className="w-3.5 h-3.5 text-zinc-400 transition-transform duration-300"
            style={{ transform: `rotate(${windDeg}deg)` }}
          />
          <span>Heading {windDeg}°</span>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex flex-col justify-between shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-wider">
            <FiDroplet className="w-4 h-4 text-zinc-400" />
            <span>Humidity</span>
          </div>
        </div>
        <div className="my-3 flex items-baseline gap-1">
          <span className="text-3xl font-black text-black dark:text-white">{humidity}</span>
          <span className="text-sm font-semibold text-zinc-500">%</span>
        </div>
        <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-700">
          <div
            className="bg-black dark:bg-white h-full rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, Math.max(0, humidity))}%` }}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex flex-col justify-between shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-wider">
            <FiThermometer className="w-4 h-4 text-zinc-400" />
            <span>Feels Like</span>
          </div>
        </div>
        <div className="my-3 flex items-baseline">
          <span className="text-3xl font-black text-black dark:text-white">
            {convertTemperature(feelsLike)}°
          </span>
        </div>
        <p className="text-xs text-zinc-500 truncate">
          {feelsLike > data.temperature?.current
            ? "Warmer than actual"
            : feelsLike < data.temperature?.current
            ? "Cooler than actual"
            : "Similar to actual"}
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex flex-col justify-between shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-wider">
            <FiEye className="w-4 h-4 text-zinc-400" />
            <span>Visibility</span>
          </div>
        </div>
        <div className="my-3 flex items-baseline gap-1">
          <span className="text-3xl font-black text-black dark:text-white">{visibility}</span>
          <span className="text-sm font-semibold text-zinc-500">km</span>
        </div>
        <p className="text-xs text-zinc-500 truncate">
          {visibility >= 10 ? "Clear vision" : "Reduced vision"}
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex flex-col justify-between shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-wider">
            <FiCompass className="w-4 h-4 text-zinc-400" />
            <span>Pressure</span>
          </div>
        </div>
        <div className="my-3 flex items-baseline gap-1">
          <span className="text-3xl font-black text-black dark:text-white">{pressure}</span>
          <span className="text-sm font-semibold text-zinc-500">hPa</span>
        </div>
        <p className="text-xs text-zinc-500 truncate">
          {pressure >= 1013 ? "Standard high" : "Low pressure"}
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex flex-col justify-between shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-wider">
            <FiSunrise className="w-4 h-4 text-zinc-400" />
            <span>Sun Cycle</span>
          </div>
        </div>
        <div className="my-2 flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <FiSunrise className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
            <div className="flex items-baseline justify-between w-full">
              <span className="text-xs text-zinc-500">Sunrise</span>
              <span className="text-xs font-bold text-black dark:text-white">{sunriseTime}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FiSunset className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
            <div className="flex items-baseline justify-between w-full">
              <span className="text-xs text-zinc-500">Sunset</span>
              <span className="text-xs font-bold text-black dark:text-white">{sunsetTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
