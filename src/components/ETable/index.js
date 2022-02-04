import { Table } from 'antd';

const ETable = (props) => {
    // 点击每一行的事件
    const onRowClick = (record, index) => {
        let rowSelection=props.rowSelection;
        if(rowSelection==="checkbox"){//如果是复选框的话
            let selectedRowKeys=props.selectedRowKeys;//索引
            let selectedItem=props.selectedItem;//数据
            let selectedIds=props.selectedIds;//id
            if(selectedIds){//判断里面是否有数据
                let i=selectedIds.indexOf(record.id);
                if(i===-1){//如果已有选中就把数据 id 索引推到数组中去
                    selectedIds.push(record.id);
                    selectedRowKeys.push(index);
                    selectedItem.push(record);
                }else{//如果是再次选中自己 需要把数据扔出去
                    selectedItem.splice(i,1);
                    selectedIds.splice(i,1);
                    selectedRowKeys.splice(i,1);
                }
            }else{//如果没有选中就创建一个新的数组存储上面的id 数据和索引
                selectedIds=[record.id];
                selectedRowKeys=[index];
                selectedItem=[record];
            }
            props.updateSelectedItem(selectedRowKeys,selectedItem,selectedIds);
        }else{//不然就是单选框
            let selectedRowKeys=[index];
            let selectedItem=record;
            props.updateSelectedItem(selectedRowKeys,selectedItem);
        }
    }

    // 初始化一个表格
    const tableinit=()=>{
        let row_selection=props.rowSelection;
        let selectedRowKeys=props.selectedRowKeys;
        const rowSelection={
            type:"radio",
            selectedRowKeys
        }
        if(row_selection===false||row_selection===null){
            row_selection=false;//不是单选或者复选
        }else if(row_selection==="checkbox"){
            rowSelection.type="checkbox";
        }else{
            row_selection="radio";
        }
        return (
            <Table
                {...props}
                bordered
                rowSelection={row_selection?rowSelection:null}
                onRow={(value,index)=>{
                    if(!row_selection)return ;//如果不是单选或者复选就直接没有事件
                    return{
                        onClick:()=>{
                            onRowClick(value,index);
                        }
                    }
                }}
            />
        )
    }

    return (
        <div>
            {tableinit()}
        </div>
    )
    
}
export default ETable;