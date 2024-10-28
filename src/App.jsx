import "./App.css";
import sun from "./assets/sun.png";
import City from "./components/City";
import DisplayData from "./components/DisplayDatas";
import SearchCity from "./components/SearchCity";
import fetchWeatherData from "./services/weather";
import Clouds from "./components/Clouds";
import Loading from "./components/Loading";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

function App() {
  const [showRain, setShowRain] = useState(false);
  const [weatherDatas, setWeatherDatas] = useState(undefined);
  const [prevWeatherDatas, setPrevWeatherDatas] = useState(undefined);
  const [temperature, setTemperature] = useState(undefined);
  const [resetSun, setResetSun] = useState("animate-moveSun");
  const [displaySun, setDisplaySun] = useState(false);
  const [reset, setReset] = useState("");
  const [showClouds, setShowClouds] = useState(false);
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
console.log(weatherDatas)
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
    let remainingTime = 0;
    const start = performance.now();
    setIsLoading(true);

    const weatherData = await fetchWeatherData(city);
    const end = performance.now();
    let awaitTime = end - start;
    if (awaitTime >= 1000) {
      remainingTime = awaitTime;
    } else {
      remainingTime = Math.max(0, 1000 - awaitTime);
    }
    await new Promise((resolve) => {
      setTimeout(resolve, remainingTime);
    });
    setWeatherDatas(weatherData);
    setPrevWeatherDatas(weatherDatas);
    setIsLoading(false);
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
  useEffect(() => {}, []);

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

  const checkSun = async () => {
    if (weatherDatas) {
      if (
        !(
          checkClouds(weatherDatas.clouds.all) === "OVERCAST" ||
          weatherDatas.rain
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
    setTimeout(() => {
      setShowRain(true);
    }, 1000);
    setShowRain(false);
  }, [weatherDatas]);

  //animation for sun
  useEffect(() => {
    checkSun();
  }, [weatherDatas]);
  console.log(weatherDatas);
  return (
    <>
      <main className="w-[50%] max-[1250px]:w-[65%] max-[900px]:w-[75%] max-[650px]:w-full min-w-[280px] my-[4rem] mx-auto pb-[15rem] text-center">
        <section className="overflow-hidden w-full relative tracking-wide">
          <Loading isLoading={isLoading} />
          <Clouds
            showClouds={showClouds}
            setShowClouds={setShowClouds}
            prevWeatherDatas={prevWeatherDatas}
            weatherDatas={weatherDatas}
            checkClouds={checkClouds}
            reset={reset}
            setReset={setReset}
          />
          {weatherDatas && weatherDatas.rain && showRain && (
            <div className="rain animate-rainScroll"></div>
          )}
          {weatherDatas && displaySun && (
            <img
              src={sun}
              alt="Sun image, imagen de un sol"
              className={`absolute -top-[10rem] -right-[10rem] ${
                temperature < 25 ? "w-[20rem]" : "w-[24rem]"
              } ${resetSun} transition-all duration-[1200ms] linear`}
            />
          )}

          <City />
          <DisplayData
            weatherDatas={weatherDatas}
            temperature={temperature}
            checkClouds={checkClouds}
            checkRain={checkRain}
          />
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

export default App;
