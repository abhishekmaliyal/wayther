import React from "react";

function SearchEngine({ query, setQuery, search }) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      search(e);
    }
  };
  return (
    <div className="SearchEngine h-full flex item-center justify-center">
      <input
        type="text"
        className="city-search w-full"
        placeholder="city"
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button onClick={search} className="border w-40 border-black rounded-3xl">
        search
      </button>
    </div>
  );
}

export default SearchEngine;
