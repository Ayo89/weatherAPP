import { useEffect, useState } from "react";
import imgCloud from "../assets/cloud.png";
import PropTypes from "prop-types";

function Clouds({ weatherDatas, checkClouds }) {
  const [reset, setReset] = useState("animate-moveCloudRight");


  let startCloud = {
    cloud1: "left-[0.5%]",
    cloud2: "left-[17%]",
    cloud3: "left-[34%]",
    cloud4: "left-[51%]",
    cloud5: "left-[69.5%]",
  };
  console.log(startCloud[1]);
  useEffect(() => {
    setReset("animate-moveCloudRight");
    setTimeout(() => {
      setReset("");
    }, 1000);
  }, [weatherDatas]);

  return (
    <>
      {weatherDatas && weatherDatas.clouds.all > 0 ? (
        <>
          <img
            className={`
          ${
            weatherDatas && weatherDatas.rain && "cloud-dark"
          }  cloud  ${reset} absolute w-[30%] z-20 top-[1%] ${
              startCloud.cloud1
            }`}
            src={imgCloud}
            alt="imagen de una nube, picture of cloud"
          />
          <img
            className={`
          ${
            weatherDatas && weatherDatas.rain && "cloud-dark"
          } cloud ${reset} absolute w-[30%] z-20 top-[1%] ] ${
              startCloud.cloud2
            }`}
            src={imgCloud}
            alt="imagen de una nube, picture of cloud"
          />
          <img
            className={`
          ${
            weatherDatas && weatherDatas.rain && "cloud-dark"
          } cloud ${reset} absolute w-[30%] z-20 top-[1%] ${startCloud.cloud3}`}
            src={imgCloud}
            alt="imagen de una nube, picture of cloud"
          />
          <img
            className={`
          ${
            weatherDatas && weatherDatas.rain && "cloud-dark"
          } cloud ${reset} absolute w-[30%] z-20 top-[1%] ${startCloud.cloud4}`}
            src={imgCloud}
            alt="imagen de una nube, picture of cloud"
          />
          <img
            className={`
          ${
            weatherDatas && weatherDatas.rain && "cloud-dark"
          } cloud ${reset} absolute w-[30%] z-20 top-[1%] ${startCloud.cloud5}`}
            src={imgCloud}
            alt="imagen de una nube, picture of cloud"
          />
        </>
      ) : <></>}
    </>
  );
}

Clouds.propTypes = {
  weatherDatas: PropTypes.object,
  checkClouds: PropTypes.func,
};


export default Clouds;
