import { useState, useEffect } from 'react';
import { Card, Modal,Form ,Select,Table } from 'antd';
import FilterForm from './../../components/BaseForm';
import utils from '../../utils/utils';
import Axios from '../../axios';
const FormItem=Form.Item;
const {Option}=Select;
const City = () => {
    const [state, setState] = useState({ isShowOpenCity: false});
    const [form1] = Form.useForm();
    const params={
        page:1
    }

    const request = () => {
        Axios.ajax({
            url: "/open_city",
            data: {
                params
            }
        }).then(res => {
            console.log(res);
            setState({
                ...state,
                list: res.result.list,
                pagination:utils.pagination(res, (current) => {//修改this上面的页码 然后根据这个页码从新取数据 下面的request就是从新取数据的过程  后台根据page来给数据
                    params.page = current;
                    request();
                })
            })
        })
    }

    useEffect(() => {
        request();

    }, [])


    // 表一
    const formList = [
        {
            type: "SELECT",
            label: "城市",
            width: 80,
            placeholder: "请选择",
            field: "city",
            list: [{ id: 0, name: "全部" }, { id: 1, name: "北京" }, { id: 2, name: "上海" }, { id: 3, name: "杭州" }]
        },
        {
            type: "SELECT",
            label: "用车模式",
            width: 120,
            placeholder: "全部",
            field: "car_mode",
            list: [{ id: 0, name: "全部" }, { id: 1, name: "指定停车点模式" }, { id: 2, name: "禁停区模式" }]
        },
        {
            type: "SELECT",
            label: "运行模式",
            width: 120,
            placeholder: "全部",
            field: "yunxingmoshi",
            list: [{ id: 0, name: "全部" }, { id: 1, name: "自营" }, { id: 2, name: "加盟" }]
        },
        {
            type: "SELECT",
            label: "加盟商授权状态",
            width: 100,
            placeholder: "全部",
            field: "jiameng",
            list: [{ id: 0, name: "全部" }, { id: 1, name: "已授权" }, { id: 2, name: "未授权" }]
        }
    ]
    // 表头的查询事件
    const filterSubmit = (fieldValue) => {
        setState({
            ...state,
            fieldValue,
            isShowOpenCity: true
        })
    }
    // modal的提交事件
    const onSubmit = () => {
        let form1Value=form1.getFieldsValue()
        setState({
            ...state,
            isShowOpenCity: false,
            form1Value:form1Value
        })
        console.log(state.form1Value);
    }
    // Modal的布局
    const formItemLayout={
        labelCol:{span:5},
        wrapperCol:{span:19}
    }
    const columns=[
        {title:"城市ID",dataIndex:"id"},
        {title:"城市名称",dataIndex:"name"},
        {title:"用车模式",dataIndex:"mode",render(mode){return mode===1?"停车点":"禁停区"}},
        {title:"运行模式",dataIndex:"op_mode",render(mode){return mode===1?"自营":"加盟"}},
        {title:"授权加盟商",dataIndex:"franchisee_name"},
        {title:"城市管理员",dataIndex:"city_admins",render(arr){return arr.map(item=>item.user_name).join(",")}},
        {title:"操作时间",dataIndex:"update_time",render:utils.formateDate},
        {title:"操作人",dataIndex:"sys_user_name"}
    ]
    return (
        <section>
            <Card className='card-wrap'>
                <FilterForm formList={formList} filterSubmit={filterSubmit} />
            </Card>
            <Card>
                <Table
                    bordered
                    columns={columns}
                    dataSource={state.list}
                    pagination={state.pagination}
                />
            </Card>

            <Modal
                title="开通城市"
                visible={state.isShowOpenCity}
                onCancel={() => {
                    setState({
                        isShowOpenCity: false
                    })
                }}
                onOk={onSubmit}
            >
                <Form layout='horizontal' form={form1} initialValues={{city_id:"",op_mode:"0",use_mode:"0"}} >
                    <FormItem label="选择城市" name="city_id" initialValue="1" {...formItemLayout}>
                        <Select style={{ width: 120 }}>
                            <Option value="">全部</Option>
                            <Option value="1">北京市</Option>
                            <Option value="2">天津市</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="营运模式" name="op_mode" initialValue="1" {...formItemLayout}>
                        <Select>
                            <Option value="1">自营</Option>
                            <Option value="2">加盟</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="用车模式" name="use_mode" initialValue="1" {...formItemLayout}>
                        <Select>
                            <Option value="1">指定停车点</Option>
                            <Option value="2">禁停区</Option>
                        </Select>
                    </FormItem>
                </Form>
            </Modal>
        </section>
    )
}
export default City;