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
import DialogHOC from '../../hoc/DialogHOC'
import { Checkbox, Input, Radio, Select, Button, Modal, notification } from 'antd';
import authAPI from '../../api/authAPI';
import AttachEmailOutlinedIcon from '@mui/icons-material/AttachEmailOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';

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
    flex: 2;
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    background-color: white;
    border-radius: 10px;
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
    flex: 1;
    margin-right: 20px;
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    background-color: white;
    border-radius: 10px;
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
    margin-bottom: 30px;
`
const ItemLabel = styled.label`
    margin-bottom: 5px;
    font-size: 14px;
`
const ItemError = styled.span`
    padding: 5px;
    font-size: 12px;
    color: red;
    display: none;
`
const ItemInput = styled.input`
    border: none;
    width: 250px;
    height: 30px;
    padding: 5px;
    border-bottom: 1px solid gray;

    &:disabled {
        background-color: rgba(0,0,0, 0.25);
    }

    &:invalid {
        border-bottom: 1px solid red;
    }

    &:invalid ~ span {
        display: block;
    }
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
const UpdateButton = styled.div`
    border-radius: 5px;
    border: none;
    padding: 5px;
    cursor: pointer;
    background-color: teal;
    color: white;
    font-weight: 500;
    transition: all 0.25s ease-in;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
        background-color: darkblue;
    }
`

const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description: des,
    });
};



