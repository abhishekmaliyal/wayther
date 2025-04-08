import React from "react";
import SearchEngine from "./SearchEngine";
import CompleteWeather from "./CompleteWeather";

export default function HomeContent() {
  return (
    <>
      <div className="contain w-screen h-screen flex flex-col text-black bg-white">
        <div className="top flex w-full h-[10%]">
          <div className="title w-2/3 h-full flex items-center p-10 text-5xl">wayther.</div>
          <div className="searchbar w-1/3 h-full flex p-4">
            <SearchEngine />
          </div>
        </div>
        <div className="w-full h-[90%]">
          <CompleteWeather />
        </div>
      </div>
    </>
  );
}
