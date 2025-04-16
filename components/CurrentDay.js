"use client";

import React, { useState, useEffect } from "react";

export default function CurrentDay({ dt, timezone }) {
  const [day, setDay] = useState("");

  useEffect(() => {
    const localTime = new Date((dt + timezone) * 1000);
    const fullDateTime = localTime.toLocaleDateString("en-US", {
      timeZone: "UTC",
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    setDay(fullDateTime);
  }, [dt, timezone]);

  return <span className="heading">{day}</span>;
}
