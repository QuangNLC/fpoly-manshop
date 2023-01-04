import { Spin } from 'antd';
import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const WebAuthenProtected = ({children}) => {
    const isAuth = useSelector(state => state.auth.isAuth);
    const navigate = useNavigate();


    const check = isAuth 

    useEffect(() => {
        const check = isAuth
        if(check){
            navigate("/")
        }
    }, [isAuth])

    return (
        !check ? (
            children
        ) : (
            <Spin />
        )
    )
}

export default WebAuthenProtected