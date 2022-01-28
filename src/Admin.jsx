import {Col,Row} from 'antd';
import Header from './components/Header';
import Footer from './components/Footer';
import NavLeft from './components/Navleft';
import './style/common.less';
const Admin =(props)=>{
    return (
        <Row className='container'>
            <Col span={4} className='nav-left'> 
                <NavLeft/>
            </Col>
            <Col span={20} className='main'>
                <Header/>
                <Row className='content'>
                    {props.children}
                </Row>
                <Footer/>
            </Col>
        </Row>
    )
}
export default Admin;