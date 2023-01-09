import { Layout, Row } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'
import AdmSidebar from '../components/AdmSidebar'
import AdmTopbar from '../components/AdmTopbar'

const AdminLayout = () => {
    return (
        <Layout className='adm--layout'>
            <div className="adm--layout__sidebar">
                <AdmSidebar />
            </div>
            <Row className="adm--layout__outlet">
                <div className="adm--layout__outlet--topbar">
                    <AdmTopbar />
                </div>
                <div className="adm--layout__outlet--body">
                    <Outlet />
                </div>
            </Row>
        </Layout>
    )
}

export default AdminLayout