/*
 * react import
 */
import { useEffect, useState } from "react";
import "./App.css";
import WeatherApp from "./Components/WeatherApp";
import { apiKey } from "./apiKey";
const host = "https://api.openweathermap.org";

/*
 *
 */
function App() {
  const [weatherData, setWeatherData] = useState({
    city: "",
    latitude: null,
    longitude: null,
    allowPosition: false,
    currentWeatherData: {},
    code: null,
  });
  const {
    city,
    latitude,
    longitude,
    allowPosition,
    fetchedWeatherData,
    currentWeatherData,
    code,
  } = weatherData;

  /**
   *
   * @param {*} city
   */
  const setCity = (city) => {
    if (city?.length > 0) {
      setWeatherData((prevState) => ({ ...prevState, city }));
    } else {
      setWeatherData((prevState) => ({
        ...prevState,
        code: { status: "404" },
      }));
    }
  };
  /**
   *
   * @param {*} allowPosition
   */
  const allowCurrentPosition = (allowPosition) => {
    setWeatherData((prevState) => ({ ...prevState, allowPosition }));
  };
  /*
   *
   */
  const getCurrentPosition = () => {
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
              case 2:
                console.log(
                  `App - getCurrentPosition - Geolocation error - 
                   The network is down or the positioning service can't be reached.`
                );
                break;
              case 3:
                console.log(
                  `App - getCurrentPosition - Geolocation error - 
                   The attempt timed out before it could get the location data.`
                );
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
  /*
   *
   */
  useEffect(() => {
    if (!allowPosition && latitude && longitude) {
      setWeatherData((prevState) => ({
        ...prevState,
        latitude: null,
        longitude: null,
      }));
    }
  }, [allowPosition, latitude, longitude]);
  /*
   *
   */
  useEffect(() => {
    if (latitude && longitude) {
      let cityName = null;
      fetch(
        `${host}/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          cityName = data[0].name;
        })
        .then(() => {
          fetch(
            `${host}/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=it`
          )
            .then((response) => response.json())
            .then((data) =>
              setWeatherData((prevState) => ({
                ...prevState,
                currentWeatherData: { ...data },
                city: cityName,
              }))
            );
        })
        .catch((error) => {
          console.log(
            "App useEffect -Error -unable to get city name from coordinates ",
            error
          );
        });
    }
  }, [latitude, longitude]);
  /*
   *
   */
  useEffect(() => {
    /* let currentWeather = null;
    if (city) {
      if (navigator.onLine) {
        fetch(
          `${host}/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=it`
        )
          .then((response) => response.json())
          .then((data) => {

            if (data?.cod === "404") {
              setWeatherData((prevState) => ({
                ...prevState,
                code: { status: "404" },
              }));
              throw new Error();
            }
            currentWeather = { ...data };
          })
          .then(() => {
            fetch(
              `${host}/data/2.5/onecall?lat=${currentWeather.coord.lat}&lon=${currentWeather.coord.lon}&appid=${apiKey}&units=metric&lang=it`
            )
              .then((response) => response.json())
              .then((forecast) => {
                setWeatherData((prevState) => ({
                  ...prevState,
                  enableAnimation: true,
                  currentWeatherData: { ...currentWeather },
                  fetchedWeatherData: { ...forecast },
                  code: { status: "200" },
                }));
              });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setWeatherData((prevState) => ({
          ...prevState,
          code: { status: "1000" },
        }));
      }
    }*/
  }, [city]);
  /*
   *
   */
  useEffect(() => {}, [weatherData]);
  /*
   *
   *
  useEffect(() => {

  }, []);
  /*
   *
   */
  return (
    <WeatherApp
      getCurrentPosition={getCurrentPosition}
      /*   allowPosition={allowCurrentPosition}*/
      /* flagPosition={weatherData.allowPosition}*/
      /*    setCity={setCity}*/
      city={city}
      fetchedWeatherData={fetchedWeatherData}
      currentWeatherData={currentWeatherData}
      code={code}
    />
  );
}
/*
 *
 */
export default App;
