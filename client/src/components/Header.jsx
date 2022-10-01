import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { fontSize } from '@mui/system'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Badge from '@mui/material/Badge';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ImageAvatar from './ImageAvatar';

const Container = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    min-height: 80px;
    height: 180px;
    max-height: 180px;
    overflow: hidden;
    background-color: black;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 10;
`
const Top = styled.div`

`
const Logo = styled.h1`
    text-transform: uppercase;
    font-size: 58px;
    font-weight: 400;
    letter-spacing: 8px;
    color: white;
    text-shadow: 10px 2px 5px rgba(233,228,228,0.48);
`
const Bottom = styled.div`
    width: 100%;
    padding: 0px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Navigation = styled.ul`
    flex: 1;
    display: flex;
`
const NavItem = styled.li`
    padding: 5px 10px;
    font-size: 18px;
    font-weight: ${props => props.active ? "600" : "400"};
    background-color:${props => props.active ? "red" : "transparent"};
    color: white;
    border-radius: 5px;
    margin: 0px 5px;
    transition: all 0.25s ease-in;
    cursor: pointer;

    &:hover{
        background-color: red;
        font-weight: 600;
    }
`

const BuyMenu = styled.div`
    flex: 1;
    display: flex;
`

const SearchContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content: center;
    width: 50%;
    position: relative;
`
const Input = styled.input`
    padding: 10px;
    border: none;
    outline: none;
    width: 100%;
`
const CartContainer = styled.div`
    width: 80px;
    height: 80px;
    display:flex;
    align-items:center;
    justify-content: center;
    cursor: pointer;
`
const AuthContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
`

const Button = styled.div`
    background-color: white;
    color: black;
    padding: 10px 16px;
    border: none;
    border-radius: 5px;
    margin: 0px 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 300;
    transition: all 0.25s ease-in;

    &:hover{
        background-color: red;
        font-weight: 500;
        color: white;
    }
`

const Header = () => {
    const isAuth = false

    return (
        <Container>
            <Top>
                <Link to="/">
                    <Logo> man shop</Logo>
                </Link>
            </Top>
            <Bottom>
                <Navigation>
                    <Link to="/" className=''>
                        <NavItem active={true}>
                            Trang chủ
                        </NavItem>
                    </Link>
                    <Link to="/products" className=''>
                        <NavItem >
                            Sản phẩm
                        </NavItem>
                    </Link>
                    <Link to="/about-us" className=''>
                        <NavItem >
                            Giới thiệu
                        </NavItem>
                    </Link>
                    <Link to="/contact" className=''>
                        <NavItem >
                            Liên hệ
                        </NavItem>
                    </Link>
                </Navigation>
                <BuyMenu>
                    <SearchContainer>
                        <Input placeholder='Tìm kiếm ...' />
                        <SearchOutlinedIcon style={{
                            position: "absolute",
                            right: "10px",
                            color: "gray",
                            cursor: "pointer"
                        }} />
                    </SearchContainer>
                    <CartContainer>
                        <Badge badgeContent={4} color="primary">
                            <ShoppingBagOutlinedIcon style={{ fontSize: "40px" }} />
                        </Badge>
                    </CartContainer>
                    <AuthContainer>
                        {
                            isAuth ? (
                                <>
                                    <ImageAvatar src="../assets/imgs/avt.png" />
                                </>
                            ) : (
                                <>
                                    <Link to="/login">
                                        <Button>
                                            Đăng Nhập
                                        </Button>
                                    </Link>
                                    <Link to="/register">
                                        <Button>
                                            Đăng Ký
                                        </Button>
                                    </Link>
                                </>
                            )
                        }
                    </AuthContainer>
                </BuyMenu>
            </Bottom>
        </Container>
    )
}

export default Header