import { useEffect, useState } from "react";
import imgCloud from "../assets/cloud.png";
import PropTypes from "prop-types";

// Define las posiciones de las nubes fuera del componente
const cloudPositions = [
  { id: 1, position: "left-[69%]" },
  { id: 2, position: "left-[56%]" },
  { id: 3, position: "left-[36%]" },
  { id: 4, position: "left-[21%]" },
  { id: 5, position: "left-[1%]" },
];

function Clouds({ weatherDatas, checkClouds }) {
  const [cloudStates, setCloudStates] = useState([]);

  const checkNumberClouds = (typeClouds) => {
    if (typeClouds === "CLEAR") return 0;
    if (typeClouds === "PARTIALLY CLOUDS") return 2;
    if (typeClouds === "CLOUDY") return 3;
    if (typeClouds === "OVERCAST") return 5;
  };

  const initializeClouds = () => {
    const initialStates = cloudPositions.map((cloud) => ({
      ...cloud,
      visible: false,
      className: "opacity-0",
    }));
    setCloudStates(initialStates);
  };

  const updateCloudsVisibility = (cloudsCount) => {
    const updatedStates = cloudStates.map((cloud, index) => {
      // Lógica para mostrar nubes específicas según el tipo de clima
      let isVisible = false;
      if (cloudsCount === 2) {
        isVisible = index === 1 || index === 3; // Nubes específicas para "PARTIALLY CLOUDS"
      } else if (cloudsCount === 3) {
        isVisible = index === 0 || index === 2 || index === 4; // Nubes específicas para "CLOUDY"
      } else if (cloudsCount === 5) {
        isVisible = true; // Todas las nubes visibles para "OVERCAST"
      }

      return {
        ...cloud,
        visible: isVisible,
        className: isVisible
          ? "animate-moveCloudRight"
          : "animate-moveCloudLeft",
      };
    });
    setCloudStates(updatedStates);
  };

  useEffect(() => {
    initializeClouds();
  }, []);

  useEffect(() => {
    if (weatherDatas) {
      const cloudsCount = checkNumberClouds(
        checkClouds(weatherDatas?.clouds.all)
      );
      updateCloudsVisibility(cloudsCount);
    }
  }, [weatherDatas]);

  return (
    <>
      {cloudStates.map((cloud) => (
        <img
          key={cloud.id}
          className={`${cloud.className} ${
            weatherDatas && weatherDatas.rain ? "cloud-dark" : ""
          } cloud absolute w-[30%] z-20 top-[1%] ${cloud.position}`}
          src={imgCloud}
          alt="imagen de una nube"
        />
      ))}
    </>
  );
}

Clouds.propTypes = {
  weatherDatas: PropTypes.object,
  checkClouds: PropTypes.func,
  reset: PropTypes.string,
  setReset: PropTypes.func,
  prevWeatherDatas: PropTypes.object,
};

export default Clouds;
