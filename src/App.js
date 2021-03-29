/*
 * react import
 */
import { useEffect, useState } from "react";
import "./App.css";
import WeatherApp from "./Components/WeatherApp";
import { apiKey } from "./apiKey";
const host = "http://api.openweathermap.org";

/*
 *
 */
function App() {
  const [weatherData, setWeatherData] = useState({
    city: "",
    latitude: null,
    longitude: null,
    allowPosition: false,
    enableDashboard: false,
    currentWeatherData: {},
    code: null,
  });
  const {
    city,
    latitude,
    longitude,
    allowPosition,
    enableDashboard,
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
        enableDashboard: false,
        code: "404",
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
    if (!allowPosition && latitude && latitude) {
      setWeatherData((prevState) => ({
        ...prevState,
        latitude: null,
        longitude: null,
      }));
    }
    if (allowPosition && !latitude && !latitude) {
      getCurrentPosition();
    }
  }, [allowPosition]);
  /*
   *
   */
  useEffect(() => {
    console.log("App usEffect - cordinates found");
    if (latitude && longitude) {
      let cityName = null;
      /*   console.log("App usEffect - make http request for field city");*/
      fetch(
        `${host}/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          cityName = data[0].name;
          console.log(cityName);
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
    console.log("App usEffect - city ");
    let currentWeather = null;

    if (city) {
      if (navigator.onLine) {
        fetch(
          `${host}/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=it`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>current", data);
            if (data?.cod === "404") {
              setWeatherData((prevState) => ({
                ...prevState,
                enableDashboard: false,
                code: data.cod,
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
                console.log(">>>>>>>>>>>>>>>>>>>>>>>>> forecast", forecast);
                setWeatherData((prevState) => ({
                  ...prevState,
                  enableDashboard: true,
                  currentWeatherData: { ...currentWeather },
                  fetchedWeatherData: { ...forecast },
                  code: null,
                }));
              });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setWeatherData((prevState) => ({
          ...prevState,
          code: '1000',
        }));
      }
    }

  }, [city]);
  /*
   *
   */
  useEffect(() => {
    console.log("App usEffect - global state", weatherData);
  }, [weatherData]);
  /*
   *
   */
  useEffect(() => {

  }, []);
  /*
   *
   */
  return (
    <WeatherApp
      allowPosition={allowCurrentPosition}
      flagPosition={weatherData.allowPosition}
      setCity={setCity}
      city={city}
      enableDashboard={enableDashboard}
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
