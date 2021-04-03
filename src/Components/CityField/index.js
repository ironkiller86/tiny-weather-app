/*
 * react import
 */
import { useEffect, useState, memo } from "react";
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
    city,
    currentWeatherData,
    code,
    enableAnimation,
    setEnableAnimation }) => {
    const [cityField, setCityField] = useState(null);
    console.log(currentWeatherData)
    /*
     * 
     */
    const handlerSwitch = () => {
      allowPosition(!flagPosition)
      setEnableAnimation(true)
    }
    /*
     * 
     */
    const handlerAnimationEnd = () => {
      if (flagPosition) {
        getCurrentPosition()
      } else {
        setCity(cityField)
      }
    }
    /*
     *
     * @param {*} evt
     */
    const onPressEnterKey = (evt) => {
      evt.preventDefault();
      if (enableAnimation) {
        setCity(cityField)
      } else {
        setEnableAnimation(true)
      }
    };
    /**
     * 
     * @param {*} evt 
     */
    const hanlderCityField = (evt) => {
      if (flagPosition) {
        allowPosition(false);
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
            checked={flagPosition}
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
