import { useWeather } from "@/app/contexts/WeatherContext";
import Image from "next/image";
import React from "react";

export default function ForecastData() {
  const { forecastData, convertTemperature, formatDay } = useWeather();

  return (
    <>
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
                  priority
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
    </>
  );
}
