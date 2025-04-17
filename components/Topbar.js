import Link from "next/link";
import React from "react";

export default function Topbar() {
  return (
    <>
      <div className="top flex w-full h-20 border-b-2 ">
        <div className="title w-2/3 h-full flex items-center p-8 text-5xl">
        
        <Link href="/">wayther.</Link>
        </div>
        <div className="searchbar w-1/3 h-full flex p-4 justify-end text-3xl text-gray-400">
          <Link href="/pages/About" className="px-4 flex items-center justify-center">
            <p>?</p>
          </Link>
        </div>
      </div>
    </>
  );
}
