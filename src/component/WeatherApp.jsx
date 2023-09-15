import React, { useState, useEffect } from "react";
import axios from "axios";
import "weather-icons/css/weather-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState([]);

  const apiKey = "b6393e616b5d02fc3bdd3fa313d9d494";

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&cnt=40`
      );

      const dailyForecasts = [];
      let currentDate = null;

      response.data.list.forEach((forecast) => {
        const forecastDate = new Date(forecast.dt * 1000).toLocaleDateString();
        if (forecastDate !== currentDate) {
          dailyForecasts.push({
            date: forecastDate,
            temperature: forecast.main.temp,
            description: forecast.weather[0].description,
            iconId: forecast.weather[0].id,
          });
          currentDate = forecastDate;
        }
      });

      setWeatherData(dailyForecasts.slice(0, 5));
    } catch (error) {
      console.error("Errore nella ricerca delle previsioni del tempo:", error);
      setWeatherData([]);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-4">Meteo App</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Inserisci il nome della città"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="form-control"
        />
        <button onClick={handleSearch} className="btn btn-primary mt-2">
          Cerca
        </button>
      </div>
      <div className="row">
        {weatherData.map((forecast) => (
          <div key={forecast.date} className="col-md-2">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{forecast.date}</h5>
                <p className="card-text">Temperatura: {forecast.temperature}°C</p>
                <p className="card-text">{forecast.description}</p>
                <i className={`wi wi-owm-${forecast.iconId}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherApp;
