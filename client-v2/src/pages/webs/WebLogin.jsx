import { Button, Form, Input, notification, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../../apis/authAPI';
import { userAPI } from '../../apis/userAPI';
import Helmet from '../../components/Helmet';
import WebAuthenProtected from '../../layout/WebAuthenProtected';
import { setAuthAction } from '../../redux/actions/AuthReducerAction'


const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description:
            des,
    });
};
const WebLogin = () => {

    const [form] = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = (value) => {
        try {
            let auth = {};
            authAPI.signin(value)
                .then(res => {
                    if (!res.status) {
                        auth = { ...auth, token: res.token }
                        userAPI.getUser(res.username)
                            .then(res => {
                                if (!res.status) {
                                    console.log(res)
                                    auth = { ...auth, info: res };
                                    console.log(auth)
                                    dispatch(setAuthAction(auth));
                                    openNotificationWithIcon('success', 'Đăng nhập thành công!', 'Đăng nhập thành công!');
                                    navigate('/')
                                } else {
                                    console.log(res)
                                }
                            })
                            .catch(err => console.log(err));
                    } else {
                        console.log(res)
                        if (res.status == 401) {
                            openNotificationWithIcon('error', 'Đăng nhập thất bại!', 'Thông tin đăng nhập không chính xác!');
                        }
                    }

                })
                .catch(err => console.log(err));
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <WebAuthenProtected>
            <Helmet
                title="Đăng Nhập"
            >
                <div className="web--login">
                    <div className="web--login__form">
                        <Form
                            name='login'
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            onFinish={onFinish}
                            layout='horizontal'
                            autoComplete='off'
                            form={form}
                        >
                            <div className="web--login__form--container">
                                <Typography.Title level={3}>Đăng Nhập</Typography.Title>
                                <Form.Item
                                    label="Tên đăng nhập"
                                    name="username"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập tên tài khoản!' },
                                        { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' }
                                    ]}
                                >
                                    <Input placeholder='Tên đăng nhập' />
                                </Form.Item>
                                <Form.Item
                                    label="Mật khẩu"
                                    name="password"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập Mật khẩu!' },
                                        { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' }
                                    ]}
                                >
                                    <Input.Password placeholder='Mật khẩu' />
                                </Form.Item>
                                <Form.Item
                                >
                                    <Button type='primary' htmlType='submit'>Đăng Nhập</Button>
                                </Form.Item>
                                <Form.Item>
                                    Chưa có tài khoản. <Link to="/register" className="web--login__form--navlink">Đăng ký tài khoản</Link>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </div>
            </Helmet>
        </WebAuthenProtected>

    )
}

export default WebLogin