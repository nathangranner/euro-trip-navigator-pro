
import React from "react";

interface WeatherSectionProps {
  weatherTemp?: string;
  weatherCondition?: string;
}

export default function WeatherSection({ weatherTemp, weatherCondition }: WeatherSectionProps) {
  if (!weatherTemp && !weatherCondition) {
    return null;
  }

  return (
    <div className="mt-2 p-2 bg-blue-50 rounded">
      <p className="text-sm text-blue-800">
        Weather: {weatherCondition} {weatherTemp && `(${weatherTemp})`}
      </p>
    </div>
  );
}
