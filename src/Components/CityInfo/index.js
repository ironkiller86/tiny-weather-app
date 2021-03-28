import "./styles.css";
import { getLocalData } from "../../utils";
/*
 *
 */
const CityInfo = ({ firstMessage, secondMessage }) => {
  return (
    <div className="cityInfoContainer">
      <div className="firstMessage">{firstMessage}</div>
      <div className="secondMessage">{getLocalData(secondMessage)}</div>
    </div>
  );
};
/*
 *
 */
export default CityInfo;
