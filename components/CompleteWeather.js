"use client";

import CurrentData from "./CurrentData";
import ForecastData from "./ForecastData";

export default function CompleteWeather() {
  return (
    <div className="flex flex-col lg:flex-row w-full gap-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="w-full lg:w-2/3 flex flex-col">
        <CurrentData />
      </div>
      <div className="w-full lg:w-1/3 flex flex-col">
        <ForecastData />
      </div>
    </div>
  );
}
