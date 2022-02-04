import {Card} from 'antd';
import ReactEcharts from 'echarts-for-react';
const Bar=()=>{
    let option1={
        title:{
            text:"用户骑行订单"
        },
        tooltip:{
            trigger:"axis"
        },
        xAxis:{
            data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
        },
        yAxis:{
            type:"value"
        },
        series:[
            {
                name:"订单量",
                type:"bar",
                data:[1300,1400,1800,3000,2000,1500,1300]
            }
        ]
    }

    let option2 = {
        title: {
            text: '用户骑行订单'
        },
        tooltip : {
            trigger: 'axis'
        },
        legend:{//表头的色条
            data:['OFO','摩拜','小蓝']
        },
        xAxis: {//x轴的值
            data: [
                '周一',
                '周二',
                '周三',
                '周四',
                '周五',
                '周六',
                '周日'
            ]
        },
        yAxis: {//y轴的值
            type: 'value'
        },
        series: [
            {
                name: 'OFO',//对应的name
                type: 'bar',//展示的类型
                data: [2000,3000,5500,7000,8000,12000,20000]
            },
            {
                name: '摩拜',
                type: 'bar',
                data: [1500,3000,4500,6000,8000,10000,15000]
            },
            {
                name: '小蓝',
                type: 'bar',
                data: [1000,2000,2500,4000,6000,7000,8000]
            },
        ]
    }

    return (
        <section>
            <Card title="柱形图之一" className='card-wrap'>
                <ReactEcharts option={option1} style={{height:500}}/>
            </Card>
            <Card title="柱形图之二" className='card-wrap'>
                <ReactEcharts option={option2} style={{height:500}}/>
            </Card>
        </section>
    )
}
export default Bar;