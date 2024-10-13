import { useEffect, useState } from "react";
import imgCloud from "../assets/cloud.png";
import PropTypes from "prop-types";

function Clouds({ weatherDatas, checkClouds }) {
  const [reset, setReset] = useState("animate-moveCloudRight");

  // Posiciones iniciales de las nubes
  const cloudPositions = [
    { id: 1, position: "left-[0.5%]" },
    { id: 2, position: "left-[17%]" },
    { id: 3, position: "left-[34%]" },
    { id: 4, position: "left-[51%]" },
    { id: 5, position: "left-[69.5%]" },
  ];
  const centralIndex = Math.floor(cloudPositions.length / 2);

  //reset animate
  useEffect(() => {
    setReset("animate-moveCloudRight");
    const timeout = setTimeout(() => {
      setReset("");
    }, 1000);
    return () => clearTimeout(timeout); // Cleanup del timeout
  }, [weatherDatas]);

  return (
    <>
      {weatherDatas && weatherDatas.clouds.all > 0 ? (
        <>
          {["FEW CLOUDS", "PARTIALLY CLOUDS"].includes(
            checkClouds(weatherDatas.clouds.all)
          )
            ? // Mostrar nubes excluyendo la primera y la última
              cloudPositions.filter((cloud, index) => ( index !== 0 &&  index !== centralIndex && index !== cloudPositions.length -1)).map((cloud) => (
                <img
                  key={cloud.id}
                  className={`
                  ${
                    weatherDatas.rain ? "cloud-dark" : ""
                  } cloud ${reset} absolute w-[30%] z-20 top-[1%] ${
                    cloud.position
                  }`}
                  src={imgCloud}
                  alt="imagen de una nube, picture of cloud"
                />
              ))
            : // Mostrar todas las nubes
              cloudPositions.map((cloud) => (
                <img
                  key={cloud.id}
                  className={`
                  ${
                    weatherDatas.rain ? "cloud-dark" : ""
                  } cloud ${reset} absolute w-[30%] z-20 top-[1%] ${
                    cloud.position
                  }`}
                  src={imgCloud}
                  alt="imagen de una nube, picture of cloud"
                />
              ))}
        </>
      ) : null}
    </>
  );
}

Clouds.propTypes = {
  weatherDatas: PropTypes.object,
  checkClouds: PropTypes.func,
};

export default Clouds;
