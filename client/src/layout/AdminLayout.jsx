import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import AdmTopbar from '../components/AdmTopbar'
import AdmSidebar from '../components/AdmSidebar'

const Container = styled.div``
const Wrapper = styled.div`
    display: flex;
`
const ContentContainer = styled.div`
    flex: 4;
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