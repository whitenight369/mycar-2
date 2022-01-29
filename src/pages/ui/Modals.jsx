import { useState } from 'react';
import { Card, Modal, Button } from 'antd';

const handleConfirm=(type)=>{
    Modal[type]({
        title:"白茶",
        content:"峡谷摄影师",
        onOk(){
            console.log("ok");
        },
        onCancel(){
            console.log("cancel");
        }
    })
}

const Modals = () => {
    const state = {
        showModal1: false,
        showModal2: false,
        showModal3: false,
        showModal4: false,
    }
    let [modalState, setState] = useState(state)
    return (
        <section>
            <Card title="基础模态框" className='card-wrap'>
                <Button type='primary' onClick={() => setState({ showModal1: true })}>Open</Button>
                <Button type='primary' onClick={() => setState({ showModal2: true })}>自定义页脚</Button>
                <Button type='primary' onClick={() => setState({ showModal3: true })}>顶部20px弹窗</Button>
                <Button type='primary' onClick={() => setState({ showModal4: true })}>水平垂直居中</Button>
            </Card>
            <Card title="信息确认框--Modal[type]" className='card-wrap'>
                <Button type='primary' onClick={() => handleConfirm("confirm")}>Confirm</Button>
                <Button type='primary' onClick={() => handleConfirm("info")}>Info</Button>
                <Button type='primary' onClick={() => handleConfirm("success")}>Success</Button>
                <Button type='primary' onClick={() => handleConfirm("error")}>Error</Button>
                <Button type='danger' onClick={() => handleConfirm("warning")}>Warning</Button>
            </Card>
            {/* Open */}
            <Modal visible={modalState.showModal1} onCancel={() => setState({ showModal1: false })}>
                <p>欢迎来到</p>
            </Modal>
            {/* 自定义页脚 */}
            <Modal title="月亮啊月亮" visible={modalState.showModal2} okText="南" cancelText="北" onCancel={() => setState({ showModal2: false })}>
                <p>欢迎来到2</p>
            </Modal>
            {/* 顶部20px */}
            <Modal title="月亮啊月亮" style={{ top: 20 }} visible={modalState.showModal3} okText="南" cancelText="北" onCancel={() => setState({ showModal3: false })}>
                <p>欢迎来到2</p>
            </Modal>
            {/* 水平垂直居中 */}
            <Modal title="月亮啊月亮" wrapClassName='vertical-center-modal' visible={modalState.showModal4} okText="南" cancelText="北" onCancel={() => setState({ showModal4: false })} >
                <p>欢迎来到2</p>
            </Modal>
        </section>
    )
}
export default Modals;