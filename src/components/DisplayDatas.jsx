import Proptypes from "prop-types";

function DisplayDatas({ weatherDatas }) {
  console.log(weatherDatas);

  const kelvinToCelsius = (kelvin) => {
    return Math.round(kelvin - 273.15);
  };

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

  return (
    <section className="flex flex-row justify-around items-center  w-full h-16 bg-customOrange text-white border-2 border-gray-700 -mt-1">
      <p>{weatherDatas && weatherDatas.name.toUpperCase()}</p>
      <p>{weatherDatas && kelvinToCelsius(weatherDatas.main.temp)}°C</p>
      <p> {weatherDatas && checkClouds(weatherDatas.clouds.all)} </p>
      <p>{weatherDatas && weatherDatas.main.humidity}%</p>
      <p>
        {weatherDatas && !weatherDatas.rain
          ? "RAIN: Unlikely".toUpperCase()
          : "RAIN: highly probable".toUpperCase()}
      </p>
    </section>
  );
}

DisplayDatas.propTypes = {
  weatherDatas: Proptypes.object,
};

export default DisplayDatas;
