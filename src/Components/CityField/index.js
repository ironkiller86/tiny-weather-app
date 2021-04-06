/*
 * react import
 */
import { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { activeAnimation, selectCityName, enableGeolocalization } from '../../Rtk/Slices/weatherDataConfig'
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
  ({ getCurrentPosition,
    placeholder,
    setCity,
    allowPosition,
    flagPosition,
    /* city,*/
    currentWeatherData,
    code,
  }) => {
    const [cityField, setCityField] = useState(null);
    const dispatch = useDispatch()
    const { city, enableAnimation, geolocalization } = useSelector(state => state.weatherDataConfigState/*weatherDataSelector*/)

    /*
     * 
     */
    const handlerSwitch = () => {
      dispatch(enableGeolocalization(!geolocalization))
      /* allowPosition(!flagPosition)*/
      dispatch(activeAnimation(true))

    }
    /*
     * 
     */
    const handlerAnimationEnd = () => {
      if (/*flagPosition*/geolocalization) {
        getCurrentPosition()
      } else {
        /* setCity(cityField)*/
        dispatch(selectCityName(cityField))
      }
    }
    /*
     *
     * @param {*} evt
     */
    const onPressEnterKey = (evt) => {
      evt.preventDefault();
      if (enableAnimation) {
        /*   setCity(cityField)*/
        dispatch(selectCityName(cityField))
      } else {
        dispatch(activeAnimation(true))
      }
    };
    /**
     * 
     * @param {*} evt 
     */
    const hanlderCityField = (evt) => {
      if (/*flagPosition*/geolocalization) {
        /*  allowPosition(false);*/
        dispatch(enableGeolocalization(false))
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
      <div onAnimationEnd={handlerAnimationEnd} className={"cityFieldContainer"}
        style={enableAnimation ? { animationName: 'example' } : {}}>
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
            checked={/*flagPosition*/geolocalization}
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
