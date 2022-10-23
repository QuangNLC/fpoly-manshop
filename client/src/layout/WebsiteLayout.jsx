import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

import styled from 'styled-components'
import Footer from '../components/Footer'

const Container = styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
    margin: 0 auto;
`

const Content = styled.div`
    margin: 80px auto 0 auto;
    padding: 20px 0;
    max-width: 50%;
    min-height: 100vh;
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