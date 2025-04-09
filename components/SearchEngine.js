"use client";

import { useWeather } from "@/app/contexts/WeatherContext";

export default function SearchEngine() {
  const { query, setQuery, search } = useWeather();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      search(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    search(e);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="search-engine flex justify-center items-center h-full w-full"
    >
      <div className="contain flex flex-col w-full h-full">
        <div className="inputfield w-full h-20 text-xl">
          <input
            type="text"
            placeholder={`${localStorage.getItem("city")}`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className=" w-full h-full p-2 border rounded outline-none"
          />
        </div>
        <div className="button flex justify-end my-10 ">
          <button type="submit" className="bg-black text-white p-2 rounded-sm px-4">
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
