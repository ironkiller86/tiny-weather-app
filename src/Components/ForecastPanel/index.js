import "./styles.css";
import ForecastCard from "./ForecastCard";
const currentTimestamp = Date.now();
/*
 *
 */
const ForecastPanel = ({ forecastWeather }) => {
  const { hourly } = forecastWeather;
  let time = 0;
  /*
   * 
   */
  return (
    <div className="forecastPanelContainer">
      {hourly.map((data, index, array) => {
        time += array[index + 1]?.dt - data.dt
        if (time === 10800) {
          time = 0;
          return (< ForecastCard key={index} data={data} />)
        }
      })}
    </div>
  );
};
/*
 *
 */
export default ForecastPanel;
