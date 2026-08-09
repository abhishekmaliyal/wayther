"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { fetchCitySuggestions, reverseGeocode } from "@/lib/geocoding";

const WeatherContext = createContext();

const DEFAULT_CITY = "Dehradun";
const RECENT_CITIES_KEY = "wayther_recent_cities";

export const WeatherProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [weatherData, setWeather] = useState({
    loading: true,
    data: null,
    error: false,
    errorMessage: "",
  });

  const [forecastData, setForecastData] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [recentCities, setRecentCities] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    try {
      const savedRecents = localStorage.getItem(RECENT_CITIES_KEY);
      if (savedRecents) {
        setRecentCities(JSON.parse(savedRecents));
      }
    } catch (e) {
      console.error("Failed to load recent cities:", e);
    }
  }, []);

  const addRecentCity = (cityName, stateName, country) => {
    if (!cityName || cityName === "Selected Location") return;
    const label = stateName ? `${cityName}, ${stateName}` : cityName;
    setRecentCities((prev) => {
      const filtered = prev.filter((item) => item.name.toLowerCase() !== label.toLowerCase());
      const updated = [{ name: label, state: stateName, country }, ...filtered].slice(0, 6);
      try {
        localStorage.setItem(RECENT_CITIES_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save recent cities:", e);
      }
      return updated;
    });
  };

  const mapWmoCodeToCondition = (code, isDay = true) => {
    const d = isDay ? "d" : "n";
    if (code === 0) return { description: "Clear Sky", icon: `01${d}` };
    if (code >= 1 && code <= 3) return { description: "Partly Cloudy", icon: `02${d}` };
    if (code === 45 || code === 48) return { description: "Foggy", icon: `50${d}` };
    if (code >= 51 && code <= 55) return { description: "Drizzle", icon: `09${d}` };
    if (code >= 61 && code <= 65) return { description: "Rain", icon: `10${d}` };
    if (code >= 71 && code <= 77) return { description: "Snow", icon: `13${d}` };
    if (code >= 80 && code <= 82) return { description: "Rain Showers", icon: `09${d}` };
    if (code >= 95) return { description: "Thunderstorm", icon: `11${d}` };
    return { description: "Overcast", icon: `04${d}` };
  };

  const fetchStateForCity = async (cityName, lat = null, lon = null) => {
    if (lat && lon) {
      const geoInfo = await reverseGeocode(lat, lon);
      return geoInfo.state || "";
    }
    try {
      const geoRes = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
      );
      if (geoRes.data.results && geoRes.data.results.length > 0) {
        return geoRes.data.results[0].admin1 || "";
      }
    } catch (e) {
      console.warn("Error resolving state for city:", e);
    }
    return "";
  };

  const fetchWeatherData = async (target = localStorage.getItem("city") || DEFAULT_CITY) => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

    setWeather((prev) => ({ ...prev, loading: true, error: false, errorMessage: "" }));

    let isCoords = typeof target === "object" && target !== null && target.lat && target.lon;
    let targetName = isCoords ? target.name : typeof target === "string" ? target : "";
    let targetState = isCoords ? target.state || "" : "";
    let queryParam = isCoords ? `lat=${target.lat}&lon=${target.lon}` : `q=${encodeURIComponent(targetName || target)}`;

    if (apiKey && apiKey !== "YOUR_API_KEY") {
      try {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?${queryParam}&appid=${apiKey}&units=metric`;
        const response = await axios.get(weatherUrl);
        const resData = response.data;

        let stateName = targetState;
        if (!stateName) {
          stateName = await fetchStateForCity(resData.name, resData.coord?.lat, resData.coord?.lon);
        }

        const transformedData = {
          city: resData.name,
          state: stateName,
          country: resData.sys?.country || "",
          condition: {
            description: resData.weather[0]?.description || "Clear",
            main: resData.weather[0]?.main || "Clear",
            icon_url: `https://openweathermap.org/img/wn/${resData.weather[0]?.icon}@2x.png`,
            icon: resData.weather[0]?.icon || "01d",
          },
          temperature: {
            current: resData.main.temp,
            feels_like: resData.main.feels_like,
            min: resData.main.temp_min,
            max: resData.main.temp_max,
            humidity: resData.main.humidity,
            pressure: resData.main.pressure,
          },
          wind: {
            speed: resData.wind.speed,
            deg: resData.wind.deg || 0,
          },
          visibility: resData.visibility ? Math.round(resData.visibility / 1000) : 10,
          sys: {
            sunrise: resData.sys?.sunrise,
            sunset: resData.sys?.sunset,
          },
          dt: resData.dt,
          timezone: resData.timezone || 0,
          coord: resData.coord,
        };

        setWeather({ data: transformedData, loading: false, error: false, errorMessage: "" });
        localStorage.setItem("city", resData.name);
        addRecentCity(resData.name, stateName, resData.sys?.country);

        fetchForecastData(resData.coord ? { lat: resData.coord.lat, lon: resData.coord.lon } : resData.name);
        return;
      } catch (err) {
        console.warn("OpenWeather API error, trying fallback weather fetch...", err);
      }
    }

    try {
      let lat = isCoords ? target.lat : null;
      let lon = isCoords ? target.lon : null;
      let cityName = isCoords ? target.name : target;
      let stateName = isCoords ? target.state || "" : "";
      let countryName = "";
      let countryCode = "";

      if (isCoords && (!cityName || cityName === "Selected Location" || !stateName)) {
        const geoInfo = await reverseGeocode(target.lat, target.lon);
        cityName = cityName && cityName !== "Selected Location" ? cityName : geoInfo.city;
        stateName = stateName || geoInfo.state;
        countryName = geoInfo.country;
        countryCode = geoInfo.country;
      }

      if (!lat || !lon) {
        const geoRes = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
        );
        if (geoRes.data.results && geoRes.data.results.length > 0) {
          const location = geoRes.data.results[0];
          lat = location.latitude;
          lon = location.longitude;
          cityName = location.name;
          stateName = location.admin1 || stateName;
          countryName = location.country || "";
          countryCode = location.country_code || "";
        } else {
          throw new Error("City not found");
        }
      }

      const omRes = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`
      );

      const current = omRes.data.current;
      const daily = omRes.data.daily;
      const hourly = omRes.data.hourly;
      const cond = mapWmoCodeToCondition(current.weather_code, current.is_day === 1);

      const transformedData = {
        city: cityName || "Current Location",
        state: stateName || "",
        country: countryCode || countryName,
        condition: {
          description: cond.description,
          main: cond.description,
          icon_url: `https://openweathermap.org/img/wn/${cond.icon}@2x.png`,
          icon: cond.icon,
        },
        temperature: {
          current: current.temperature_2m,
          feels_like: current.apparent_temperature,
          min: daily.temperature_2m_min[0],
          max: daily.temperature_2m_max[0],
          humidity: current.relative_humidity_2m,
          pressure: Math.round(current.surface_pressure),
        },
        wind: {
          speed: Math.round((current.wind_speed_10m / 3.6) * 10) / 10,
          deg: current.wind_direction_10m || 0,
        },
        visibility: 10,
        sys: {
          sunrise: daily.sunrise[0] ? Math.floor(new Date(daily.sunrise[0]).getTime() / 1000) : null,
          sunset: daily.sunset[0] ? Math.floor(new Date(daily.sunset[0]).getTime() / 1000) : null,
        },
        dt: Math.floor(Date.now() / 1000),
        timezone: omRes.data.utc_offset_seconds || 0,
        coord: { lat, lon },
      };

      setWeather({ data: transformedData, loading: false, error: false, errorMessage: "" });
      localStorage.setItem("city", cityName);
      addRecentCity(cityName, stateName, countryCode);

      const dailyList = daily.time.slice(0, 5).map((t, idx) => {
        const dCond = mapWmoCodeToCondition(daily.weather_code[idx], true);
        return {
          time: Math.floor(new Date(t).getTime() / 1000),
          condition: {
            icon_url: `https://openweathermap.org/img/wn/${dCond.icon}@2x.png`,
            description: dCond.description,
            icon: dCond.icon,
          },
          temperature: {
            minimum: daily.temperature_2m_min[idx],
            maximum: daily.temperature_2m_max[idx],
          },
        };
      });
      setForecastData(dailyList);

      const hourlyList = hourly.time.slice(0, 24).map((t, idx) => {
        const dateObj = new Date(t);
        const isDayTime = dateObj.getHours() >= 6 && dateObj.getHours() < 20;
        const hCond = mapWmoCodeToCondition(hourly.weather_code[idx], isDayTime);
        return {
          time: Math.floor(dateObj.getTime() / 1000),
          hourLabel: dateObj.toLocaleTimeString("en-US", { hour: "numeric", hour12: true }),
          temp: hourly.temperature_2m[idx],
          humidity: hourly.relative_humidity_2m[idx],
          icon: hCond.icon,
          description: hCond.description,
        };
      });
      setHourlyData(hourlyList);
    } catch (fallbackErr) {
      console.error("Failed to fetch weather data:", fallbackErr);
      setWeather({
        data: null,
        loading: false,
        error: true,
        errorMessage: "City not found. Please try another location.",
      });
    }
  };

  const fetchForecastData = async (target) => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    if (!apiKey || apiKey === "YOUR_API_KEY") return;

    let queryParam = typeof target === "object" ? `lat=${target.lat}&lon=${target.lon}` : `q=${encodeURIComponent(target)}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?${queryParam}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(forecastUrl);
      const list = response.data.list;

      const dailyForecast = list
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

      const next24h = list.slice(0, 8).map((item) => ({
        time: item.dt,
        hourLabel: new Date(item.dt * 1000).toLocaleTimeString("en-US", { hour: "numeric", hour12: true }),
        temp: item.main.temp,
        humidity: item.main.humidity,
        icon: item.weather[0]?.icon || "01d",
        description: item.weather[0]?.description || "",
      }));
      setHourlyData(next24h);
    } catch (error) {
      console.error("Error fetching OpenWeather forecast data:", error);
    }
  };

  const search = async (targetCity) => {
    const cityToFetch = typeof targetCity === "string" ? targetCity : query;
    if (!cityToFetch) return;
    setSuggestions([]);
    await fetchWeatherData(cityToFetch);
    setQuery("");
  };

  const selectCitySuggestion = async (suggestion) => {
    setQuery("");
    setSuggestions([]);
    if (suggestion.lat && suggestion.lon) {
      await fetchWeatherData({
        lat: suggestion.lat,
        lon: suggestion.lon,
        name: suggestion.name,
        state: suggestion.state,
      });
    } else {
      await fetchWeatherData(suggestion.name);
    }
  };

  const fetchUserLocationWeather = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setWeather((prev) => ({ ...prev, loading: true }));
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData({ lat: latitude, lon: longitude });
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to retrieve location. Please search for a city manually.");
        setWeather((prev) => ({ ...prev, loading: false }));
      }
    );
  };

  const handleQueryChange = async (val) => {
    setQuery(val);
    if (!val || val.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    setIsSearching(true);
    try {
      const results = await fetchCitySuggestions(val);
      setSuggestions(results);
    } catch (err) {
      console.error("Autocomplete error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius((prev) => !prev);
  };

  const convertTemperature = (temperature) => {
    if (temperature === undefined || temperature === null) return "--";
    return isCelsius ? Math.round(temperature) : Math.round((temperature * 9) / 5 + 32);
  };

  const formatDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };

  useEffect(() => {
    const savedCity = localStorage.getItem("city");
    fetchWeatherData(savedCity || DEFAULT_CITY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        query,
        setQuery,
        handleQueryChange,
        suggestions,
        setSuggestions,
        isSearching,
        selectCitySuggestion,
        weatherData,
        forecastData,
        hourlyData,
        recentCities,
        isCelsius,
        search,
        toggleTemperatureUnit,
        convertTemperature,
        formatDay,
        fetchWeatherData,
        fetchUserLocationWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
