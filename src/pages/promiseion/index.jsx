import { useState, useEffect } from 'react';
import { Button, Card, Modal, Form, Select, Input, Tree, Transfer } from 'antd';
import ETable from './../../components/ETable';
import utils from '../../utils/utils';
import Axios from './../../axios';
import menuList from './../../config/menuConfig';
let Option = Select.Option;
let FormItem = Form.Item;
const Promision = () => {
    let [form_Role] = Form.useForm();
    let [form_Permission] = Form.useForm();
    let [form_Author] = Form.useForm();
    let [state, setState] = useState({});
    let [visible, setVisible] = useState({ isRoleVisible: false, isPermissionVisible: false,isUserVisible:false });
    // 获取表格数据
    const request = () => {
        Axios.requestList({ state, setState }, '/role/list', {});
    }
    useEffect(() => {
        request();
    }, [])

    // 表头
    let columns = [
        { title: "角色ID", dataIndex: "id" },
        { title: "角色名称", dataIndex: "role_name" },
        { title: "创建时间", dataIndex: "create_time", render(create_time) { return utils.formaDate(create_time); } },
        { title: "使用状态", dataIndex: "status", render(status) { return status === 1 ? "启用" : "禁用"; } },
        { title: "授权时间", dataIndex: "authorize_time", render(authorize_time) { return utils.formaDate(authorize_time); } },
        { title: "授权人", dataIndex: "authorize_user_name" }
    ]

    // 创建角色
    const handleRole = () => {
        setVisible({
            ...visible,
            isRoleVisible: true
        })
    }
    // 创建角色的确定事件 --->将输入的数据发送给后台创建 之后清空数据表单 刷新页面
    const handleRoleSubmit = () => {
        let data = form_Role.getFieldsValue();
        Axios.ajax({
            url: "/mycar2/success",
            data: { params: data }
        }).then(res => {
            if (res.code === 0) {
                setVisible({
                    ...visible,
                    isRoleVisible: false
                })
                form_Role.resetFields();
                request();
            }
        })
    }


    // 设置权限
    const handlePermission = () => {
        let item = state.selectedItem;
        if (!item) {
            Modal.info({
                title: "请选择一个角色"
            })
            return;
        }
        setState({
            ...state,
            detailInfo: item,
            menuInfo: item.menus
        });
        setVisible({
            ...visible,
            isPermissionVisible: true
        })
    }
    // 权限提交
    const handlePermissionSubmit = () => {
        let data = form_Permission.getFieldsValue();
        data.role_id = state.selectedItem.id;
        data.menus = state.menuInfo;
        Axios.ajax({
            url: "/mycar2/success",
            data: { params: { ...data } }
        }).then(res => {
            if (res) {
                setVisible({
                    ...visible,
                    isPermissionVisible: false
                })
                request();
            }
        })
    }

    // 用户授权
    const handleUserAuth=()=>{
        let item=state.selectedItem;
        if(!item){
            Modal.info({
                title:"请选择一个角色"
            })
            return ;
        }
        setState({
            ...state,
            detailInfo:item
        })
        setVisible({
            ...visible,
            isUserVisible:true
        })
        getRoleUserList(item.id);
    }
    // 根据id获取授权和未授权的名单
    const getRoleUserList=(id)=>{
        Axios.ajax({
            url:"/role/user_list",
            data:{
                params:{
                    id
                }
            }
        }).then(res=>{
            console.log(res)
            getAuthUserList(res.result);
        })
    }
    // 筛选用户
    const getAuthUserList=(dataSource)=>{
        const mockData=[];
        const targetKeys=[];
        if(dataSource&&dataSource.length>0){
            dataSource.map(value=>{
                const data={
                    key:value.user_id,
                    title:value.user_name,
                    status:value.status
                }
                if(data.status==1){
                    targetKeys.push(data.key);
                }
                mockData.push(data);
                return value;
            })
            setState({...state,mockData,targetKeys})
        }
    }
    // 用户授权提交
    const handleUserSubmit=()=>{
        let data={};
        data.user_ids=state.targetKeys;
        data.role_id=state.selectedItem.id;//这一项是选中的某种职务
        Axios.ajax({
            url:"/mycar2/success",
            data:{
                params:{
                    ...data
                }
            }
        }).then(res=>{
            if(res){
                setVisible({
                    ...visible,
                    isUserVisible:false
                })
                request();
            }
        })
    }
    return (
        <section>
            <Card>
                <Button type='primary' onClick={handleRole}>创建角色</Button>
                <Button type='primary' onClick={handlePermission} style={{ marginLeft: 10 }}>设置权限</Button>
                <Button type='primary' onClick={handleUserAuth} style={{ marginLeft: 10 }}>用户授权</Button>
            </Card>
            <div className='content-wrap'>
                <ETable
                    columns={columns}
                    selectedItem={state.selectedItem}
                    updateSelectedItem={utils.updateSelectedItem(state, setState)}
                    selectedRowKeys={state.selectedRowKeys}
                    dataSource={state.list}
                />
            </div>
            <Modal
                title="创建角色"
                visible={visible.isRoleVisible}
                onOk={handleRoleSubmit}
                onCancel={() => {
                    form_Role.resetFields();
                    setVisible({
                        ...visible,
                        isRoleVisible: false
                    })
                }}
            >
                <RoleForm form_Role={form_Role} />
            </Modal>
            <Modal
                title="设置权限"
                visible={visible.isPermissionVisible}
                onOk={handlePermissionSubmit}
                onCancel={() => {
                    setVisible({
                        ...visible,
                        isPermissionVisible: false
                    })
                }}
            >
                <PermEditForm
                    form_Permission={form_Permission}
                    menuInfo={state.menuInfo}
                    detailInfo={state.detailInfo}
                    patchMenuInfo={checkedKeys => {
                        setState({
                            ...state,
                            menuInfo: checkedKeys
                        })
                    }}
                />
            </Modal>
            <Modal
                title="用户授权"
                visible={visible.isUserVisible}
                width={800}
                onOk={handleUserSubmit}
                onCancel={()=>{
                    setVisible({
                        ...visible,
                        isUserVisible:false
                    })
                }}
            >
                <RoleAuthForm form_Author={form_Author} detailInfo={state.detailInfo} mockData={state.mockData} targetKeys={state.targetKeys}  patchUserInfo={targetKeys=>{
                    setState({
                        ...state,
                        targetKeys
                    })
                }} />
            </Modal>
        </section>
    )
}
export default Promision;
// 创建角色的表单
const RoleForm = (props) => {
    const formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
    }
    return (
        <section>
            <Form layout='horizontal' form={props.form_Role}>
                <FormItem label="角色名称" name="role_name" {...formItemLayout}>
                    <Input type="text" placeholder="请输入角色名称" />
                </FormItem>
                <FormItem label="状态" name="state" {...formItemLayout}>
                    <Select>
                        <Option value={1}>开启</Option>
                        <Option value={0}>关闭</Option>
                    </Select>
                </FormItem>
            </Form>
        </section>
    )
}
// 权限的表单
const PermEditForm = (props) => {
    const onCheck = (checkedKeys) => {
        props.patchMenuInfo(checkedKeys)
    }
    const treeData = [{
        title: "平台权限",
        key: "/platform_all",
        children: menuList
    }]
    const formItemLayOut = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
    }
    const detail_Info = props.detailInfo;
    const menuInfo = props.menuInfo;
    return (
        <section>
            <Form layout='horizontal' form={props.form_Permission}>
                <FormItem label="角色名称" {...formItemLayOut}>
                    <Input disabled placeholder={detail_Info.role_name} />
                </FormItem>
                <FormItem label="状态" name="status" initialValue="1" {...formItemLayOut} >
                    <Select>
                        <Option value="1">启用</Option>
                        <Option value="0">禁用</Option>
                    </Select>
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                    treeData={treeData}
                    autoExpandParent={true}
                    onCheck={checkedKeys => {
                        console.log(checkedKeys);
                        onCheck(checkedKeys)
                    }}
                    checkedKeys={menuInfo}//默认选中的
                />

            </Form>
        </section>
    )
}

const RoleAuthForm=(props)=>{
    const filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1;

    const handleChange=(targetKeys)=>{
          props.patchUserInfo(targetKeys)
    }
    const formItemLayOut={
        labelCol:{span:6},
        wrapperCol:{span:18}
    }
    const detail_Info=props.detailInfo;
    return (
        <section>
            <Form layout='horizontal' form={props.form_Author}>
                <FormItem label="角色名称" {...formItemLayOut}>
                   <Input disabled placeholder={detail_Info.role_name} />
                </FormItem>
                <FormItem label="选择用户" {...formItemLayOut}>
               <Transfer
                showSearch
                listStyle={{width:200,height:400}}
                searchPlaceholder="输入用户名"
                targetKeys={props.targetKeys}
                dataSource={props.mockData}
                filterOption={filterOption}
                titles={["待选用户","已选用户"]}
                onChange={handleChange}
                render={i=>i.title}
               />
               </FormItem>
            </Form>
        </section>
    )
}
