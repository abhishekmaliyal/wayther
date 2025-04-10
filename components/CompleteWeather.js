"use client";

import CurrentData from "./CurrentData";
import ForecastData from "./ForecastData";

function CompleteWeather() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="current flex w-2/3 px-20 py-10 h-full">
        <CurrentData />
      </div>
      <div className="forecast flex w-1/3 p-8 h-full">
        <ForecastData />
      </div>
    </div>
  );
}

export default CompleteWeather;
