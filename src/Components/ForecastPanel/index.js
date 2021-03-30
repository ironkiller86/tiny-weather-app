import "./styles.css";
import ForecastCard from "./ForecastCard";
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
        return null
      })}
    </div>
  );
};
/*
 *
 */
export default ForecastPanel;
