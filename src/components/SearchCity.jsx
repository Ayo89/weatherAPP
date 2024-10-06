import { useState } from "react";
import fetchWeatherData from "../services/weather";

function SearchCity() {
  const [city, setCity] = useState("");
  function handleCity(event) {
    setCity(event.target.value);
  }

  const getWeatherData = async (city) => {
    const weatherData = await fetchWeatherData(city);
    console.log(weatherData);
  };

  return (
    <section className="bg-blue-300 h-20 ">
      <form
        className="h-full flex flex-row items-center justify-around"
        action="submit"
        onSubmit={(e) => {
          e.preventDefault();
          getWeatherData(city);
        }}
      >
        <input
          className="pl-6 py-2 rounded-lg"
          type="text"
          placeholder="ENTER A CITY"
          onChange={handleCity}
        />
        <button className="w-56 bg-customGreen rounded-lg p-1 text-white ">
          CHECK WEATHER &rarr;
        </button>
      </form>
    </section>
  );
}

export default SearchCity;
