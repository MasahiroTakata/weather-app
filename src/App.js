import React, { useState } from 'react';
import styled from "styled-components";
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
        <CityText type="text" value={city} onChange={handleInputChange}/>
        <SButton type="submit">天気を表示</SButton>
      </form>
      {weatherData && <Weather data={weatherData} />}
    </div>
  );
};

const SButton = styled.button`
  margin-left: 16px;
`;

const CityText = styled.input`
  width: 200px;
  height: 20px;
`;