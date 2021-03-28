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
  ({ placeholder, setCity, allowPosition, flagPosition, city }) => {
    /* console.log("CityField - function");*/
    const [cityField, setCityField] = useState(null);
    /**
     *
     * @param {*} evt
     */
    const onPressEnterKey = (evt) => {
      if (evt.code === "Enter" || evt.code === "NumpadEnter")
        setCity(cityField/*, () => setCity(null)*/);
    };
    useEffect(() => {
      console.log("CityField - useEffect city value from parent", city);
      setCityField(city)
    }, [city]);
    /*
     *
     */
    useEffect(() => {
      //  console.log("CityField - useEffect", cityField);
    }, [cityField]);
    /*
     *
     */
    return (
      <div className="cityFieldContainer">
        <Input
          onChange={(evt) => {
            setCityField(evt.target.value);
          }}
          value={cityField}
          className="cityField"
          size="large"
          placeholder={placeholder}
          prefix={<SearchOutlined />}
          onKeyDown={onPressEnterKey}
        />
        <Popover content={<span>Get current Position</span>}>
          <Switch
            style={{ marginLeft: 10 }}
            onChange={(checked) => allowPosition(checked)}
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
