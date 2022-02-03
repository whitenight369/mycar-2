import { Card, Button, Form, Input, Radio, Select, DatePicker,Modal,message } from 'antd';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import BaseForm from './../../components/BaseForm';
import ETable from './../../components/ETable';
import Axios from './../../axios';
import utils from '../../utils/utils';
const User = () => {
    const [form1] = Form.useForm();
    const [state, setState] = useState({ isVisible: false,userInfo:{}});
    const formList = [
        {
            type: "INPUT",
            label: "用户名",
            placeholder: "请输入用户名",
            field: "user_name"
        },
        {
            type: "INPUT",
            label: "手机号",
            placeholder: "请输入手机号",
            field: "user_mobile"
        }
    ]
    const params = {
        page: 1
    }
    const formItemLayOut = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
    }
    const request = () => {
        Axios.requestList({ state, setState }, '/table/list1', params)
    }
    const columns = [
        { title: "id", dataIndex: "id" },
        { title: "姓名", dataIndex: "username" },
        { title: "性别", dataIndex: "sex" },
        { title: "状态", dataIndex: "state" },
        { title: "爱好", dataIndex: "interest" },
        { title: "生日", dataIndex: "birthday" },
        { title: "联系地址", dataIndex: "address" },
        { title: "早起时间", dataIndex: "time" }
    ]
    useEffect(() => {
        request();
    }, [])
    // console.log("state",state);
    // 创建员工提交
    const handleSubmit = () => {
        let type = state.type;
        let data = form1.getFieldsValue();
        Axios.ajax({
            url: type == "create" ? "/mycar2/success" : "mycar2/success",
            data: {
                params: data
            }
        }).then(res => {
            if (res.code === 0) {
                setState({
                    ...state,
                    isVisible: false
                })
                // request();
            }
        })
    }
    // 按钮点击事件  分情况触发不同的模态框
    const handleOperate=(type)=>{
        let item=state.selectedItem;
        if(type==="create"){
            form1.resetFields();
            setState({
                ...state,
                isVisible:true,
                title:"创建员工",
                type
            })
        }else
        if(type==="edit"){
            if(!item){
                Modal.info({
                    title:"提示",
                    content:"请选择一个用户"
                })
                return ;
            }
            setState({
                ...state,
                isVisible:true,
                title:"编辑员工",
                userInfo:item,
                type
            })
        }else 
        if(type==="detail"){
            if(!item){
                console.log("hhhhhhh");
                Modal.info({
                    title:"提示",
                    content:"请选择一个员工"
                })
                return ;
            }
            setState({
                ...state,
                isVisible:true,
                userInfo:state.selectedItem,
                title:"员工详情",
                type
            })
        }else{
            if(!item){
                // console.log("hhhhhhh");
                Modal.info({
                    title:"提示",
                    content:"请选择一个员工"
                })
                return ;
            }
            Modal.confirm({
                title:`您确认删除${item.id}号吗?`,
                onOk:()=>{
                    Axios.ajax({
                        url:"/mycar2/success",
                        data:{
                            params:{
                                id:item.id
                            }
                        }
                    }).then(res=>{
                        if(res.code===0){
                            setState({
                                ...state,
                                isVisible:false
                            })
                            message.info("删除成功!");
                            // request();
                        }
                    })
                }
            })
        }
    }
    // console.log(state);

    const updateSelectedItem=(selectedRowKeys,selectedItem,selectedIds)=>{
            if(selectedIds){
                setState({
                    ...state,
                    selectedItem,
                    selectedRowKeys,
                    selectedIds
                })
            }else{
                setState({
                    ...state,
                    selectedItem,
                    selectedRowKeys
                }) 
            }
        // console.log(state);
    }

    // 取消详情框的页脚
    let footer = {};
    if (state.type === "detail") {
        footer = {
            footer: null
        }
    }
    // 初始化表单
    const initialValues={user_name:state.userInfo.username,sex:state.userInfo.sex,state:state.userInfo.state,birthday:moment(state.userInfo.birthday),address:state.userInfo.address}
    return (
        <section>
            <Card className='card-wrap'>
                <BaseForm formList={formList} />
            </Card>
            <Card className='card-wrap'>
                <Button onClick={()=>handleOperate('create')} icon={<PlusOutlined />} style={{ marginRight: 10 }}>创建员工</Button>
                <Button icon={<PlusOutlined />} onClick={()=>handleOperate('edit')} style={{ marginRight: 10 }}>编辑员工</Button>
                <Button icon={<PlusOutlined />} onClick={()=>handleOperate('detail')} style={{ marginRight: 10 }}>员工详情</Button>
                <Button icon={<PlusOutlined />} onClick={()=>handleOperate('delete')} style={{ marginRight: 10 }}>删除员工</Button>
            </Card>
            <Card>
                <ETable
                    selectedItem={state.selectedItem}
                    selectedRowKeys={state.selectedRowKeys}
                    dataSource={state.list}
                    columns={columns}
                    updateSelectedItem={updateSelectedItem}
                    pagination={state.pagination}
                />
            </Card>
            <Modal
                title={state.title}
                visible={state.isVisible}
                width={600}
                onOk={()=>{handleSubmit()}}
                onCancel={() => {
                    form1.resetFields();
                    setState({
                        ...state,
                        isVisible: false
                    })
                }}
                {...footer}
            >
             <UserForm form1={form1} userInfo={state.userInfo} formItemLayOut={formItemLayOut} type={state.type} />  
            </Modal>
        </section>
    )
}
export default User;
const UserForm=(props)=>{
    let {formItemLayOut,form1,userInfo,type}=props;
    return (
        <Form layout='horizontal' form={form1}>
        <Form.Item {...formItemLayOut} label="用户名" name="user_name" initialValue={userInfo.username}>
            {type === "detail" ? userInfo.username : <Input placeholder='请输入用户名' />}
        </Form.Item>
        <Form.Item {...formItemLayOut} label="性别" name="sex" initialValue={userInfo.sex}>
            {type === "detail" ? userInfo.sex === 1 ? "男" : "女" : <Radio.Group >
                <Radio value={1}>男</Radio>
                <Radio value={0}>女</Radio>
            </Radio.Group>}
        </Form.Item>
        <Form.Item {...formItemLayOut} label="状态" name="state" initialValue={userInfo.state}>
            {type==="detail"?userInfo.state:<Select>
                <Select.Option value={1}>PlanB</Select.Option>
                <Select.Option value={2}>A计划</Select.Option>
                <Select.Option value={3}>晚安</Select.Option>
                <Select.Option value={4}>晚安</Select.Option>
                <Select.Option value={5}>晚安</Select.Option>
            </Select>}
        </Form.Item>
        <Form.Item {...formItemLayOut} label="生日" name={"birthday"} initialValue={moment(userInfo.birthday)}>
            {type==="detail"?userInfo.birthday:<DatePicker />}
        </Form.Item>
        <Form.Item {...formItemLayOut} label="联系地址" name={"address"} initialValue={userInfo.address}>
            <Input.TextArea placeholder="请输入地址" rows={3} />
        </Form.Item>
    </Form>
    )
}