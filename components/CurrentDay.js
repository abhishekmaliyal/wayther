"use client";

import React, { useState, useEffect } from "react";

export default function CurrentDay({ dt, timezone }) {
  const [day, setDay] = useState("");

  useEffect(() => {
    const localTime = new Date((dt + timezone) * 1000);
    const weekday = localTime.toLocaleDateString("en-US", { weekday: "long" });
    setDay(weekday);
  }, [dt, timezone]);

  return <span>{day}</span>;
}
