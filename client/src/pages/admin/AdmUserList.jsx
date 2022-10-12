import React from 'react'
import styled from 'styled-components'
import { userRows } from '../../assets/data/data';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Container = styled.div`
    width: 100%;
    padding: 20px;
`
const Wrapper = styled.div`
    width: 100%;
    height: 500px;
`
const TitleContainer = styled.div`   
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Title = styled.span`
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 20px;
`
const TitleButton = styled.button`
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
    align-items: center;
`
const UserImg = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50px;
    object-fit: cover;
    margin-right: 10px;
`
const ActionContainer = styled.div`
    display: flex;
    align-items: center;

`
const EditButton = styled.button`
    border: none;
    border-radius: 10px;
    height: 40px;
    padding: 0px 20px;
    background-color: #3bb077;
    color: white;
    cursor: pointer;
    margin-right: 20px;
    transition: all 0.25s ease-in;
    font-size: 16px;
    &:hover{
        background-color: rgb(228,228,250);
        color: black;
    }
`
const DeleteButton = styled.button`
    border: none;
    border-radius: 10px;
    padding: 0px 24px;
    height: 40px;
    background-color: rgba(0,0,0, 0.65);
    color: white;
    cursor: pointer;
    margin-right: 10px;
    transition: all 0.25s ease-in;
    
    &:hover{
        background-color: red;
        color: white;
    }
`

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'username', headerName: 'Username', width: 200,
        renderCell: (params) => (
            <UserContainer>
                <UserImg src={params.row.avatar} alt="" />
                {params.row.username}
            </UserContainer>
        )
    },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'status', headerName: 'Status', width: 120, },
    { field: 'transaction', headerName: 'Transaction Volumne', width: 160 },
    {
        field: 'action', header: "Action", width: 250,
        renderCell: (params) => (
            <ActionContainer>
                <Link to={"/admin/user/" + params.row.id}>
                    <EditButton>Edit</EditButton>
                </Link>
                <DeleteButton>
                    <DeleteOutlineOutlinedIcon style={{ fontSize: "20px" }} />
                </DeleteButton>
            </ActionContainer>
        )
    }
];


const AdmUserList = () => {
    return (
        <Container>
            <Wrapper style={{ height: 400, width: '100%' }}>
                <TitleContainer>
                    <Title>List User</Title>
                    <Link to="/admin/new-user">
                        <TitleButton>Create</TitleButton>
                    </Link>
                </TitleContainer>
                <DataGrid
                    rows={userRows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </Wrapper>
        </Container>
    )
}

export default AdmUserList