import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
const weatherKey = import.meta.env.VITE_WEATHER_API_KEY;
import "./index.css";

async function initialWeatherDatas() {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${"Madrid"}&appid=${weatherKey}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    throw error;
  }
}

initialWeatherDatas().then((initialWeatherDatas) => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App initialWeatherDatas={initialWeatherDatas} />
    </React.StrictMode>
  );
});
