import React, { useState } from "react";
import axios from "axios";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = "b6393e616b5d02fc3bdd3fa313d9d494";

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&cnt=7`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Errore nella ricerca del meteo:", error);
      setWeatherData(null);
    }
  };

  return (
    <div>
      <h1>Meteo App</h1>
      <input
        type="text"
        placeholder="Inserisci il nome della città"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Cerca</button>
      {weatherData && (
        <div>
          <h2>{weatherData.city.name}</h2>
          <ul>
            {weatherData.list.map((forecast) => (
              <li key={forecast.dt}>
                <p>Data e Ora: {new Date(forecast.dt * 1000).toLocaleString()}</p>
                <p>Temperatura: {forecast.main.temp}°C</p>
                <p>{forecast.weather[0].description}</p>
                <i className={`wi wi-owm-${forecast.weather[0].id}`} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
