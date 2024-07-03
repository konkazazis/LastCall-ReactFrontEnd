import React, { useState, useEffect } from "react";

export default function Widgets() {
  const [data, setData] = useState({ daily: {} });

  // Digital clock
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  //Weather messages based on WMO codes in the API response
  const weatherMessages = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Drizzle (Light)",
    53: "Drizzle (Moderate)",
    55: "Drizzle (Dense)",
    56: "Freezing Drizzle (Light)",
    57: "Freezing Drizzle (Dense)",
    61: "Rain (Slight)",
    63: "Rain (Moderate)",
    65: "Rain (Heavy)",
    66: "Freezing Rain (Light)",
    67: "Freezing Rain (Heavy)",
    71: "Snowfall (Slight)",
    73: "Snowfall (Moderate)",
    75: "Snowfall (Heavy)",
    77: "Snow grains",
    80: "Rain Showers (Slight)",
    81: "Rain Showers (Moderate)",
    82: "Rain Showers (Violent)",
    85: "Snow Showers (Slight)",
    86: "Snow Showers (Heavy)",
    95: "Thunderstorm (Slight)",
    96: "Thunderstorm with Hail (Slight)",
    99: "Thunderstorm with Hail (Heavy)",
  };

  //Fetch weather data from API
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    const weatherDataUrl = "https://api.open-meteo.com/v1/forecast?latitude=37.9838&longitude=23.7278&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum&timezone=auto";
    fetchData(weatherDataUrl);
  }, []);
  
  //Format date from API response
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = days[date.getUTCDay()];
    const month = date.getUTCMonth() + 1;
    const dayOfMonth = date.getUTCDate();
    return `${dayOfWeek} ${dayOfMonth}/${month}`;
  };

  return (
    <div>
      <div>
        <div className="animate__animated animate__fadeIn inline mr-4 p-[0.1rem] pl-2 pr-2 font-light text-base bg-white border-custom3 border-2">
            {data.daily && data.daily.time && data.daily.time[0] ? (
              <>
                {formatDate(data.daily.time[0])} | {data.daily.temperature_2m_min[0]}°C - {data.daily.temperature_2m_max[0]}°C  
                ({weatherMessages[data.daily.weathercode[0]]})
              </>
            ) : (
              <p>Loading...</p>
            )}
        </div>
        <div className="animate__animated animate__fadeIn inline mr-4 p-[0.1rem] pl-2 pr-2 font-light text-base bg-white border-custom3 border-2">
          <span>{hours < 10 ? `0${hours}` : hours}</span>:
          <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:
          <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
        </div>
      </div>
    </div>
  );
}