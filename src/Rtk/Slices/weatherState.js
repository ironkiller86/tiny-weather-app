import { createSlice } from "@reduxjs/toolkit";
import { apiKey } from "../../apiKey";
import { setCoordinates } from "./weatherDataConfig";
/*
 *
 */
export const initialState = {
  loading: false,
  httpStatus: { code: null, message: null, isError: false, error: null },
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
    enableLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setCurrentWeather: (state, { payload }) => {
      state.data.currentWeather = payload;
      state.loading = false;
    },
    setForecastWeather: (state, { payload }) => {
      state.data.forecastData = payload;
      state.loading = false;
    },
    setHttpStatus: (state, { payload }) => {
      state.loading = false;
      state.httpStatus = { ...state.httpStatus, ...payload };
    },
  },
});
export const {
  enableLoading,
  setCurrentWeather,
  setForecastWeather,
  setHttpStatus,
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
      /* dispatch(setHttpStatus(error));*/
    }
    if (currentWeather.cod === 200) {
      dispatch(setCurrentWeather(currentWeather));
      dispatch(setHttpStatus({ code: "200" }));
      if (getForecastData) {
        const { lat: latitude, lon: longitude } = currentWeather.coord;
        dispatch(setCoordinates({ latitude, longitude }));
        try {
          const response = await fetch(
            `${host}/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=it`
          );
          const data = await response.json();
          dispatch(setForecastWeather(data));
          dispatch(enableLoading(false));
        } catch (error) {
          /* dispatch(setHttpStatus(error));*/
        }
      }
    } else {
      dispatch(
        setHttpStatus({
          code: currentWeather.cod,
          message: currentWeather.message,
          isError: true,
        })
      );
      dispatch(enableLoading(false));
    }
  };
};

// Three actions generated from the slice

// A selector
export const weatherDataSelector = (state) => state.weatherState;
/**
 *
 */
export default weatherSlice.reducer;
