import './CurrentWeather.css';

const CurrentWeather = ({ temperatureUnit, location, currentWeather }) => {
  const {
    condition,
    last_updated: lastUpdated,
    cloud,
    humidity,
    temp_c: celcius,
    temp_f: fahrenheit,
    uv,
    feelslike_c: feelsLikeCelsius,
    feelslike_f: feelsLikeFahrenheit,
  } = currentWeather;

  const { text: weatherDescription, icon } = condition;
  const currentTemp = temperatureUnit === "c" ? celcius + " C": fahrenheit + " F";
  const currentFeelsLike = temperatureUnit === "c" ? feelsLikeCelsius + " C": feelsLikeFahrenheit + " F";

  return (
    <div>
      <p>Last Updated: {lastUpdated}</p>
      <div className="flex">
        <table>
          <tr>
            <th>Current Temperature</th>
            <td>{currentTemp}</td>
          </tr>
          <tr>
            <th>Feels like</th>
            <td>{currentFeelsLike}</td>
          </tr>
        </table>
      </div>
      <h3>Weather Description: {weatherDescription}</h3>
      <img src={icon} alt="Icon for the current weather" />

    </div>
  );
}

export default CurrentWeather;