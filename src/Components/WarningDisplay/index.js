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
      case "2":
        return (
          <Alert
            className="alert"
            message="Attenzione"
            description={"Geolocalizzazione non riuscita"}
            type="error"
            showIcon
          />
        );
      case "600":
        return (
          <Alert
            className="alert"
            message="Attenzione"
            description={message}
            type="error"
            showIcon
          />
        );
      case "1":
        return (
          <Alert
            className="alert"
            message="Problema con la Geolocalizzazione"
            description={message}
            type="warning"
            showIcon
          />
        );
      default:
        /* return null;*/
        return (
          <Alert
            className="alert"
            message="Errore"
            description={"Qualcosa è andata storto...Errore Sconosciuto"}
            type="error"
            showIcon
          />
        );
    }
  };
  return printWarning();
};
/*
 *
 */
export default WarningDisplay;
