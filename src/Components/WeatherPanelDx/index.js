import { useState, useEffect } from "react";
import WeatherDetailBox from "../WeatherDetailBox";
import { getLocalData } from "../../utils";
import "./styles.css";
/*
 *
 */
const WeatherPanelDx = ({ currentWeatherData }) => {
  const [currentData, setCurrentData] = useState([]);
  /*
   *
   */
  useEffect(() => {
    let {
      temp_max = null,
      temp_min = null,
      pressure = null,
    } = currentWeatherData?.main;
    const dataWeatherPanelDx = {
      temp_max,
      temp_min,
      pressure,
      sunrise: currentWeatherData.sys.sunrise,
      sunset: currentWeatherData.sys.sunset,
      windSpeed: currentWeatherData.wind.speed,
    };
    console.log(dataWeatherPanelDx);
    let weatherDataArray = [];
    weatherDataArray.push(
      {
        label: "Temp max",
        data: dataWeatherPanelDx.temp_max + " °",
      },
      { label: "Press Atm ", data: dataWeatherPanelDx.pressure + " hPa" },
      {
        label: "Alba",
        data: getLocalData(dataWeatherPanelDx.sunrise, { timeString: true }),
      },
      { label: "Temp min", data: dataWeatherPanelDx.temp_min + " °" },
      { label: "Vento", data: dataWeatherPanelDx.windSpeed + " ms" },
      {
        label: "Tramonto",
        data: getLocalData(dataWeatherPanelDx.sunset, { timeString: true }),
      }
    );
    setCurrentData(weatherDataArray);
  }, [currentWeatherData]);

  useEffect(() => {
    console.log(currentData);
  }, [currentData]);

  return (
    <div className="weatherPanelDxContainer">
      {currentData.map(({ data, label }, index) => (
        <WeatherDetailBox key={index} firstRow={data} secondRow={label} />
      ))}
    </div>
  );
};
/*
 *
 */
export default WeatherPanelDx;
