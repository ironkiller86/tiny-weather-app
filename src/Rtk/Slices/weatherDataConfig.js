import { createSlice } from '@reduxjs/toolkit'
/*
 * 
 */
export const initialState = {
    city: "",
    latitude: null,
    longitude: null,
    geolocalization: false,
    enableAnimation: false
}
const weatherDataConfigSlice = createSlice({
    name: 'weatherDataConfigState',
    initialState,
    reducers: {
        activeAnimation: (state, { payload }) => {
            state.enableAnimation = payload
        },
        selectCityName: (state, { payload }) => {
            state.city = payload
        },
        enableGeolocalization: (state, { payload }) => {
            state.geolocalization = payload

        }
        /*   getRecipes: state => {
               state.loading = true
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
export const { activeAnimation, selectCityName, enableGeolocalization } = weatherDataConfigSlice.actions
export default weatherDataConfigSlice.reducer