"use client";

import SearchEngine from "./SearchEngine";
import CompleteWeather from "./CompleteWeather";

import { useWeather } from "@/app/contexts/WeatherContext";
import Topbar from "./Topbar";
import CurrentDay from "./CurrentDay";
import { ModeToggle } from "./theme/darkmode";

export default function HomeContent() {
  const { weatherData } = useWeather();
  const { data, error, loading } = weatherData;

  return (
    <>
      <div className="contain w-screen h-screen flex flex-col">
        <Topbar />
        <div className="cityinfo h-20 w-full flex justify-between items-center text-xl md:text-2xl lg:text-3xl border-b-2 p-4 lg:p-8 md:p-6">
          <div className="name flex items-center justify-center">
            <div className="city-name">
              <h2 className="heading px-4">
                {data?.city}, <span className="heading">{data?.country}</span>
              </h2>
            </div>
            <SearchEngine />
          </div>
          {error && <span className="error-message text-red-500 block mt-2">City not found</span>}
          <div className="dayanddate flex items-center gap-8 px-4">
            <div className="day">
              <CurrentDay dt={data?.dt} timezone={data?.timezone} />
            </div>
          </div>
        </div>
        <div className="w-full h-full">
          {loading ? (
            <div className="flex justify-center items-center h-full">Loading...</div>
          ) : (
            <CompleteWeather />
          )}
        </div>
        <ModeToggle />
      </div>
    </>
  );
}
