import React, { useState } from 'react';
import { Weather } from './Weather'; // 自分で作ったコンポーネントは{}が必要かも？

export const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={city} onChange={handleInputChange} />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData && <Weather data={weatherData} />}
    </div>
  );
};
