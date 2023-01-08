import { Menu } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PieChartOutlined, ShoppingCartOutlined, CalendarOutlined, SkinOutlined, TeamOutlined, PercentageOutlined, CommentOutlined, ChromeOutlined } from '@ant-design/icons';

const getItem = (label, key, icon, children, type) => {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
};
const AdmSidebar = () => {
    const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState([])
    const menuRef = useRef();

    const items = [
        getItem(<Link to="/admin">Thống Kê</Link>, 'sub-1', <PieChartOutlined />),
        getItem(<Link to="/admin/waiting-order-list">Bán Hàng Tại Quầy</Link>, 'sub-2', <ShoppingCartOutlined />),
        getItem(<Link to="/admin/order-list">Quản Lý Đơn Hàng </Link>, 'sub-3', <CalendarOutlined />),
        getItem('Quản Lý Sản Phẩm', 'sub-4', <SkinOutlined />, [
            getItem(<Link to="/admin/product-list">Sản Phẩm</Link>, 'sub-4-i1'),
            getItem(<Link to="/admin/category-list">Thể Loại</Link>, 'sub-4-i2'),
            getItem(<Link to="/admin/material-list">Chất Liệu</Link>, 'sub-4-i3'),
            getItem(<Link to="/admin/color-list">Màu Sắc</Link>, 'sub-4-i4'),
        ]),
        getItem(<Link to="/admin/user-list">Quản Lý Tài Khoản </Link>, 'sub-5', <TeamOutlined />),
        getItem(<Link to="/admin/promotion-list">Khuyến Mại</Link>, 'sub-6', <PercentageOutlined />),
        getItem(<Link to="/admin/message-list">Hộp Thư</Link>, 'sub-7', <CommentOutlined />),
        getItem(<Link to="/">Website</Link>, 'sub-8', <ChromeOutlined />),
    ];

    useEffect(() => {
        switch (location.pathname) {
            case ('/admin'): {
                setSelectedKeys(['sub-1'])
                break;
            }
            case ('/admin/waiting-order-list'): {
                setSelectedKeys(['sub-2'])
                break;
            }
            case ('/admin/order-list'): {
                setSelectedKeys(['sub-3'])
                break;
            }
            case ('/admin/product-list'): {
                setSelectedKeys(['sub-4-i1'])
                break;
            }
            case ('/admin/category-list'): {
                setSelectedKeys(['sub-4-i2'])
                break;
            }
            case ('/admin/material-list'): {
                setSelectedKeys(['sub-4-i3'])
                break;
            }
            case ('/admin/color-list'): {
                setSelectedKeys(['sub-4-i4'])
                break;
            }
            default: {
                if (location.pathname.includes('/admin/waiting-order/')) {
                    setSelectedKeys(['sub-2'])
                    break;
                }
                if (location.pathname.includes('/admin/order/')) {
                    setSelectedKeys(['sub-3'])
                    break;
                }
                if (location.pathname.includes('/admin/product/new')) {
                    setSelectedKeys(['sub-4-i1'])
                    break;
                }
                if (location.pathname.includes('/admin/product/edit/')) {
                    setSelectedKeys(['sub-4-i1'])
                    break;
                }
                setSelectedKeys([])
                break;
            }

        }
    }, [location])
    return (
        <div className="adm--sidebar">
            <Menu
                items={items}
                mode="inline"
                defaultOpenKeys={['sub-4']}
                selectedKeys={selectedKeys}
                style={{ height: '100%' }}
                ref={menuRef}
                theme="light"
            />
        </div>
    )
}

export default AdmSidebar