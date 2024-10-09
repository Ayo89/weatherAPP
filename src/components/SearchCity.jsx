import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import fetchWeatherData from "../services/weather";

function SearchCity({ setWeatherDatas }) {

  const [city, setCity] = useState('Madrid');
  
  function handleCity(e) {
    setCity(e.target.value);
  }

  const getWeatherData = async (city) => {
    const weatherData = await fetchWeatherData(city);
    setWeatherDatas(weatherData);
  };

  useEffect(() => {
    getWeatherData(city);
  },[]);
  
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

SearchCity.propTypes = {
  setWeatherDatas: PropTypes.func.isRequired,
}

export default SearchCity;
