import WeatherDetailBox from "../WeatherDetailBox";
import "./styles.css";
/*
 *
 */
const fakeWeatherData = [
  { data: "15°", label: "Hight" },
  { data: "0.48 mph", label: "Wind" },
  { data: "06:00°", label: "Sunrise" },
  { data: "10°", label: "Low" },
  { data: "48%", label: "Rain" },
  { data: "18:23", label: "Sunset" },
];

const WeatherPanelDx = () => {
  return (
    <div className="weatherPanelDxContainer">
      {fakeWeatherData.map(({ data, label }, index) => (
        <WeatherDetailBox key={index} firstRow={data} secondRow={label} />
      ))}
    </div>
  );
};
/*
 *
 */
export default WeatherPanelDx;
