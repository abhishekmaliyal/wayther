"use client";

import React from "react";
import ReactAnimatedWeather from "react-animated-weather";
import { useWeather } from "@/app/contexts/WeatherContext";
import Image from "next/image";

function Forecast() {
  const { weather, forecastData, isCelsius, toggleTemperatureUnit, convertTemperature, formatDay } =
    useWeather();

  const { data, error } = weather;

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
          <ReactAnimatedWeather icon="RAIN" size="80"/>
          <div>
            <p className="humidity">{data.temperature.humidity}%</p>
            <p>Humidity</p>
          </div>
        </div>
      </div>

      <div className="forecast">
        <h3>5-Day Forecast:</h3>
        <div className="forecast-container flex">
          {forecastData.map((day) => (
            <div className="day" key={day.time}>
              <p className="day-name">{formatDay(day.time)}</p>
              {day.condition.icon_url && (
                <Image
                width={150}
            height={150}
                  className="day-icon"
                  src={day.condition.icon_url}
                  alt={day.condition.description}
                />
              )}
              <p className="day-temperature">
                {convertTemperature(day.temperature.minimum)}°/
                <span>{convertTemperature(day.temperature.maximum)}°</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Forecast;