const AdmUserDetail = () => {
    const { username } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [selectedRole, setSelectedRole] = useState(3)
    const [updateValue, setUpdateValue] = useState({});

    const handleUpdateUser = (user) => {
        const payload = {
            username: username,
            roleid: selectedRole
        };
        Modal.confirm({
            title: 'H???p Tho???i X??c Nh???n',
            content: 'B???n c?? mu???n c???p nh???t t??i kho???n kh??ng.',
            okText: 'X??c Nh???n',
            cancelText: 'H???y B???',
            onOk: () => {
                console.log(payload)
                setIsLoading(true)
                authAPI.updateRoleByAdm(payload)
                    .then(res => {
                        if (!res.status) {
                            openNotificationWithIcon('success', 'Th??ng B??o', 'C???p nh???t t??i kho???n th??nh c??ng.')
                            setIsLoading(false);
                            console.log(res.roles.id)
                            setSelectedRole(res.roles.id);

                        }
                    })
                    .catch(err => console.log(err))
            }
        })
    }

    const onChangeUpdateValue = (e) => {
        setUpdateValue({
            ...updateValue,
            [e.target.name]: e.target.value
        })
    }

    const onChangeSelectedRole = (e) => {
        setSelectedRole(e.target.value)
    }


    console.log(updateValue)

    useEffect(() => {
        setIsLoading(true)
        console.log(username);
        usersAPI.getUser(username)
            .then(res => {
                console.log(res);
                setUser(res);
                setUpdateValue(res);
                setIsLoading(false);
                console.log(res.roles.id)
                setSelectedRole(res.roles.id);
            })
            .catch(err => {
                console.log(err);
            });
    }, [username])

    return (
        <Container>
            <UserTitleContainer>
                <UserTitle>Ch???nh s???a t??i kho???n</UserTitle>
                <UserTitleButtonContainer>
                    <Link to="/admin/user-list" style={{ marginRight: "20px", width: "0px" }}>
                        <UserTitleButton style={{ width: "120px", borderRadius: "20px" }}>Danh s??ch
                        </UserTitleButton>
                    </Link>
                    <Link to="/admin/new-user">
                        <UserTitleButton style={{ width: "120px", borderRadius: "20px" }}>T???o m???i</UserTitleButton>
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
                            {updateValue &&
                                <UserContainer>
                                    <UserUpdate>
                                        <UserUpdateTitle>Ch???nh s???a quy???n t??i kho???n</UserUpdateTitle>
                                        {/* <UserUpdateForm>
                                            <UserUpdateLeft>
                                                <UserUpdateItem>
                                                    <ItemLabel>T??n t??i kho???n</ItemLabel>
                                                    <ItemInput placeholder='annabeck99' type="text" name="username" value={updateValue.username} disabled />
                                                </UserUpdateItem>
                                                <UserUpdateItem>
                                                    <ItemLabel>Email</ItemLabel>
                                                    <ItemInput placeholder={updateValue.email} type="email" name="email" value={updateValue.email} disabled />
                                                </UserUpdateItem>
                                                <UserUpdateItem>
                                                    <ItemLabel>H??? v?? T??n</ItemLabel>
                                                    <ItemInput
                                                        placeholder={updateValue.fullname}
                                                        type="text"
                                                        value={updateValue.fullname}
                                                        name="fullname"
                                                        onChange={onChangeUpdateValue}
                                                    />
                                                    <ItemError>T??n ?????y ????? t???i thi???u 3 k?? t??? tr??? l??n!</ItemError>
                                                </UserUpdateItem>
                                                <UserUpdateItem>
                                                    <ItemLabel>S??? ??i???n tho???i</ItemLabel>
                                                    <ItemInput
                                                        placeholder={updateValue.phone}
                                                        value={updateValue.phone}
                                                        type="number"
                                                        name="phone"
                                                        onChange={onChangeUpdateValue}
                                                    />
                                                    <ItemError>S??? ??i???n th???ai ??ang ????? tr???ng!</ItemError>
                                                </UserUpdateItem>
                                            </UserUpdateLeft>
                                            <UserUpdateRight>
                                                <UserUpdateUpload>
                                                    <UserUpdateUploadImg src={updateValue.photo || defaultAvt} alt="" />
                                                    <UserUpdateUploadLabel htmlFor='file'><PublishIcon style={{ cursor: "pointer" }} /></UserUpdateUploadLabel>
                                                    <UserUpdateUploadInput type={"file"} id="file" />
                                                </UserUpdateUpload>
                                                <DialogHOC
                                                    title="Confirm Dialog"
                                                    content="Do you want to update this user?"
                                                    onYes={() => { handleUpdateUser(updateValue) }}
                                                >
                                                    <UpdateButton style={{ width: "120px", borderRadius: "20px" }}>C???p nh???t</UpdateButton>
                                                </DialogHOC>
                                            </UserUpdateRight>
                                        </UserUpdateForm> */}
                                        <div
                                            style={{ marginTop: 20 }}
                                        >
                                            <Radio.Group onChange={onChangeSelectedRole} value={selectedRole}>
                                                <Radio value={3}>Ng?????i D??ng</Radio>
                                                <Radio value={1}>Qu???n L??</Radio>
                                            </Radio.Group>
                                        </div>
                                        <div
                                            style={{ marginTop: 20 }}
                                        >
                                            <Button onClick={handleUpdateUser} type='primary'>C???p Nh???t</Button>
                                        </div>

                                    </UserUpdate>
                                    <UserShow>
                                        <UserShowTop>
                                            <UserShowTopImg src={`http://localhost:8080/api/file/images/${user?.photo}`} alt="" />
                                            <UserShowTopTitle>
                                                <UserShowTopUsername>{user.fullname}</UserShowTopUsername>
                                            </UserShowTopTitle>
                                        </UserShowTop>
                                        <UserShowBottom>
                                            <UserShowTitle>Th??ng tin t??i kho???n</UserShowTitle>
                                            <UserShowInfo>
                                                <UserShowInfoIcon><PermIdentityOutlinedIcon /></UserShowInfoIcon>
                                                <UserShowInfoTitle>{user.username}</UserShowInfoTitle>
                                            </UserShowInfo>
                                            <UserShowInfo>
                                                <UserShowInfoIcon><AttachEmailOutlinedIcon /></UserShowInfoIcon>
                                                <UserShowInfoTitle>{user?.email}</UserShowInfoTitle>
                                            </UserShowInfo>
                                            <UserShowTitle>Th??ng tin li??n l???c</UserShowTitle>
                                            <UserShowInfo>
                                                <UserShowInfoIcon><BadgeOutlinedIcon /></UserShowInfoIcon>
                                                <UserShowInfoTitle>{user.fullname}</UserShowInfoTitle>
                                            </UserShowInfo>
                                            <UserShowInfo>
                                                <UserShowInfoIcon><PhoneAndroidOutlinedIcon /></UserShowInfoIcon>
                                                <UserShowInfoTitle>{user.phone}</UserShowInfoTitle>
                                            </UserShowInfo>
                                            {/* <UserShowInfo>
                                                <UserShowInfoIcon><LocationSearchingOutlinedIcon /></UserShowInfoIcon>
                                                <UserShowInfoTitle>New York | USA</UserShowInfoTitle>
                                            </UserShowInfo> */}
                                        </UserShowBottom>
                                    </UserShow>

                                </UserContainer>
                            }
                        </>
                    )
            }
        </Container>
    )
}

export default AdmUserDetail