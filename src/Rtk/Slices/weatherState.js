import { createSlice } from '@reduxjs/toolkit'
/*
 * 
 */
export const initialState = {
    loading: false,
    hasErrors: false,
    data: {
        currentWeather: [],
        forecastData: []
    },
}
/*
 * 
 */
const weatherSlice = createSlice({
    name: 'weatherState',
    initialState,
    reducers: {
        enableLoading: (state) => {
            state.loading = !state.loading
        },
        getCurrentDataSuccess: (state, { payload }) => {
            state.loading = false
            state.data.currentWeather = payload
        }
        /*activeAnimation: (state, { payload }) => {
            console.log('animationFlag rtk', payload)
            state.weatherData.enableAnimation = payload
        },
        
           getRecipesSuccess: (state, { payload }) => {
               state.recipes = payload
               state.loading = false
               state.hasErrors = false
           },
           getRecipesFailure: state => {
               state.loading = false
               state.hasErrors = true
           },*/
    },
})
export const { enableLoading } = weatherSlice.actions
// Asynchronous thunk action
export const fetchCurrentWeather = () => {
    return async dispatch => {
        dispatch(enableLoading(true))

        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
            const data = await response.json()

            /*   dispatch(getRecipesSuccess(data.meals))*/
        } catch (error) {
            /* dispatch(getRecipesFailure())*/
        }
    }
}

// Three actions generated from the slice


// A selector
export const weatherDataSelector = state => state.weatherState


export default weatherSlice.reducer