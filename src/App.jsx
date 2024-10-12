import "./App.css";
import sun from "./assets/sun.png";
import City from "./components/City";
import DisplayData from "./components/DisplayDatas";
import SearchCity from "./components/SearchCity";
import fetchWeatherData from "./services/weather";
import Clouds from "./components/Clouds";
import { useEffect, useState } from "react";

function App() {
  const [showRain, setShowRain] = useState(false);
  const [weatherDatas, setWeatherDatas] = useState(undefined);
  const [temperature, setTemperature] = useState(undefined);
  const [city, setCity] = useState("Madrid");

  const kelvinToCelsius = (kelvin) => {
    return Math.round(kelvin - 273.15);
  };

  const getTemperature = (temperature) => {
    setTemperature(kelvinToCelsius(temperature));
  };

  //-- Get Weather Datas ----
  const getWeatherData = async (city) => {
    const weatherData = await fetchWeatherData(city);
    setWeatherDatas(weatherData);
  };

  useEffect(() => {
    getWeatherData(city);
  }, []);

  //---Get temperature ----
  useEffect(() => {
    if (weatherDatas) {
      getTemperature(weatherDatas.main.temp);
    }
  }, [weatherDatas]);

  //---Check clouds ---
  const checkClouds = (clouds) => {
    if (clouds <= 10) {
      return "CLEAR";
    } else if (clouds > 10 && clouds <= 40) {
      return "PARTIALLY CLOUDY";
    } else if (clouds > 40 && clouds < 70) {
      return "CLOUDY";
    } else if (clouds > 70) {
      return "OVERCAST";
    }
  };

  //timer for rain
  useEffect(() => {
    setTimeout(() => {
      setShowRain(true);
    }, 1000);
    setShowRain(false);
  }, [weatherDatas]);
  return (
    <>
      <main className="w-[50%] max-[1250px]:w-[65%] max-[900px]:w-[75%] max-[650px]:w-full min-w-[280px] my-[4rem] mx-auto pb-[15rem] text-center">
        <section className="overflow-hidden w-full relative tracking-wide">
          <Clouds weatherDatas={weatherDatas} checkClouds={checkClouds} />
          {weatherDatas && weatherDatas.rain && showRain && (
            <div className="rain animate-rainScroll"></div>
          )}
          <img
            src={sun}
            alt="Sun image, imagen de un sol"
            className={`absolute ${
              kelvinToCelsius(weatherDatas && weatherDatas.main.temp) > 25
                ? "w-[30rem]"
                : "w-[20rem]"
            }  -top-[10rem] -right-[10rem] animate-roundSun   transition-all duration-[1.2s] ease-linear
`}
          />

          <City />
          <DisplayData
            weatherDatas={weatherDatas}
            temperature={temperature}
            checkClouds={checkClouds}
          />
        </section>
        <SearchCity
          setWeatherDatas={setWeatherDatas}
          city={city}
          setCity={setCity}
          getWeatherData={getWeatherData}
        />
      </main>
    </>
  );
}

export default App;
