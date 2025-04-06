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
    <form onSubmit={handleSubmit} className="search-engine flex">
      <input
        type="text"
        placeholder="Search for a city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-grow p-2 border rounded-l"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-r">
        Search
      </button>
    </form>
  );
}
