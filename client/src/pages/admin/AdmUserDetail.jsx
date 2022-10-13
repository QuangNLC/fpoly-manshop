import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import LocationSearchingOutlinedIcon from '@mui/icons-material/LocationSearchingOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PublishIcon from '@mui/icons-material/Publish';
import { Link, useParams } from 'react-router-dom';
import usersAPI from '../../api/usersAPI';
import defaultAvt from '../../assets/imgs/default-avt.jpg';

const Container = styled.div`
    width: 100%;
    padding: 20px;
`
const UserTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const UserTitle = styled.h1``
const UserTitleButtonContainer = styled.div``
const UserTitleButton = styled.button`
    width: 80px;
    border: none;
    padding: 5px;
    background-color: teal;
    color: white;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    transition: all 0.25s ease-in;

    &:hover{
        background-color:darkblue;
    }
`
const UserContainer = styled.div`
    display: flex;
    margin-top: 20px;
`
const UserShow = styled.div`
    flex: 1;
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    margin-right: 20px;
`
const UserShowTop = styled.div`
    display: flex;
    align-items: center;
`
const UserShowTopImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
`
const UserShowTopTitle = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
`
const UserShowTopUsername = styled.span`
    font-weight: 600;
`
const UserShowTopUserTitle = styled.span`
    font-weight: 300;
`
const UserShowBottom = styled.div`
    margin-top: 20px;
`
const UserShowTitle = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: rgb(231, 230, 230);
`
const UserShowInfo = styled.div`
    display: flex;
    align-items:center;
    margin: 20px 0px;
    color: #444;
`
const UserShowInfoIcon = styled.div`
    margin-right: 10px;
`
const UserShowInfoTitle = styled.span``

const UserUpdate = styled.div`
    flex: 2;
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`
const UserUpdateTitle = styled.span`
    font-size: 24px;
    font-weight: 600;
`
const UserUpdateForm = styled.form`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`
const UserUpdateLeft = styled.div``
const UserUpdateItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`
const ItemLabel = styled.label`
    margin-bottom: 5px;
    font-size: 14px;
`
const ItemInput = styled.input`
    border: none;
    width: 250px;
    height: 30px;
    padding: 5px;
    border-bottom: 1px solid gray;
`
const UserUpdateRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const UserUpdateUpload = styled.div``
const UserUpdateUploadImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 20px; 
`
const UserUpdateUploadLabel = styled.label``
const UserUpdateUploadInput = styled.input`
    display: none;
`
const UpdateButton = styled.button`
    border-radius: 5px;
    border: none;
    padding: 5px;
    cursor: pointer;
    background-color: darkblue;
    color: white;
    font-weight: 500;
`

const AdmUserDetail = () => {
    const { username } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)


    useEffect(() => {
        console.log(username);
        usersAPI.getUser(username)
            .then(res => {
                console.log(res);
                setUser(res);
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err);
            });
    }, [username])

    return (
        <Container>
            <UserTitleContainer>
                <UserTitle>Edit User</UserTitle>
                <UserTitleButtonContainer>
                    <Link to="/admin/user-list" style={{ marginRight: "20px" }}>
                        <UserTitleButton>List User</UserTitleButton>
                    </Link>
                    <Link to="/admin/new-user">
                        <UserTitleButton>Create</UserTitleButton>
                    </Link>
                </UserTitleButtonContainer>
            </UserTitleContainer>
            {
                isLoading ?
                    (
                        <>
                            Loading...
                        </>
                    )
                    :
                    (
                        <>
                            {user &&
                                <UserContainer>
                                    <UserShow>
                                        <UserShowTop>
                                            <UserShowTopImg src={user.photoImg || defaultAvt} alt="" />
                                            <UserShowTopTitle>
                                                <UserShowTopUsername>{user.fullname}</UserShowTopUsername>
                                            </UserShowTopTitle>
                                        </UserShowTop>
                                        <UserShowBottom>
                                            <UserShowTitle>Account Details</UserShowTitle>
                                            <UserShowInfo>
                                                <UserShowInfoIcon><PermIdentityOutlinedIcon /></UserShowInfoIcon>
                                                <UserShowInfoTitle>{user.username}</UserShowInfoTitle>
                                            </UserShowInfo>
                                            <UserShowInfo>
                                                <UserShowInfoIcon><CalendarTodayOutlinedIcon /></UserShowInfoIcon>
                                                <UserShowInfoTitle>10.12.1999</UserShowInfoTitle>
                                            </UserShowInfo>
                                            <UserShowTitle>Contact Details</UserShowTitle>
                                            <UserShowInfo>
                                                <UserShowInfoIcon><PhoneAndroidOutlinedIcon /></UserShowInfoIcon>
                                                <UserShowInfoTitle>{user.phone}</UserShowInfoTitle>
                                            </UserShowInfo>
                                            <UserShowInfo>
                                                <UserShowInfoIcon><EmailOutlinedIcon /></UserShowInfoIcon>
                                                <UserShowInfoTitle>{user.email}</UserShowInfoTitle>
                                            </UserShowInfo>
                                            <UserShowInfo>
                                                <UserShowInfoIcon><LocationSearchingOutlinedIcon /></UserShowInfoIcon>
                                                <UserShowInfoTitle>New York | USA</UserShowInfoTitle>
                                            </UserShowInfo>
                                        </UserShowBottom>
                                    </UserShow>
                                    <UserUpdate>
                                        <UserUpdateTitle>Edit</UserUpdateTitle>
                                        <UserUpdateForm>
                                            <UserUpdateLeft>
                                                <UserUpdateItem>
                                                    <ItemLabel>Username</ItemLabel>
                                                    <ItemInput placeholder='annabeck99' type="text" disabled/>
                                                </UserUpdateItem>
                                                <UserUpdateItem>
                                                    <ItemLabel>Full Name</ItemLabel>
                                                    <ItemInput placeholder={user.fullname} type="text" />
                                                </UserUpdateItem>
                                                <UserUpdateItem>
                                                    <ItemLabel>Email</ItemLabel>
                                                    <ItemInput placeholder={user.email} type="email" />
                                                </UserUpdateItem>
                                                <UserUpdateItem>
                                                    <ItemLabel>Phone</ItemLabel>
                                                    <ItemInput placeholder={user.phone} type="text" />
                                                </UserUpdateItem>
                                                <UserUpdateItem>
                                                    <ItemLabel>Adress</ItemLabel>
                                                    <ItemInput placeholder='New York | USA' type="text" />
                                                </UserUpdateItem>
                                            </UserUpdateLeft>
                                            <UserUpdateRight>
                                                <UserUpdateUpload>
                                                    <UserUpdateUploadImg src={user.photoImg || defaultAvt} alt="" />
                                                    <UserUpdateUploadLabel htmlFor='file'><PublishIcon style={{ cursor: "pointer" }} /></UserUpdateUploadLabel>
                                                    <UserUpdateUploadInput type={"file"} id="file" />
                                                </UserUpdateUpload>
                                                <UpdateButton>Update</UpdateButton>
                                            </UserUpdateRight>
                                        </UserUpdateForm>
                                    </UserUpdate>
                                </UserContainer>
                            }
                        </>
                    )
            }
        </Container>
    )
}

export default AdmUserDetail