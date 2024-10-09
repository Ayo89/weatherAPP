const weatherKey = import.meta.env.VITE_WEATHER_API_KEY;
const fetchWeatherData = async (city) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch ({error}) {
        console.error('There has been a problem with your fetch operation:', error);
    }
};

export default fetchWeatherData;