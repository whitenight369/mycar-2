import {useState,useEffect} from 'react';
import {Card,Form} from 'antd';
import Axios from '../../axios';
import './detail.less';
const Detail=(props)=>{
    const [state,setState]=useState({});
    useEffect(()=>{
        let orderId=props.match.params.orderId;
        getDetailInfo(orderId);
        return ()=>{
            map=null;
        }
    },[])
    // 根据路由的id从服务器获取数据
    const getDetailInfo=(orderId)=>{
        Axios.ajax({
            url:"/order/detail",
            data:{
                params:{
                    orderId
                }
            }
        }).then(res=>{
            if(res.code==="0"){
                setState({
                    ...state,
                    orderInfo:res.result
                })
                renderMap(res.result);
            }
        })
    }
    let map=null;
    
    // 地图初始化
    const renderMap=(res)=>{
        map=new window.BMapGL.Map("orderDetailMap");//创建一个Map实例 加入到挂载点上
        map.centerAndZoom('北京',11);//初始化地图,设置中心点坐标和地图级别
        addMapControl();//添加地图控件
        drawBikeRoute(res.position_list);//绘制路线图
        drawServiveArea(res.area);//绘制服务区
    }
    //添加地图控件
    const addMapControl=()=>{
        map.enableScrollWheelZoom(true);//开启鼠标滚轮缩放
        map.addControl(new window.BMapGL.ScaleControl());//添加比例尺控件;
        map.addControl(new window.BMapGL.ZoomControl());//添加比例尺控件;
    }

    const drawBikeRoute=(positionList)=>{
        let startPoint="";//创建起点
        let endPoint="";//创建终点;
        if(positionList.length>0){
            let first=positionList[0];//起点是第一个
            let end=positionList[positionList.length-1];//终点是最后一个
            startPoint=new window.BMapGL.Point(first.lon,first.lat);//设置起点坐标  经纬度
            let startIcon=new window.BMapGL.Icon("/assets/start_point.png",new window.BMapGL.Size(36,42),{
                imageSize:new window.BMapGL.Size(36,42),//实际大小
                anchor:new window.BMapGL.Size(18,42)//偏移量
            })//图标的位置,图标的大小,图片的实际参数
            let startMaker=new window.BMapGL.Marker(startPoint,{icon:startIcon})//正经的起点
            map.addOverlay(startMaker);//添加到地图上去
            endPoint=new window.BMapGL.Point(end.lon,end.lat);
            let endIcon=new window.BMapGL.Icon('/assets/end_point.png',new window.BMapGL.Size(36,42),{
                imageSize:new window.BMapGL.Size(36,42),
                anchor:new window.BMapGL.Size(36,42)
            })
            let endMarker=new window.BMapGL.Marker(endPoint,{icon:endIcon});
            map.addOverlay(endMarker);
            // 生成路线图
            let trackPoint=[];
            positionList.map(value=>{
                trackPoint.push(new window.BMapGL.Point(value.lon,value.lat));//向数组里面加入坐标的元素
                return value;
            })
            let polyline=new window.BMapGL.Polyline(trackPoint,{
                storkeColor:"#1869AD",
                strokeWeight:3,
                strokeOpacity:1
            })
            map.addOverlay(polyline);
            map.centerAndZoom(endPoint,11);
        }
    }

    // 绘制服务区
    const drawServiveArea=(positionList)=>{
        let trackPoint=[];
        positionList.map(value=>{
            trackPoint.push(new window.BMapGL.Point(value.lon,value.lat));//向数组里面加入坐标的元素
            return value;
        })
        let polygon=new window.BMapGL.Polyline(trackPoint,{
            strokeColor: "#CE0000",
            strokeWeight: 3,
            fillColor:"#ff8605",
            fillOpacity:0.4
        })
        map.addOverlay(polygon);
    }

    return (
        <section>
            <Card>
            <div id='orderDetailMap' className='order-map'></div>
            <div className="detail-items">
            <div className="item-title">基础信息</div>
            <ul className="detail-form">
                <li>
                    <div className="detail-form-left">用车模式</div>
                    <div className="detail-form-content">{state.orderInfo.mode==1?"停车点":"服务区模式"}</div>
                </li>
                <li>
                    <div className="detail-form-left">订单编号</div>
                    <div className="detail-form-content">{state.orderInfo.order_sn}</div>
                </li>
                <li>
                    <div className="detail-form-left">车辆编号</div>
                    <div className="detail-form-content">{state.orderInfo.bike_sn}</div>
                </li>
                <li>
                    <div className="detail-form-left">用户姓名</div>
                    <div className="detail-form-content">{state.orderInfo.user_name}</div>
                </li>
                <li>
                    <div className="detail-form-left">手机号码</div>
                    <div className="detail-form-content">{state.orderInfo.mobile}</div>
                </li>
            </ul>
            </div>
            <div className="detail-items">
                <div className="item-title">行驶轨迹</div>
                <ul className="detail-form">
                    <li>
                        <div className="detail-form-left">行驶起点</div>
                        <div className="detail-form-content">{state.orderInfo.start_location}</div>
                    </li>
                    <li>
                        <div className="detail-form-left">行驶终点</div>
                        <div className="detail-form-content">{state.orderInfo.end_location}</div>
                    </li>
                    <li>
                        <div className="detail-form-left">行驶里程</div>
                        <div className="detail-form-content">{state.orderInfo.distance/1000+"km"}</div>
                    </li>
                </ul>
            </div>
            </Card>
        </section>
    )
}
export default Detail;