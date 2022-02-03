import { useState, useEffect } from 'react';
import { Card, Table, Button, Form, Select, Modal, message, DatePicker } from 'antd';
import Axios from '../../axios';
import utils from '../../utils/utils';
import BaseForm from './../../components/BaseForm';
import ETable from '../../components/ETable';
const { Option } = Select;
const FormItem = Form.Item;
const Order = () => {
    const [state, setState] = useState({ orderConfirmVisible: false, orderInfo: {} });
    const params = {
        page: 1
    }
    useEffect(() => {
        request()
    }, []);
    const request = () => {
        Axios.requestList({ state, setState, request }, '/order/list', params)
    }
    const formList = [
        {
            type: "SELECT",
            label: "城市",
            field: "city",
            placeholder: "全部",
            initialValue: 1,
            width: 120,
            list: [{ id: 0, name: "全部" }, { id: 1, name: "北京市" }, { id: 2, name: "天津市" }, { id: 3, name: "上海市" }]
        },
        {
            type: "时间查询",
        },
        {
            type: "SELECT",
            label: "订单状态",
            field: "status",
            placeholder: "全部",
            initialValue: 1,
            width: 120,
            list: [{ id: 0, name: "全部" }, { id: 1, name: "进行中" }, { id: 2, name: "已完成" }]
        }
    ]

    const columns = [{
        title: '订单编号',
        dataIndex: "order_sn"
    }, {
        title: '车辆编号',
        dataIndex: "bike_sn"
    }, {
        title: '用户名',
        dataIndex: "user_name"
    }, {
        title: '手机号',
        dataIndex: "mobile"
    }, {
        title: '里程',
        dataIndex: "distance",
        render(distance) {
            return distance / 1000 + 'km';
        }
    }, {
        title: '行驶时长',
        dataIndex: "total_time"
    }, {
        title: '状态',
        dataIndex: "status",
        render(status) {
            return status === 1 ? "进行中" : "结束行程"
        }
    }, {
        title: '开始时间',
        dataIndex: "start_time"
    }, {
        title: '结束时间',
        dataIndex: "end_time"
    }, {
        title: '订单金额',
        dataIndex: "total_fee"
    }, {
        title: '实付金额',
        dataIndex: "user_pay"
    }]
    const formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span5: 19 }
    }
    const rowSelection = {
        type: "radio",
        selectedRowKeys: state.selectedRowKeys,
    }
    //  提交事件
    const filterSubmit = (fieldValue) => {
        setState({
            ...state,
            fieldValue
        })
    }

    // 订单详情
    const  openOrderDetail=()=>{
        let item=state.selectedItem;
        if(!item){Modal.info({title:"信息",content:"请先选择一条订单"});return ;}
        window.open(`/#/common/order/detail/${item.id}`,'_blank');
    }
        // 结束订单
    const  handleConfirm=()=>{
            let item=state.selectedItem;
            if(!item){Modal.info({title:"信息",content:"请选择一条订单进行结束"}); return ;}
            Axios.ajax({
              url:"/order/ebike_info",
              data:{
                params:{
                  orderId:item.id
                }
              }
            }).then((res)=>{

              if(res.code==="0"){
                setState({
                    ...state,
                  orderInfo:res.result,
                  orderConfirmVisible:true
                })
              }
            })   
          }
    // 确认结束订单
    const onhandleFinishOrder=()=>{
        Axios.ajax({
            url:"/mycar2/success",
            data:{
                params:1
            }
        }).then(res=>{
            if(res.code===0){
                setState({
                    ...state,
                    orderConfirmVisible:false
                })
                message.success("结束成功");
                // request();
            }

        })
    }
    
    return (
        <section>
            <Card className='card-wrap'>
                <BaseForm formList={formList} filterSubmit={filterSubmit} />
            </Card>
            <Card className='card-wrap'>
                    <Button type='primary' onClick={openOrderDetail}>订单详情</Button>
                    <Button type='primary' style={{marginLeft:10}} onClick={handleConfirm}>结束订单</Button>
            </Card>
            <Card className='card-wrap'>
                <ETable
                    selectedIds={state.selectedIds}
                    selectedItem={state.selectedItem}
                    rowSelection={rowSelection}
                    columns={columns}
                    updateSelectedItem={utils.updateSelectedItem(state,setState)}
                    dataSource={state.list}
                    selectedRowKeys={state.selectedRowKeys}
                    pagination={state.pagination}
                />
            </Card>
            {/* 做到结束订单的modal框了 */}
            <Modal
                title="结束订单"
                visible={state.orderConfirmVisible}
                onCancel={()=>{
                    setState({
                        ...state,
                        orderConfirmVisible:false
                    })
                }}
                onOk={onhandleFinishOrder}
                width={600}
            >  
            <Form layout='horizontal'>
                <FormItem label="车辆编号" {...formItemLayout}>{state.orderInfo.bike_sn}</FormItem>
                <FormItem label="剩余电量" {...formItemLayout}>{state.orderInfo.battery+"%"}</FormItem>
                <FormItem label="开始时间" {...formItemLayout}>{state.orderInfo.start_time}</FormItem>
                <FormItem label="当前位置" {...formItemLayout}>{state.orderInfo.location}</FormItem>

            </Form>
            </Modal>
        </section>
    )
}
export default Order;