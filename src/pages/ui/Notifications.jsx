import {Card,notification,Button} from 'antd';
const handleClick=(type,placement)=>{
    if(placement){
        notification[type]({
            message:"即使一无所有,也要未雨绸缪!",
            description:"法外狂徒",
            placement
        })
    }else{
        notification[type]({
            message:"即使一无所有,也要未雨绸缪!",
            description:"法外狂徒"
        })
    }
}
const Notifications=()=>{
    return (
        <section>
            <Card title="消息通知" className='card-wrap'>
                <Button onClick={()=>handleClick("success")}>Success</Button>
                <Button onClick={()=>handleClick("info")}>Info</Button>
                <Button onClick={()=>handleClick("warning")}>Warning</Button>
                <Button onClick={()=>handleClick("error")}>Error</Button>
            </Card>
            <Card title="消息通知" className='card-wrap'>
                <Button onClick={()=>handleClick("success","topLeft")}>Success</Button>
                <Button onClick={()=>handleClick("info","topRight")}>Info</Button>
                <Button onClick={()=>handleClick("warning","bottomLeft")}>Warning</Button>
                <Button onClick={()=>handleClick("error","bottomRight")}>Error</Button>
            </Card>
            
        </section>
    )
}
export  default Notifications;