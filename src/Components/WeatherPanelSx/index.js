import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faCloudRain } from "@fortawesome/free-solid-svg-icons";
/*
 *
 */
const WeatherPanelSx = () => {
  return (
    <div className="weatherPanelSxContainer">
      <div className="iconContainer">
        <FontAwesomeIcon icon={faCloudRain} />
      </div>
      <div className="temContainer">
        <span className="temp">13°</span>
        <span id="weatherText">Clear sky</span>
      </div>
    </div>
  );
};
/*
 *
 */
export default WeatherPanelSx;
