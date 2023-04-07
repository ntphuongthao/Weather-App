import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line
} from "recharts";
const VITE_WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
import { useEffect, useState } from "react";

const WeatherChart = ({ selection }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getData() {
      const now = new Date();
      const historyRecords = [];
  
      // Get 5 days before today
      for (let day = 1; day <= 20; day++) {
        const dayTime = new Date(now - 24 * 60 * 60 * 1000 * day);
        const dayTimeFormatted = dayTime.toISOString().slice(0, 10);
        const apiUrl = `http://api.weatherapi.com/v1/history.json?key=${VITE_WEATHER_API_KEY}&q=${selection}&dt=${dayTimeFormatted}`;
  
        const response = await fetch(apiUrl);
        const data = await response.json();
        const forecast = Math.round(data.forecast.forecastday[0].day.avgtemp_c);
        historyRecords.push({"temperature": forecast});
      }

      setData(historyRecords);
    }

    getData();
  }, []);  
  
  return (
    <div>
      <p>Some Chart</p>
      <LineChart width={1000} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        {/* <XAxis dataKey="date" /> */}
        <YAxis dataKey="temperature"/>
        <Tooltip />
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}

export default WeatherChart;