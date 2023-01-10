import { Button, InputNumber, Spin, Steps, Table, Tag, Typography } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { orderAPI } from '../../apis/orderAPI';
import Helmet from '../../components/Helmet';
import { EllipsisOutlined, FileOutlined, FileDoneOutlined, CarOutlined, ScheduleOutlined, SyncOutlined, FileExcelOutlined, FormOutlined } from '@ant-design/icons';

const getIconByOrderStatus = (orderStatus) => {

    switch (orderStatus.id) {
        case (1): {
            return <FileOutlined style={{ color: 'green' }} />
        }
        case (2): {
            return <FileDoneOutlined style={{ color: 'green' }} />
        }
        case (3): {
            return <CarOutlined style={{ color: 'green' }} />
        }
        case (4): {
            return <ScheduleOutlined />
        }
        case (5): {
            return <SyncOutlined color='yellow' />
        }
        case (6): {
            return <FileExcelOutlined style={{ color: 'red' }} />
        }
        case (7): {
            return <FormOutlined style={{ color: '#ebab15' }} />
        }
        default: {
            return <FileOutlined />
        }
    }
}

const Cart = ({order }) => {

    const [data, setData] = useState([])


    const columns = [
        {
            title: '',
            render: (record) => {
                return (
                    <div className="cart--item__img">
                        <img src={`http://localhost:8080/api/file/images/${record.product.images[0].photo}`} />
                    </div>
                )
            },
            width: 150
        },
        {
            title: 'Sản phẩm',
            render: (record) => {
                return (
                    <div className="cart--item__pr">
                        <div className="cart--item__pr--name">
                            <Typography.Title level={5}>{record?.product?.name}</Typography.Title>
                        </div>
                        <div className="cart--item__pr--price">
                            {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(record?.product?.price)}
                        </div>
                        <div className="cart--item__pr--size">
                            Size: <b>{record?.size}</b>
                        </div>
                    </div>
                )
            }
        },
        {
            title: 'Số lượng',
            render: (record) => {
                return (
                    <div className="cart--item__quantity">
                        <div className="cart--item__quantity--info">
                            <InputNumber
                                value={record?.quantity}
                                style={{ border: 'none', textAlign: 'center' }}
                                disabled
                            />
                        </div>
                    </div>
                )
            },
            width: 200
        },
        {
            title: 'Số tiền',
            render: (record) => {
                return (
                    <div className="cart--item__totalprice">
                        {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        }).format(record?.product?.price * record?.quantity)}
                    </div>
                )
            },
        },
        {
            title: '',
            render: (record) => {
                return (
                    <div className="cart--item__actions">
                        {/* {
                            order?.orderStatus?.id !== 1
                            &&
                            <Button style={{ marginLeft: 10, backgroundColor: '#ad0e33', color: 'white' }}>Hoàn Trả</Button>
                        } */}
                    </div>
                )
            },
        }
    ];

    useEffect(() => {
        if (order) {
            setData(order?.orderDetail.map((item) => ({
                ...item, key: item.id
            })))
        }
    }, [order])

    return (
        <>
            <div className="adm--order__cart--detail__table">
                <Table
                    columns={columns}
                    dataSource={data}
                    style={{ width: '100%' }}
                    scroll={{
                        y: '60vh',
                    }}
                    pagination={false}
                />
            </div>
            <div className="adm--order__cart--detail__pay">
                <div className="adm--order__cart--detail__pay--item">
                    <div className="adm--order__cart--detail__pay--item__title">Tiền Sản Phẩm</div>
                    <div className="adm--order__cart--detail__pay--item__content">
                        {
                            new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(order?.orderDetail.reduce(((total, item) => total + item.product.price * item.quantity), 0))
                        }
                    </div>
                </div>
                <div className="adm--order__cart--detail__pay--item">
                    <div className="adm--order__cart--detail__pay--item__title">Phí vận chuyển</div>
                    <div className="adm--order__cart--detail__pay--item__content">
                        {
                            new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(order?.shipfee)
                        }
                    </div>
                </div>
                <div className="adm--order__cart--detail__pay--item">
                    <div className="adm--order__cart--detail__pay--item__title">Giảm Giá</div>
                    <div className="adm--order__cart--detail__pay--item__content">
                        {
                            new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(order?.discount)
                        }
                    </div>
                </div>
                <div className="adm--order__cart--detail__pay--item">
                    <div className="adm--order__cart--detail__pay--item__title">Tổng Số Tiền</div>
                    <div className="adm--order__cart--detail__pay--item__content">
                        {
                            new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(order?.orderDetail.reduce(((total, item) => total + item.product.price * item.quantity), 0) + order?.shipfee - order?.discount)
                        }
                    </div>
                </div>
            </div>
        </>

    )
}



