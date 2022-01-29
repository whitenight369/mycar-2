import {useState,useEffect} from 'react';
import {Row,Col} from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import './index.less';
import utils from './../../utils/utils';

// 获取天气
const  getWeather=(func)=>{
    let city="101010100";
    axios(
        "https://devapi.qweather.com/v7/weather/3d?location="+city+"&key=f7b02327dbcb41cebc8dd7bd82a4c2d8"
    ).then(res=>{
        if(res.status===200){
            func(res.data.daily[0].textDay)
        }else{
            func("获取天气失败")
        }
    })
}

const Header=(props)=>{
    let [userName,setUserName]=useState("他急了他急了")
    let [date,setDate]=useState(null);
    let [weather,setWeather]=useState(null);
    useEffect(()=>{
        // 下面是倒计时
        let detailTime=setInterval(()=>{
            let time = new Date().getTime();
            setDate(utils.formaDate(time));
        },1000) 
        // 获取天气接口
        getWeather(setWeather)
        return ()=>{
            // 在卸载挂件的时候清除定时器
            clearInterval(detailTime);
        }
    },[])
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
                        {props.menuName}
                    </Col>
                    <Col span={20} className='weather'>
                        <span className='date'>{date}</span>
                        <span className='weather-detail'>{weather}</span>
                    </Col>
                </Row>
            }
        </div>
    )
}
const mapStateToProps = (state, ownProps) => {
    return {
        menuName: state.menuName
    }
}
export default connect(mapStateToProps)(Header);