import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import authAPI from '../../api/authAPI'
import usersAPI from '../../api/usersAPI'
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux';
import { setAuthAction } from '../../redux/actions/AuthReducerAction'
import { Link, useNavigate } from 'react-router-dom';
import loginImg from '../../assets/imgs/login-img.jpg'
import { Form, Input, notification } from 'antd';
import { useForm } from 'antd/es/form/Form';
import Helmet from '../../components/Helmet';


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
    border-radius: 20px;
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

const WebLogin = () => {

    const auth = useSelector(state => state.auth.auth);
    const isAuth = useSelector(state => state.auth.isAuth);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [loginValue, setLoginValue] = useState({
        username: "",
        password: "",
    });

    const [form] = useForm();
    const inputPasswordRefElement = useRef();
    const navigate = useNavigate();
    const [token, setToken] = useState('');

    const dispatch = useDispatch();

    const onSubmit = e => {
        e.preventDefault();
        console.log(loginValue);
        try {
            let auth = {};
            authAPI.signin(loginValue)
                .then(res => {
                    if (!res.status) {
                        auth = { ...auth, token: res.token }
                        usersAPI.getUser(res.username)
                            .then(res => {
                                if (!res.status) {
                                    auth = { ...auth, info: res };
                                    dispatch(setAuthAction(auth));
                                    navigate('/')
                                } else {
                                    console.log(res)
                                }
                            })
                            .catch(err => console.log(err));
                    } else {
                        console.log(res)
                    }

                })
                .catch(err => console.log(err));
        } catch (err) {
            console.log(err)
        }

    };

    const onChange = e => {
        setLoginValue({

            ...loginValue,
            [e.target.name]: e.target.value
        }
        )
    };


    const onFinish = (value) => {
        try {
            let auth = {};
            authAPI.signin(value)
                .then(res => {
                    if (!res.status) {
                        auth = { ...auth, token: res.token }
                        usersAPI.getUser(res.username)
                            .then(res => {
                                if (!res.status) {
                                    console.log(res)
                                    auth = { ...auth, info: res };
                                    dispatch(setAuthAction(auth));
                                    openNotificationWithIcon('success', '????ng nh???p th??nh c??ng!', '????ng nh???p th??nh c??ng!');
                                    navigate('/')
                                } else {
                                    console.log(res)
                                }
                            })
                            .catch(err => console.log(err));
                    } else {
                        console.log(res)
                        if (res.status == 401) {
                            openNotificationWithIcon('error', '????ng nh???p th???t b???i!', 'Th??ng tin ????ng nh???p kh??ng ch??nh x??c!');
                            inputPasswordRefElement.current.focus();
                        }
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
            if (auth && auth.info) {
                console.log(auth)
                if (auth?.info?.roles?.rolename === "ROLE_USER") {
                    navigate("/")
                } else if (auth?.info?.roles?.rolename === "ROLE_ADMIN") {
                    navigate("/admin")
                }
            }
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
                    <Helmet
                        title="????ng Nh???p"
                    >
                        <Container>
                            <Wrapper>
                                <BackgroundImgContainer>
                                    <BackgroundImg src={loginImg} />
                                </BackgroundImgContainer>
                                <FormContainer>
                                    <FormTitle>????ng Nh???p</FormTitle>
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
                                            label="T??n ????ng nh???p"
                                            name="username"
                                            rules={[
                                                { required: true, message: 'Vui l??ng nh???p t??n t??i kho???n!' },
                                                { whitespace: true, message: 'Vui l??ng kh??ng nh???p kho???ng tr???ng!' }
                                            ]}
                                        >
                                            <Input placeholder='T??n ????ng nh???p' />
                                        </Form.Item>
                                        <Form.Item
                                            label="M???t kh???u"
                                            name="password"
                                            rules={[
                                                { required: true, message: 'Vui l??ng nh???p m???t kh???u!' },
                                                { whitespace: true, message: 'Vui l??ng kh??ng nh???p kho???ng tr???ng!' }
                                            ]}
                                        >
                                            <Input.Password placeholder='M???t kh???u' ref={inputPasswordRefElement} />
                                        </Form.Item>
                                        <Form.Item
                                        >
                                            <Button type='submit'>????ng Nh???p</Button>
                                        </Form.Item>
                                        <Form.Item>
                                            Ch??a c?? t??i kho???n. <Link to="/register">????ng k?? ngay</Link>
                                        </Form.Item>
                                        <Form.Item>
                                            B???n qu??n m???t kh???u. <Link to="/forgot-password">Qu??n m???t kh???u</Link>
                                        </Form.Item>
                                        <Form.Item>
                                            <p className="text-noti" style={{ paddingTop: "0px" }}>
                                                N???u Qu?? kh??ch c?? v???n ????? g?? th???c m???c ho???c c???n h??? tr??? g?? th??m c?? th???
                                                li??n h??? : <br /> Hotline: 0346.410.666 ????? ???????c h??? tr??? m???t c??ch
                                                nhanh nh???t.{" "}
                                            </p>
                                        </Form.Item>
                                    </Form>
                                </FormContainer>
                            </Wrapper>
                        </Container>
                    </Helmet>
                )
            }

        </>
    )
}

export default WebLogin