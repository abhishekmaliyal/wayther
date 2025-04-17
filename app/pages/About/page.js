import { ModeToggle } from "@/components/theme/darkmode";
import Topbar from "@/components/Topbar";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <>
      <Topbar />
      <div className="contain flex w-full h-full p-8 text-3xl">
        <div className="info flex flex-col justify-center p-4">
          <h2>simple weather application built for easy to read at-a-glance weather report</h2>
          <div className="about">
            <div>
              made by Abhishek Maliyal{" "}
              <span>
                using{" "}
                <div className="techstack">
                  <div className="tech">1</div>
                  <div className="tech">2</div>
                  <div className="tech">3</div>
                  <div className="tech">4</div>
                  <div className="tech">5</div>
                </div>
              </span>
            </div>
          </div>
        </div>
        <div className="links flex gap-4 p-4">
          <Link href="#">linkedin</Link>
          <Link href="#">github</Link>
          <Link href="#">portfolio</Link>
        </div>
      </div>

      <ModeToggle />
    </>
  );
}
