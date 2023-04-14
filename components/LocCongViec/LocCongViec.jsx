import React, { useState, useEffect } from 'react'
import YeuToLocCongViec from './YeuToLocCongViec'
import { Menu } from 'antd';
const { SubMenu } = Menu

const LocCongViec = (props) => {
    const items = [
        {
            type: 'divider',
        },
        {
            key: 'sub1',
            label: props.title,
            type: 'subMenu',
            children: props.listElement && props.listElement.map((item, index) => {
                return (
                    <YeuToLocCongViec
                        key={index}
                        element={item.ten}
                        onCheckedChange={props.onCheckedChange}
                    />
                );
            }),
        },
    ];

    return (
        <Menu theme="light" mode="inline" defaultOpenKeys={['sub1']} defaultSelectedKeys={['1']}>
            {items.map((item, index) => {
                if (item.type === 'divider') {
                    return <Menu.Divider key={item.key} />;
                } else if (item.type === 'subMenu') {
                    return (
                        <SubMenu key={item.key} icon={item.icon} title={item.label}>
                            {item.children}
                        </SubMenu>
                    );
                } else {
                    return (
                        <Menu.Item key={item.key} icon={item.icon}>
                            {item.label}
                        </Menu.Item>
                    );
                }
            })}
        </Menu>
    );
};


export default LocCongViec