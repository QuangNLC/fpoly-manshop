import { Avatar, Badge, Button, Col, Dropdown, Input, notification, Row } from 'antd'
import React from 'react'
import logoImg from '../assets/imgs/logo.png'
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCartAction } from '../redux/actions/CartReducerAction';
import { logOutAction } from '../redux/actions/AuthReducerAction';


const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description: des,
    });
};


const WebHeader = () => {

    const cart = useSelector((state) => state.cart);
    const isAuth = useSelector((state) => state.auth.isAuth);
    const auth = useSelector((state) => state.auth.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const items = [
        auth?.info?.roles?.rolename &&
            auth?.info?.roles?.rolename === "ROLE_ADMIN" &&
        {
            label: 'Trang Quản Trị',
            key: '1',
            onClick: () => {
                navigate("/admin")
            }
        },
        {
            type: 'divider',
        },
        {
            label: 'Đăng Xuât',
            key: '3',
            onClick: () => {
                openNotificationWithIcon('info','Thông Báo','Đăng xuất thành công.')
                navigate("/");
                dispatch(clearCartAction());
                dispatch(logOutAction());
            }
        },
    ];


    return (
        <div className="web--header__container">
            <div className="web--header">
                <Row style={{ height: '100%' }}>
                    <Col span={8} style={{ height: '100%' }}>
                        <div className="web--header__img--container">
                            <img src={logoImg} alt="Logo" />
                        </div>
                    </Col>
                    <Col span={8} style={{ height: '100%' }} className="web--header__search--container">
                        <Input.Search placeholder='Tìm kiếm' />
                    </Col>
                    <Col span={8} style={{ height: '100%' }}>
                        <Row style={{ height: '100%' }}>
                            <Col span={12} className="web--header__cart">
                                <Badge count={cart.cart.length}>
                                    <ShoppingCartOutlined style={{ fontSize: '40px', cursor: 'pointer' }} onClick={() => { navigate("/cart") }} />
                                </Badge>
                            </Col>
                            <Col span={12} className="web--header__avt">
                                {
                                    isAuth ?
                                        (
                                            <div className="web--header__avt--user">
                                                <div className="web--header__avt--user__img">
                                                    <Dropdown
                                                        menu={{
                                                            items,
                                                        }}
                                                        trigger={['click']}
                                                    >
                                                        <Avatar src={`http://localhost:8080/api/file/images/${auth?.info?.photo}`} size={40} />
                                                    </Dropdown>
                                                </div>
                                                <div className="web--header__avt--user__name">
                                                    {auth?.info?.fullname}
                                                </div>
                                            </div>
                                        )
                                        :
                                        (
                                            <div className="web--header__avt--actions">
                                                <Button style={{marginRight: 20}} type="primary" onClick={() => {navigate("/login")}}>Đăng Nhập</Button>
                                                <Button onClick={() => {navigate("/register")}}>Đăng Ký</Button>
                                            </div>
                                        )
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <Row className='web--nav'>
                <div className="web--nav__item">
                    <Link to="/" className="web--nav__item--link">
                        Trang chủ
                    </Link>
                </div>
                <div className="web--nav__item">
                    <Link to="/products" className="web--nav__item--link">
                        Sản phẩm
                    </Link>
                </div>
                <div className="web--nav__item">
                    <Link to="/about-us" className="web--nav__item--link">
                        Giới thiệu
                    </Link>
                </div>
                <div className="web--nav__item">
                    <Link to="/contact" className="web--nav__item--link">
                        Liên hệ
                    </Link>
                </div>
            </Row>
        </div>
    )
}

export default WebHeader