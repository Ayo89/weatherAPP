import "./App.css";
import City from "./components/City/City";
import DisplayData from "./components/City/weatherDatas";
import SearchCity from "./components/SearchCity";

function App() {
  return (
    <>
      <main className="w-screen h-screen flex flex-row justify-center items-center">
        <section className="overflow-hidden w-full h-auto max-w-[900px] object-contain">
          <City />
          <DisplayData />
          <SearchCity />
        </section>
      </main>
    </>
  );
}

export default App;
