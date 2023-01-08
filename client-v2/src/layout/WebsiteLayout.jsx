import React from 'react'
import {Layout, Row} from 'antd';
import WebHeader from '../components/WebHeader';
import WebFooter from '../components/WebFooter';
import { Outlet } from 'react-router-dom';

const WebsiteLayout = () => {

    return (
        <Layout>
            <WebHeader />
            <Row className="web--outlet">
                <Outlet />
            </Row>
            <WebFooter />
        </Layout>
    )
}

export default WebsiteLayout