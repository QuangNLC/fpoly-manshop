import { Layout, Row } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'
import AdmSidebar from '../components/AdmSidebar'

const AdminLayout = () => {
    return (
        <Layout className='adm--layout'>
            <div className="adm--layout__sidebar">
                <AdmSidebar />
            </div>
            <Row className="adm--layout__outlet">
                <Outlet />
            </Row>
        </Layout>
    )
}

export default AdminLayout