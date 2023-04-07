import './App.css';
import { useState } from 'react';
const VITE_WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
import LocationSearch from './components/LocationSearch';
import CurrentWeather from './components/CurrentWeather';

function App() {
  const [selection, setSelection] = useState("");
  const [location, setLocation] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [temperatureUnit, setTemperatureUnit] = useState("c");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selection !== "") fetchData();
  }

  const fetchData = async () => {
    const API_URL=`https://api.weatherapi.com/v1/current.json?key=${VITE_WEATHER_API_KEY}&q=${selection}`
    const response = await fetch(API_URL);
    const json = await response.json();

    setLocation(json.location);
    setCurrentWeather(json.current);
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

      {location && currentWeather && (
        <CurrentWeather
          temperatureUnit={temperatureUnit}
          location={location}
          currentWeather={currentWeather}
        />
      )}
    </div>
  );
}

export default App;
