"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const WeatherContext = createContext();

const DEFAULT_CITY = "dehradun";

export const WeatherProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [weatherData, setWeather] = useState({
    loading: true,
    data: null,
    error: false,
  });
  const [forecastData, setForecastData] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);

  const fetchWeatherData = async (city = localStorage.getItem("city") || DEFAULT_CITY) => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

    try {
      setWeather({ ...weatherData, loading: true, error: false });
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      const transformedData = {
        city: response.data.name,
        country: response.data.sys.country,
        condition: {
          description: response.data.weather[0].description,
          icon_url: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
          icon: response.data.weather[0].icon,
        },
        temperature: {
          current: response.data.main.temp,
          humidity: response.data.main.humidity,
        },
        wind: {
          speed: response.data.wind.speed,
        },
        dt: response.data.dt,
        timezone: response.data.timezone,
      };

      setWeather({ data: transformedData, loading: false, error: false });
      fetchForecastData(response.data.name);

      localStorage.setItem("city", city);
    } catch (error) {
      console.error("Weather fetch error:", error);

      const previousCity = localStorage.getItem("city");

      if (previousCity && previousCity !== city) {
        setWeather({ ...weatherData, loading: true, error: true });

        fetchPreviousCity(previousCity);
      } else {
        if (city !== DEFAULT_CITY) {
          fetchDefaultCity();
        } else {
          setWeather({ ...weatherData, loading: false, error: true });
        }
      }
    }
  };

  const fetchPreviousCity = async (previousCity) => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${previousCity}&appid=${apiKey}&units=metric`
      );

      const transformedData = {
        city: response.data.name,
        country: response.data.sys.country,
        condition: {
          description: response.data.weather[0].description,
          icon_url: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
          icon: response.data.weather[0].icon,
        },
        temperature: {
          current: response.data.main.temp,
          humidity: response.data.main.humidity,
        },
        wind: {
          speed: response.data.wind.speed,
        },
        dt: response.data.dt,
        timezone: response.data.timezone,
      };

      setWeather({ data: transformedData, loading: false, error: true });
      fetchForecastData(response.data.name);
    } catch (error) {
      console.error("Failed to fetch previous city:", error);
      fetchDefaultCity();
    }
  };

  const fetchDefaultCity = async () => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

    try {
      setWeather({ ...weatherData, loading: true, error: true });

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${DEFAULT_CITY}&appid=${apiKey}&units=metric`
      );

      const transformedData = {
        city: response.data.name,
        country: response.data.sys.country,
        condition: {
          description: response.data.weather[0].description,
          icon_url: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
          icon: response.data.weather[0].icon,
        },
        temperature: {
          current: response.data.main.temp,
          humidity: response.data.main.humidity,
        },
        wind: {
          speed: response.data.wind.speed,
        },
        dt: response.data.dt,
        timezone: response.data.timezone,
      };

      setWeather({ data: transformedData, loading: false, error: true });
      fetchForecastData(response.data.name);

      localStorage.setItem("city", DEFAULT_CITY);
    } catch (error) {
      console.error("Failed to fetch default city:", error);
      setWeather({ data: null, loading: false, error: true });
    }
  };

  const fetchForecastData = async (city) => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(forecastUrl);
      const dailyForecast = response.data.list
        .filter((reading) => reading.dt_txt.includes("12:00:00"))
        .slice(0, 5);

      setForecastData(
        dailyForecast.map((day) => ({
          time: day.dt,
          condition: {
            icon_url: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
            description: day.weather[0].description,
            icon: day.weather[0].icon,
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

  const search = async (event) => {
    if (!query.trim()) return;

    if (event) {
      event.preventDefault();
      if (
        !(
          event.type === "click" ||
          (event.type === "keydown" && event.key === "Enter") ||
          event.type === "submit"
        )
      ) {
        return;
      }
    }

    await fetchWeatherData(query);
    setQuery("");
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius((prev) => !prev);
  };

  const convertTemperature = (temperature) => {
    return isCelsius ? Math.round(temperature) : Math.round((temperature * 9) / 5 + 32);
  };

  const formatDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  useEffect(() => {
    const savedCity = localStorage.getItem("city");

    if (!savedCity) {
      localStorage.setItem("city", DEFAULT_CITY);
    }

    fetchWeatherData(savedCity || DEFAULT_CITY);
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        query,
        setQuery,
        weatherData,
        forecastData,
        isCelsius,
        search,
        toggleTemperatureUnit,
        convertTemperature,
        formatDay,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
export const useWeather = () => useContext(WeatherContext);
