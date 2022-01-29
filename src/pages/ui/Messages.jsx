import {Button, Card, message} from 'antd';
const handleClick=(type)=>{
    message[type]("说教无益,折断的骨头是最好的课本!")
}
const Messages=()=>{
    return (
        <section>
            <Card title="全局提示框" className='card-wrap'>
                <Button onClick={()=>handleClick("success")}>Success</Button>
                <Button onClick={()=>handleClick("info")}>info</Button>
                <Button onClick={()=>handleClick("warning")}>warning</Button>
                <Button onClick={()=>handleClick("error")}>error</Button>
            </Card>
        </section>
    )
}
export default Messages;