const WebMyOrderDetail = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [info, setInfo] = useState(undefined);

    useEffect(() => {
        orderAPI.getOrderInfo(id)
            .then(res => {
                if (!res.status) {
                    console.log(res)
                    setInfo(res)
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }, [id])
    return (
        <Helmet
            title={"Thông Tin Đơn Hàng"}
        >
            <div className="web--orderdetail">
                <div className="web--orderdetail__navs">
                    <div className={`web--orderdetail__navs--item ${location.pathname === '/my-account' ? 'active' : ''}`}>
                        <Link
                            to="/my-account"
                            style={{ color: 'inherit' }}
                            className={`web--orderdetail__navs--item__link ${location.pathname === '/my-account' ? 'active' : ''}`}
                        >
                            tài  khoản  của tôi
                        </Link>
                    </div>
                    <div className={`web--orderdetail__navs--item ${location.pathname === '/change-password' ? 'active' : ''}`}>
                        <Link
                            to="/change-password"
                            style={{ color: 'inherit' }}
                            className={`web--orderdetail__navs--item__link ${location.pathname === '/change-password' ? 'active' : ''}`}
                        >
                            đổi mật khẩu
                        </Link>
                    </div>
                    <div className={`web--orderdetail__navs--item active`}>
                        <Link
                            to="/my-orders"
                            style={{ color: 'inherit' }}
                            className={"web--orderdetail__navs--item__link active"}
                        >
                            đơn  hàng
                        </Link>
                    </div>
                </div>
                <div className="web--orderdetail__body">
                    {
                        info ?
                            (
                                <>
                                    <div className="web--orderdetail__body--title">
                                        <Button type='primary' onClick={() => { navigate("/my-orders") }}>Danh Sách</Button>
                                    </div>
                                    <div className="web--orderdetail__body--status">
                                        <Steps
                                            items={[
                                                ...info?.statusTimelineDetail.map((item) => ({
                                                    title: item?.orderStatus?.title,
                                                    icon: getIconByOrderStatus(item.orderStatus),
                                                    description: moment(item.createdAt).format('DD/MM/YYYY, H:mm:ss'),
                                                    status: 'finish'
                                                })),
                                                {
                                                    title: '',
                                                    icon: <EllipsisOutlined />,
                                                    description: '',
                                                    status: 'wait'
                                                }
                                            ]}
                                        />
                                    </div>
                                    <div className="web--orderdetail__body--info">
                                        <div className="web--orderdetail__body--info__title">
                                            <Typography.Title level={5}>Thông Tin Đơn Hàng</Typography.Title>
                                        </div>
                                        <div className="web--orderdetail__body--info__detail">
                                            <div className="web--orderdetail__body--info__detail--item">
                                                <div className="web--orderdetail__body--info__detail--item__label">Trạng Thái</div>
                                                <div className="web--orderdetail__body--info__detail--item__content">{info?.orderStatus?.title}</div>
                                            </div>
                                            <div className="web--orderdetail__body--info__detail--item">
                                                <div className="web--orderdetail__body--info__detail--item__label">Loại</div>
                                                <div className="web--orderdetail__body--info__detail--item__content">
                                                    {info?.orderType.toLowerCase() === 'giao hàng' ? <Tag color='blue'>{info?.orderType}</Tag> : <Tag color='green'>{info?.orderType}</Tag>}
                                                </div>
                                            </div>
                                            <div className="web--orderdetail__body--info__detail--item">
                                                <div className="web--orderdetail__body--info__detail--item__label">Họ Và Tên</div>
                                                <div className="web--orderdetail__body--info__detail--item__content">
                                                    {info?.fullname}
                                                </div>
                                            </div>
                                            <div className="web--orderdetail__body--info__detail--item">
                                                <div className="web--orderdetail__body--info__detail--item__label">Số Điện Thoại</div>
                                                <div className="web--orderdetail__body--info__detail--item__content">
                                                    {info?.phone}
                                                </div>
                                            </div>
                                            <div className="web--orderdetail__body--info__detail--item">
                                                <div className="web--orderdetail__body--info__detail--item__label">Địa Chỉ</div>
                                                <div className="web--orderdetail__body--info__detail--item__content">
                                                    {`${info?.location}, ${info?.wardName}, ${info?.districtName}, ${info?.cityName}`}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="web--orderdetail__body--cart">
                                        <div className="web--orderdetail__body--cart__title">
                                            <Typography.Title level={4}>Thông Tin Giỏ Hàng</Typography.Title>
                                        </div>
                                        <div className="web--orderdetail__body--cart__detail">
                                            <Cart order={info} />
                                        </div>
                                    </div>
                                </>
                            )
                            :
                            (
                                <Spin />
                            )
                    }

                </div>
            </div>
        </Helmet>
    )
}

export default WebMyOrderDetail