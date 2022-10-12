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
                <Title>New User</Title>
                <Form>
                    <Item>
                        <ItemLabel>Username</ItemLabel>
                        <ItemInput type="text" placeholder='john' />
                    </Item>
                    <Item>
                        <ItemLabel>Fullname</ItemLabel>
                        <ItemInput type="text" placeholder='John Smith' />
                    </Item>
                    <Item>
                        <ItemLabel>Email</ItemLabel>
                        <ItemInput type="email" placeholder='john@gmail.com' />
                    </Item>
                    <Item>
                        <ItemLabel>Password</ItemLabel>
                        <ItemInput type="password" placeholder='password' />
                    </Item>
                    <Item>
                        <ItemLabel>Phone</ItemLabel>
                        <ItemInput type="text" placeholder='+1 123 456 78' />
                    </Item>
                    <Item>
                        <ItemLabel>Adress</ItemLabel>
                        <ItemInput type="text" placeholder='New York | USA' />
                    </Item>
                    <Genders>
                        <ItemLabel>Gender</ItemLabel>
                        <GenderOptions>
                            <Item>
                                <ItemInput type="radio" name="gender" id="male" value="male" />
                                <ItemLabel htmlFor='male'>Male</ItemLabel>
                            </Item>
                            <Item>
                                <ItemInput type="radio" name="gender" id="female" value="male" />
                                <ItemLabel htmlFor='female'>Female</ItemLabel>
                            </Item>
                        </GenderOptions>
                    </Genders>
                    <Item style={{width: "100%"}}>
                        <ItemLabel>Active</ItemLabel>
                        <Select name="active" id="active">
                            <SelectOption value="yes">Yes</SelectOption>
                            <SelectOption value="no">No</SelectOption>
                        </Select>
                    </Item>
                    <Button>Create</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default AdmNewUser