import PropTypes from "prop-types";

function SearchCity({ city, setCity, getWeatherData }) {
  function handleCity(e) {
    setCity(e.target.value);
  }

  return (
    <form
      className="bg-blue-300 px-[3rem] py-[4rem] flex flex-row items-center justify-around border-[1.8px] border-black border-t-[0]"
      action="submit"
      onSubmit={(e) => {
        e.preventDefault();
        getWeatherData(city);
      }}
    >
      <input
        className="px-[4rem] py-[1rem] rounded-lg text-[2rem] w-[30%] uppercase "
        type="text"
        name="location"
        placeholder="ENTER A CITY"
        onChange={handleCity}
      />
      <button className=" bg-customGreen rounded-[15px] p-1 text-white text-[2rem] px-[2rem] py-[1rem] tracking-[0.2rem]">
        CHECK WEATHER &rarr;
      </button>
    </form>
  );
}

SearchCity.propTypes = {
  setWeatherDatas: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  setCity: PropTypes.func.isRequired,
  getWeatherData: PropTypes.func.isRequired,
};

export default SearchCity;
