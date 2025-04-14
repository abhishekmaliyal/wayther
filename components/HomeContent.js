"use client";

import SearchEngine from "./SearchEngine";
import CompleteWeather from "./CompleteWeather";

import { useWeather } from "@/app/contexts/WeatherContext";
import Topbar from "./Topbar";
import CurrentDate from "./CurrentDate";
import CurrentDay from "./CurrentDay";

export default function HomeContent() {
  const { weatherData } = useWeather();
  const { data, error, loading } = weatherData;

  return (
    <>
      <div className="contain w-screen h-screen flex flex-col text-black bg-white">
        <Topbar />
        <div className="cityinfo h-20 w-full flex justify-between items-center text-3xl border-b-2 p-8 ">
          <div className="name flex items-center justify-center">
            <div className="city-name">
              <h2>
                {data?.city}, <span>{data?.country}</span>
              </h2>
            </div>
            <SearchEngine />
          </div>
          {error && <span className="error-message text-red-500 block mt-2">City not found</span>}
          <div className="dayanddate flex items-center gap-8 px-8">
            <div className="day">
              <CurrentDay dt={data?.dt} timezone={data?.timezone} />
            </div>
            <div className="date">
              <CurrentDate dt={data?.dt} timezone={data?.timezone} />
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
      </div>
    </>
  );
}
