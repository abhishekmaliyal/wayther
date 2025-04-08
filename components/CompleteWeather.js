"use client";

import { useWeather } from "@/app/contexts/WeatherContext";
import CurrentData from "./CurrentData";
import ForecastData from "./ForecastData";

function CompleteWeather() {
  const { weatherData } = useWeather();

  const { data, error } = weatherData;

  if (error) {
    return <span className="error-message">Sorry city not found, please try again.</span>;
  }

  if (!data) return null;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="city-name">
        <h2>
          {data.city}, <span>{data.country}</span>
        </h2>
      </div>
      <CurrentData />
      <ForecastData />
    </div>
  );
}

export default CompleteWeather;
