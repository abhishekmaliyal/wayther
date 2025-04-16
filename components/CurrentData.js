import { useWeather } from "@/app/contexts/WeatherContext";
import Image from "next/image";
import TempDisplay from "./TempDisplay";

export default function CurrentData() {
  const { weatherData } = useWeather();
  const { data } = weatherData;

  return (
    <div className="flex flex-col w-full h-full">
      <TempDisplay />

      <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
        <div className="flex items-center p-3 border-b-2 rounded-lg">
          <div className="w-10 h-10 relative mr-3">
            <Image fill src="/icons/wind.svg" alt="wind" className="object-contain" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-semibold text-xl">{data.wind.speed} m/s</p>
            <p className="text-sm dark:text-gray-400">Wind Speed</p>
          </div>
        </div>

        <div className="flex items-center p-3 border-b-2 rounded-lg">
          <div className="w-10 h-10 relative mr-3">
            <Image fill src="/icons/humidity.svg" alt="humidity" className="object-contain" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-semibold text-xl">{data.temperature.humidity}%</p>
            <p className="text-sm dark:text-gray-400">Humidity</p>
          </div>
        </div>
      </div>
    </div>
  );
}
