export async function fetchCitySuggestions(query, openWeatherApiKey = null) {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const cleanQuery = query.trim();
  const apiKey = openWeatherApiKey || process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  if (apiKey && apiKey !== "YOUR_API_KEY") {
    try {
      const owRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          cleanQuery
        )}&limit=6&appid=${apiKey}`
      );
      if (owRes.ok) {
        const owData = await owRes.json();
        if (Array.isArray(owData) && owData.length > 0) {
          return owData.map((item) => ({
            id: `${item.lat}-${item.lon}-${item.name}`,
            name: item.name,
            state: item.state || "",
            country: item.country || "",
            countryCode: item.country || "",
            lat: item.lat,
            lon: item.lon,
            source: "openweather",
          }));
        }
      }
    } catch (err) {
      console.warn("OpenWeather geocoding failed:", err);
    }
  }

  try {
    const omRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        cleanQuery
      )}&count=6&language=en&format=json`
    );
    if (omRes.ok) {
      const omData = await omRes.json();
      if (omData.results && Array.isArray(omData.results)) {
        return omData.results.map((item) => ({
          id: `${item.latitude}-${item.longitude}-${item.name}`,
          name: item.name,
          state: item.admin1 || "",
          country: item.country || "",
          countryCode: item.country_code || "",
          lat: item.latitude,
          lon: item.longitude,
          source: "openmeteo",
        }));
      }
    }
  } catch (err) {
    console.error("Open-Meteo geocoding error:", err);
  }

  return [];
}

export async function reverseGeocode(lat, lon, openWeatherApiKey = null) {
  const apiKey = openWeatherApiKey || process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  if (apiKey && apiKey !== "YOUR_API_KEY") {
    try {
      const owRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
      );
      if (owRes.ok) {
        const owData = await owRes.json();
        if (Array.isArray(owData) && owData.length > 0) {
          return {
            city: owData[0].name,
            country: owData[0].country || "",
            state: owData[0].state || "",
          };
        }
      }
    } catch (err) {
      console.warn("OpenWeather reverse geocoding error:", err);
    }
  }

  try {
    const bgRes = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    );
    if (bgRes.ok) {
      const bgData = await bgRes.json();
      const city =
        bgData.city ||
        bgData.locality ||
        bgData.localityInfo?.administrative?.[2]?.name ||
        bgData.localityInfo?.administrative?.[1]?.name ||
        "Current Location";
      return {
        city: city,
        country: bgData.countryCode || bgData.countryName || "",
        state: bgData.principalSubdivision || "",
      };
    }
  } catch (err) {
    console.error("BigDataCloud reverse geocoding error:", err);
  }

  return { city: "Current Location", country: "" };
}
