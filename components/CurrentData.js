import { useWeather } from "@/app/contexts/WeatherContext";
import Image from "next/image";
import TempDisplay from "./TempDisplay";

export default function CurrentData() {
  const { weatherData } = useWeather();
  const { data } = weatherData;
  return (
    <>
      <div className="relative contain flex w-full h-full">
        <TempDisplay />
        <div className="weather-info flex w-[30%] flex-col text-xl justify-center h-3/4">
          <div className="col w-full h-auto flex border-b-2">
            <Image width={200} height={200} src={`/icons/wind.svg`} alt="wind" />
            <div className="flex flex-col justify-center w-full">
              <p className="wind">{data.wind.speed} m/s</p>
              <p className="heading">Wind Speed</p>
            </div>
          </div>
          <div className="col w-full h-auto flex border-b-2">
            <Image width={200} height={200} src={`/icons/humidity.svg`} alt="wind" />
            <div className="flex flex-col justify-center w-full">
              <p className="humidity">{data.temperature.humidity}%</p>
              <p className="heading">Humidity</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
