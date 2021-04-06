/*
 * react import
 */
import { useEffect, useState, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activeAnimation,
  selectCityName,
  enableGeolocalization,
  getCurrentPosition
} from "../../Rtk/Slices/weatherDataConfig";
import { fetchWeatherData } from "../../Rtk/Slices/weatherState";
/*
 *  ant library import
 */
import { Input, Switch, Popover } from "antd";
import { SearchOutlined } from "@ant-design/icons";
/*
 * styles import
 */
import "./styles.css";
/*
 *
 */
const CityField = memo(
  ({
    /* getCurrentPosition,*/
    placeholder,
    setCity,
    allowPosition,
    flagPosition,
    /* city,*/
    currentWeatherData,
    code,
  }) => {
    const [cityField, setCityField] = useState(null);
    const dispatch = useDispatch();
    const { city, enableAnimation, geolocalization } = useSelector(
      (state) => state.weatherDataConfigState /*weatherDataSelector*/
    );
    const host = "https://api.openweathermap.org";

    /*
     *
     */
    const handlerSwitch = () => {
      dispatch(enableGeolocalization(!geolocalization));
      dispatch(activeAnimation(true));
    };
    /*
     *
     */
    const handlerAnimationEnd = useCallback(() => {

      if (/*flagPosition*/ geolocalization) {
        dispatch(getCurrentPosition())
        /* getCurrentPosition();*/
      } else {
        dispatch(selectCityName(cityField));
        let options = {
          getForecastData: true,
        }
        dispatch(
          fetchWeatherData(
            host,
            cityField,
            options
          )
        );
      }
    }, [geolocalization, cityField])
    /*
     *
     * @param {*} evt
     */
    const onPressEnterKey = (evt) => {
      evt.preventDefault();
      if (enableAnimation) {
        dispatch(selectCityName(cityField));
        let options = {
          getForecastData: true,
        }
        dispatch(
          fetchWeatherData(
            host,
            cityField,
            options
          )
        );
      } else {
        dispatch(activeAnimation(true));
      }
    };
    /**
     *
     * @param {*} evt
     */
    const hanlderCityField = (evt) => {
      if (/*flagPosition*/ geolocalization) {
        dispatch(enableGeolocalization(false));
      }
      setCityField(evt.target.value);
    };
    /*
     *
     */
    useEffect(() => {
      setCityField(city);
    }, [city]);
    /*
     *
     */
    return (
      <div
        onAnimationEnd={handlerAnimationEnd}
        className={"cityFieldContainer"}
        style={enableAnimation ? { animationName: "example" } : {}}
      >
        <form onSubmit={onPressEnterKey} style={{ width: "100%" }}>
          <Input
            onChange={hanlderCityField}
            value={cityField}
            className="cityField"
            size="large"
            placeholder={placeholder}
            prefix={<SearchOutlined />}
          />
        </form>
        <Popover content={<span>Usa la tua posizione corrente</span>}>
          <Switch
            style={{ marginLeft: 10 }}
            onChange={handlerSwitch}
            checked={/*flagPosition*/ geolocalization}
          />
        </Popover>
      </div>
    );
  }
);
/*
 *
 */
export default CityField;
