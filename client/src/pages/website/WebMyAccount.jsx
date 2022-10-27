import { Button, Form, Input, Spin, Typography, Upload, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import Helmet from '../../components/Helmet'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import usersAPI from '../../api/usersAPI'
import { setAuthAction } from '../../redux/actions/AuthReducerAction'

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
    border-right: 1px  solid lightgray;
`
const AvatarContainer = styled.div`
    flex: 1;
    padding: 20px;
`
const PreviewImg = styled.div`
    width: 100%;
    display:  flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`
const Avt = styled.img`
    width:  130px;
    height: 130px;
    border-radius:  50%;
    object-fit: cover;
    object-position: center;
`
const UploadButton = styled.div`
    width: 100%;
    display: flex;
    flex-direction:  column;
    justify-content: center;
    align-items:  center;
`

const WebMyAccount = () => {

    const auth = useSelector(state => state.auth.auth);
    const isAuth = useSelector(state => state.auth.isAuth);
    const { username } = auth ? auth.info : "";
    const navigate = useNavigate();
    const location = useLocation();
    const [prevAvt, setPrevAvt] = useState(null);
    const [uploadList, setUploadList] = useState([]);
    const dispatch = useDispatch();

    const handleUploadAvatar = () => {
        Modal.confirm({
            title: "Hộp Thoại Xác Nhận",
            content: "Bạn có đồng ý thay đổi ảnh đại diện hay không?",
            okText: "Xác Nhận",
            cancelText: "Hủy Bỏ",
            onOk: () => {
                if (uploadList && uploadList.length > 0) {
                    const formData = new FormData();
                    uploadList.forEach(item => {
                        formData.append('file', item)
                    })
                    usersAPI.updateUserAvatar(auth.info.username, formData)
                        .then(res => {
                            dispatch(setAuthAction({ ...auth, info: res }));
                            setUploadList([])
                            Modal.success({
                                title: "Hộp Thoại Thông Báo",
                                content: "Thay đổi ảnh đại diện thành công!"
                            })
                        })
                        .catch(err => console.log(err))

                }
            }
        })
    }

    useEffect(() => {
        if (auth) {
            setPrevAvt(`http://localhost:8080/api/file/images/${auth.info.photo}`)
        } else {
            navigate("/login")
        }

    }, [auth])

    useEffect(() => {
        if (uploadList.length > 0) {
            let url = URL.createObjectURL(uploadList[0])
            console.log(url)
            setPrevAvt(url)
        } else {
            setPrevAvt(`http://localhost:8080/api/file/images/${auth.info.photo}`)
        }
    }, [uploadList])

    useEffect(() => {
        return () => {
            if (prevAvt && (prevAvt !== `http://localhost:8080/api/file/images/${auth.info.photo}`)) {
                URL.revokeObjectURL(prevAvt)
            }
        }
    }, [prevAvt])


    return (
        <Helmet
            title="Thông tin tài khoản"
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
                                                    tài  khoản  của tôi
                                                </NavItem>
                                            </Link>
                                            <Link
                                                to="/change-password"
                                                style={{ color: 'inherit' }}
                                            >
                                                <NavItem actived={location.pathname === '/change-password'}>
                                                    đổi mật khẩu
                                                </NavItem>
                                            </Link>
                                            <Link
                                                to="/my-orders"
                                                style={{ color: 'inherit' }}
                                            >
                                                <NavItem actived={location.pathname === '/my-orders'}>
                                                    đơn  hàng
                                                </NavItem>
                                            </Link>
                                        </Nav>
                                    </NavContainer>
                                    <ContentContainer>
                                        <Top>
                                            <Typography.Title>Hồ Sơ Của Tôi</Typography.Title>
                                            <Typography.Text>Quản lý thông tin hồ sơ</Typography.Text>
                                        </Top>
                                        <Bottom>
                                            <FormContainer>
                                                <Form
                                                    name="user"
                                                    labelCol={{ span: 4 }}
                                                    wrapperCol={{ span: 20 }}
                                                    layout='horizontal'
                                                >
                                                    <Form.Item
                                                        label="Tên Đăng Nhập"
                                                    >
                                                        <Typography.Text>{auth.info.username}</Typography.Text>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Họ Tên"
                                                        name="fullname"
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Email"
                                                        name="email"
                                                    >
                                                        <Typography.Text>{auth.info.email}</Typography.Text>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Số Điện Thoại"
                                                        name="phone"
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Địa Chỉ"
                                                        name="adress"
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                    <Form.Item
                                                    >
                                                        <Button type='primary'>Lưu</Button>
                                                    </Form.Item>
                                                </Form>
                                            </FormContainer>
                                            <AvatarContainer>
                                                <PreviewImg>
                                                    <Avt src={prevAvt} />
                                                </PreviewImg>

                                                <UploadButton>
                                                    {
                                                        uploadList && uploadList.length > 0 && (
                                                            <Button icon={<DeleteForeverOutlinedIcon />} style={{ marginBottom: 10 }} onClick={() => { setUploadList([]) }}></Button>
                                                        )
                                                    }
                                                    <Upload
                                                        name="file"
                                                        beforeUpload={(file, fileList) => { setUploadList([file]); return false }}
                                                        showUploadList={{ showRemoveIcon: false }}
                                                        listType='picture'
                                                        accept='.png,.jpg,.jpeg'
                                                        fileList={uploadList}
                                                    >
                                                        <Button>Chọn Ảnh</Button>
                                                    </Upload>
                                                    <Typography.Text>Dung lượng tối đa: 1MB</Typography.Text>
                                                    <Typography.Text>Định dạng: .JPG, .JPEG, .PNG</Typography.Text>
                                                    {
                                                        uploadList && uploadList.length > 0 && (
                                                            <Button style={{ marginTop: 20 }} onClick={handleUploadAvatar}>Lưu Ảnh</Button>
                                                        )
                                                    }

                                                </UploadButton>
                                            </AvatarContainer>
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

export default WebMyAccount