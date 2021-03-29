import "./styles.css";
import ForecastCard from "./ForecastCard";
/*
 *
 */
const ForecastPanel = ({ forecastWeather }) => {
  const { hourly } = forecastWeather;
  /*
   *
   */
  return (
    <div className="forecastPanelContainer">
      {hourly.map((data, index) => (
        <ForecastCard key={index} data={data} />
      ))}
    </div>
  );
};
/*
 *
 */
export default ForecastPanel;
