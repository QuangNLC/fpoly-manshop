import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

import styled from 'styled-components'
import Footer from '../components/Footer'

const Container = styled.div`
    position: relative;
`

const Content = styled.div`
    min-height: 100vh;
    margin-top: 180px;
    padding:20px 50px;
    width: 100%;
`

const WebsiteLayout = () => {
    return (
        <Container>
            <Header />
            <Content>
                <Outlet />
            </Content>
            <Footer />
        </Container>
    )
}

export default WebsiteLayout