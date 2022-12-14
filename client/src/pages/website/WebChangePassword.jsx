import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Spin, Typography, Upload, Modal } from 'antd'
import Helmet from '../../components/Helmet'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import usersAPI from '../../api/usersAPI'
import { logOutAction, setAuthAction } from '../../redux/actions/AuthReducerAction'
import { useForm } from 'antd/lib/form/Form'
import { Password } from '@mui/icons-material'



const Container = styled.div`
    width: 100%;
    background-color: rgba(0,0,0 ,0.15);
    min-height: 100vh;
`
const Wrapper = styled.div`
    width: 100%;
    padding: 50px;
    display: flex;
    align-items: top;
    justify-content: space-between;
`
const NavContainer = styled.div`
    flex: 1;
    padding: 20px;
`
const Nav = styled.ul`
`
const NavItem = styled.li`
    color:  black;
    font-size:  18px;
    margin-bottom: 10px;
    text-transform: capitalize;
    cursor:  pointer;
    transition:  all  0.25s  ease-in;
    font-weight: 500;

    ${props => props.actived ? "color:  red;" : ''}

    &:hover{
        color: red;
    }
`
const ContentContainer = styled.div`
    flex: 4;
    padding: 20px;
    background-color: white;
    border-radius:  20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`
const Top = styled.div`
    border-bottom:  0.5px solid lightgray;
    padding-bottom: 5px;
    margin-top: 10px;
`
const Bottom = styled.div`
    display: flex;
    align-items: top;
    justify-content: space-betwwen;
`
const FormContainer = styled.div`
    flex: 3;
    padding: 20px;
`

const WebChangePassword = () => {

    const auth = useSelector(state => state.auth.auth);
    const isAuth = useSelector(state => state.auth.isAuth);
    const { username } = auth ? auth.info : "";
    const navigate = useNavigate();
    const location = useLocation();
    const [form] = useForm();
    const dispatch = useDispatch();

    const onFinish = (value) => {
        const { confirmPassword, ...req } = value;

        console.log(req)
        Modal.confirm({
            title: 'H???p Tho???i X??c Nh???n',
            content: 'B???n c?? mu???n ?????i m???t kh???u kh??ng ?',
            okText: "X??c Nh???n",
            cancelText: 'H???y B???',
            onOk: () => {
                usersAPI.changePassword(auth.info.username, req)
                    .then(res => {
                        if (!res.status) {
                            Modal.success({
                                title: 'H???p Tho???i  Th??ng B??o',
                                content: "?????i m???t kh???u th??nh c??ng. Vui l??ng ????ng nh???p l???i."
                            });
                            dispatch(logOutAction());
                            navigate('/login');
                        } else {
                            Modal.error({
                                title: 'H???p Tho???i  Th??ng B??o',
                                content: "Sai m???t kh???u. Vui l??ng th??? l???i."
                            })
                        }
                    })
                    .catch(err => console.log(err))
            }
        });
    }

    useEffect(() => {
        if (auth) {
        } else {
            navigate("/login")
        }
    }, [auth])
    return (
        <Helmet
            title="?????i m???t kh???u"
        >
            <Container>
                <Wrapper>
                    {
                        isAuth ?
                            (
                                <>
                                    <NavContainer>
                                        <Nav>
                                            <Link
                                                to="/my-account"
                                                style={{ color: 'inherit' }}
                                            >
                                                <NavItem actived={location.pathname === '/my-account'}>
                                                    t??i  kho???n  c???a t??i
                                                </NavItem>
                                            </Link>
                                            <Link
                                                to="/change-password"
                                                style={{ color: 'inherit' }}
                                            >
                                                <NavItem actived={location.pathname === '/change-password'}>
                                                    ?????i m???t kh???u
                                                </NavItem>
                                            </Link>
                                            <Link
                                                to="/my-orders"
                                                style={{ color: 'inherit' }}
                                            >
                                                <NavItem actived={location.pathname === '/my-orders'}>
                                                    ????n  h??ng
                                                </NavItem>
                                            </Link>
                                        </Nav>
                                    </NavContainer>
                                    <ContentContainer>
                                        <Top>
                                            <Typography.Title>?????i M???t Kh???u</Typography.Title>
                                            <Typography.Text>????? b???o m???t t??i kho???n, vui l??ng kh??ng chia s??? m???t kh???u cho ng?????i kh??c.</Typography.Text>
                                        </Top>
                                        <Bottom>
                                            <FormContainer>
                                                <Form
                                                    name="changepassword"
                                                    labelCol={{ span: 4 }}
                                                    wrapperCol={{ span: 20 }}
                                                    layout='horizontal'
                                                    onFinish={onFinish}
                                                >
                                                    <Form.Item
                                                        label="M???t Kh???u Hi???n T???i"
                                                        name="password"
                                                        hasFeedback
                                                        rules={[
                                                            { required: true, message: 'Vui l??ng nh???p m???t kh???u hi???n t???i!' },
                                                            { whitespace: true, message: 'Vui l??ng kh??ng nh???p kho???ng tr???ng!' }
                                                        ]}
                                                    >
                                                        <Input.Password />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="M???t Kh???u M???i"
                                                        name="newPassword"
                                                        hasFeedback
                                                        rules={[
                                                            { required: true, message: 'Vui l??ng nh???p m???t kh???u m???i!' },
                                                            { whitespace: true, message: 'Vui l??ng kh??ng nh???p kho???ng tr???ng!' }
                                                        ]}
                                                    >
                                                        <Input.Password />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="X??c Nh???n M???t Kh???u"
                                                        name="confirmPassword"
                                                        hasFeedback
                                                        rules={[
                                                            { required: true, message: 'Vui l??ng nh???p l???i m???t kh???u m???i!' },
                                                            { whitespace: true, message: 'Vui l??ng kh??ng nh???p kho???ng tr???ng!' },
                                                            ({ getFieldValue }) => ({
                                                                validator(_, value) {
                                                                    if (!value || getFieldValue('newPassword') === value) {
                                                                        return Promise.resolve()
                                                                    }
                                                                    return Promise.reject('X??c nh???n m???t kh???u kh??ng tr??ng kh???p!')
                                                                }
                                                            })
                                                        ]}
                                                    >
                                                        <Input.Password />
                                                    </Form.Item>
                                                    <Form.Item
                                                    // label=" ss"
                                                    >
                                                        <Button style={{ marginLeft: "170px", borderRadius: "20px" }} type='primary' htmlType='submit'>X??c Nh???n</Button>
                                                    </Form.Item>
                                                    <Form.Item
                                                    >
                                                        <Link to="forgot-password">Qu??n m???t kh???u</Link>
                                                    </Form.Item>
                                                </Form>
                                            </FormContainer>
                                        </Bottom>
                                    </ContentContainer>
                                </>
                            )
                            :
                            (
                                <>
                                    <Spin />
                                </>
                            )
                    }

                </Wrapper>
            </Container>
        </Helmet>
    )
}

export default WebChangePassword