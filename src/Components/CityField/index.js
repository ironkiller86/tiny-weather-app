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
import { Input, Spin } from "antd";
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
  const {
    weatherState: { loading },
    weatherDataConfigState: {
      city,
      enableAnimation,
      geolocation,
      animationEnd,
    },
  } = useSelector((state) => state);
  const host = "https://api.openweathermap.org";
  /*
   *
   */
  const handlerSwitch = () => {
    console.log("CityField component - handlerSwitch");
    dispatch(enableGeolocation(!geolocation));
    if (!animationEnd) {
      dispatch(activeAnimation(true));
    } else {
      dispatch(getWeatherDataByCoordinates(host));
    }
  };
  /*
   *
   */
  const handlerAnimationEnd = (e) => {
    console.log("CityField component - handlerAnimationEnd");
    dispatch(setAnimationEnd(true));
    if (geolocation) {
      dispatch(getWeatherDataByCoordinates(host));
    } else if (cityField) {
      dispatch(selectCityName(cityField));
      let options = {
        getForecastData: true,
      };
      dispatch(fetchWeatherData(host, cityField, options));
    } else {
      /**
       * not found
       */
    }
  };
  /**
   *
   * @param {*} evt
   */
  const onPressEnterKey = (evt) => {
    console.log("CityField component - onPressEnterKey");
    evt.preventDefault();
    if (!animationEnd) {
      dispatch(activeAnimation(true));
    } else {
      dispatch(selectCityName(cityField));
      dispatch(setCoordinates({ latitude: null, longitude: null }));
      let options = {
        getForecastData: true,
      };
      dispatch(fetchWeatherData(host, cityField, options));
    }
  };
  /*
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
  /**
   *
   */
  useEffect(() => {
    if (city) {
      setCityField(city);
    }
  }, [city]);
  /*
   *
   */
  return (
    <div
      className={enableAnimation ? "cityFieldContainer2" : "cityFieldContainer"}
      onAnimationEnd={handlerAnimationEnd}
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
      <div>
        <input
          className="myInput"
          type="checkbox"
          title="Usa la tua posizione corrente"
          style={{ marginLeft: 10 }}
          onChange={handlerSwitch}
          checked={geolocation}
        />
      </div>
      <div className="spinnerContainer">
        <Spin spinning={loading} />
      </div>
    </div>
  );
});
/*
 *
 */
export default CityField;
