import { useState, useEffect } from 'react';
import { Card, Table, Button, Badge, Modal, message } from 'antd';
import Axios from '../../axios';



const HighTable = () => {
    const [state, setState] = useState({});
    const params = {
        page: 1
    }
    const request = () => {
        Axios.ajax({
            url: "/table/high",
            data: {
                params
            }
        }).then(res => {
            // console.log(res);
            setState({
                ...state,
                dataSource3: res.result.list,
                dataSource2: res.result.list
            })
        })
    }
    // 删除操作
    const handleDelete = (item) => {
        Modal.confirm({
            title: "确认",
            content: `您确认删除此条数据${item.id}吗`,
            onOk: () => {
                message.success("删除成功");
                    request();
            }
        })
    }

    useEffect(() => {
        request();

    }, [])
    const columns = [
        { title: "id", dataIndex: "id", },
        { title: "用户名", dataIndex: "userName" },
        { title: "性别", dataIndex: "sex", render(state) { return state == 1 ? "男" : "女" } },
        {
            title: "昵称", dataIndex: "state",
            render(state) {
                let config = {
                    "1": "还能说晚安吗",
                    "2": "别再贩卖黄昏了",
                    "3": "你携秋水揽星河",
                    "4": "可惜我只是文字",
                    "5": "不然还能拥抱你"
                }
                return config[state]
            }
        },
        { title: "爱好", dataIndex: "interest" },
        { title: "生日", dataIndex: "birthday" },
        { title: "早期时间", dataIndex: "time" }
    ]
    const columns1 = [
        { title: "id", dataIndex: "id", fixed: "left" },
        { title: "用户名", dataIndex: "userName", fixed: "left" },
        { title: "性别", dataIndex: "sex", render(state) { return state == 1 ? "男" : "女" } },
        {
            title: "昵称", dataIndex: "state", width: 150,
            render(state) {
                let config = {
                    "1": "还能说晚安吗",
                    "2": "别再贩卖黄昏了",
                    "3": "你携秋水揽星河",
                    "4": "可惜我只是文字",
                    "5": "不然还能拥抱你"
                }
                return config[state]
            }
        },
        { title: "爱好", dataIndex: "interest" },
        { title: "生日", dataIndex: "birthday" },
        { title: "生日", dataIndex: "birthday" },
        { title: "生日", dataIndex: "birthday" },
        { title: "生日", dataIndex: "birthday" },
        { title: "生日", dataIndex: "birthday" },
        { title: "生日", dataIndex: "birthday" },
        { title: "生日", dataIndex: "birthday" },
        { title: "生日", dataIndex: "birthday" },
        { title: "生日", dataIndex: "birthday" },
        { title: "生日", dataIndex: "birthday" },
        { title: "生日", dataIndex: "birthday" },
        { title: "生日", dataIndex: "birthday" },
        { title: "生日", dataIndex: "birthday" },
        { title: "早期时间", dataIndex: "time" },
        { title: "生日", dataIndex: "birthday" },
    ]
    const columns2 = [
        { title: "id", dataIndex: "id", },
        { title: "用户名", dataIndex: "userName" },
        {
            title: "年龄", dataIndex: "age", sorter: (a, b) => {
                return a.age - b.age
            }
        },
        { title: "性别", dataIndex: "sex", render(state) { return state == 1 ? "男" : "女" } },
        {
            title: "昵称", dataIndex: "state",
            render(state) {
                let config = {
                    "1": "还能说晚安吗",
                    "2": "别再贩卖黄昏了",
                    "3": "你携秋水揽星河",
                    "4": "可惜我只是文字",
                    "5": "不然还能拥抱你"
                }
                return config[state]
            }
        },
        { title: "爱好", dataIndex: "interest" },
        { title: "生日", dataIndex: "birthday" },
        { title: "早期时间", dataIndex: "time" }
    ]
    const columns3 = [
        { title: "id", dataIndex: "id", },
        { title: "用户名", dataIndex: "userName" },
        {
            title: "年龄", dataIndex: "age", sorter: (a, b) => {
                return a.age - b.age
            }
        },
        { title: "性别", dataIndex: "sex", render(state) { return state == 1 ? "男" : "女" } },
        {
            title: "昵称", dataIndex: "state",
            render(state) {
                let config = {
                    "1": <Badge text="还能说晚安吗" status='error' />,
                    "2": <Badge text="别再贩卖黄昏了" status='warning' />,
                    "3": <Badge text="你携秋水揽星河" status='success' />,
                    "4": <Badge text="可惜我只是文字" status='default' />,
                    "5": <Badge text="不然还能拥抱你" status='processing' />
                }
                return config[state]
            }
        },
        { title: "爱好", dataIndex: "interest" },
        { title: "生日", dataIndex: "birthday" },
        {
            title: "操作", render: (text, item) => {
                return <Button onClick={() => { handleDelete(item) }} >删除</Button>
            }
        }
    ]
    return (
        <section>
            <Card title="头部固定" className='card-wrap'>
                <Table
                    bordered
                    columns={columns}
                    dataSource={state.dataSource3}
                    scroll={{ y: 240 }}
                />
            </Card>
            <Card title="左侧固定" className='card-wrap'>
                <Table
                    bordered
                    columns={columns1}
                    dataSource={state.dataSource3}
                    scroll={{ x: 1800 }}
                />
            </Card>
            <Card title="表格排序" className='card-wrap'>
                <Table
                    bordered
                    columns={columns2}
                    dataSource={state.dataSource3}
                    scroll={{ x: 1800 }}
                />
            </Card>
            <Card title="表格操作" className='card-wrap'>
                <Table
                    bordered
                    columns={columns3}
                    dataSource={state.dataSource3}
                    scroll={{ y: 240 }}
                />
            </Card>
        </section>
    )
}
export default HighTable;