import { createSlice } from "@reduxjs/toolkit";
import { apiKey } from "../../apiKey";
import store from "./weatherDataConfig";
/*
 *
 */
export const initialState = {
  loading: false,
  errors: { isError: false, error: null },
  data: {
    currentWeather: {},
    forecastData: [],
  },
};
/*
 *
 */
const weatherSlice = createSlice({
  name: "weatherState",
  initialState,
  reducers: {
    enableLoading: (state) => {
      state.loading = !state.loading;
    },
    setCurrentWeather: (state, { payload }) => {
      state.data.currentWeather = payload;
      state.loading = false;
    },
    setForecastWeather: (state, { payload }) => {
      state.data.forecastData = payload;
      state.loading = false;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.errors.isError = true;
      state.errors.error = payload;
    },
  },
});
export const {
  enableLoading,
  setCurrentWeather,
  setForecastWeather,
  setError,
} = weatherSlice.actions;
/**
 *  Asynchronous thunk action
 * @param {*} host
 * @param {*} city
 * @returns
 */
export const fetchWeatherData = (host, city, getForecastData = false) => {
  return async (dispatch) => {
    let currentWeather = null;
    dispatch(enableLoading(true));
    try {
      const response = await fetch(
        `${host}/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=it`
      );
      currentWeather = await response.json();
    } catch (error) {
      dispatch(setError(error));
    }
    if (currentWeather.cod === "404") {
      dispatch(setCurrentWeather(currentWeather));
    } else {
    }

    /* const { lat: latitude, lon: longitude } = currentWeather.coord;
      try {
        const response = await fetch(
          `${host}/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=it`
        );
        const data = await response.json();
        dispatch(setForecastWeather(data));
      } catch (error) {
        dispatch(setError(error));
      }*/
  };
};

// Three actions generated from the slice

// A selector
export const weatherDataSelector = (state) => state.weatherState;

export default weatherSlice.reducer;
