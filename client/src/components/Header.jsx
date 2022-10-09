import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import ImageAvatar from "./ImageAvatar";
import CartIcon from "./Products/CartIcon";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { useSelector } from "react-redux";
import Badge from '@mui/material/Badge';

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  min-height: 80px;
  max-height: 80px;
  overflow: hidden;
  background-color: white;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
  box-shadow: 1px 3px 3px 1px rgba(0,0,0,0.35);
  -webkit-box-shadow: 1px 3px 3px 1px rgba(0,0,0,0.35);
  -moz-box-shadow: 1px 3px 3px 1px rgba(0,0,0,0.35);
`;
const Left = styled.div``;
const Logo = styled.h1`
  text-transform: uppercase;
  font-size: 20px;
  letter-spacing:4px;
  color: bladck;
  width: 120px;
  text-align: center;
  text-shadow: 0 1px 0 hsl(174, 5%, 80%), 0 2px 0 hsl(174, 5%, 75%),
    0 3px 0 hsl(174, 5%, 70%), 0 4px 0 hsl(174, 5%, 66%),
    0 5px 0 hsl(174, 5%, 64%), 0 6px 0 hsl(174, 5%, 62%),
    0 7px 0 hsl(174, 5%, 61%), 0 8px 0 hsl(174, 5%, 60%),
    0 0 5px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.2),
    0 3px 5px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.2),
    0 10px 10px rgba(0, 0, 0, 0.2), 0 20px 20px rgba(0, 0, 0, 0.3);
`;
const Right = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Navigation = styled.ul`
  flex: 1;
  display: flex;
  justify-content: center;
`;
const NavItem = styled.li`
  padding: 5px 10px;
  font-size: 18px;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  color: ${(props) => (props.active ? "red" : "black")};
  border-radius: 5px;
  margin: 0px 5px;
  transition: all 0.25s ease-in;
  cursor: pointer;
  &:hover {
    color: red;
    font-weight: 600;
  }
`;

const BuyMenu = styled.div`
  display: flex;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  position: relative;
`;
const Input = styled.input`
  padding: 10px;
  border: none;
  outline: none;
  width: 100%;
`;
const CartContainer = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Button = styled.div`
  background-color: white;
  color: black;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin: 0px 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 300;
  transition: all 0.25s ease-in;

  &:hover {
    background-color: #333333;
    font-weight: 500;
    color: white;
  }
`;

const Header = () => {
  const isAuth = false;
  const cartReducer = useSelector(state => state.cartReducer);
  const location = useLocation();

  return (
    <Container>
      <Left>
        <Link to="/">
          <Logo> man shop</Logo>
        </Link>
      </Left>
      <Right>
        <Navigation>
          <Link to="/" className="">
            <NavItem active={location.pathname === "/"}>Trang chủ</NavItem>
          </Link>
          <Link to="/products" className="">
            <NavItem active={location.pathname === "/products"}>Sản phẩm</NavItem>
          </Link>
          <Link to="/about-us" className="">
            <NavItem active={location.pathname === "/about-us"}>Giới thiệu</NavItem>
          </Link>
          <Link to="/contact" className="">
            <NavItem active={location.pathname === "/contact"}>Liên hệ</NavItem>
          </Link>
        </Navigation>
        <BuyMenu>
          <CartContainer>
            {/* <CartIcon style={{ fontSize: "20px" }} /> */}
            <Link to="/cart">
              {
                cartReducer.cart ? (
                  <Badge badgeContent={cartReducer.cart.length} color="primary">
                    <LocalMallOutlinedIcon color="action" />
                  </Badge>
                )
                  :
                  (
                    <Badge badgeContent={0} color="primary">
                      <LocalMallOutlinedIcon color="action" />
                    </Badge>
                  )
              }

            </Link>
          </CartContainer>
          <AuthContainer>
            {isAuth ? (
              <>
                <ImageAvatar src="../assets/imgs/avt.png" />
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button>Đăng Nhập</Button>
                </Link>
                <Link to="/register">
                  <Button>Đăng Ký</Button>
                </Link>
              </>
            )}
          </AuthContainer>
        </BuyMenu>
      </Right>
    </Container >
  );
};

export default Header;
