import "./App.css";
import sun from "./assets/sun.png";
import City from "./components/City";
import DisplayData from "./components/DisplayDatas";
import SearchCity from "./components/SearchCity";
import fetchWeatherData from "./services/weather";
import Clouds from "./components/Clouds";
import Loading from "./components/Loading";
import Footer from "./components/Footer";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function App({ initialWeatherDatas }) {
  const [showRain, setShowRain] = useState(false);
  const [weatherDatas, setWeatherDatas] = useState(undefined);
  const [temperature, setTemperature] = useState(undefined);
  const [resetSun, setResetSun] = useState("animate-moveSun");
  const [displaySun, setDisplaySun] = useState(false);
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filterDarkness, setFilterDarkness] = useState("");
  const [error, setError] = useState(null);
  const [initialDatas, setInitialDatas] = useState(initialWeatherDatas);

  const kelvinToCelsius = (kelvin) => {
    return Math.round(kelvin - 273.15);
  };

  const createDelay = async (time) => {
    await new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  };

  const getTemperature = (temperature) => {
    setTemperature(kelvinToCelsius(temperature));
  };

  //-- Get Weather Datas ----
  const getWeatherData = async (city) => {
    console.log(initialDatas);
    if (initialDatas) {
      setWeatherDatas(initialDatas);
      setInitialDatas(undefined);
    } else {
      setIsLoading(true);
      try {
        const weatherData = await fetchWeatherData(city);
        setWeatherDatas(weatherData);
        setError(false);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    getWeatherData(city);
  }, []);
  //---Get weather data ----
  //---Get temperature ----
  useEffect(() => {
    if (weatherDatas) {
      getTemperature(weatherDatas.main.temp);
    }
  }, [weatherDatas]);

  //---Check clouds ---
  const checkClouds = (clouds) => {
    if (clouds <= 20) {
      return "CLEAR";
    } else if (clouds >= 21 && clouds < 50) {
      return "PARTIALLY CLOUDS";
    } else if (clouds >= 50 && clouds <= 74) {
      return "CLOUDY";
    } else if (clouds >= 75) {
      return "OVERCAST";
    }
  };

  //---Check rain ---
  const checkRain = (rain) => {
    switch (rain) {
      case 500:
        return "LIGHT RAIN";
      case 501:
        return "MODERATE RAIN";
      case 502:
        return "HEAVY INTENSITY RAIN";
      case 503:
        return "VERY HEAVY RAIN";
      case 504:
        return "EXTREME RAIN";
      case 511:
        return "FREEZING RAIN";
      case 520:
        return "LIGHT INTENSITY SHOWER RAIN";
      case 521:
        return "SHOWER RAIN";
      case 522:
        return "HEAVY INTENSITY SHOWER RAIN";
      case 531:
        return "RAGGED SHOWER RAIN";
      default:
        return "UNLIKELY";
    }
  };

  //---Check sun ---
  const checkSun = async () => {
    if (weatherDatas) {
      if (
        !(
          checkClouds(weatherDatas.clouds.all) === "OVERCAST" ||
          weatherDatas.rain ||
          error
        )
      ) {
        setDisplaySun(true);
        if (!displaySun) {
          setResetSun("animate-moveSun");
          await createDelay(1200);
          setResetSun("animate-roundSun");
        }
      } else {
        setDisplaySun(false);
      }
    }
  };

  //timer for rain
  useEffect(() => {
    if (weatherDatas && weatherDatas.rain) {
      setTimeout(() => {
        setShowRain(true);
      }, 1200);
    } else {
      setShowRain(false);
    }
  }, [weatherDatas]);

  //filter dark for the section vector and  clouds
  const filterDark = () => {
    if (
      (weatherDatas && weatherDatas.rain) ||
      checkClouds(weatherDatas?.clouds.all) === "OVERCAST"
    ) {
      setFilterDarkness("filter-dark transition-all duration-[1200ms] linear");
    } else {
      setFilterDarkness("opacity-0 transition-all duration-[1200ms] linear");
    }
  };

  //animation for sun
  useEffect(() => {
    if (weatherDatas) {
      checkSun();
      filterDark();
    }
  }, [weatherDatas, error]);

  return (
    <>
      <main className="w-[50%] max-[1250px]:w-[65%] max-[900px]:w-[75%] max-[650px]:w-full min-w-[280px] my-[4rem] mx-auto pb-[15rem] text-center">
        <section className={`overflow-hidden w-full relative tracking-wide`}>
          <City />
          <Loading isLoading={isLoading} />
          <Clouds
            error={error}
            setError={setError}
            weatherDatas={weatherDatas}
            checkClouds={checkClouds}
            filterDarkness={filterDarkness}
          />
          {weatherDatas &&
            weatherDatas.rain &&
            showRain &&
            checkClouds(weatherDatas.clouds.all) === "OVERCAST" &&
            !error && <div className="rain animate-rainScroll"></div>}
          {weatherDatas && displaySun && (
            <img
              src={sun}
              alt="Sun image, imagen de un sol"
              className={`absolute  ${
                temperature < 25
                  ? "w-[25%] -top-[15%] -right-[10%]"
                  : "w-[45%] -top-[20%] -right-[15%]"
              } ${resetSun} transition-all duration-[1200ms] linear`}
            />
          )}

          <DisplayData
            error={error}
            weatherDatas={weatherDatas}
            temperature={temperature}
            checkClouds={checkClouds}
            checkRain={checkRain}
          />
          {weatherDatas &&
            checkClouds(weatherDatas.clouds.all) === "OVERCAST" &&
            !error && <div className={`${filterDarkness}`}></div>}
        </section>
        <SearchCity
          setWeatherDatas={setWeatherDatas}
          city={city}
          setCity={setCity}
          getWeatherData={getWeatherData}
        />
      </main>
      <Footer />
    </>
  );
}

App.propTypes = {
  initialWeatherDatas: PropTypes.object,
};
export default App;
