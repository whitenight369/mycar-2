import {Card} from 'antd';
import ReactEcharts from 'echarts-for-react';
const Line=()=>{
    let option1={//单条折线图
        title:{
            text:"用户骑行订单"
        },
        toolitip:{
            trigger:"item",
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
                type:"line",
                data:[1300,1400,1800,3000,2000,1500,1300]
            }
        ]
    }
    let option2={//多条折线
        title:{
            text:"用户骑行订单"
        },
        tooltip:{
            trigger:'item',
        },
        xAxis:{
            data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
        },
        yAxis:{
            type:"value"
        },
        legend:{
            top:"10px"
        },
        series:[
            {
                name:"OFO",
                type:"line",
                data:[2500,1400,1800,3000,2000,1500,5000]
            },
            {
                name:"小蓝",
                type:"line",
                data:[2000,1400,1500,3000,5000,1500,1300]
            },
            {
                name:"摩拜",
                type:"line",
                data:[3500,1400,1800,5000,2000,1500,1300]
            }
        ]
    }
    let option3={//面积图
        title:{
            text:"用户骑行订单"
        },
        tooltip:{
            trigger:'item',
        },
        xAxis:{
            boundaryGap: false,//刻度留白
            data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
        },
        yAxis:{
            type:"value"
        },
        series:[
            {
                name:"订单量",
                type:"line",
                data:[1300,1400,1800,3000,2000,1500,1300],
                areaStyle: {}
            }
        ]
    }
    return (
        <section>
            <Card title="折线图之一" className='card-wrap'>
                <ReactEcharts option={option1} style={{height:500}} />
            </Card>
            <Card title="折线图之二" className='card-wrap'>
                <ReactEcharts option={option2} style={{height:500}} />
            </Card>
            <Card title="折线图之三" className='card-wrap'>
                <ReactEcharts option={option3} style={{height:500}} />
            </Card>
        </section>
    )
}
export default Line;