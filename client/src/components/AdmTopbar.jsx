import React from 'react'
import styled from 'styled-components'
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SettingsIcon from '@mui/icons-material/Settings';
import Badge from '@mui/material/Badge';
import avt from '../assets/imgs/avt.png';
import { Link } from 'react-router-dom';

const Container = styled.div`
    width: 100%;
    height:50px;
    background-color: white;
    position: sticky;
    top: 0;
    z-index: 99;
    box-shadow: 3px 1px 6px 3px rgba(181,175,175,0.75);
    -webkit-box-shadow: 3px 1px 6px 3px rgba(181,175,175,0.75);
    -moz-box-shadow: 3px 1px 6px 3px rgba(181,175,175,0.75);
`
const Wrapper = styled.div`
    height: 100%;
    padding: 0px 20px;
    display:flex;
    align-items: center;
    justify-content: space-between;

`
const Left = styled.div``
const Logo = styled.span`
    font-weight: bold;
    font-size: 30px;
    color: darkblue;
    cursor: pointer;
`
const Right = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
`
const IconContainer = styled.div`
    width: 30px;
    height: 30px;
    margin: 0px 10px;
    margin-right: 20px;
    display:flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`
const Avatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    padding: 4px;
    border: 2px solid darkblue;
`
const AvatarImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
`


const AdmTopbar = () => {
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Link to="/">
                        <Logo>Mnc 4 Man</Logo>
                    </Link>
                </Left>
                <Right>
                    <IconContainer>
                        <Badge badgeContent={5} color="primary">
                            <NotificationsIcon color="action" />
                        </Badge>
                    </IconContainer>
                    {/* <IconContainer>
                        <Badge badgeContent={1} color="primary">
                            <Link to="/admin/message">
                                <ChatBubbleIcon color="action" />
                            </Link>
                        </Badge>
                    </IconContainer> */}
                    <Avatar>
                        <AvatarImage src={avt} />
                    </Avatar>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default AdmTopbar