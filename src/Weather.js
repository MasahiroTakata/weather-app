import React from 'react';

export const Weather = ({ data }) => {
  if (data.cod === '404') {
    return '入力した都市が見つかりませんでした。';
  }
  const { name, weather, main } = data;
  const temperature = Math.round(main.temp - 273.15); // Convert temperature from Kelvin to Celsius
  return (
    <div>
      <h2>{name}</h2>
      <p>天気: {weather[0].description}</p>
      <p>気温: {temperature}°C</p>
    </div>
  );
};