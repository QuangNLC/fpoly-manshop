import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import LineStyleIcon from '@mui/icons-material/LineStyle';
import EventNoteIcon from '@mui/icons-material/EventNote';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Link, useLocation } from 'react-router-dom';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Badge } from 'antd';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { useSelector } from 'react-redux'
import messagesAPI from '../api/messagesAPI'
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';



var stompClient = null;

const Container = styled.div`
    width: 20%;
    height: calc( 100vh - 50px );
    background-color: rgb(251, 251, 255);
    position: sticky;
    top: 50px;
`
const Wrapper = styled.div`
    padding: 20px;
    color: #555;
`
const Menu = styled.div`
    margin-bottom: 10px;
`
const Title = styled.h3`
    font-size: 13px;
    color: rgb(197, 194, 194);
`
const List = styled.ul`
    list-style: none;
    padding: 0;
`
const Item = styled.li`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: 10px;
    cursor: pointer;
    background-color: ${props => props.active ? "rgb(228,228,250)" : "transparent"}; 
    &:hover{
        background-color: rgb(228,228,250); 
    }
    margin: 10px;
`
const ItemText = styled.p`
    text-decoration: none;
    height: 100%;
    margin: 0 10px;
`

const AdmSidebar = () => {
    const location = useLocation();

    const isAuth = useSelector(state => state.auth.isAuth);
    const auth = useSelector(state => state.auth.auth);
    const [count, setCount] = useState(0)
    const connectCountMessageNoti = () => {
        let Sock = new SockJS("http://localhost:8080/ws");
        stompClient = over(Sock);
        stompClient.connect({}, () => {
            stompClient.subscribe('/noti/adm-message-count', onListNotiReceived)
            console.log('connect to received notification!')
        }, onError);
    }


    const onListNotiReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);
        console.log(payloadData)
        setCount(Number(payloadData))
    }

    const onError = (err) => {
        console.log(err);
    }
    useEffect(() => {
        auth && auth.info &&
            messagesAPI.getNewMessageCount()
                .then(res => {
                    if (!res.status) {
                        setCount(res)
                        connectCountMessageNoti()
                        console.log(res)
                    } else {
                        console.log(res)
                    }
                })
                .catch(err => console.log(err))
    }, [auth])

    return (
        <Container>
            <Wrapper>
                <Menu>
                    <List>
                        <Link to="/admin" style={{ textDecoration: "none", color: "unset" }}>
                            <Item active={location.pathname === "/admin"}>
                                <LineStyleIcon style={{ fontSize: "20px", marginRight: "10px" }} />
                                <ItemText>
                                    Trang Chủ
                                </ItemText>
                            </Item>
                        </Link>
                    </List>
                </Menu>
                <Menu>
                    <List>
                        <Link to="/admin/user-list" style={{ textDecoration: "none", color: "unset" }}>
                            <Item active={location.pathname === "/admin/user-list"}>
                                <PermIdentityIcon style={{ fontSize: "20px", marginRight: "10px" }} />
                                <ItemText style={{ marginBottom: "0px" }}>
                                    Tài Khoản Người Dùng
                                </ItemText>
                            </Item>
                        </Link>
                        <Link to="/admin/category-list" style={{ textDecoration: "none", color: "unset" }}>
                            <Item>
                                <StorefrontIcon style={{ fontSize: "20px", marginRight: "10px" }} />
                                <ItemText style={{ marginBottom: "0px" }}>
                                    Thể Loại Sản Phẩm
                                </ItemText>
                            </Item>
                        </Link>
                        <Link to="/admin/product-list" style={{ textDecoration: "none", color: "unset" }}>
                            <Item>
                                <StorefrontIcon style={{ fontSize: "20px", marginRight: "10px" }} />
                                <ItemText style={{ marginBottom: "0px" }}>
                                    Sản Phẩm
                                </ItemText>
                            </Item>
                        </Link>
                        <Link to="/admin/bills" style={{ textDecoration: "none", color: "unset" }}>
                            <Item>
                                <NoteAddOutlinedIcon style={{ fontSize: "20px", marginRight: "10px" }} />
                                <ItemText>
                                    Tạo Đơn Hàng
                                </ItemText>
                            </Item>
                        </Link>
                        <Link to="/admin/order-list" style={{ textDecoration: "none", color: "unset" }}>
                            <Item>
                                <EventNoteIcon style={{ fontSize: "20px", marginRight: "10px" }} />
                                <ItemText style={{ marginBottom: "0px" }}>
                                    Đơn Đặt Hàng
                                </ItemText>
                            </Item>
                        </Link>
                        <Link to="/admin/promotions" style={{ textDecoration: "none", color: "unset" }}>
                            <Item>
                                <LocalActivityOutlinedIcon style={{ fontSize: "20px", marginRight: "10px" }} />
                                <ItemText style={{ marginBottom: "0px" }}>
                                    Khuyến Mại
                                </ItemText>
                            </Item>
                        </Link>
                        <Link to="/admin/message" style={{ textDecoration: "none", color: "unset" }}>
                            <Item>
                                <EmailOutlinedIcon style={{ fontSize: "20px", marginRight: "10px" }} />
                                <Badge count={count && (count <= 10 ? count : "10+")}>
                                    <ItemText>
                                        Hộp Thư Đến
                                    </ItemText>
                                </Badge>
                            </Item>
                        </Link>

                    </List>
                </Menu>
            </Wrapper>
        </Container >
    )
}

export default AdmSidebar