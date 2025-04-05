"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";

function Forecast({ weather }) {
  const { data } = weather;
  const [forecastData, setForecastData] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const fetchForecastData = async () => {
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${data.city}&appid=${apiKey}&units=metric`;

      try {
        const response = await axios.get(forecastUrl);
        const dailyForecast = response.data.list
          .filter((reading) => reading.dt_txt.includes("12:00:00"))
          .slice(0, 5);
        console.log(dailyForecast);
        setForecastData(
          dailyForecast.map((day) => ({
            time: day.dt,
            condition: {
              icon_url: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
              description: day.weather[0].description,
            },
            temperature: {
              minimum: day.main.temp_min,
              maximum: day.main.temp_max,
            },
          }))
        );
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }
    };

    if (data?.city) {
      fetchForecastData();
    }
  }, [data?.city]);

  const formatDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius((prev) => !prev);
  };

  const convertTemperature = (temperature) => {
    return isCelsius ? Math.round(temperature) : Math.round((temperature * 9) / 5 + 32);
  };

  if (!data) return null;

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="city-name">
          <h2>
            {data.city}, <span>{data.country}</span>
          </h2>
        </div>
        <div className="temp">
          {data.condition.icon_url && (
            <img
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

        <div className="weather-info flex">
          <div className="col">
            <ReactAnimatedWeather icon="WIND" size="40" />
            <div>
              <p className="wind">{data.wind.speed} m/s</p>
              <p>Wind Speed</p>
            </div>
          </div>
          <div className="col">
            <ReactAnimatedWeather icon="RAIN" size="40" />
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
                  <img
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
    </>
  );
}

export default Forecast;
