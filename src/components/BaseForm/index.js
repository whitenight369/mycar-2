import { Input, Card, Select, Button, Checkbox, Radio, Form, DatePicker } from 'antd';
import utils from '../../utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;
const FilterForm = (props) => {
    const [form] = Form.useForm();
    const initFormList = () => {
        const formList = props.formList;
        const formListItem = [];
        if (formList && formList.length > 0) {
            formList.map((item, index) => {
                let label = item.label;
                let field = item.field;
                let initValue = item.initialValue || "";
                let placeholder = item.placeholder;
                let width = item.width;
                if (item.type === "时间查询") {
                    const BEGIN_TIME = <FormItem name="start_time" label={label} key={field}>
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder={placeholder} />
                    </FormItem>
                    formListItem.push(BEGIN_TIME);
                    const END_TIME = <FormItem name={"end_time"} key={field} label='~' colon={false} >
                        <DatePicker showTime format='YYYY-MM-DD HH:mm:ss' placeholder={placeholder} />
                    </FormItem>;
                    formListItem.push(END_TIME);
                } else
                    if (item.type === "INPUT") {
                        const INPUT = <FormItem name={field} label={label} key={field}>
                            <Input type="text" placeholder={placeholder} />
                        </FormItem>
                        formListItem.push(INPUT);
                    } else
                        if (item.type === "SELECT") {
                            const SELECT = <FormItem name={field} initialValue={initValue} label={label} key={field}>
                                <Select placeholder={placeholder} style={{ width }} >
                                    {utils.getOptionsList(item.list)}
                                </Select>
                            </FormItem>;
                            formListItem.push(SELECT);
                        } else
                            if (item.type === "CHECKBOX") {
                                const CHECKBOX = <FormItem name={field} label={label} key={field}>
                                    <Checkbox>
                                        {label}
                                    </Checkbox>
                                </FormItem>;
                                formListItem.push(CHECKBOX);
                            } else
                                if (item.type === "datepicker") {
                                    const Date = <FormItem name={field} key={field} label="~" colon={false}>
                                        <DatePicker showTime format='YYYY-MM-DD HH:mm:ss' placeholder={placeholder} />
                                    </FormItem>;
                                    formListItem.push(Date);
                                } else
                                    if (item.type === "城市") {
                                        const city = <FormItem name={field} key={field}>
                                            <Select placeholder={placeholder} defaultValue="0" style={{ width: 80 }} >
                                                {utils.getOptionsList([{ id: 0, name: "全部" }, { id: 1, name: "北京" }, { id: 2, name: "上海" }, { id: 3, name: "杭州" }, { id: 4, name: "天津" }])}
                                            </Select>
                                        </FormItem>
                                        formListItem.push(city);
                                    }
            })
        }
        return formListItem;
    }

    const hanleFilterSubmit=()=>{
        //在这里获取数据需要添加name值  没有name值获取不到数据
        let fieldValue=form.getFieldsValue();
        props.filterSubmit(fieldValue);
    }
    
    // 重置
    const reset=()=>{
        form.resetFields();
    }

    return (
        <Form layout='inline' form={form}>
            {initFormList()}
            <FormItem>
                <Button type='primary' style={{ margin: "0px 20px" }} onClick={hanleFilterSubmit}>查询</Button>
                <Button onClick={reset}>重置</Button>
            </FormItem>
        </Form>
    )
}
export default FilterForm;