import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

import styled from 'styled-components'

const Container = styled.div`
    position: relative;
`

const Content = styled.div`
    min-height: 100vh;
    margin-top: 180px;
    padding 50px;
`

const WebsiteLayout = () => {
    return (
        <Container>
            <Header />
            <Content>
                <Outlet />
            </Content>
        </Container>
    )
}

export default WebsiteLayout