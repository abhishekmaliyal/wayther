import { useWeather } from "@/app/contexts/WeatherContext";
import Image from "next/image";
import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

export default function CurrentData() {
  const {
    weatherData,
    isCelsius,
    toggleTemperatureUnit,
    convertTemperature,
  } = useWeather();

  const { data } = weatherData;
  return (
    <>
      <div>
        <div className="temp">
          {data.condition.icon_url && (
            <Image
              width={150}
              height={150}
              src={data.condition.icon_url}
              alt={data.condition.description}
              className="temp-icon"
            />
          )}
          {convertTemperature(data.temperature.current)}
          <sup className="temp-deg" onClick={toggleTemperatureUnit}>
            {isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
          </sup>
        </div>
        <p className="weather-des">{data.condition.description}</p>

        <div className="weather-info flex w-60 h-40">
          <div className="col w-30 h-40">
            <ReactAnimatedWeather icon="WIND" size="80" />
            <div>
              <p className="wind">{data.wind.speed} m/s</p>
              <p>Wind Speed</p>
            </div>
          </div>
          <div className="col w-30 h-40">
            <ReactAnimatedWeather icon="RAIN" size="80" />
            <div>
              <p className="humidity">{data.temperature.humidity}%</p>
              <p>Humidity</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
