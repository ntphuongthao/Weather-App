import './CurrentWeather.css';

const CurrentWeather = ({ temperatureUnit, currentWeather, future }) => {
  const {
    day,
    hour,
    date,
    astro,
  } = currentWeather;

  const {
    avghumidity: humidity,
    avgtemp_c: celsius,
    avgtemp_f: fahrenheit,
    condition,
    maxtemp_c: maxCelsius,
    maxtemp_f: maxFahrenheit,
    mintemp_c: minCelsius,
    mintemp_f: minFahrenheit,
    uv,
    maxwind_kph: maxWindKPH,
  } = day;

  const {
    icon,
    text,
  } = condition;

  const averageTemp = temperatureUnit === "c" ? celsius : fahrenheit;
  const maxTemp = temperatureUnit === "c" ? maxCelsius : maxFahrenheit;
  const minTemp = temperatureUnit === "c" ? minCelsius: minFahrenheit;

  function datetimeToWeekday(datetimeString) {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(datetimeString);
    return weekdays[date.getDay()];
  }

  return (
    <div className="scroll-item">
      <h3>{datetimeToWeekday(date)} {future ? "(Next week)" : ""}</h3>
      <div id="card" className="weather flex">
        <div className="details">
          <div className="temp">
            {Math.round(averageTemp)}
            <span>&deg;</span>
          </div>
          <div className="right">
            <div id="summary">{text}</div>
          </div>
        </div>

        <img alt="weather image" src={icon} />
        <div className="infos">
          <div className="humidity">Humidity {humidity}%</div>
          <img
            alt="windspeed1"
            src="wind.svg"
            height="40px"
          />
          <div className="windspeed">Wind Speed {maxWindKPH} km</div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;