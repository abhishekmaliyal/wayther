"use client";

import { mapOpenWeatherToIcon } from "@/lib/WeatherIconMapper";
import Image from "next/image";
import { useState } from "react";

export default function WeatherIcons({ icon, description, width = 500, height = 500, className = "" }) {
  const [imgError, setImgError] = useState(false);
  const iconFile = mapOpenWeatherToIcon(icon, description);

  const fallbackSrc = icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : "/icons/clear-day.svg";
  const primarySrc = `/icons/${iconFile}`;

  return (
    <Image
      width={width}
      height={height}
      src={imgError ? fallbackSrc : primarySrc}
      alt={description || "Weather Icon"}
      className={className}
      onError={() => setImgError(true)}
      unoptimized={imgError}
    />
  );
}
