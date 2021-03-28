import { Layout, Row, Col } from "antd";
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
  return (
    <Layout>
      <Content>
        {props.enableDashboard ? (
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

            <Row>
              <Col span={24}>
                <CityInfo
                  firstMessage=/*"Province of Palermo, IT"*/ {
                    props.city + " " + props.fetchedWeatherData.timezone
                  }
                  secondMessage={props.fetchedWeatherData.current.dt}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={1} md={1} lg={1} />
              <Col xs={24} sm={11} md={11} lg={11}>
                <WeatherPanelSx
                  temp={props.fetchedWeatherData.current.temp}
                  description={
                    props.fetchedWeatherData.current.weather[0].description
                  }
                  iconId={props.fetchedWeatherData.current.weather[0].id}
                  mainCondition={
                    props.fetchedWeatherData.current.weather[0].main
                  }
                />
              </Col>
              <Col xs={24} sm={11} md={11} lg={11}>
                <WeatherPanelDx />
              </Col>
              <Col sm={1} md={1} lg={1} />
            </Row>
            <Row>
              <Col span={24}>
                <div className="forecast">Forecast</div>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <ForecastPanel />
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
          </>
        )}
      </Content>
    </Layout>
  );
};

export default WeatherApp;
