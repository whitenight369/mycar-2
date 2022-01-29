import {Alert, Card,Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Loadings=()=>{
    return (
        <section>
            <Card title="Spin用法" className='card-wrap'>
                <Spin size="small" style={{marginRight:10}} />
                <Spin style={{marginRight:10}} />
                <Spin size="large" style={{marginRight:10}} />
                <Spin  style={{marginRight:10}} indicator={<LoadingOutlined style={{ fontSize: 24 }}  />}  />
                <LoadingOutlined style={{ fontSize: 24 }} spin />
            </Card>
            <Card title="遮罩层" className='card-wrap'>
                <Alert
                    message="补丁才是最强的武器"
                    description="--贾克斯"
                    type='info'
                />
                <Alert
                    message="我有一个特点不擅长倒下"
                    description="--波比"
                    type='warning'
                />
                <Alert
                    message="我宁愿犯错误,也不愿意什么都不做"
                    description="--艾克"
                    type='error'
                />
                <Alert
                    message="一点寒芒先到,随后枪出如龙"
                    description="--赵信"
                    type='error'
                />
            </Card>
        </section>
    )
}
export default Loadings;