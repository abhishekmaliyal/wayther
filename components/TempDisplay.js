import React from "react";
import WeatherIcons from "./WeatherIcons";
import { useWeather } from "@/app/contexts/WeatherContext";

export default function TempDisplay() {
    const { weatherData, isCelsius, toggleTemperatureUnit, convertTemperature } = useWeather();
    const { data } = weatherData;
  return (
    <>
      <div className="tempanddesc relative flex flex-col w-[70%] items-center h-full">
        <div className="temp flex flex-col w-full h-[70%] items-center justify-center">
          <div className="values flex lg:text-[15rem] text-[10rem] z-10 absolute items-start">
            {convertTemperature(data.temperature.current)+"°"}
            {/* <div className="temp-deg text-2xl" onClick={toggleTemperatureUnit}>
              {isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
            </div> */}
          </div>
          <div className="image w-full h-full relative flex items-center justify-center ">
            {data.condition.icon && (
              <WeatherIcons icon={data.condition.icon} description={data.condition.description} width={800} height={800} className=""/>
            )}
          </div>
        </div>
        <p className="weather-des w-full h-[30%] flex justify-center text-3xl heading underline underline-offset-8 capitalize ">&quot;{data.condition.description}&quot;</p>
      </div>
    </>
  );
}
