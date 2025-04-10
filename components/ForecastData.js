import { useWeather } from "@/app/contexts/WeatherContext";
import React from "react";
import WeatherIcons from "./WeatherIcons";

export default function ForecastData() {
  const { forecastData, convertTemperature, formatDay } = useWeather();

  return (
    <>
      <div className="forecast w-full">
        <h3>5-Day Forecast:</h3>
        <div className="forecast-container flex flex-col items-center justify-center w-full">
          {forecastData.map((day) => (
            <div className="day" key={day.time}>
              <p className="day-name">{formatDay(day.time)}</p>
              <div className="perday flex pb-4">
                {day.condition.icon_url && (
                  <WeatherIcons
                    icon={day.condition.icon}
                    description={day.condition.description}
                    className="w-[100px] h-[100px]"
                  />
                )}
                <p className="day-temperature">
                  {convertTemperature(day.temperature.minimum)}°/
                  <span>{convertTemperature(day.temperature.maximum)}°</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
