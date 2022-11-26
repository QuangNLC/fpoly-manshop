import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    padding: 20px;
`
const Wrapper = styled.div`
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`
const Title = styled.h1``
const Form = styled.form`
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
    return (
        <Container>
            <Wrapper>
                <Title>Thêm tài khoản mới</Title>
                <Form>
                    <Item>
                        <ItemLabel>Tên tài khoản</ItemLabel>
                        <ItemInput type="text" placeholder='Ví dụ: nguoidung... ' />
                    </Item>
                    <Item>
                        <ItemLabel>Họ và Tên</ItemLabel>
                        <ItemInput type="text" placeholder='Ví dụ: Phạm Văn A' />
                    </Item>
                    <Item>
                        <ItemLabel>Email</ItemLabel>
                        <ItemInput type="email" placeholder='Ví dụ: a@gmail.com' />
                    </Item>
                    <Item>
                        <ItemLabel>Mật khẩu</ItemLabel>
                        <ItemInput type="password" placeholder='********' />
                    </Item>
                    <Item>
                        <ItemLabel>Số điện thoại</ItemLabel>
                        <ItemInput type="text" placeholder='Ví dụ: 0123456789' />
                    </Item>
                    <Item>
                        <ItemLabel>Địa chỉ</ItemLabel>
                        <ItemInput type="text" placeholder='Ví dụ: Ấp 36, Thị trấn A, Tỉnh A, Thành phố A' />
                    </Item>
                    <Genders>
                        <ItemLabel>Giới tính</ItemLabel>
                        <GenderOptions style={{ paddingBottom: "5px" }}>
                            <Item>
                                <ItemInput type="radio" name="gender" id="male" value="male" style={{ marginBottom: "5px" }} />
                                <ItemLabel htmlFor='male' style={{ textAlign: "Center" }}>Nam</ItemLabel>
                            </Item>
                            <Item>
                                <ItemInput type="radio" name="gender" id="female" value="male" style={{ marginBottom: "5px" }} />
                                <ItemLabel htmlFor='female' style={{ textAlign: "Center" }}>Nữ</ItemLabel>
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
                    <Button style={{ marginLeft: "20px", width: "120px", borderRadius: "20px" }}>Thêm mới</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default AdmNewUser