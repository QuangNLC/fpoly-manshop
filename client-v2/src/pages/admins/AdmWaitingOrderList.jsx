import React, { useEffect, useState } from 'react'
import Helmet from '../../components/Helmet'
import { EyeOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal, notification, Table, Tag, Typography } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createWaitingOrderAction, deleteWaitingOrderAction } from '../../redux/actions/WaitingOrderReducerAction';

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description: des,
    });
};
const AdmWaitingOrderList = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const waitingList = useSelector(state => state.waitingOrder)
    const columns = [
        {
            title: 'STT',
            render: (text, record, index) => {
                return (<>{index + 1}</>)
            }
        },
        {
            title: 'Tổng Sản Phẩm',
            dataIndex: 'totalQuantity',
            key: 'totalQuantity',
            sorter: (a, b) => a.totalQuantity - b.totalQuantity
        },
        {
            title: 'Tổng Tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (text) => (<>{text ? 
                new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(text)
             : 0}</>),
            sorter: (a, b) => a.total_price - b.total_price
        },
        {
            title: 'Ngày Tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => (<>{moment(text).format('DD/MM/YYYY, H:mm:ss')}</>),
            sorter: (a, b) => (a.createdDate > b.createdDate ? -1 : 1)
        },
        {
            title: 'Trạng Thái',
            render: (text) => <Tag color='blue'>Đang chờ</Tag>
        },
        {
            title: 'Thao Tác',
            render: (text) => {
                return (
                    <div className='adm--wtorder--list__table--actionscl'>
                        <Button type='primary' icon={<EyeOutlined />} onClick={() => { navigate(`/admin/waiting-order/${text.id}`) }} style={{ borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></Button>
                        <Button type='primary' icon={<DeleteOutlined />} danger style={{ borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => { onClickDeleteWaitingOrder(text.id) }}></Button>
                    </div>
                )
            }
        }
    ];

    const onClickCreateNewWaitingOrder = () => {
        let payload = {
            id: uuidv4(),
            orderDetail: [],
            createdAt: JSON.parse(JSON.stringify(new Date())),
            users: null
        }
        dispatch(createWaitingOrderAction(payload))
        openNotificationWithIcon('info', 'Thông Báo', 'Tạo đơn hàng thành công.')
    }

    const onClickDeleteWaitingOrder = (id) => {
        Modal.confirm({
            title: 'Hộp Thoại Xác Nhận',
            content: 'Bạn có muốn xóa đơn hàng không?',
            okText: 'Xác Nhận',
            cancelText: 'Hủy Bỏ',
            onOk: () => {
                openNotificationWithIcon('info', 'Thông Báo', 'Xóa đơn hàng thành công')
                dispatch(deleteWaitingOrderAction({ id }))
            }
        })
    }


    useEffect(() => {
        console.log(waitingList)
        if (waitingList.list.length > 0) {
            console.log(waitingList.list.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)))
            setData(waitingList.list.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)).map(item => {
                return ({
                    key: item.id,
                    id: item?.id,
                    totalQuantity: item?.orderDetail?.length > 0 ? item?.orderDetail.reduce((total, curr) => total + curr.quantity, 0) : 0,
                    totalPrice: item?.orderDetail?.length > 0 ? item?.orderDetail.reduce((total, curr) => total + curr.quantity * curr.product.price, 0) : 0,
                    createdAt: item?.createdAt
                })
            }))
        } else {
            setData([])
        }
    }, [waitingList, waitingList.list])

    return (
        <Helmet
            title={"Bán Hàng Tại Quầy"}
        >
            <div className="adm--wtorder--list">
                <Typography.Title level={3}>Danh Sách Đơn Chờ</Typography.Title>
                <div className="adm--wtorder--list__actions">
                    <Button type='primary' icon={<PlusOutlined />} onClick={() => { onClickCreateNewWaitingOrder() }}>Tạo Đơn Hàng</Button>
                </div>
                <div className="adm--wtorder--list__table">
                    <Table columns={columns} dataSource={data} />
                </div>
            </div>
        </Helmet>
    )
}

export default AdmWaitingOrderList