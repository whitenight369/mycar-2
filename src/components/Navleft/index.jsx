import { useState } from 'react';
import {Menu} from 'antd';
import {connect} from 'react-redux';
import './index.less';
import { switchMenu } from '../../redux/action';
import menuList from './../../config/menuConfig';
import { NavLink } from 'react-router-dom';
const {SubMenu} = Menu;

// 遍历产生组件
const renderMenu=(menuList)=>{
    return menuList.map(value=>{
        if(value.children){
            return (<SubMenu title={value.title}  key={value.key}>
                {renderMenu(value.children)}
            </SubMenu>)
        }else{
            return (<Menu.Item key={value.key}  title={value.title}>
                <NavLink to={value.key}>{value.title}</NavLink>
            </Menu.Item>)
        }
    })
}


let menuTree=renderMenu(menuList);
const NavLeft=(props)=>{
    let {dispatch}=props
    let [menuTreeNode,setmenuTreeNode]=useState(menuTree);
    return (
        <div>
            <div className='logo'>
                    <img src='./assets/logo.svg' alt=''/>
                    <h1>Imooc MS</h1>
            </div>
            <Menu theme='dark'
                onClick={item=>{
                    dispatch(switchMenu(item.item.props.title))
                }}
            >
                {menuTreeNode}
            </Menu>
        </div>
    )
}
export default connect()(NavLeft);