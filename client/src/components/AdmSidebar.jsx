import React from 'react'
import styled from 'styled-components'
import LineStyleIcon from '@mui/icons-material/LineStyle';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import EventNoteIcon from '@mui/icons-material/EventNote';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Link, useLocation } from 'react-router-dom';


const Container = styled.div`
    flex: 1;
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
`

const AdmSidebar = () => {
    const location = useLocation();



    return (
        <Container>
            <Wrapper>
                <Menu>
                    <Title>Dashboard</Title>
                    <List>
                        <Link to="/admin" style={{ textDecoration: "none", color: "unset" }}>
                            <Item active={location.pathname === "/admin"}>
                                <LineStyleIcon style={{ fontSize: "20px", marginRight: "10px" }} />
                                <ItemText>
                                    Home
                                </ItemText>
                            </Item>
                        </Link>
                        <Item>
                            <StackedLineChartIcon style={{ fontSize: "20px" }} />
                            <ItemText>
                                Analystics
                            </ItemText>
                        </Item>
                        <Item>
                            <TrendingUpIcon style={{ fontSize: "20px" }} />
                            <ItemText>
                                Sales
                            </ItemText>
                        </Item>
                    </List>
                </Menu>
                <Menu>
                    <Title>Quicl Mune</Title>
                    <List>
                        <Link to="/admin/user-list" style={{ textDecoration: "none", color: "unset" }}>
                            <Item active={location.pathname === "/admin/user-list"}>
                                <PermIdentityIcon style={{ fontSize: "20px" }} />
                                <ItemText>
                                    Users
                                </ItemText>
                            </Item>
                        </Link>
                        <Link to="/admin/category-list" style={{ textDecoration: "none", color: "unset" }}>
                            <Item>
                                <StorefrontIcon style={{ fontSize: "20px" }} />
                                <ItemText>
                                    Categories
                                </ItemText>
                            </Item>
                        </Link>
                        <Link to="/admin/product-list" style={{ textDecoration: "none", color: "unset" }}>
                            <Item>
                                <StorefrontIcon style={{ fontSize: "20px" }} />
                                <ItemText>
                                    Products
                                </ItemText>
                            </Item>
                        </Link>
                        <Link to="/admin/order-list" style={{ textDecoration: "none", color: "unset" }}>
                            <Item>
                                <EventNoteIcon style={{ fontSize: "20px" }} />
                                <ItemText>
                                    Orders
                                </ItemText>
                            </Item>
                        </Link>

                        <Item>
                            <BarChartIcon style={{ fontSize: "20px" }} />
                            <ItemText>
                                Reports
                            </ItemText>
                        </Item>
                    </List>
                </Menu>
            </Wrapper>
        </Container >
    )
}

export default AdmSidebar