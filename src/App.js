/*
 * react import
 */
import { useEffect, useState } from "react";
import "./App.css";
import WeatherApp from "./Components/WeatherApp";
import { apiKey } from "./apiKey";
const host = "https://api.openweathermap.org";

/*
 *
 */
function App() {
  const [weatherData, setWeatherData] = useState({
    code: null,
  });
  const { fetchedWeatherData, currentWeatherData, code } = weatherData;

  /*
   *
   */
  useEffect(() => {}, [weatherData]);
  /*
   *
   *
  useEffect(() => {

  }, []);
  /*
   *
   */
  return (
    <WeatherApp
      fetchedWeatherData={fetchedWeatherData}
      currentWeatherData={currentWeatherData}
      code={code}
    />
  );
}
/*
 *
 */
export default App;
