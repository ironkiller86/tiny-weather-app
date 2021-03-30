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
    const [cityField, setCityField] = useState(null);
    /**
     *
     * @param {*} evt
     */
    const onPressEnterKey = (evt) => {
      evt.preventDefault();
      /* if (evt.code === "Enter" || evt.code === "NumpadEnter")*/
      setCity(cityField);
    };
    /*};*/
    const hanlderCityField = (evt) => {
      if (flagPosition) {
        allowPosition(false);
      }
      setCityField(evt.target.value);
    };

    useEffect(() => {
      setCityField(city);
    }, [city]);
    /*
     *
     */
    return (
      <div className="cityFieldContainer">
        <form onSubmit={onPressEnterKey} style={{ width: "100%" }}>
          <Input
            onChange={hanlderCityField}
            value={cityField}
            className="cityField"
            size="large"
            placeholder={placeholder}
            prefix={<SearchOutlined />}
            /* onKeyDown={onPressEnterKey}*/
          />
        </form>
        <Popover content={<span>Usa la tua posizione corrente</span>}>
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
