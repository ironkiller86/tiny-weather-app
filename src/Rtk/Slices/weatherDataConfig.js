import { createSlice } from "@reduxjs/toolkit";
import { enableLoading, fetchWeatherData } from "./weatherState";
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
  return async (dispatch) => {
    dispatch(enableLoading(true));
    let position = null;
    try {
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
          /* dispatch(setError(error));*/
        }
      }
    } catch (error) {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>", error);
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
    if (navigator.geolocation) {
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
