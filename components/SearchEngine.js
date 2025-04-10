"use client";

import { useWeather } from "@/app/contexts/WeatherContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function SearchEngine() {
  const { query, setQuery, search } = useWeather();
  const [open, setOpen] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      search(e);
      setOpen(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    search(e);
  };

  return (
    <>
      <div className="searchcontainer">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="border px-10">change city</DialogTrigger>
          <DialogContent onKeyDown={handleKeyDown}>
            <DialogHeader>
              <DialogTitle>search for your city :</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={handleSubmit}
              className="search-engine flex justify-center items-center h-full"
            >
              <div className="contain flex flex-col w-full h-full py-4 justify-between">
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
              <div className="button flex justify-end pt-4">
                <button type="submit" className="bg-black text-white p-2 rounded-sm px-4">
                  Search
                </button>
              </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
