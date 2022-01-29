import {useState} from 'react';
import {Card,Button,Radio } from 'antd';
import {PlusOutlined,SearchOutlined,DeleteOutlined,EditOutlined,DownloadOutlined,LeftOutlined,RightOutlined} from '@ant-design/icons'
import './ui.less';
const Buttons=()=>{
    let [loading,setLoading]=useState(true);
    let [size,setSize]=useState("default");
    return (
        <section>
            <Card title="基础按钮" className='card-wrap'>
                <Button type='primary'>Imooc</Button>
                <Button>Imooc</Button>
                <Button disabled>Imooc</Button>
                <Button type='danger'>Imooc</Button>
                <Button type='dashed'>Imooc</Button>
            </Card>
            <Card title="图形按钮" className='card-wrap'>
                <Button icon={<PlusOutlined/>}>创建</Button>
                <Button icon={<EditOutlined/>}>编辑</Button>
                <Button type='danger' icon={<DeleteOutlined/>}>删除</Button>
                <Button shape='circle' icon={<SearchOutlined/>} />
                <Button type='primary' icon={< SearchOutlined/>}>搜索</Button>
                <Button type='primary' icon={<DownloadOutlined />}>下载</Button>
            </Card>
            <Card title="Loading按钮" className='card-wrap'>
                <Button shape='circle' loading={loading} />
                <Button shape='circle' loading={loading} type='primary' />
                <Button loading={loading}>确定</Button>
                <Button loading={loading} disabled={loading}>点击加载</Button>
                <Button type='primary' onClick={()=>{
                    setLoading(!loading)
                }}>关闭</Button>
            </Card>
            <Card title="按钮组" style={{marginBottom:10}} >
                <Button type='primary'icon={<LeftOutlined />}>前进</Button>
                <Button type='primary' icon={<RightOutlined />}>后退</Button>
            </Card>
            <Card title="按钮尺寸" className='card-wrap' onChange={item=>{
                // console.log(item.target.value);
                setSize(item.target.value);
            }} >
                <Radio.Group defaultValue="default">
                    <Radio value="small">小</Radio>
                    <Radio value="default">中</Radio>
                    <Radio value="large">大</Radio>
                </Radio.Group>
                <Button type='primary' size={size}>Imooc</Button>
                <Button size={size}>Imooc</Button>
                <Button disabled size={size}>Imooc</Button>
                <Button type='danger' size={size}>Imooc</Button>
                <Button type='dashed' size={size}>Imooc</Button>
            </Card>
        </section>
    )
}
export default Buttons;