import { createSlice } from "@reduxjs/toolkit";
import { enableLoading, fetchWeatherData, setHttpStatus } from "./weatherState";
import { apiKey } from "../../apiKey";
/*
 *
 */
export const initialState = {
  city: "",
  latitude: null,
  longitude: null,
  geolocation: false,
  enableAnimation: false,
  animationEnd: false,
};
/*
 *
 */
const weatherDataConfigSlice = createSlice({
  name: "weatherDataConfigState",
  initialState,
  reducers: {
    activeAnimation: (state, { payload }) => {
      state.enableAnimation = payload;
    },
    selectCityName: (state, { payload }) => {
      state.city = payload;
    },
    enableGeolocation: (state, { payload }) => {
      state.geolocation = payload;
    },
    setCoordinates: (state, { payload }) => {
      state.latitude = payload.latitude;
      state.longitude = payload.longitude;
    },
    setAnimationEnd: (state, { payload }) => {
      state.animationEnd = payload;
    },
  },
});
export const getWeatherDataByCoordinates = (host) => {
  console.log("getWeatherDataByCoordinates");
  return async (dispatch) => {
    dispatch(enableLoading(true));
    let position = null;
    try {
      setTimeout(() => {
        if (!position) {
          dispatch(
            setHttpStatus({
              code: "600",
              message: "La geolocalizzazione  non  sta funzionando",
              isError: true,
            })
          );
          dispatch(enableLoading(false));
        }
      }, 10000);
      position = await geolocation();
      const { latitude = null, longitude = null } = position.coords;
      if (latitude && longitude) {
        let cityData = null;
        dispatch(setCoordinates({ latitude, longitude }));
        try {
          const response = await fetch(
            `${host}/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
          );
          cityData = await response.json();
          dispatch(selectCityName(cityData[0].name));
          let options = {
            getForecastData: true,
          };
          dispatch(fetchWeatherData(host, cityData[0].name, options));
        } catch (error) {
          dispatch(
            setHttpStatus({
              code: "500",
              message: "Qualcosa è andato storto, Riprova dopo",
              isError: true,
            })
          );
          dispatch(enableLoading(false));
        }
      }
    } catch (error) {
      console.log("geolocation catch");
      const { code, message } = error;
      dispatch(setHttpStatus({ code, message }));
      dispatch(enableLoading(false));
    }
  };
};
/*
 *
 * @param {*} options
 * @returns
 */
const geolocation = (options = null) => {
  return new Promise((resolve, reject) => {
    console.log("geolocation");
    if (navigator.geolocation) {
      console.log("geolocation ok");
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    } else {
      console.log(
        "geolocation - getCurrentPosition - Geolocation is not supported by this browser"
      );
      reject({
        state: false,
        message: "Geolocation is not supported by this browser",
      });
    }
  });
};

export const {
  activeAnimation,
  selectCityName,
  enableGeolocation,
  setCoordinates,
  setAnimationEnd,
} = weatherDataConfigSlice.actions;
/*
 *
 */
export default weatherDataConfigSlice.reducer;
