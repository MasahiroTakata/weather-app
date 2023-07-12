import React, { useState } from 'react';
import styled from "styled-components";
import { Weather } from './Weather'; // 自分で作ったコンポーネント、もしくは「const」と宣言してるコンポーネントは{}が必要かも？
import ErrorBoundary from './ErrorBoundary'; // 「export default ErrorBoundary」とデフォルト設定しているから{}が不要かも？

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
        console.log(data['cod']); // {cod: '404', message: 'city not found'}
        setWeatherData(data);
        if(data['cod'] == 404){
          setErrorMessage('指定した都市が見つかりませんでした。');
          setWeatherData('');
        }
      } catch (error) {
        console.log("キャッチにいった"); // ここには飛ばず
        setWeatherData('');
        // console.error('Error fetching weather data:', error);
      }
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
        <CityText type="text" value={city} onChange={handleInputChange}/>
        <SButton onClick={handleButtonClick}>天気を表示</SButton>
      {errorMessage && <p>{errorMessage}</p>}
      <ErrorBoundary errorMessage="都市を入力してください。">
        {weatherData && <Weather data={weatherData} />}
      </ErrorBoundary>
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