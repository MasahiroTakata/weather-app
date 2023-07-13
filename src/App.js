import React, { useState } from 'react';
import styled from "styled-components";
import { Weather } from './Weather'; // 自分で作ったコンポーネント、もしくは「const」と宣言してるコンポーネントは{}が必要かも？

export const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleButtonClick = async (e) => {
    if (city.trim() === '') {
      setErrorMessage('テキストを入力してください。');
      setWeatherData('');
    } else {
      setErrorMessage('');
      try {
        const apiKey = process.env.REACT_APP_API_KEY;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        setWeatherData('');
      }
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
        <CityText type="text" value={city} onChange={handleInputChange}/>
        <SButton onClick={handleButtonClick}>天気を表示</SButton>
        {errorMessage && <p>{errorMessage}</p>}
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