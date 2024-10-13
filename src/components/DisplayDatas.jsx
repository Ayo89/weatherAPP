import Proptypes from "prop-types";

function DisplayDatas({ weatherDatas, temperature, checkClouds, checkRain }) {
  return (
    <section className="flex flex-row justify-around items-center py-[3rem] z-[25] -mt-[1rem] relative bg-customOrange text-white border-[1.8px] border-[rgba(0,0,0,.78)]  text-[1.5rem] tracking-[0.3rem] uppercase">
      <p>{weatherDatas && weatherDatas.name}</p>
      <p>{weatherDatas && temperature}°C</p>
      <p> {weatherDatas && checkClouds(weatherDatas.clouds.all)} </p>
      <p>{weatherDatas && `HUMIDITY: ${weatherDatas.main.humidity}%`}</p>
      <p>
        {weatherDatas &&
          weatherDatas.weather.map((element) => {
            return `RAIN: ${checkRain(element.id)}`;
          })}
      </p>
    </section>
  );
}

DisplayDatas.propTypes = {
  weatherDatas: Proptypes.object,
  temperature: Proptypes.number,
  checkClouds: Proptypes.func,
  checkRain: Proptypes.func,
};

export default DisplayDatas;
