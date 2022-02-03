import React from 'react';

import {Select} from 'antd';
let Option=Select.Option;
const utils={
    // 时间
    formaDate(time){
        if(!time)return "";
        let date = new Date(time);
        return date.getFullYear()+"-"+(date.getMonth()+1)+'-'+date.getDate()+" "+date.getHours()+":"+(date.getMinutes()>9?date.getMinutes():"0"+date.getMinutes())+":"+(date.getSeconds()>9?date.getSeconds():"0"+date.getSeconds()) 
    },
    // 分页
    pagination(data,callback){
        return{
            onChange:(current)=>{
                callback(current)
            },
            current:data.result.page,
            pageSize:data.result.page_size,
            total:data.result.total_count,
            showTotal:()=>{
                return `共${data.result.total_count}条`;
            },
            showQuickJumper:true
        }
    },
    getOptionsList(data){
        if(!data) return ;
        let options=[];
        data.map(item=>{
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options;
    },
    updateSelectedItem(state,setState){
        return (selectedRowKeys,selectedItem,selectedIds)=>{
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
        }
        // console.log(selectedItem);
    }
    
}
export default utils;