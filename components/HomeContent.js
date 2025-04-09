"use client";

import React, { useEffect, useState } from "react";
import SearchEngine from "./SearchEngine";
import CompleteWeather from "./CompleteWeather";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function HomeContent() {
  const [open, setOpen] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setOpen(false);
    }
  };

  return (
    <>
      <div className="contain w-screen h-screen flex flex-col text-black bg-white">
        <div className="top flex w-full h-[10%]">
          <div className="title w-2/3 h-full flex items-center p-10 text-5xl">wayther.</div>
          <div className="searchbar w-1/3 h-full flex p-4">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger className="border">change city</DialogTrigger>
              <DialogContent onKeyDown={handleKeyDown}>
                <DialogHeader>
                  <DialogTitle>search for your city :</DialogTitle>
                </DialogHeader>
                <SearchEngine />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="w-full h-[90%]">
          <CompleteWeather />
        </div>
      </div>
    </>
  );
}
