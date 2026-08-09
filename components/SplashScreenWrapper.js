"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomeContent from "./HomeContent";

export default function SplashScreenWrapper() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1200);

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
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-white dark:bg-black text-black dark:text-white"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center p-6"
            >
              <h1 className="title text-5xl sm:text-6xl p-4 tracking-tighter">wayther.</h1>
              <h2 className="text-4xl sm:text-6xl font-bold mb-4 title underline underline-offset-8">
                {getGreeting()}
              </h2>
              <p className="text-lg sm:text-xl text-zinc-500 font-semibold p-4">
                At-A-Glance weather report
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <HomeContent />
    </>
  );
}
