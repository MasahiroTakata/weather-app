import React from 'react';

export const Weather = ({ data }) => {
  const { name, weather, main } = data;
  const temperature = Math.round(main.temp - 273.15); // Convert temperature from Kelvin to Celsius

  return (
    <div>
      <h2>{name}</h2>
      <p>Weather: {weather[0].description}</p>
      <p>Temperature: {temperature}°C</p>
    </div>
  );
};