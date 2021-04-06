/*
 * 
 */
import { combineReducers } from 'redux'
import weatherReducer from './weatherState'
import weatherDataConfigReducer from './weatherDataConfig'
/*
 * 
 */
const rootReducer = combineReducers({
    weatherState: weatherReducer,
    weatherDataConfigState: weatherDataConfigReducer
})
/*
 * 
 */
export default rootReducer
