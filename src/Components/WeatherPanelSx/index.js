import "./styles.css";
import { useCallback } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faPooStorm,
  faSmog,
} from "@fortawesome/free-solid-svg-icons";
/*
 *
 */
const WeatherPanelSx = ({ temp, description, mainCondition }) => {
  /*
   *
   * @returns
   */
  const handlerWeatherIcons = useCallback(() => {
    switch (mainCondition) {
      case "Clear":
        return faSun;
      case "Thunderstorm":
        return faPooStorm;
      case "Drizzle":
        return faCloudRain;
      case "Rain":
        return faCloudShowersHeavy;
      case "Snow":
        return faSnowflake;
      case "Clouds":
        return faCloud;
      default:
        return faSmog;
    }
  }, [mainCondition]);
  /*
   *
   */
  return (
    <div className="weatherPanelSxContainer">
      <div className="iconContainer">
        <FontAwesomeIcon icon={handlerWeatherIcons()} />
      </div>
      <div className="temContainer">
        <span className="temp">{temp.toFixed(1)}°</span>
        <span id="weatherText">{description}</span>
      </div>
    </div>
  );
};
/*
 *
 */
export default WeatherPanelSx;
