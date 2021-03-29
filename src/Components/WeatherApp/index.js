import { Layout, Row, Col, Alert } from "antd";
import CityField from "../CityField";
import CityInfo from "../CityInfo";
import WeatherPanelDx from "../WeatherPanelDx";
import WeatherPanelSx from "../WeatherPanelSx";
import ForecastPanel from "../ForecastPanel";
import "./styles.css";


const { Content } = Layout;
/**
 *
 * @returns
 */
const WeatherApp = (props) => {
  const { currentWeatherData, code } = props


  /*
   * 
   */
  return (
    <Layout>
      <Content>
        {props.enableDashboard ? (
          <>￼
            <Row>
              <Col xs={2} sm={4} md={8} />
              <Col xs={20} sm={16} md={8}>
                <CityField
                  setCurrentPositionSwitch={props.allowPosition}
                  placeholder="EnterCity"
                  allowPosition={props.allowPosition}
                  setCity={props.setCity}
                  flagPosition={props.flagPosition}
                  city={props.city}
                />
              </Col>
              <Col xs={2} sm={4} md={8} />
            </Row>

            <Row>
              <Col span={24}>
                <CityInfo
                  firstMessage={
                    currentWeatherData.name +
                    ", " +
                    currentWeatherData.sys.country
                  }
                  secondMessage={props.currentWeatherData.dt}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={1} md={1} lg={1} />
              <Col xs={24} sm={11} md={11} lg={11}>
                <WeatherPanelSx
                  temp={currentWeatherData.main.temp}
                  description={currentWeatherData.weather[0].description}
                  iconId={currentWeatherData.weather[0].id}
                  mainCondition={currentWeatherData.weather[0].main}
                />
              </Col>
              <Col xs={24} sm={11} md={11} lg={11}>
                <WeatherPanelDx currentWeatherData={currentWeatherData} />
              </Col>
              <Col sm={1} md={1} lg={1} />
            </Row>
            <Row>
              <Col span={24}>
                <div className="forecast">Previsioni prossime 48 ore</div>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <ForecastPanel forecastWeather={props.fetchedWeatherData} />
              </Col>
            </Row>
            <Col span={24}>
              <div className="footer">Made by Tuzzolino Donato</div>
            </Col>
          </>
        ) : (
            <>
              <Row>
                <Col xs={2} sm={4} md={8} />
                <Col xs={20} sm={16} md={8}>
                  <CityField
                    placeholder="EnterCity"
                    allowPosition={props.allowPosition}
                    setCity={props.setCity}
                    flagPosition={props.flagPosition}
                    city={props.city}
                  />
                </Col>
                <Col xs={2} sm={4} md={8} />
              </Row>
              {props.code ? (
                <Row>
                  <Col xs={2} sm={4} md={8} />
                  <Col xs={20} sm={16} md={8}>
                    <Alert
                      style={{
                        borderRadius: 15,
                        opacity: 0.8,
                      }}
                      message="Ops"
                      description={props.code === '404' ?
                        "Località non trovata" :
                        "Connessione alla Rete assente"}
                      type="warning"
                      showIcon
                    />
                  </Col>
                  <Col xs={2} sm={4} md={8} />
                </Row>
              ) : null}
            </>
          )}
      </Content>
    </Layout>
  );
};
/*
 * 
 */
export default WeatherApp;
