"use client";

import { useWeather } from "@/app/contexts/WeatherContext";
import { FiSearch, FiMapPin, FiClock } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import CityAutocomplete from "./CityAutocomplete";

const POPULAR_CITIES = [
  { name: "London", country: "GB" },
  { name: "New York", country: "US" },
  { name: "Tokyo", country: "JP" },
  { name: "Paris", country: "FR" },
  { name: "Sydney", country: "AU" },
  { name: "Dehradun", country: "IN" },
];

export default function SearchEngine() {
  const {
    recentCities,
    fetchWeatherData,
    fetchUserLocationWeather,
  } = useWeather();
  const [open, setOpen] = useState(false);

  const handleSelectCity = (cityName) => {
    fetchWeatherData(cityName);
    setOpen(false);
  };

  const handleUseGPS = () => {
    fetchUserLocationWeather();
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 transition-all duration-150 cursor-pointer"
            title="Search for a city"
          >
            <FiSearch className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">Search city...</span>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xl z-[100]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Search City
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-5 mt-2">
            <CityAutocomplete
              onSelect={() => setOpen(false)}
              autoFocus
              placeholder="Type city name..."
            />

            <button
              type="button"
              onClick={handleUseGPS}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black font-semibold text-sm transition-colors border border-transparent"
            >
              <FiMapPin className="w-4 h-4" />
              <span>Use Current Location (GPS)</span>
            </button>

            {recentCities && recentCities.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">
                  <FiClock className="w-3.5 h-3.5" />
                  <span>Recent Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentCities.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectCity(item.name)}
                      className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs font-medium transition-colors border border-zinc-200 dark:border-zinc-800"
                    >
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">
                Popular Destinations
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_CITIES.map((city, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectCity(city.name)}
                    className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs font-medium transition-colors border border-zinc-200 dark:border-zinc-800"
                  >
                    <span>{city.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
