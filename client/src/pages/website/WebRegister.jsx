import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import authAPI from '../../api/authAPI'
import usersAPI from '../../api/usersAPI'
import { useDispatch, useSelector } from 'react-redux';
import { setAuthAction } from '../../redux/actions/AuthReducerAction'
import { Link, useNavigate } from 'react-router-dom';
import loginImg from '../../assets/imgs/login-img.jpg'
import { Form, Input, notification } from 'antd';
import { useForm } from 'antd/es/form/Form';


const Container = styled.div`
    width: 100vw;
    height: 100vh;
    padding: 50px;
`
const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

`
const BackgroundImgContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 20px;

`
const BackgroundImg = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 20px;
    object-fit: cover;
`
const FormContainer = styled.div`
    padding: 30px;
    background-color: white;
    border-radius: 20px;
    width: 500px;
    z-index: 2;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`
const FormTitle = styled.h2`
    width: 100%;
    text-transform: capitalize;
`
const Button = styled.button`
    padding: 8px 20px;
    border: none;
    background-color: rgba(0, 0, 0, 0.65);
    color: white;
    border-radius: 10px;
    text-transform: capitalize;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.25s ease-in;

    &:hover{
        background-color: teal;
    }

`


const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description:
            des,
    });
};

const WebRegister = () => {

    const isAuth = useSelector(state => state.auth.isAuth);
    const [checkingAuth, setCheckingAuth] = useState(true);

    const [form] = useForm();
    const navigate = useNavigate();

    const dispatch = useDispatch();


    const onFinish = (value) => {
        console.log(value)
        try {
            authAPI.register({ ...value })
                .then(res => {
                    if (!res.status) {
                        openNotificationWithIcon('success', 'Đăng ký thành công!', 'Đăng ký thành công!');
                        navigate('/login')

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

    useEffect(() => {
        if (isAuth) {
            setCheckingAuth(true)
            navigate("/")
        } else {
            setCheckingAuth(false);
        }
    }, [])
    return (
        <>
            {checkingAuth ?
                (
                    <>Loading...</>
                )
                :
                (
                    <Container>
                        <Wrapper>
                            <BackgroundImgContainer>
                                <BackgroundImg src={loginImg} />
                            </BackgroundImgContainer>
                            <FormContainer>
                                <FormTitle>Đăng Ký</FormTitle>
                                <Form
                                    name='login'
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    onFinish={onFinish}
                                    layout='horizontal'
                                    autoComplete='off'
                                    form={form}
                                >
                                    <Form.Item
                                        label="Tên đăng nhập"
                                        name="username"
                                        rules={[
                                            { required: true },
                                            { whitespace: true }
                                        ]}
                                    >
                                        <Input placeholder='Tên đăng nhập' />
                                    </Form.Item>
                                    <Form.Item
                                        label="Họ và tên"
                                        name="fullname"
                                        rules={[
                                            { required: true },
                                            { whitespace: true }
                                        ]}
                                    >
                                        <Input placeholder='Họ và tên' />
                                    </Form.Item>
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[
                                            { required: true },
                                            { whitespace: true },
                                            { type: 'email' }
                                        ]}
                                    >
                                        <Input placeholder='email' type='email' />
                                    </Form.Item>
                                    <Form.Item
                                        label="Số điện thoại"
                                        name="phone"
                                        rules={[
                                            { required: true },
                                            { whitespace: true }
                                        ]}
                                    >
                                        <Input placeholder='Số điện thoại' />
                                    </Form.Item>
                                    <Form.Item
                                        label="Mật khẩu"
                                        name="password"
                                        rules={[
                                            { required: true },
                                        ]}
                                    >
                                        <Input.Password placeholder='Mật khẩu'/>
                                    </Form.Item>
                                    <Form.Item
                                        label="Xác nhận mật khẩu"
                                        name="confirmPasswrod"
                                        rules={[
                                            { required: true },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve()
                                                    }
                                                    return Promise.reject('Confirm password does not match!')
                                                }
                                            })
                                        ]}
                                    >
                                        <Input.Password placeholder='Nhập lại mật khẩu'/>
                                    </Form.Item>
                                    <Form.Item
                                    >
                                        <Button type='submit'>Đăng Nhập</Button>
                                    </Form.Item>
                                    <Form.Item>
                                        Đã có tài khoản <Link to="/login">Đăng nhập ngay</Link>
                                    </Form.Item>
                                </Form>
                            </FormContainer>
                        </Wrapper>
                    </Container>
                )
            }

        </>
    )
}

export default WebRegister