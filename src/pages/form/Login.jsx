import { Card, Input, Button, Checkbox, Form,message } from 'antd';


const Login = () => {
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
    return (
        <section>
            <Card title="登录行内菜单">
                <Form layout='inline'>
                    <Form.Item name="userName" label="UserName" rules={[{ required: true, message: 'Please input your username!' }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="PassWord" rules={[{ required: true, message: 'Please input your Please input your password!' }]} >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card title="登录水平菜单">
                <Form style={{ width: "300px" }} labelCol={{ span: 8 }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Form.Item name="userName" label="UserName" rules={[{ required: true, message: 'Please input your username!' }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="PassWord" rules={[{ required: true, message: 'Please input your Please input your password!' }]} >
                        <Input.Password />
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
export default Login;