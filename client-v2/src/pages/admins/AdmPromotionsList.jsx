import { Button, Table, Tag, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import Helmet from '../../components/Helmet';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import promotionAPI from '../../apis/promotionAPI'
import moment from 'moment';
import { EditOutlined } from '@ant-design/icons';

const AdmPromotionsList = () => {

    const navigate = useNavigate();

    const [data, setData] = useState();
    const [tableData, setTableData] = useState();


    const promotionsColumn = [
        {
            title: 'STT',
            render: (text, record, index) => {
                return (<>{index + 1}</>)
            }
        },
        {
            title: 'Tên Khuyến Mại',
            dataIndex: 'title',
        },
        {
            title: 'Ngày Bắt Đầu',
            dataIndex: 'dateafter',
            render: (text) => (<>{moment(text).format('DD/MM/YYYY')}</>)
        },
        {
            title: 'Ngày Kết Thúc',
            dataIndex: 'datebefor',
            render: (text) => (<>{moment(text).format('DD/MM/YYYY')}</>)
        },
        {
            title: 'Giảm Giá',
            render: (record) => (<>{record?.bypersent} %</>)
        },
        {
            title: 'Trạng Thái',
            render: (record) => (<Tag color={record?.isactive ? 'blue' : 'orange'} >{record?.isactive ? 'Kích Hoạt' : 'Không Kích Hoạt'}</Tag>)
        },
        {
            title: 'Thao Tác',
            render: (record) => (<Button type='primary' onClick={() => { navigate(`/admin/promotion/detail/${record?.id}`) }} icon={<EditOutlined />} ></Button>)
        }
    ]

    useEffect(() => {
        setTableData(data)
    }, [data])

    useEffect(() => {
        promotionAPI.getAll()
            .then(res => {
                console.log(res)
                setData(res.map((item, index) => ({
                    key: item.id,
                    ...item
                })))
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <Helmet
            title={"Quản Lý Khuyến Mại"}
        >
            <div className="adm--promotions">
                <div className="adm--promotions__title">
                    <Typography.Title level={4}>Danh Sách Khuyến Mại</Typography.Title>
                    <Button type='primary' icon={<PlusOutlined />} onClick={() => { navigate('/admin/promotion/new') }}>Thêm Mới</Button>
                </div>
                <div className="adm--promotions__body">
                    <div className="adm--promotions__body--filters">

                    </div>
                    <div className="adm--promotions__body--table">
                        <Table bordered dataSource={tableData} columns={promotionsColumn} />
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default AdmPromotionsList