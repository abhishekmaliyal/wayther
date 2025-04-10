import { mapOpenWeatherToIcon } from "@/lib/WeatherIconMapper";
import Image from "next/image";

export default function WeatherIcons({ icon, description, className }) {
  const iconFile = mapOpenWeatherToIcon(icon, description);

  return (
    <Image
      width={500}
      height={500}
      src={`/icons/${iconFile}`}
      alt={description}
      className={className}
    />
  );
}
