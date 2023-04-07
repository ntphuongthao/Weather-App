import './App.css';
import { useState } from 'react';
const VITE_WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
import LocationSearch from './components/LocationSearch';
import CurrentWeather from './components/CurrentWeather';
import CenteredScrollBar from './components/CenteredScrollBar';

const App = () => {
  const [selection, setSelection] = useState("");
  const [location, setLocation] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [temperatureUnit, setTemperatureUnit] = useState("c");
  const [history, setHistory] = useState(null);
  const [future, setFuture] = useState(null);

  async function getWeatherHistory(location) {
    const now = new Date();
    const historyRecords = [];
    const futureRecords = [];

    // Get 5 days before today
    for (let day = 1; day <= 3; day++) {
      const dayTime = new Date(now - 24 * 60 * 60 * 1000 * day);
      const dayTimeFormatted = dayTime.toISOString().slice(0, 10);
      const apiUrl = `http://api.weatherapi.com/v1/history.json?key=${VITE_WEATHER_API_KEY}&q=${selection}&dt=${dayTimeFormatted}`;

      const response = await fetch(apiUrl);
      const data = await response.json();
      const forecast = data.forecast.forecastday[0];
      historyRecords.push(forecast);
    }
    
    // Get 1 week forecast after today
    const dayTime = new Date();
    dayTime.setTime(now.getTime() + (24 * 60 * 60 * 1000));
    const dayTimeFormatted = dayTime.toISOString().slice(0, 10);
    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${VITE_WEATHER_API_KEY}&q=${selection}&dt=${dayTimeFormatted}`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    const forecast = data.forecast.forecastday[0];
    futureRecords.push(forecast);

    setHistory(historyRecords);
    setFuture(futureRecords);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selection !== "") fetchData();
  }

  const fetchData = async () => {
    const currentTime = new Date();
    const currentTimeFormatted = currentTime.toISOString().slice(0, 10);
    const apiUrl = `http://api.weatherapi.com/v1/history.json?key=${VITE_WEATHER_API_KEY}&q=${selection}&dt=${currentTimeFormatted}`;
    const response = await fetch(apiUrl);
    const json = await response.json();

    setLocation(json.location);
    setCurrentWeather(json.forecast.forecastday[0]);
    getWeatherHistory(location);
  }

  const handleTemperatureChange = (e) => {
    setTemperatureUnit(e.target.value);
  }

  return (
    <div className="App">
      <h1>WEATHER FORECAST APPLICATION</h1>
      <p>(This app is still under development and limited API 
        calls so that only locations in the United States and 
        Vietnam can be be shown now.)
      </p>

      <LocationSearch 
        selection={selection}
        setSelection={setSelection}
        handleSubmit={handleSubmit}
      />
      <select value={temperatureUnit} onChange={handleTemperatureChange}>
        <option value="c">Celsius</option>
        <option value="f">Fahrenheit</option>
      </select>
      {location && (
        <>
          <h2>{location.date}</h2>
          <h3>{location.name}, {location.region}</h3>
          <h3>{location.country}</h3>
        </>
      )}
      
      <div className="flex scroll-container">
        {location && currentWeather && history && future && (
          <>
            {history.map((day) => (
              <CurrentWeather 
                future={false}
                key={day.date}
                temperatureUnit={temperatureUnit}
                currentWeather={day}
              />
            ))}
            <CurrentWeather
              future={false}
              key={new Date()}
              temperatureUnit={temperatureUnit}
              currentWeather={currentWeather}
            />
            {future.map((day) => (
              <CurrentWeather
                future={true}
                key={day.date}
                temperatureUnit={temperatureUnit}
                currentWeather={day}
              />
            ))}
          </>
        )}
      </div>
      {/* <CenteredScrollBar /> */}
    </div>
  );
}


export default App;
