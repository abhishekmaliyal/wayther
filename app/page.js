import { WeatherProvider } from "@/app/contexts/WeatherContext";
// import HomeContent from "@/components/HomeContent";
import SplashScreenWrapper from "@/components/SplashScreenWrapper";

export default function Home() {
  return (
    <WeatherProvider>
      <SplashScreenWrapper />
    </WeatherProvider>
  );
}
