import './App.css';
import image from './assets/image.jpg'
import { Layout, Row, Col } from 'antd';
import CityField from './Components/CityField'
import CityInfo from './Components/CityInfo'
import WeatherPanelDx from './Components/WeatherPanelDx';
import WeatherPanelSx from './Components/WeatherPanelSx'
const { Header, Footer, Sider, Content } = Layout;

/*
 * 
 */
function App() {
  return (
    <Layout style={{ height: "150vh", backgroundImage: `url(${image})`, backgroundSize: 'cover' }}>

      <Content>
        <Row>
          <Col span={24}><div style={{
            backgroundColor: 'red', maxHeight: '70px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>toBar</div></Col>
        </Row>
        <Row>
          <Col xs={2} sm={4} md={8} />
          <Col xs={20} sm={16} md={8} ><CityField placeholder="EnterCity" /></Col>
          <Col xs={2} sm={4} md={8} />
        </Row>
        {false ?
          <>
            <Row>
              <Col span={24}>
                <CityInfo
                  firstMessage="Province of Palermo, IT"
                  secondMessage="Thursday 25 March" />
              </Col>
            </Row>
            <Row >
              <Col xs={24} sm={11}><WeatherPanelSx /></Col>
              <Col xs={24} sm={11}><WeatherPanelDx /></Col>
            </Row>
            <Row>
              <Col span={24}><div style={{ minHeight: '200px' }}>weaherz</div></Col>
            </Row>
          </> : null
        }
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
