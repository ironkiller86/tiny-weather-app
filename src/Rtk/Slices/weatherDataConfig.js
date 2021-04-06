import { createSlice } from '@reduxjs/toolkit'
import { enableLoading } from './weatherState'
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
/*
 * 
 */
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
        },
        setCoordinates: (state, { payload }) => {
            state.latitude = payload.latitude
            state.longitude = payload.longitude
        }
    },
})
export const getCurrentPosition = () => {
    return async (dispatch) => {
        dispatch(enableLoading(true))
        let position = null
        try {
            position = await geolocation()
            const { latitude, longitude } = position.coords;
            dispatch(setCoordinates({ latitude, longitude }))
        } catch (error) {
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>', error)
        }


    }
}

const geolocation = (options = null) => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject, options)
            /**
             * function getPosition(options?: PositionOptions): Promise<Position> {
              return new Promise((resolve, reject) =>
                  navigator.geolocation.getCurrentPosition(resolve, reject, options)
              );
          }
             * 
             * 
             * 
             * 
             */

            /* setWeatherData((prevState) => ({
                 ...prevState,
                 latitude,
                 longitude,
             }));*/

            /*  (errorCallBack) => {
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
        );*/
        } else {
            console.log(
                "geolocation - getCurrentPosition - Geolocation is not supported by this browser"
            );
            reject({ state: false, message: 'Geolocation is not supported by this browser' })
        };
    })
}





export const {
    activeAnimation,
    selectCityName,
    enableGeolocalization,
    setCoordinates } = weatherDataConfigSlice.actions
/*
 * 
 */
export default weatherDataConfigSlice.reducer