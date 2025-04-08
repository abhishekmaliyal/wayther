import { WeatherProvider } from "@/app/contexts/WeatherContext";
import HomeContent from "@/components/HomeContent";

export default function Home() {
  return (
    <WeatherProvider>
      <HomeContent />
    </WeatherProvider>
  );
}
