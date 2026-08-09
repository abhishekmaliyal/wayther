"use client";

import TempDisplay from "./TempDisplay";
import HourlyForecast from "./HourlyForecast";
import WeatherMetricsGrid from "./WeatherMetricsGrid";

export default function CurrentData() {
  return (
    <div className="flex flex-col w-full gap-2">
      <TempDisplay />
      <HourlyForecast />
      <WeatherMetricsGrid />
    </div>
  );
}
