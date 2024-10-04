import React from "react";

function SearchCity() {
  function handleSearchCity (event) {
    console.log(event)
  }

  return (
    <section className="bg-blue-300 h-20 ">
      <form
        className="h-full flex flex-row items-center justify-around"
        action="submit"
      >
        <input
          className="pl-6 py-2 rounded-lg"
          type="text"
          placeholder="ENTER A CITY"
        />
        <button
          className="w-56 bg-customGreen rounded-lg p-1 text-white "
          onClick={handleSearchCity}
        >
          CHECK WEATHER &rarr;
        </button>
      </form>
    </section>
  );
}

export default SearchCity;
