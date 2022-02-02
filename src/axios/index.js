import axios from 'axios';
import { Modal } from 'antd';
import utils from '../utils/utils';
export default class Axios {
    static requestList(obj,url,params,isMock){
        // obj要包含state ,setState  ，params  ,request
        var data={
            params,isMock
        }
        this.ajax({url,data}).then(res=>{
            let list=res.result.list.map((value,index)=>{
                value.key=index;
                return value;
            })
            obj.setState({
                ...obj.state,
                list,
                pagination:utils.pagination(res, (current) => {//修改this上面的页码 然后根据这个页码从新取数据 下面的request就是从新取数据的过程  后台根据page来给数据
                    obj.params.page = current;
                    obj.request();
                })
            })
        })
    }


    static ajax(options){
        let baseApi="";
        if(options.isMock){
            baseApi="https://www.fastmock.site/mock/0640cce08faa2d19420c918a8741dc7f/car2";
        }else{
            baseApi="https://www.fastmock.site/mock/0640cce08faa2d19420c918a8741dc7f/car2";
        }
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:"get",
                timeout:5000,
                baseURL:baseApi,
                params:(options.data&&options.data.params)||""
            }).then(response=>{
                // console.log(response);
                if(response.status===200){
                    let res=response.data;
                    if(res.code==0){
                        resolve(res);
                    }else{
                        Modal.info({title:"提示",content:res.message})
                    }
                }else{
                    reject(response)
                }
            })
        })
    }


}