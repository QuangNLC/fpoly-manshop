import { Button, Select, Table, Tag, Typography } from 'antd'
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

const orderStatusData = [
    {
        id: 1,
        title: 'Chờ Xác Nhận'
    },
    {
        id: 2,
        title: 'Đã Xác Nhận'
    },
    {
        id: 3,
        title: 'Giao Hàng'
    },
    {
        id: 4,
        title: 'Hoàn Thành'
    },
    {
        id: 5,
        title: 'Hoàn Trả'
    },
    {
        id: 6,
        title: 'Hủy Đơn'
    }
]

const sortData = [
    {
        id: 1,
        title: 'Theo Ngày Tạo (Mới Nhất)'
    },
    {
        id: 2,
        title: 'Theo Ngày Tạo (Cũ Nhất)'
    },
    {
        id: 3,
        title: 'Theo Tổng Tiền (Cao Đến Thấp)'
    },
    {
        id: 4,
        title: 'Theo Tổng Tiền (Thấp Đến Cao)'
    },
    {
        id: 5,
        title: 'Theo Tổng Sản Phẩm (Cao Đến Thấp)'
    },
    {
        id: 6,
        title: 'Theo Tổng Sản Phẩm (Thấp Đến Cao)'
    }
]


const AdmOrderList = () => {
    const navigate = useNavigate();

    const [ordersData, setOrdersData] = useState([]);
    const [ordersTableData, setOrdersTableData] = useState([]);
    const [orderFilterInfo, setOrderFilterInfo] = useState({
        statusId: 0,
        orderType: 'tất cả',
        sortId: 1
    })

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
            render: (record) => {
                return(
                    <>
                        {record?.orderDetail.reduce(((total, curr) => (total+curr?.quantity)), 0)}
                    </>
                )
            }
        },
        {
            title: 'Tổng Số Tiền',
            key: 'totalPrice',
            sorter: (a, b) => a.totalPrice - b.totalPrice,
            render: (record) => (
                new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(record?.orderDetail.reduce(((total, curr) => (total + curr?.quantity*(curr?.price - curr?.prDiscount))), 0) + record?.shipfee)
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
    const onChangeFilterStatus = (value) => {
        setOrderFilterInfo({ ...orderFilterInfo, statusId: value });
    }

    const onChangeFilterOrderType = (value) => {
        setOrderFilterInfo({ ...orderFilterInfo, orderType: value });
    }

    const onChangeFilterSort = (value) => {
        setOrderFilterInfo({ ...orderFilterInfo, sortId: value });
    }

    const onClearFilter = () => {
        setOrderFilterInfo({
            statusId: 0,
            orderType: 'tất cả',
            sortId: 1
        });
    }


    const filterOrderData = (data, filter) => {
        let list = [...data]

        if (filter.statusId !== 0) {
            list = [...list.filter(i => i.orderStatus.id === filter.statusId)]
        }

        if (filter.orderType.toLowerCase() !== 'tất cả') {
            list = [...list.filter(i => i.orderType.toLowerCase() === filter.orderType.toLowerCase())]
        }

        switch (filter.sortId) {
            case (1): {
                list = [...list.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)]
                break;
            }
            case (2): {
                list = [...list.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1)]
                break;
            }
            case (3): {
                list = [...list.sort((a, b) => a?.orderDetail.reduce(((total, curr) => (total + curr.quantity * curr.price)), 0) > b?.orderDetail.reduce(((total, curr) => (total + curr.quantity * curr.price)), 0) ? -1 : 1)]
                break;
            }
            case (4): {
                list = [...list.sort((a, b) => a?.orderDetail.reduce(((total, curr) => (total + curr.quantity * curr.price)), 0) > b?.orderDetail.reduce(((total, curr) => (total + curr.quantity * curr.price)), 0) ? 1 : -1)]
                break;
            }
            case (5): {
                list = [...list.sort((a, b) => a?.orderDetail.reduce(((total, curr) => (total + curr.quantity)), 0) > b?.orderDetail.reduce(((total, curr) => (total + curr.quantity)), 0) ? -1 : 1)]
                break;
            }
            case (6): {
                list = [...list.sort((a, b) => a?.orderDetail.reduce(((total, curr) => (total + curr.quantity)), 0) > b?.orderDetail.reduce(((total, curr) => (total + curr.quantity)), 0) ? 1 : -1)]
                break;
            }
            default: {
                list = [...list.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)]
                break;
            }
        }

        return list;
    }

    useEffect(() => {
        setOrdersTableData(filterOrderData(ordersData, orderFilterInfo))
    }, [ordersData, orderFilterInfo])

    useEffect(() => {
        orderAPI.getAllOrder()
            .then(res => {
                if (!res.status) {
                    console.log(res)
                    setOrdersData(res)
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
                <div className="adm--orderlist__body">
                    <div className="adm--orderlist__body--filters">
                        <div className="adm--orderlist__body--filters__item">
                            <div className="adm--orderlist__body--filters__item--label">Trạng Thái</div>
                            <div className="adm--orderlist__body--filters__item--content">
                                <Select
                                    style={{ width: '140px' }}
                                    value={orderFilterInfo.statusId}
                                    onChange={onChangeFilterStatus}
                                >
                                    <Select.Option
                                        value={0}
                                    >
                                        Tất Cả
                                    </Select.Option>
                                    {
                                        orderStatusData.map(item => (
                                            <Select.Option key={item.id} value={item.id}>
                                                {item.title}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            </div>
                        </div>
                        <div className="adm--orderlist__body--filters__item">
                            <div className="adm--orderlist__body--filters__item--label">Loại Đơn Hàng</div>
                            <div className="adm--orderlist__body--filters__item--content">
                                <Select
                                    style={{ width: '140px' }}
                                    value={orderFilterInfo.orderType}
                                    onChange={onChangeFilterOrderType}
                                >
                                    <Select.Option
                                        value={'tất cả'}
                                    >
                                        Tất Cả
                                    </Select.Option>
                                    <Select.Option
                                        value={'giao hàng'}
                                    >
                                        Giao Hàng
                                    </Select.Option>
                                    <Select.Option
                                        value={'tại quầy'}
                                    >
                                        Tại Quầy
                                    </Select.Option>
                                </Select>
                            </div>
                        </div>
                        <div className="adm--orderlist__body--filters__item">
                            <div className="adm--orderlist__body--filters__item--label">Sắp Xếp</div>
                            <div className="adm--orderlist__body--filters__item--content">
                                <Select
                                    style={{ width: '300px' }}
                                    value={orderFilterInfo.sortId}
                                    onChange={onChangeFilterSort}
                                >
                                    {sortData.map(item => (
                                        <Select.Option key={item.id} value={item.id}>
                                            {item.title}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                        <div className="adm--orderlist__body--filters__item" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                            <Button danger onClick={onClearFilter}>Làm Mới</Button>
                        </div>
                    </div>
                    <div className="adm--orderlist__body--table">
                        <Table columns={columns} dataSource={ordersTableData} bordered />
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default AdmOrderList