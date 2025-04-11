"use client";

import SearchEngine from "./SearchEngine";
import CompleteWeather from "./CompleteWeather";

import { useWeather } from "@/app/contexts/WeatherContext";
import Topbar from "./Topbar";

export default function HomeContent() {
  const { weatherData } = useWeather();
  const { data, error, loading } = weatherData;

  return (
    <>
      <div className="contain w-screen h-screen flex flex-col text-black bg-white">
        <Topbar/>
        <div className="cityinfo h-20 w-full flex justify-around items-center text-3xl">
          <div className="name flex">
            <div className="city-name px-4">
              <h2>
                {data?.city}, <span>{data?.country}</span>
              </h2>
            </div>
          <SearchEngine />
          </div>
          {error && (
            <span className="error-message text-red-500 block mt-2">
              City not found
            </span>
          )}
          <div className="day">monday</div>
          <div className="date">1 apr</div>
        </div>
        <div className="w-full h-full">
          {loading ? (
            <div className="flex justify-center items-center h-full">Loading...</div>
          ) : (
            <CompleteWeather />
          )}
        </div>
      </div>
    </>
  );
}
