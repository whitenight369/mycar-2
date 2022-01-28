import {useState} from 'react';
import {Row,Col} from 'antd';
import './index.less';
const Header=(props)=>{
    let [userName,setUserName]=useState("他急了他急了")
    let [data,setDate]=useState(null);
    let [weather,setWeather]=useState(null);
    return (
        <div className='header'>
            <Row className='header-top'>
                {props.menuType?
                <Col className='logo-ant'>
                    <img src='/assets/logo/svg' />
                    <span>Imooc 通用管理系统</span>
                </Col>:""}
                <Col span={props.menuType?18:24}>
                        <span>欢迎,{userName}</span>
                        <a href="#"> 退出</a>
                </Col>
            </Row>
            {
                props.menuType?"":
                <Row className='breadcrumb'>
                    <Col span={4} className='breadcrumb-title'>
                        首页
                    </Col>
                    <Col span={20} className='weather'>
                        <span className='date'>{"2022/1/28"}</span>
                        <span className='weather-detail'>{"晴天"}</span>
                    </Col>
                </Row>
            }
        </div>
    )
}
export default Header;