"use client";

import Forecast from "@/components/Forecast";
import SearchEngine from "@/components/SearchEngine";
import { WeatherProvider } from "@/app/contexts/WeatherContext";

export default function Home() {
  return (
    <WeatherProvider>
      <HomeContent />
    </WeatherProvider>
  );
}

function HomeContent() {
  return (
    <div className="contain w-screen h-screen flex flex-col text-black bg-white">
      <div className="top flex w-full h-[10%]">
        <div className="title w-2/3 h-full flex items-center p-10 text-5xl">wayther.</div>
        <div className="searchbar w-1/3 h-full p-4">
          <SearchEngine />
        </div>
      </div>
      <div className="App w-full h-[90%]">
        <Forecast />
      </div>
    </div>
  );
}
