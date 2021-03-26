/*
 * react import
 */
import { useEffect, useState } from "react";
/*
 *  ant library import
 */
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
/*
 * styles import
 */
import "./styles.css";
/*
 *
 */
const CityField = ({ placeholder }) => {
  console.log("CityField - function");
  const [cityField, setCityField] = useState(null);

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
      />
    </div>
  );
};
/*
 *
 */
export default CityField;
