"use client";

import CurrentData from "./CurrentData";
import ForecastData from "./ForecastData";

function CompleteWeather() {
  return (
    <div className="flex flex-col lg:flex-row w-full">
      <div className="w-full lg:w-2/3 px-4 sm:px-8 lg:px-16 py-6 lg:py-10 mb-10">
        <CurrentData />
      </div>
      <div className="w-full lg:w-1/3 px-4 sm:px-8 lg:px-16 py-6 lg:py-10">
        <ForecastData />
      </div>
    </div>
  );
}

export default CompleteWeather;
