import { useState } from 'react';
import { Card, Input, Button, Checkbox, Form, message, Radio, InputNumber, Select, Switch, DatePicker, Space,TimePicker,Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
const { Option } = Select;

// 成功的回调函数
const onFinish=(item)=>{
    console.log("onFinish--form-Login:success",item);
    message.success("提交成功");
}
// 失败的回调函数
const onFinishFailed=(value)=>{
    console.log("onFinish--form-Login:error",value);
    message.error("提交失败");
}
const Reg = () => {
    let [imageUrl,setImgUrl]=useState(null);
    let [loading,setLoading]=useState(false);
    let uploadButton=(
        <div>
            {loading?<LoadingOutlined/>:<PlusOutlined/>}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )
        // 64转码
    const getBase64=(img, callback)=> {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }
    //   上传头像
    const handleChange = info => {
        if (info.file.status === 'uploading') {
          setLoading(true)
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>{
            setImgUrl(imageUrl);
            setLoading(false);
          }
          );
        }
      };

    const formItemLayout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 14,
        },
    };
    return (
        <section>
            <Card title="注册表单">
                <Form {...formItemLayout} onFinish={onFinish} onFinishFailed={onFinishFailed} >
                    <Form.Item name="userName" label="UserName" rules={[{ required: true, message: 'Please input your username!' }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="PassWord" rules={[{ required: true, message: 'Please input your Please input your password!' }]} >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item name="sex" label="性别">
                        <Radio.Group>
                            <Radio value="1">男</Radio>
                            <Radio value="0">女</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="年龄" name="age">
                        <InputNumber defaultValue={18} min={1} max={100} />
                    </Form.Item>
                    <Form.Item label="当前状态" name="select-one">
                        <Select>
                            <Option value="1">选项1</Option>
                            <Option value="2">选项2</Option>
                            <Option value="3">选项3</Option>
                            <Option value="4">选项4</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="多选菜单" name="select-two">
                        <Select mode='multiple' defaultValue={['1', '2']}>
                            <Option value="1">选项1</Option>
                            <Option value="2">选项2</Option>
                            <Option value="3">选项3</Option>
                            <Option value="4">选项4</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="IsMerry" name="IsMerry">
                        <Switch defaultChecked />
                    </Form.Item>
                    <Form.Item label="出生日期" name="birthday" >
                        <Space direction="vertical">
                            <DatePicker showTime defaultValue={moment('2000-10-21 00:00:00')} format="YYYY-MM-DD HH:mm:ss" />
                            <DatePicker picker="week" />
                        </Space>
                    </Form.Item>
                    <Form.Item
                        label="联系地址"
                        name="address"
                    >
                        <Input.TextArea defaultValue="地球 亚洲 中国 河北省" autoSize={{ minRows: 4, maxRows: 8 }} />
                    </Form.Item>
                    <Form.Item
                        label="早期时间"
                        name="time"
                    >
                        <TimePicker defaultValue={moment("05:20:13")} />
                    </Form.Item>
                    <Form.Item
                        label="上传头像"
                        name="touxiang"
                    >
                        <Upload
                            listType='picture-card'
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            showUploadList={false}
                            onChange={handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} /> : uploadButton}
                        </Upload>
                    </Form.Item>
                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </section>
    )
}
export default Reg;