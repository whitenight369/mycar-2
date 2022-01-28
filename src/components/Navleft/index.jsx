import { useState } from 'react';
import {Menu} from 'antd';
import './index.less';
import menuList from './../../config/menuConfig';
import { NavLink } from 'react-router-dom';
const {SubMenu} = Menu;

// 遍历产生组件
const renderMenu=(menuList)=>{
    return menuList.map(value=>{
        if(value.children){
            return (<SubMenu title={value.title} key={value.key}>
                {renderMenu(value.children)}
            </SubMenu>)
        }else{
            return (<Menu.Item key={value.key} title={value.title}>
                <NavLink to={value.key}>{value.title}</NavLink>
            </Menu.Item>)
        }
    })
}
let menuTree=renderMenu(menuList);
console.log(menuTree);
const NavLeft=()=>{
    let [menuTreeNode,setmenuTreeNode]=useState(menuTree);
    return (
        <div>
            <div className='logo'>
                    <img src='./assets/logo.svg' alt=''/>
                    <h1>Imooc MS</h1>
            </div>
            <Menu theme='dark'>
                {menuTreeNode}
            </Menu>
        </div>
    )
}
export default NavLeft;