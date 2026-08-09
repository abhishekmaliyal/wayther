"use client";

import { useState, useRef, useEffect } from "react";
import { useWeather } from "@/app/contexts/WeatherContext";
import { FiSearch, FiX, FiMapPin, FiLoader } from "react-icons/fi";

export default function CityAutocomplete({ onSelect, autoFocus = false, placeholder = "Search for a city..." }) {
  const {
    query,
    handleQueryChange,
    suggestions,
    setSuggestions,
    isSearching,
    selectCitySuggestion,
    search,
  } = useWeather();

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (suggestions.length > 0) {
      setIsOpen(true);
      setSelectedIndex(-1);
    }
  }, [suggestions]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    handleQueryChange(val);
    if (!val) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === "Enter" && query.trim()) {
        e.preventDefault();
        search(query);
        setIsOpen(false);
        if (onSelect) onSelect();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        handleSelect(suggestions[selectedIndex]);
      } else {
        search(query);
        setIsOpen(false);
        if (onSelect) onSelect();
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleSelect = (item) => {
    selectCitySuggestion(item);
    setIsOpen(false);
    if (onSelect) onSelect();
  };

  const handleClear = () => {
    handleQueryChange("");
    setSuggestions([]);
    setIsOpen(false);
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div ref={wrapperRef} className="relative w-full z-[60]">
      <div className="relative flex items-center w-full">
        <div className="absolute left-3.5 text-zinc-400 dark:text-zinc-500 pointer-events-none">
          <FiSearch className="w-4 h-4" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true);
          }}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full pl-10 pr-9 py-2.5 text-sm rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 transition-all duration-150"
        />
        <div className="absolute right-3 flex items-center gap-1">
          {isSearching ? (
            <FiLoader className="w-4 h-4 animate-spin text-zinc-600 dark:text-zinc-400" />
          ) : query ? (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
            >
              <FiX className="w-3.5 h-3.5" />
            </button>
          ) : null}
        </div>
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-[100] left-0 right-0 mt-1.5 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl shadow-2xl max-h-72 overflow-y-auto">
          <div className="px-3 py-1 text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
            City Suggestions
          </div>
          {suggestions.map((item, index) => {
            const isSelected = index === selectedIndex;
            const stateDisplay = item.state ? `, ${item.state}` : "";
            return (
              <button
                key={item.id || index}
                type="button"
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between transition-colors duration-150 border-b border-zinc-100 dark:border-zinc-800/60 last:border-0 ${
                  isSelected
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium"
                    : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                }`}
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-sm leading-snug">
                    {item.name}{stateDisplay}
                  </span>
                  <span className={`text-xs ${isSelected ? "text-zinc-300 dark:text-zinc-600" : "text-zinc-500 dark:text-zinc-400"}`}>
                    {item.country}
                  </span>
                </div>
                <div className={`flex items-center gap-1 text-xs ${isSelected ? "text-zinc-300 dark:text-zinc-600" : "text-zinc-400"}`}>
                  <FiMapPin className="w-3 h-3" />
                  <span>
                    {item.lat?.toFixed(1)}°, {item.lon?.toFixed(1)}°
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
