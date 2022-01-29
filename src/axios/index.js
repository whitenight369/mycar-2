import axios from 'axios';

export default class Axios {
    static ajax(options){
        let baseApi="";
        if(options.isMock){
            baseApi="https://www.fastmock.site/mock/e6478be5d4a36a31d8658b1c558c8d09/car";
        }else{
            baseApi="https://www.fastmock.site/mock/e6478be5d4a36a31d8658b1c558c8d09/car";
        }
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:"get",
                timeout:5000,
                baseURL:baseApi,
                params:(options.data&&options.data.params)||""
            }).then(res=>{
                console.log(res);
            })
        })
    }
}