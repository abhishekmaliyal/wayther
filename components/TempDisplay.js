import React from "react";
import WeatherIcons from "./WeatherIcons";
import { useWeather } from "@/app/contexts/WeatherContext";

export default function TempDisplay() {
    const { weatherData, isCelsius, toggleTemperatureUnit, convertTemperature } = useWeather();
    const { data } = weatherData;
  return (
    <>
      <div className="tempanddesc flex flex-col w-[70%] items-center">
        <div className="temp flex flex-col w-full h-full items-center justify-center">
          <div className="values flex text-[20rem] z-10 absolute items-start">
            {convertTemperature(data.temperature.current)}
            <div className="temp-deg text-2xl" onClick={toggleTemperatureUnit}>
              {isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
            </div>
          </div>
          <div className="image w-full h-full">
            {data.condition.icon && (
              <WeatherIcons icon={data.condition.icon} description={data.condition.description} />
            )}
          </div>
        </div>
        <p className="weather-des">{data.condition.description}</p>
      </div>
    </>
  );
}
