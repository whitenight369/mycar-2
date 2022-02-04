import  { useState } from 'react'
import {Button, Card,Modal} from 'antd';
import { Editor } from "react-draft-wysiwyg";
import draftjs from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const Rich=()=>{
    let [state,setState]=useState({});
    const onEditorStateChange=(editorState)=>{
        setState({
            ...state,
            editorState
        })
    }
    //   清空文本   
    const handleClearContent=()=>{
        setState({
            ...state,
            editorState:"",
            cntentState:""
          });
    }
    // 获取文本
    const handleGetContent=()=>{
        setState({
            ...state,
            showRichText:true
        })
    }
    // 文本变化
    const onEditorChange=(cntentState)=>{
        setState({
            ...state,
            cntentState
        })
    }
    return (
        <section>
            <Card className='card-wrap'>
                <Button type='primary' onClick={handleClearContent}>清空内容</Button>
                <Button type='primary' onClick={handleGetContent} style={{marginLeft:10}}>获取html文本</Button>
            </Card>
            <Card title="富文本编辑器" className='card-wrap'>
                <Editor
                    onContentStateChange={onEditorChange}
                    editorState={state.editorState}
                    onEditorStateChange={onEditorStateChange}

                />
            </Card>
            <Modal
                    title="富文本"
                    visible={state.showRichText}
                    onCancel={()=>{
                        setState({
                            ...state,
                            showRichText:false
                        })
                    }}
                    footer={null}
                >
                    {draftjs(state.cntentState)}
                </Modal>
        </section>
    )
}
export default Rich;