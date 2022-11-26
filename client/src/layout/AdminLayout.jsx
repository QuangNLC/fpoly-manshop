import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import AdmTopbar from '../components/AdmTopbar'
import AdmSidebar from '../components/AdmSidebar'

const Container = styled.div`
    width: 100%;
`
const Wrapper = styled.div`
    display: flex;
    width: 100%;
`
const ContentContainer = styled.div`
    width:80%;
    max-width: 80%;
    background-color: rgba(209, 208, 219, 1);
`

const AdminLayout = () => {

    return (
        <Container>
            <AdmTopbar />
            <Wrapper>
                <AdmSidebar />
                <ContentContainer>
                    <Outlet />
                </ContentContainer>
            </Wrapper>
        </Container>
    )
}

export default AdminLayout