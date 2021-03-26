
import './styles.css';
/*
 * 
 */
const CityInfo = ({ firstMessage, secondMessage }) => {
    return (
        <div className="cityInfoContainer">
            <div className="firstMessage">{firstMessage}</div>
            <div className="secondMessage">{secondMessage}</div>
        </div>)
}
/*
 * 
 */
export default CityInfo;