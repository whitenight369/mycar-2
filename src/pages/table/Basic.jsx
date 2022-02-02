import { useState, useEffect } from 'react';
import { Card, Button, message, Modal, Table } from 'antd';
import Axios from '../../axios';
import utils from '../../utils/utils';
const dataSource = [
    { id: "tom", username: "hhh",key:"1", sex: "男", state: "1", interest: "打篮球", birthday: "2000-09-24", time: "07:00" },
    { id: "susan", username: "hhh",key:"2", sex: "男", state: "1", interest: "打篮球", birthday: "2000-09-24", time: "07:00" },
    { id: "jarry", username: "hhh",key:"3", sex: "男", state: "1", interest: "打篮球", birthday: "2000-09-24", time: "07:00" },
    { id: "petter", username: "hhh",key:"4", sex: "男", state: "1", interest: "打篮球", birthday: "2000-09-24", time: "07:00" }
]

const initialState = {};

const Basic = () => {
    let params = {
        page: 1
    }
    let [state, setState] = useState(initialState);
    // 定义表头
    const columns = [
        { title: "id", dataIndex: "id" },
        { title: "用户名", dataIndex: "username" },
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
    const request=()=>{
        Axios.ajax({
            url: "/table/list",
            data: {
                params: {
                    page: params.page//后台的接口需要这个数据
                },
            }
        }).then(res => {
            // console.log(res);
            setState({
                ...state,
                dataSource1: res.result.list,
                selectedRowKeys: null,
                selectedRows: [],
                pagination: utils.pagination(res, (current) => {//修改this上面的页码 然后根据这个页码从新取数据 下面的request就是从新取数据的过程  后台根据page来给数据
                    params.page = current;
                    request();
                }),
                dataSource2: res.result.list
            })
        })
    }
    useEffect(() => {
        request();
    }, [])

    // 删除选中框
    // 删除选中框
    const handleDelete=()=>{
        let rows=state.selectedRows;
        let ids=[];
        rows.map(item=>{
            ids.push(item.id);
        })
        Modal.confirm({
            title:"提示",
            content:`您确定删除吗?${ids.join(",")}`,
            onOk:()=>{
                console.log(ids);
                message.success('删除成功');
                request();
            }
        })
    }

    return (
        <section>
            <Card title="基础表格" className='card-wrap'>
                <Table
                    bordered
                    columns={columns}
                    pagination={false}
                    dataSource={dataSource}
                />
            </Card>
            <Card title="动态表格" className='card-wrap'>
                <Table
                    bordered
                    columns={columns}
                    pagination={false}
                    dataSource={state.dataSource1}
                />
            </Card>
            <Card title="Mock-单选" className='card-wrap'>
                <Table
                    bordered
                    columns={columns}
                    pagination={false}
                    
                    rowSelection={{type:"radio",selectedRowKeys:state.selectedRowKeys}}
                    onRow={(record,index) => {
                        //   这里的index传来的是索引(从零开始) 不是key值
                        return {
                          onClick: ()=>{
                            let selectKey=[index];
                            Modal.info({
                                title:"信息",
                                content:`用户名:${record.username}`
                            });
                            setState({
                                ...state,
                                selectedRowKeys:selectKey,
                                selectedItem:record
                            })
                          }, // 点击行
                        };
                      }}
                    dataSource={state.dataSource1}
                />
            </Card>
            <Button type='danger' onClick={handleDelete}>删除</Button>
                <Card title="Mock-多选" className='card-wrap'>
                    <Table 
                        bordered
                        rowSelection={{
                            type: "checkbox", 
                            selectedRowKeys: state.selectedRowKeys, 
                            onChange:(selectedRowKeys, selectedRows)=> {
                                // 当前选中的key   全部选中的key
                                setState({
                                    ...state,
                                    selectedRows,
                                    selectedRowKeys
                                })
                            }
                        }}
                        // 这里用刚才传来的索引值去匹配key值
                        columns={columns}
                        pagination={false}
                        dataSource={state.dataSource1}
                    />
                </Card>
                <Card title="Mock-分页" className='card-wrap'>
                    <Table 
                        bordered
                        columns={columns}
                        pagination={state.pagination}
                        dataSource={state.dataSource2}
                    />
                </Card>
        </section>
    )
}
export default Basic;