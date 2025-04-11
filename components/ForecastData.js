import { useWeather } from "@/app/contexts/WeatherContext";
import React from "react";
import WeatherIcons from "./WeatherIcons";

export default function ForecastData() {
  const { forecastData, convertTemperature, formatDay } = useWeather();

  return (
    <>
      <div className="forecast w-full">
        <h3 className="text-3xl">5-Day Forecast:</h3>
        <div className="forecast-container flex flex-col items-center justify-center w-full">
          {forecastData.map((day) => (
            <div className="day w-full" key={day.time}>
              <p className="day-name text-xl">{formatDay(day.time)}</p>
              <div className="perday flex pb-2">
                <div className="dayicon">
                  {day.condition.icon_url && (
                    <WeatherIcons
                      icon={day.condition.icon}
                      description={day.condition.description}
                      width={130}
                      height={130}
                    />
                  )}
                </div>
                <div className="minmax w-full">
                  <p className="day-temperature text-xl">
                    minimum : {convertTemperature(day.temperature.minimum)}°
                  </p>
                  <p className="day-temperature text-xl">
                    {" "}
                    maximum : {convertTemperature(day.temperature.maximum)}°
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
