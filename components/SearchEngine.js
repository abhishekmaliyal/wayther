// "use client";

// import { useWeather } from "@/app/contexts/WeatherContext";

// export default function SearchEngine() {
//   const { query, setQuery, search } = useWeather();

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       search(e);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     search(e);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="search-engine flex justify-center items-center h-full w-full"
//     >
//       <input
//         type="text"
//         placeholder={`${localStorage.getItem("city")}`}
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         onKeyDown={handleKeyDown}
//         className=" items-center justify-center h-full w-full p-2"
//       />
//       <button type="submit" className="bg-black text-white p-2">
//         Search
//       </button>
//     </form>
//   );
// }


// components/SearchEngine.js
"use client";

import { useWeather } from "@/app/contexts/WeatherContext";
import { useState, useEffect } from "react";

export default function SearchEngine() {
  const { query, setQuery, search, weatherData } = useWeather();
  const [isSearchMode, setIsSearchMode] = useState(true);
  
  // Show search mode when no city is loaded or when user is actively searching
  useEffect(() => {
    if (weatherData.data && !weatherData.loading) {
      setIsSearchMode(false);
    }
  }, [weatherData.data, weatherData.loading]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission
      search(e);
      setIsSearchMode(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    search(e);
    setIsSearchMode(false);
  };

  const handleFocus = () => {
    setIsSearchMode(true);
  };

  const handleBlur = () => {
    // Only exit search mode if we have data and the user didn't just clear the input
    if (weatherData.data && query.trim()) {
      setIsSearchMode(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-engine flex w-full">
      {isSearchMode ? (
        // Search mode - show input field and button
        <>
          <input
            type="text"
            placeholder="Search for a city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            autoFocus
            className="flex text-center w-full h-full p-2 border rounded outline-none"
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white p-2 rounded absolute"
          >
            Search
          </button>
        </>
      ) : (
        // Display mode - show city name that can be clicked to search
        <div 
          className="flex w-full h-full items-center justify-center p-2 rounded cursor-pointer  truncate"
          onClick={() => setIsSearchMode(true)}
        >
          {query || (weatherData.data ? weatherData.data.city : "Search for a city...")}
        </div>
      )}
    </form>
  );
}