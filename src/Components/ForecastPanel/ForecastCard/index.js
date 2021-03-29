import "./styles.css";
import { Tooltip } from "antd";
import { getLocalData } from "../../../utils";
/*
 *
 */
const ForecastCard = ({ data }) => {
  return (
    <div className="forecastCardContainer">
      <div className="cardHeader">
        <span>{getLocalData(data.dt, { dataFormat: true })}</span>
        <span>
          {getLocalData(data.dt, { timeString: true, precision: true })}
        </span>
      </div>
      <div className="cardBody">
        <Tooltip
          placement="left"
          color={"blue"}
          title={data.weather[0].description}
        >
          <img
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={"weather img"}
          />
        </Tooltip>
      </div>
      <div className="cardFooter">{data.temp.toFixed(1)} °</div>
    </div>
  );
};
/*
 *
 */
export default ForecastCard;
