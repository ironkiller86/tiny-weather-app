/*
 * react import
 */
import { useEffect, useState } from "react";
import "./App.css";
import WeatherApp from "./Components/WeatherApp";
import { apiKey } from './apiKey'
const host = 'http://api.openweathermap.org';

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
    fetchData: {}

  });
  const {
    city,
    latitude,
    longitude,
    allowPosition,
    enableDashboard, fetchData } = weatherData
  /**
   * 
   * @param {*} city 
   */
  const setCity = (city) => {
    setWeatherData((prevState) => ({ ...prevState, city }));
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
                break
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

  const fetchWeatherDataByCoordinates = (lat = null, lon = null) => {
    fetch(`${host}/data/2.5/onecall?lat=${lat || latitude}&lon=${lon || longitude}&appid=${apiKey}&units=metric`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setWeatherData((prevState) => ({ ...prevState, enableDashboard: true, fetchData: { ...data } }))
      })
      .catch(error => {
        console.log("App fetchWeatherDataByCoordinates - Error while get weather data by coordinates", error);
      })
  }
  /*
   * 
   */
  useEffect(() => {
    /*  console.log("App usEffect -allowPosition", allowPosition);*/
    if (!allowPosition && latitude && latitude) {
      /*  console.log("App usEffect -allowPosition reset cordinates");*/
      setWeatherData((prevState) => ({
        ...prevState, latitude: null,
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
    /*  console.log("App usEffect - cordinates found",);*/
    if (latitude && longitude) {
      /*   console.log("App usEffect - make http request for field city");*/
      fetch(`${host}/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => setWeatherData((prevState) => ({ ...prevState, city: data[0].name })))
        .catch(error => {
          console.log("App useEffect -Error -unable to get city name from coordinates ", error);
        })
    }
  }, [latitude, longitude]);
  /*
 * 
 */
  useEffect(() => {
    console.log("App usEffect - city ");
    if (latitude && longitude) {
      console.log("App usEffect - city  make http call to API by coordinate");
      fetchWeatherDataByCoordinates();
    }
    else if (city) {
      let coordinates = { lat: null, lon: null }
      fetch(`${host}/geo/1.0/direct?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data.length > 0) {
            coordinates.lat = data[0]?.lat
            coordinates.lon = data[0]?.lon
          }
        }).then(() => {
          if (coordinates.lat && coordinates.lon) {
            fetchWeatherDataByCoordinates(coordinates.lat, coordinates.lon);
          }
          else {
            console.log("App useEffect - city not found")
          }
        })
        .catch(error => {
          console.log("App useEffect -Error -Error while get weather data", error);
        })
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
      city={city}
      enableDashboard={enableDashboard}
      fetchData={fetchData}
    />
  );
}
/*
 *
 */
export default App;
