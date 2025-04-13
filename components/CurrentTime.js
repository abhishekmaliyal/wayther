"use client";

import React, { useState, useEffect } from "react";

export default function CurrentTime({ dt, timezone }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const localTime = new Date((dt + timezone) * 1000);
    const formattedTime = localTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setTime(formattedTime);
  }, [dt, timezone]);

  return <span>{time}</span>;
}
