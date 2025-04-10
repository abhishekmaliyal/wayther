export const mapOpenWeatherToIcon = (iconCode, description) => {
  const desc = description?.toLowerCase() || "";

  const iconMap = {
    "01d": "clear-day.svg",
    "01n": "clear-night.svg",
    "02d": "partly-cloudy-day.svg",
    "02n": "partly-cloudy-night.svg",
    "03d": "cloudy.svg",
    "03n": "cloudy.svg",
    "04d": "overcast-day.svg",
    "04n": "overcast-night.svg",
    "09d": "rain.svg",
    "09n": "rain.svg",
    "10d": "rain-day.svg",
    "10n": "rain-night.svg",
    "11d": "thunderstorms-day.svg",
    "11n": "thunderstorms-night.svg",
    "13d": "snow.svg",
    "13n": "snow.svg",
    "50d": "fog-day.svg",
    "50n": "fog-night.svg",
  };

  if (desc.includes("thunderstorm")) {
    return desc.includes("rain")
      ? iconCode.endsWith("d")
        ? "thunderstorms-rain-day.svg"
        : "thunderstorms-rain-night.svg"
      : iconCode.endsWith("d")
      ? "thunderstorms-day.svg"
      : "thunderstorms-night.svg";
  }

  if (desc.includes("drizzle")) {
    return iconCode.endsWith("d") ? "drizzle-day.svg" : "drizzle-night.svg";
  }

  if (desc.includes("rain")) {
    if (desc.includes("light")) {
      return iconCode.endsWith("d") ? "partly-cloudy-day-rain.svg" : "partly-cloudy-night-rain.svg";
    }
    if (desc.includes("heavy")) {
      return "extreme-rain.svg";
    }
    return iconCode.endsWith("d") ? "rain.svg" : "rain.svg";
  }

  if (desc.includes("snow")) {
    if (desc.includes("sleet")) return "sleet.svg";
    if (desc.includes("light"))
      return iconCode.endsWith("d") ? "partly-cloudy-day-snow.svg" : "partly-cloudy-night-snow.svg";
    if (desc.includes("heavy")) return "extreme-snow.svg";
    return "snow.svg";
  }

  if (desc.includes("mist") || desc.includes("fog") || desc.includes("haze")) {
    return iconCode.endsWith("d") ? "fog-day.svg" : "fog-night.svg";
  }

  if (desc.includes("dust") || desc.includes("sand")) return "dust.svg";
  if (desc.includes("smoke")) return "smoke.svg";
  if (desc.includes("tornado")) return "tornado.svg";
  if (desc.includes("hurricane") || desc.includes("cyclone")) return "hurricane.svg";

  return iconMap[iconCode] || "clear-day.svg";
};
