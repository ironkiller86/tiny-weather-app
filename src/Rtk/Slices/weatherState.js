import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

export const fetchWeatherData = createAsyncThunk('weatherState/fetch',
  async (obj, { dispatch }) => {
    const response = await fetch(`${obj.host}/data/2.5/weather?q=${obj.city}&appid=${apiKey}&units=metric&lang=it`
    );
    let currentWeather = await response?.json();
    let forecastData;
    dispatch(setHttpStatus({ code: "200", isError: false }));
    if (obj.getForecastData) {
      const { lat: latitude, lon: longitude } = currentWeather.coord;
      dispatch(setCoordinates({ latitude, longitude }));
      try {
        const response = await fetch(
          `${obj.host}/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=it`
        );
        forecastData = await response.json();

        /*  dispatch(setForecastWeather(data));
          dispatch(enableLoading(false));*/
      } catch (error) {

      }
    }
    return { currentWeather, forecastData }


  })


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
      state.httpStatus = { ...state.httpStatus, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherData.fulfilled, (state, action) => {
      state.loading = false
      state.data.currentWeather = action.payload.currentWeather
      state.data.forecastData = action.payload.forecastData

    })
    builder.addCase(fetchWeatherData.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchWeatherData.rejected, (state, action) => {
      console.log(action.payload)
      state.loading = false
    })
  }
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
 *
export const fetchWeatherData = (host, city, getForecastData = false) => {
  return async (dispatch) => {
    let currentWeather = null;
    dispatch(enableLoading(true));
    try {
      const response = await fetch(
        `${host}/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=it`
      );
      currentWeather = await response?.json();
      console.log(currentWeather);
    } catch (error) {
      dispatch(
        setHttpStatus({
          code: "600",
          message: "Connessione Internet non trovata",
          isError: true,
        })
      );
      dispatch(enableLoading(false));
      return;
    }
    if (currentWeather?.cod === 200) {
      dispatch(setCurrentWeather(currentWeather));
      dispatch(setHttpStatus({ code: "200", isError: false }));
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
    } else {
      console.log("dentro");
      dispatch(
        setHttpStatus({
          code: "404",
          isError: true,
        })
      );
      dispatch(enableLoading(false));
    }
  };
};*/
/**
 * 
 * @param {*} state 
 * @returns 
 */
// A selector
export const weatherDataSelector = (state) => state.weatherState;
/**
 *
 */
export default weatherSlice.reducer;
