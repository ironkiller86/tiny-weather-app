/*
 * react import
 */
import { useEffect, useState, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activeAnimation,
  selectCityName,
  setCoordinates,
  enableGeolocation,
  setAnimationEnd,
  getWeatherDataByCoordinates,
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
const CityField = memo(({ placeholder }) => {
  console.log("CityField component");
  const [cityField, setCityField] = useState(null);
  const dispatch = useDispatch();
  const { city, enableAnimation, geolocation, animationEnd } = useSelector(
    (state) => state.weatherDataConfigState /*weatherDataSelector*/
  );
  const host = "https://api.openweathermap.org";

  /*
   *
   */
  const handlerSwitch = () => {
    console.log("CityField component - handlerSwitch");
    dispatch(enableGeolocation(!geolocation));
    dispatch(selectCityName(null));
    dispatch(setCoordinates({ latitude: null, longitude: null }));
    if (!enableAnimation) {
      dispatch(activeAnimation(true));
    }
  };
  /*
   *
   */
  const handlerAnimationEnd = () => {
    console.log("CityField component - handlerAnimationEnd");
    dispatch(setAnimationEnd(true));
    /* if (geolocation) {
      dispatch(getWeatherDataByCoordinates(host));
    } else if (city) {
      console.log("eccolo");
      dispatch(selectCityName(cityField));
      let options = {
        getForecastData: true,
      };
      dispatch(fetchWeatherData(host, cityField, options));
    }*/
  };
  /*
   *
   * @param {*} evt
   */
  const onPressEnterKey = (evt) => {
    console.log("CityField component - onPressEnterKey");
    evt.preventDefault();
    dispatch(selectCityName(cityField));
    if (animationEnd) {
      dispatch(selectCityName(cityField));
      let options = {
        getForecastData: true,
      };
      dispatch(fetchWeatherData(host, cityField, options));
    } else {
      dispatch(activeAnimation(true));
    }
  };
  /**
   *
   * @param {*} evt
   */
  const handlerCityField = (evt) => {
    console.log("CityField component - handlerCityField");
    if (geolocation) {
      dispatch(enableGeolocation(false));
      dispatch(setCoordinates({ latitude: null, longitude: null }));
    }
    setCityField(evt.target.value);
  };
  /*
   *
   */
  useEffect(() => {
    console.log("CityField component - useEffect by city field");
    setCityField(city);
    if (city) {
      dispatch(selectCityName(cityField));
      let options = {
        getForecastData: true,
      };
      dispatch(fetchWeatherData(host, cityField, options));
    }
  }, [city]);
  /**
   *
   */
  useEffect(() => {
    console.log(
      "CityField component - useEffect by animationEnd",
      animationEnd
    );
    if (animationEnd) {
      if (geolocation) {
        dispatch(getWeatherDataByCoordinates(host));
      }
      /* if (city) {
        console.log("eccolo");
        dispatch(selectCityName(cityField));
        let options = {
          getForecastData: true,
        };
        dispatch(fetchWeatherData(host, cityField, options));
      }*/
    }
  }, [animationEnd, geolocation]);

  /*
   *
   */
  return (
    <div
      onAnimationEnd={handlerAnimationEnd}
      className={enableAnimation ? "cityFieldContainer2" : "cityFieldContainer"}
      /*style={enableAnimation ? { animationName: "example" } : {} null}*/
    >
      <form onSubmit={onPressEnterKey} style={{ width: "100%" }}>
        <Input
          onChange={handlerCityField}
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
          checked={geolocation}
        />
      </Popover>
    </div>
  );
});
/*
 *
 */
export default CityField;
