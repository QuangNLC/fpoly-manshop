import { Button, Table, Tag, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import Helmet from '../../components/Helmet'
import { EyeOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { orderAPI } from '../../apis/orderAPI';

const StatusBadge = (props) => {

    const [color, setColor] = useState('blue')

    useEffect(() => {
        if (props.status) {
            switch (props.status.id) {
                case (1): {
                    setColor('orange')
                    break;
                }
                case (2): {
                    setColor('cyan')
                    break;
                }
                case (3): {
                    setColor('purple')
                    break;
                }
                case (4): {
                    setColor('blue')
                    break;
                }
                case (5): {
                    setColor('#abad6f')
                    break;
                }
                case (6): {
                    setColor('red')
                    break;
                }
                default: {
                    setColor('blue')
                    break;
                }
            }
        }
    }, [])

    return (
        <Tag color={color}>{props?.status?.title}</Tag>
    )
}

const AdmOrderList = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const columns = [
        {
            title: 'STT',
            render: (text, record, index) => {
                return (<>{index + 1}</>)
            }
        },
        {
            title: 'Trạng Thái',
            render: (record) => {
                return (
                    <StatusBadge status={record?.orderStatus} />
                )
            },
            filters: [
                {
                    text: "Đang Chờ",
                    value: 5
                },
                {
                    text: 'Chờ Xác Nhận',
                    value: 1,
                },
                {
                    text: 'Đã Xác Nhận',
                    value: 2,
                },
                {
                    text: 'Đang Giao',
                    value: 3,
                },
                {
                    text: 'Hoàn Tất',
                    value: 4,
                },
                {
                    text: 'Hủy Đơn',
                    value: 6,
                },
            ],
            onFilter: (value, record) => record.status.id === value,
        },
        {
            title: 'Tổng Sản Phẩm',
            dataIndex: 'totalQuantity',
            key: 'totalQuantity',
            sorter: (a, b) => a.totalQuantity - b.totalQuantity
        },
        {
            title: 'Tổng Số Tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            sorter: (a, b) => a.totalPrice - b.totalPrice,
            render: (text) => (
                new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(text)
            )

        },
        {
            title: 'Người Mua',
            key: 'username',
            render: (record) => {
                if (record.users.username === 'khachle') {
                    return <Tag>Khách Lẻ</Tag>
                } else {
                    return <Typography.Text>{record.users.fullname}</Typography.Text>
                }
            }
        },
        {
            title: 'Loại Đơn Hàng',
            dataIndex: 'orderType',
            key: 'orderType',
            render: (text) => {
                if (text.toLowerCase() === 'giao hàng') {
                    return <Tag color='blue'>{text}</Tag>
                } else {
                    return <Tag color='green'>{text}</Tag>
                }
            }
        },
        {
            title: 'Ngày Tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => (<>{moment(text).format('DD/MM/YYYY, H:mm:ss')}</>),
            sorter: (a, b) => (a.createdAt > b.createdAt ? -1 : 1)
        },
        {
            render: (text) => {
                return (
                    <Button type='primary' icon={<EyeOutlined />} onClick={() => { navigate(`/admin/order/${text.id}`) }} style={{ borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></Button>

                )
            }
        }
    ];

    useEffect(() => {
        orderAPI.getAllOrder()
            .then(res => {
                if (!res.status) {
                    console.log(res)
                    setData([...res.map((item, index) => ({
                        ...item,
                        key: item.id,
                        createdAt: item.createdAt,
                        totalQuantity: item?.orderDetail.reduce((total, curr) => (total + curr.quantity), 0),
                        totalPrice: item?.orderDetail.reduce((total, curr) => (total + curr.quantity * curr.price), 0)
                    }))])
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <Helmet
            title={"Danh Sách Đơn Hàng"}
        >
            <div className="adm--orderlist">
                <div className="adm--orderlist__title">
                    <Typography.Title level={4}>Danh Sách Đơn Hàng</Typography.Title>
                </div>
                <div className="adm--orderlist__table">
                    <Table columns={columns} dataSource={data.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)} bordered />
                </div>
            </div>
        </Helmet>
    )
}

export default AdmOrderList