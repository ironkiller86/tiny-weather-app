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
  const { currentWeatherData } = props;

  /*
   *
   */
  return (
    <Layout>
      <Content>
        <Row>
          <Col xs={2} sm={5} md={7} lg={7} xl={8} xxl={8} />
          <Col xs={20} sm={14} md={10} lg={10} xl={8} xxl={8}>
            <CityField
              getCurrentPosition={props.getCurrentPosition}
              setEnableAnimation={props.setEnableAnimation}
              enableAnimation={props.enableAnimation}
              setCurrentPositionSwitch={props.allowPosition}
              placeholder="EnterCity"
              allowPosition={props.allowPosition}
              setCity={props.setCity}
              flagPosition={props.flagPosition}
              city={props.city}
              currentWeatherData={props.currentWeatherData}
              code={props.code}
            />
          </Col>
          <Col xs={2} sm={5} md={7} lg={7} xl={8} xxl={8} />
        </Row>
        {props?.code?.status === '200' ?
          <>
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
              <Col lg={1} />
              <Col xs={24} sm={24} md={24} lg={11}>
                <WeatherPanelSx
                  temp={currentWeatherData.main.temp}
                  description={currentWeatherData.weather[0].description}
                  iconId={currentWeatherData.weather[0].id}
                  mainCondition={currentWeatherData.weather[0].main}
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={11}>
                <WeatherPanelDx currentWeatherData={currentWeatherData} />
              </Col>
              <Col lg={1} />
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
          </> : props?.code?.status === '404' || props?.code?.status === '1000' ?
            <Row>
              <Col xs={2} sm={4} md={8} />
              <Col xs={20} sm={18} md={8}>
                <Alert
                  style={{
                    borderRadius: 15,
                    opacity: 0.8,
                  }}
                  message="Ops"
                  description={
                    props.code.status === "404"
                      ? "Località non trovata"
                      : "Connessione alla Rete assente"
                  }
                  type="warning"
                  showIcon
                />
              </Col>
              <Col xs={2} sm={4} md={8} />
            </Row> : null
        }
      </Content>
    </Layout>
  );
};
/*
 *
 */
export default WeatherApp;
