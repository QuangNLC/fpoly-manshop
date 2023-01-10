import { Button, Form, Input, Modal, Typography } from 'antd';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { userAPI } from '../../apis/userAPI';
import Helmet from '../../components/Helmet'
import { logOutAction } from '../../redux/actions/AuthReducerAction';

const WebChangePassword = () => {

    const location = useLocation();
    const auth = useSelector(state => state.auth.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = (value) => {
        const { confirmPassword, ...req } = value;

        Modal.confirm({
            title: 'Hộp Thoại Xác Nhận',
            content: 'Bạn có muốn đổi mật khẩu không ?',
            okText: "Xác Nhận",
            cancelText: 'Hủy Bỏ',
            onOk: () => {
                userAPI.changePassword(auth.info.username, req)
                    .then(res => {
                        if (!res.status) {
                            Modal.success({
                                title: 'Hộp Thoại  Thông Báo',
                                content: "Đổi mật khẩu thành công. Vui lòng đăng nhập lại."
                            });
                            dispatch(logOutAction());
                            navigate('/login');
                        } else {
                            Modal.error({
                                title: 'Hộp Thoại  Thông Báo',
                                content: "Sai mật khẩu. Vui lòng thử lại."
                            })
                        }
                    })
                    .catch(err => console.log(err))
            }
        });
    }


    return (
        <Helmet
            title={"Đổi Mật Khẩu"}
        >
            <div className="web--changepass">
                <div className="web--changepass__navs">
                    <div className={`web--changepass__navs--item ${location.pathname === '/my-account' ? 'active' : ''}`}>
                        <Link
                            to="/my-account"
                            style={{ color: 'inherit' }}
                            className={`web--changepass__navs--item__link ${location.pathname === '/my-account' ? 'active' : ''}`}
                        >
                            tài  khoản  của tôi
                        </Link>
                    </div>
                    <div className={`web--changepass__navs--item ${location.pathname === '/change-password' ? 'active' : ''}`}>
                        <Link
                            to="/change-password"
                            style={{ color: 'inherit' }}
                            className={`web--changepass__navs--item__link ${location.pathname === '/change-password' ? 'active' : ''}`}
                        >
                            đổi mật khẩu
                        </Link>
                    </div>
                    <div className={`web--changepass__navs--item ${location.pathname === '/my-orders' ? 'active' : ''}`}>
                        <Link
                            to="/my-orders"
                            style={{ color: 'inherit' }}
                            className={`web--changepass__navs--item__link ${location.pathname === '/my-orders' ? 'active' : ''}`}
                        >
                            đơn  hàng
                        </Link>
                    </div>
                </div>
                <div className="web--changepass__body">
                    <div className="web--changepass__body--title">
                        <Typography.Title level={4}>Đổi Mật Khẩu</Typography.Title>
                    </div>
                    <div className="web--changepass__body--form">
                        <Form
                            name="changepassword"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 20 }}
                            layout='horizontal'
                            onFinish={onFinish}
                            style={{width: '80%'}}
                        >
                            <Form.Item
                                label="Mật Khẩu Hiện Tại"
                                name="password"
                                hasFeedback
                                rules={[
                                    { required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' },
                                    { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' }
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                label="Mật Khẩu Mới"
                                name="newPassword"
                                hasFeedback
                                rules={[
                                    { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                                    { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' }
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                label="Xác Nhận Mật Khẩu"
                                name="confirmPassword"
                                hasFeedback
                                rules={[
                                    { required: true, message: 'Vui lòng nhập lại mật khẩu mới!' },
                                    { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve()
                                            }
                                            return Promise.reject('Xác nhận mật khẩu không trùng khớp!')
                                        }
                                    })
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                            >
                                <Button style={{ marginLeft: "170px", borderRadius: "20px" }} type='primary' htmlType='submit'>Xác Nhận</Button>
                            </Form.Item>
                            <Form.Item
                            >
                                <Link to="forgot-password">Quên mật khẩu</Link>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default WebChangePassword