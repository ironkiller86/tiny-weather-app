import "./styles.css";

/*
 * http://openweathermap.org/img/wn/10d@2x.png
 */
const ForecastCard = () => {
  return (
    <div className="forecastCardContainer">
      <div className="cardHeader">
        <span>03.26</span>
        <span>18:00</span>
      </div>
      <div className="cardBody">
        <img
          src={"http://openweathermap.org/img/wn/10d@2x.png"}
          alt={"weather img"}
        />
      </div>
      <div className="cardFooter">6</div>
    </div>
  );
};
/*
 *
 */
export default ForecastCard;
