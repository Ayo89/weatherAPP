import "./App.css";
import City from "./components/City";
import DisplayData from "./components/DisplayDatas";
import SearchCity from "./components/SearchCity";
import { useState } from "react";

function App() {
  const [weatherDatas, setWeatherDatas] = useState(undefined);

  return (
    <>
      <main className="w-screen h-screen flex flex-row justify-center items-center">
        <section className="overflow-hidden w-full h-auto max-w-[900px] object-contain">
          <City />
          <DisplayData weatherDatas={weatherDatas}/>
          <SearchCity setWeatherDatas={setWeatherDatas}/>
        </section>
      </main>
    </>
  );
}

export default App;
