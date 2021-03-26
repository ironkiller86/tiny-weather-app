import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './styles.css';
/*
 * 
 */
const CityField = ({ placeholder }) => {

    return (
        <div className="cityFieldContainer">
            <Input className="cityField" size="large" placeholder={placeholder} prefix={<SearchOutlined />} />
        </div>
    )
}
/*
 * 
 */
export default CityField;