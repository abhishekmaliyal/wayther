"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomeContent from "./HomeContent";
import Topbar from "./Topbar";

export default function SplashScreenWrapper() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return "Good Morning.";
    } else if (hour >= 12 && hour < 18) {
      return "Good Afternoon.";
    } else {
      return "Good Evening.";
    }
  };

  return (
    <>
      <AnimatePresence>
        {showSplash ? (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <h1 className="title text-5xl p-8">wayther.</h1>
              <h1 className="text-6xl md:text-6xl font-bold mb-4 title underline underline-offset-8">
                {getGreeting()}
              </h1>
              <p className="text-xl md:text-2xl heading p-8">At-A-Glance weather app</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className={showSplash ? "invisible" : "visible"}>
        <HomeContent />
      </div>
    </>
  );
}
