import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faCloudRain } from "@fortawesome/free-solid-svg-icons";
/*
 *
 */
const WeatherPanelSx = ({ temp, description }) => {
  return (
    <div className="weatherPanelSxContainer">
      <div className="iconContainer">
        <FontAwesomeIcon icon={faCloudRain} />
      </div>
      <div className="temContainer">
        <span className="temp">{temp}°</span>
        <span id="weatherText">{description}</span>
      </div>
    </div>
  );
};
/*
 *
 */
export default WeatherPanelSx;
