"use client";

import { useEffect } from "react";

export interface WeatherWidgetProps {
  weatherHref: string;
  locationQuery: string;
}

export default function WeatherWidget({ weatherHref, locationQuery }: WeatherWidgetProps) {
  useEffect(() => {
    const scriptId = "weatherwidget-io-js";
    if (typeof window !== "undefined" && weatherHref && !document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://weatherwidget.io/js/widget.min.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [weatherHref]);

  return (
    <div className="mt-4">
      <a
        className="weatherwidget-io"
        href={weatherHref}
        data-label_1={locationQuery.toUpperCase()}
        data-label_2="WEATHER"
        data-theme="original"
      >
        {locationQuery.toUpperCase()} WEATHER
      </a>
    </div>
  );
}
