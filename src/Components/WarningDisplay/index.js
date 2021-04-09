import "./styles.css";
import { Alert } from "antd";
import { useSelector } from "react-redux";
/*
 *
 */
const WarningDisplay = () => {
  const {
    httpStatus: { code, message },
  } = useSelector((state) => state.weatherState);
  /*
   *
   * @returns
   */
  const printWarning = () => {
    const statusCode = code?.toString();
    console.log(statusCode);
    switch (statusCode) {
      case "404":
        return (
          <Alert
            className="alert"
            message="Oops"
            description={"Località non trovata"}
            type="warning"
            showIcon
          />
        );
      case "1":
        return (
          <Alert
            message="Problema con la Geolocalizzaione"
            description={message}
            type="warning"
            showIcon
          />
        );
      default:
        return null;
      /* return (
         /* <Alert
            message="Errore"
            description={"Qualcosa è andata storto...Errore Sconosciuto"}
            type="error"
            showIcon
          />
        );*/
    }
  };

  return printWarning();
};
/*
 *
 */
export default WarningDisplay;
