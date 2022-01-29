import {useState} from 'react';
import {Card,Tabs,} from 'antd';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
const {TabPane}=Tabs;
const initialPanes = [
    { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
    { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
    {
      title: 'Tab 3',
      content: 'Content of Tab 3',
      key: '3',
      closable: false,
    },
  ];

let newTabIndex=10;

const Tab=()=>{
    const [state,setState]=useState({activeKey: initialPanes[0].key,
        panes: initialPanes,})

        const add = () => {
            const { panes } = state;
            const activeKey = `newTab${++newTabIndex}`;
            const newPanes = [...panes];
            newPanes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
            setState({
                ...state,
              panes: newPanes,
              activeKey,
            });
          };
        
          const remove = targetKey => {
            const { panes, activeKey } = state;
            let newActiveKey = activeKey;
            let lastIndex;
            panes.forEach((pane, i) => {
              if (pane.key === targetKey) {
                lastIndex = i - 1;
              }
            });
            const newPanes = panes.filter(pane => pane.key !== targetKey);
            if (newPanes.length && newActiveKey === targetKey) {
              if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
              } else {
                newActiveKey = newPanes[0].key;
              }
            }
            setState({
                ...state,
              panes: newPanes,
              activeKey: newActiveKey,
            });
          };
    
    return (
        <section>
            <Card title="tab页签1" className='card-wrap'>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Tab 1" key="1">
                        Content of Tab Pane 1
                    </TabPane>
                    <TabPane tab="Tab 2" key="2">
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="Tab 3" key="3">
                       onchange回调函数可以获取到key值
                    </TabPane>
                </Tabs>
            </Card>
            <Card title="tab页签2--图标" className='card-wrap'>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<span><AppleOutlined />Tab 1</span>} key="1">
                        Content of Tab Pane 1
                    </TabPane>
                    <TabPane disabled tab={<span><AndroidOutlined  />Tab 1</span>} key="2">
                        Content of Tab Pane 2
                    </TabPane>
                </Tabs>
            </Card>
            <Card title="tab页签3--增删" className='card-wrap'>
                <Tabs
                    type="editable-card"
                    onChange={activeKey =>setState({...state,activeKey })}
                    activeKey={state.activeKey}
                    onEdit={(targetKey,action) => {
                        if(action==="add"){
                            add(targetKey);
                        }else{
                            remove(targetKey);
                        }
                      }}
                >
                    {state.panes.map(pane => (
                        <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                            {pane.content}
                        </TabPane>
                    ))}
                </Tabs>
            </Card>
        </section>
    )
}
export default Tab;