import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import authAPI from '../../api/authAPI'
import usersAPI from '../../api/usersAPI'
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux';
import { setAuthAction } from '../../redux/actions/AuthReducerAction'
import { useNavigate } from 'react-router-dom';
import loginImg from '../../assets/imgs/login-img.jpg'

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

const FormContainer = styled.form`
    padding: 30px;
    background-color: white;
    border-radius: 20px;
    width: 500px;
    z-index: 2;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: flex-start;
`

const FormTitle = styled.h2`
    width: 100%;
    text-transform: capitalize;
`

const FormGroup = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
`
const FormGroupLabel = styled.label`
    text-transform: capitalize;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
`
const FormGroupInput = styled.input`
    padding: 10px;
    border: none;
    border-bottom: 1px solid lightgray;
    outline: none;
`
const FormButton = styled.div`
    margin-top: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
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


const WebLogin = () => {

    const isAuth = useSelector(state => state.auth.isAuth);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [loginValue, setLoginValue] = useState({
        username: "",
        password: "",
    });

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
                    }else{
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
                            <FormContainer
                                onSubmit={onSubmit}
                            >
                                <FormTitle>đăng nhập</FormTitle>
                                <FormGroup>
                                    <FormGroupLabel htmlFor='username'>tên đăng nhập</FormGroupLabel>
                                    <FormGroupInput
                                        name="username"
                                        id="username"
                                        type="text"
                                        value={loginValue.username}
                                        onChange={onChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <FormGroupLabel htmlFor='password'>mật khẩu</FormGroupLabel>
                                    <FormGroupInput
                                        name="password"
                                        id="password"
                                        type="password"
                                        value={loginValue.password}
                                        onChange={onChange}
                                    />
                                </FormGroup>
                                {/* <FormGroup>
                                    <FormGroupInput
                                        name="remember"
                                        id="remember"
                                        type="checkbox"
                                    />
                                    <FormGroupLabel htmlFor='remember'>lưu mật khẩu</FormGroupLabel>
                                </FormGroup> */}
                                <FormButton>
                                    <Button type='submit'>đăng nhập</Button>
                                </FormButton>
                            </FormContainer>
                        </Wrapper>
                    </Container>
                )
            }

        </>
    )
}

export default WebLogin