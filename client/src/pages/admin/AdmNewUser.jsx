import React from 'react'
import styled from 'styled-components'
import { Form, Input } from 'antd'

const Container = styled.div`
    padding: 20px;
`
const Wrapper = styled.div`
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    background-color: white;
    border-radius: 10px;
`
const Title = styled.h1``
const FormWrapper = styled.form`
    display: flex;
    flex-wrap: wrap;
`
const Item = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-right: 20px;
`
const ItemLabel = styled.label`
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 500;
    color: rgb(151,150,150);
`
const ItemInput = styled.input`
    height: 30px;
    padding: 20px;
    border: 1px solid gray;
    border-radius: 10px;
    margin-bottom: 30px;
`
const Genders = styled.div`
    width: 100%;
`
const GenderOptions = styled.div`
    width: 400px;
    padding: 20px;
    display: flex;
    align-items:center;
    justify-content: space-around;
`
const Select = styled.select`
    height: 40px;
    border-radius: 10px;
    padding: 0px 20px;
    width: 400px;
`
const SelectOption = styled.option`
`
const Button = styled.button`
    width: 200px;
    border: none;
    background-color: teal;
    color: white;
    padding: 10px;
    font-weight: 600;
    border-radius: 10px;
    margin-top: 30px;
    cursor: pointer;
    transition: all 0.25s ease-in;

    &:hover{    
        background-color: darkblue;
    }
`

const AdmNewUser = () => {

    const onClickCreateAccount = () => {
        
    }


    return (
        <Container>
            <Wrapper>
                <Title>Thêm tài khoản mới</Title>
                <Form
                    layout='vertical'
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                >
                    <FormWrapper>
                        <Item>
                            <Form.Item
                                label={"Tên Đăng Nhập"}
                            >
                                <Input
                                    placeholder="Tên Đăng Nhập"
                                />
                            </Form.Item>
                        </Item>
                        <Item>
                            <Form.Item
                                label={"Họ Và Tên"}
                            >
                                <Input
                                    placeholder="Họ Và Tên"
                                />
                            </Form.Item>
                        </Item>
                        <Item>
                            <Form.Item
                                label={"Email"}
                            >
                                <Input
                                    placeholder="Email"
                                />
                            </Form.Item>
                        </Item>
                        <Item>
                            <Form.Item
                                label={"Số Điện Thoại"}
                            >
                                <Input
                                    placeholder="Số Điện Thoại"
                                />
                            </Form.Item>
                        </Item>
                        <Item>
                            <Form.Item
                                label={"Mật Khẩu"}
                            >
                                <Input
                                    type='password'
                                    placeholder="Mật Khẩu"
                                />
                            </Form.Item>
                        </Item>
                        <Item>
                            <Form.Item
                                label={"Xác Nhận Mật Khẩu"}
                            >
                                <Input
                                    type='password'
                                    placeholder="Xác Nhận Mật Khẩu"
                                />
                            </Form.Item>
                        </Item>
                        <Genders>
                            <ItemLabel>Quyền Truy cập</ItemLabel>
                            <GenderOptions style={{ paddingBottom: "5px" }}>
                                <Item>
                                    <ItemInput type="radio" name="gender" id="male" value="user" style={{ marginBottom: "5px" }} />
                                    <ItemLabel htmlFor='male' style={{ textAlign: "Center" }}>Người Dùng</ItemLabel>
                                </Item>
                                <Item>
                                    <ItemInput type="radio" name="gender" id="female" value="staff" style={{ marginBottom: "5px" }} />
                                    <ItemLabel htmlFor='female' style={{ textAlign: "Center" }}>Nhân Viên</ItemLabel>
                                </Item>
                                <Item>
                                    <ItemInput type="radio" name="gender" id="female" value="admin" style={{ marginBottom: "5px" }} />
                                    <ItemLabel htmlFor='female' style={{ textAlign: "Center" }}>Quản Trị Viên</ItemLabel>
                                </Item>
                            </GenderOptions>
                        </Genders>
                        <Item style={{ width: "100%" }}>
                            <ItemLabel>Trạng thái tài khoản</ItemLabel>
                            <Select name="active" id="active">
                                <SelectOption value="yes">Kích hoạt</SelectOption>
                                <SelectOption value="no">Không kích hoạt</SelectOption>
                            </Select>
                        </Item>
                        <Button style={{ width: "120px", borderRadius: "20px" }}>Làm mới</Button>
                        <Button style={{ marginLeft: "20px", width: "120px", borderRadius: "20px" }} onClick={onClickCreateAccount}>Thêm mới</Button>
                    </FormWrapper>
                </Form>

            </Wrapper>
        </Container>
    )
}

export default AdmNewUser