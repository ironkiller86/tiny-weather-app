import "./styles.css";

/*
 *
 */
const WeatherDetailBox = ({ firstRow, secondRow }) => {
  return (
    <div className="weatherDetailBoxContainer">
      <span>{firstRow}</span>
      <span>{secondRow}</span>
    </div>
  );
};
/*
 *
 */
export default WeatherDetailBox;
