import { useWeather } from "@/app/contexts/WeatherContext";
import Image from "next/image";
import TempDisplay from "./TempDisplay";

export default function CurrentData() {
  const { weatherData } = useWeather();
  const { data } = weatherData;
  return (
    <>
      <div className="contain flex w-full h-full">
        <TempDisplay />
        <div className="weather-info flex w-[30%] flex-col ">
          <div className="col w-full h-1/2 ">
            <Image width={500} height={500} src={`/icons/wind.svg`} alt="wind" />
            <div>
              <p className="wind">{data.wind.speed} m/s</p>
              <p>Wind Speed</p>
            </div>
          </div>
          <div className="col w-full h-1/2 ">
            <Image width={500} height={500} src={`/icons/humidity.svg`} alt="wind" />
            <div>
              <p className="humidity">{data.temperature.humidity}%</p>
              <p>Humidity</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
