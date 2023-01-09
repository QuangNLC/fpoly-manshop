import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, notification, Radio, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { userAPI } from '../../apis/userAPI'
import Helmet from '../../components/Helmet'


const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description:
            des,
    });
};
const AdmNewUser = () => {

    const navigate = useNavigate();
    const [form] = useForm();

    const onFinish = (value) => {
        console.log(value)

        try {
            userAPI.createUserByAdm({ ...value })
                .then(res => {
                    if (!res.status) {
                        openNotificationWithIcon('success', 'Đăng ký thành công!', 'Đăng ký thành công!');
                        navigate('/admin/user-list')
                    } else {
                        openNotificationWithIcon('error', 'Đăng ký thất bại!', 'Đăng ký thất bại!');
                        console.log(res)
                    }

                })
                .catch(err => console.log(err));
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Helmet
            title={"Thêm Mới Tài Khoản"}
        >
            <div className="adm--newuser">
                <div className="adm--newuser__title">
                    <Typography.Title level={4}>Thêm Tài Khoản Mới</Typography.Title>
                    <Button type='primary' onClick={() => { navigate("/admin/user-list") }}>Danh Sách</Button>
                </div>
                <div className="adm--newuser__body">
                    <div className="adm--newuser__body--form">
                        <Form
                            name='login'
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            onFinish={onFinish}
                            layout='horizontal'
                            autoComplete='off'
                            form={form}
                        >
                            <Typography.Title level={4}>Thông tin tài khoản</Typography.Title>
                            <div className="adm--newuser__body--form--ipcontainer">
                                <div className="adm--newuser__body--form--item">
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
                                </div>
                                <div className="adm--newuser__body--form--item">
                                    <Form.Item
                                        label="Họ và tên"
                                        name="fullname"
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập Họ và tên!' },
                                            { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' }
                                        ]}
                                    >
                                        <Input placeholder='Họ và tên' />
                                    </Form.Item>
                                </div>
                                <div className="adm--newuser__body--form--item">

                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập Email!' },
                                            { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' },
                                            { type: 'email', message: 'Vui lòng nhập đúng định dạng email.' }
                                        ]}
                                    >
                                        <Input placeholder='Email' type='email' />
                                    </Form.Item>
                                </div>
                                <div className="adm--newuser__body--form--item">
                                    <Form.Item
                                        label="Số điện thoại"
                                        name="phone"
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập Số điện thoại!' },
                                            { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
                                                    if (!value || vnf_regex.test(value)) {
                                                        return Promise.resolve()
                                                    }
                                                    return Promise.reject('Vui lòng nhập đúng định dạng số điện thoại!')
                                                }
                                            })
                                        ]}
                                    >
                                        <Input placeholder='Số điện thoại' />
                                    </Form.Item>
                                </div>
                                <div className="adm--newuser__body--form--item">
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
                                </div>
                                <div className="adm--newuser__body--form--item">
                                    <Form.Item
                                        label="Xác nhận mật khẩu"
                                        name="confirmPasswrod"
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập Xác nhận mật khẩu!' },
                                            { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve()
                                                    }
                                                    return Promise.reject('Xác nhận mật khẩu không trùng khớp!')
                                                }
                                            })
                                        ]}
                                    >
                                        <Input.Password placeholder='Nhập lại mật khẩu' />
                                    </Form.Item>
                                </div>
                                <div className="adm--newuser__body--form--item">
                                    <Form.Item
                                        label="Phân Quyền"
                                        name="isAdmin"
                                        initialValue={false}
                                    >
                                        <Radio.Group>
                                            <Radio value={false}> Người Dùng </Radio>
                                            <Radio value={true}> Quản Trị </Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </div>
                            </div>
                            <Form.Item
                            >
                                <Button type='primary' htmlType='submit' icon={<PlusOutlined />}>Thêm Mới</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default AdmNewUser