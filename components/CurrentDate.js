"use client";

import React, { useState, useEffect } from "react";

export default function CurrentDate({ dt, timezone }) {
  const [date, setDate] = useState("");

  useEffect(() => {
    const localTime = new Date((dt + timezone) * 1000);
    const formattedDate = localTime.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
    });
    setDate(formattedDate);
  }, [dt, timezone]);

  return <span>{date}</span>;
}
