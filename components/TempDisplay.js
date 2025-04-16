import React from "react";
import WeatherIcons from "./WeatherIcons";
import { useWeather } from "@/app/contexts/WeatherContext";

export default function TempDisplay() {
  const { weatherData, isCelsius, toggleTemperatureUnit, convertTemperature } = useWeather();
  const { data } = weatherData;

  return (
    <div className="relative flex flex-col items-center w-full">
      <div className="relative flex items-center justify-center w-full aspect-square max-h-64 lg:my-20 my-20">
        <div className="absolute inset-0 flex items-center justify-center opacity-70 ">
          {data.condition.icon && (
            <WeatherIcons
              icon={data.condition.icon}
              description={data.condition.description}
              width={600}
              height={600}
            />
          )}
        </div>

        <div className="z-10 flex items-start">
          <span className="text-9xl sm:text-9xl md:text-[14rem] font-bold">
            {convertTemperature(data.temperature.current)}°
          </span>
          <button className="text-base cursor-pointer mt-1" onClick={toggleTemperatureUnit}>
            {isCelsius ? "C" : "F"}
          </button>
        </div>
      </div>

      <p className="text-xl lg:text-3xl md:2xl font-medium text-center capitalize underline underline-offset-4 lg:mt-20 mb-10">
        &quot;{data.condition.description}&quot;
      </p>
    </div>
  );
}
