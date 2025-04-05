"use client";

import Forecast from "@/components/Forecast";
import SearchEngine from "@/components/SearchEngine";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    loading: true,
    data: null,
    error: false,
  });

  const fetchWeatherData = async (city = localStorage.getItem("city")) => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      const transformedData = {
        city: response.data.name,
        country: response.data.sys.country,
        condition: {
          description: response.data.weather[0].description,
          icon_url: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
        },
        temperature: {
          current: response.data.main.temp,
          humidity: response.data.main.humidity,
        },
        wind: {
          speed: response.data.wind.speed,
        },
      };

      setWeather({ data: transformedData, loading: false, error: false });
    } catch (error) {
      setWeather({ data: null, loading: false, error: true });
      console.error("Weather fetch error:", error);
    }
    localStorage.setItem("city", city);
  };

  useEffect(() => {
    const savedCity = localStorage.getItem("city");

    if (!savedCity) {
      localStorage.setItem("city", "uganda");
    }

    fetchWeatherData();
  }, []);

  const search = async (event) => {
    event.preventDefault();
    if (event.type === "click" || (event.type === "keypress" && event.key === "Enter")) {
      setWeather({ ...weather, loading: true });
      await fetchWeatherData(query);
    }
  };

  return (
    <>
      <div className="contain w-screen h-screen flex flex-col text-black">
        <div className="top flex w-full h-[10%]">
          <div className="w-2/3 h-full flex items-center p-10 text-5xl">wayther.</div>
          <div className="searchbar w-1/3 h-full p-4">
            <SearchEngine query={query} setQuery={setQuery} search={search} />
          </div>
        </div>
        <div className="App w-full h-[90%]">
          <div className="data w-full h-full">
            {weather.error && (
              <span className="error-message">Sorry city not found, please try again.</span>
            )}

            {weather.data && <Forecast weather={weather} />}
          </div>
        </div>
      </div>
    </>
  );
}
