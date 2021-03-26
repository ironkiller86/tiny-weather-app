/*
 * react import
 */
import { useEffect, useState } from "react";
import "./App.css";
import WeatherApp from "./Components/WeatherApp";

/*
 *
 */
function App() {
  const [weatherData, setWeatherData] = useState({
    city: "",
    latitude: null,
    longitude: null,
    allowPosition: false,
  });

  const setCity = (city) => {
    setWeatherData((prevState) => ({ ...prevState, city }));
  };
  /**
   *
   * @param {*} allowPosition
   */
  const allowCurrentPosition = (allowPosition) => {
    setWeatherData((prevState) => ({ ...prevState, allowPosition }));
    getCurrentPosition();
  };
  /*
   *
   */
  const getCurrentPosition = () => {
    console.log("App - getCurrentPosition");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setWeatherData((prevState) => ({
            ...prevState,
            latitude,
            longitude,
          }));
        },
        (errorCallBack) => {
          if (errorCallBack) {
            switch (errorCallBack.code) {
              case 1:
                console.log(
                  `App - getCurrentPosition - Geolocation error - 
                  You've decided not to share your position, but it's OK. We won't ask you again.`
                );
                setWeatherData((prevState) => ({
                  ...prevState,
                  allowPosition: false,
                }));
                break;
              default:
                console.log("App - getCurrentPosition - default case");
            }
            console.log("App - getCurrentPosition - Geolocation error");
            return;
          }
        }
      );
    } else {
      console.log(
        "App - getCurrentPosition - Geolocation is not supported by this browser"
      );
    }
  };

  useEffect(() => {
    console.log("App usEffect - global state", weatherData);
  }, [weatherData]);
  /*
   *
   */
  useEffect(() => {
    console.log("App usEffect as componentDidMount");
  }, []);
  /*
   *
   */
  return (
    <WeatherApp
      allowPosition={allowCurrentPosition}
      flagPosition={weatherData.allowPosition}
      setCity={setCity}
    />
  );
}
/*
 *
 */
export default App;
