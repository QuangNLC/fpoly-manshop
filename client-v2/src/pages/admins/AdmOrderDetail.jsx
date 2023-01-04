import { Button, Empty, Modal, Spin, Steps, Table, Tag, Typography, InputNumber, Input, Form, Select, notification, Tooltip, Radio, Switch } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { orderAPI } from '../../apis/orderAPI';
import Helmet from '../../components/Helmet';
import { EllipsisOutlined, FileDoneOutlined, FileOutlined, CarOutlined, ScheduleOutlined, SyncOutlined, FileExcelOutlined, FormOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'antd/es/form/Form';
import ghnFeeAPI from '../../apis/ghnFeeAPI';

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

const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description: des,
    });
};


const UpdateButtonGroup = ({ order, onClickUpdate }) => {
    const [btnText, setBtnText] = useState('Xác Nhận')
    const [nextStatus, setNextStatus] = useState(undefined)
    const [updateButtonDisable, setUpdateButtonDisable] = useState(false)
    const [statusList, setStatusList] = useState([
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
            id: 6,
            title: 'Hủy Đơn'
        }
    ])

    const onClickUpdateOrderStatus = () => {
        if (order && nextStatus) {
            let payload = {
                nextStatus: nextStatus
            }
            onClickUpdate(payload)
        }
    }

    const onClickCancelOrder = () => {
        let payload = {
            nextStatus: { id: 6, title: 'Hủy Đơn' }
        }
        onClickUpdate(payload)
    }

    useEffect(() => {
        switch (order?.orderStatus?.id) {
            case (1): {
                setBtnText('Xác Nhận')
                setUpdateButtonDisable(false)
                setNextStatus(statusList[1])
                break;
            }
            case (2): {
                setBtnText('Giao Hàng')
                setUpdateButtonDisable(false)
                setNextStatus(statusList[2])
                break;
            }
            case (3): {
                setBtnText('Đơn Hàng Hoàn Thành')
                setUpdateButtonDisable(order?.paymenStatus?.id === 3)
                setNextStatus(statusList[3])
                break;
            }
            case (4): {
                setBtnText('Xác Nhận')
                setUpdateButtonDisable(false)
                setNextStatus(undefined)
                break;
            }
            default: {
                setBtnText('Xác Nhận')
                setUpdateButtonDisable(false)
                setNextStatus(undefined)
                break;
            }
        }
    }, [order])

    return (
        order?.orderStatus?.id === 4 ?
            (
                <></>
            )
            :
            (
                <div className='adm--order__status--timeline__actions--updategr'>
                    <div className="adm--order__status--timeline__actions--updategr__btn">
                        {
                            order?.orderStatus?.id !== 6 &&
                            (
                                updateButtonDisable ?
                                    (
                                        <Tooltip title="Xác nhận thanh toán để hoàn thành đơn hàng.">
                                            <Button type='primary' onClick={onClickUpdateOrderStatus} disabled>{btnText}</Button>
                                        </Tooltip>
                                    )
                                    :
                                    (
                                        <Button type='primary' onClick={onClickUpdateOrderStatus}>{btnText}</Button>
                                    )
                            )
                        }
                    </div>
                    <div className="adm--order__status--timeline__actions--updategr__btn">
                        {
                            order?.orderStatus?.id !== 6 &&
                            <Button type='primary' danger onClick={onClickCancelOrder}>Hủy Đơn</Button>
                        }
                    </div>
                </div>
            )

    )
}


const Cart = ({ cart, order, onDeleteItem, onUpdateItemQuantity }) => {

    const dispatch = useDispatch()
    const [data, setData] = useState([])

    const hanldeDeleteCartIem = (item) => {
    }

    const handleClickUpdateCartItemQuantity = (item, newQuantity) => {
    }

    const handleChangeCartItemQuantity = (e, item) => {
    }

    const handleBlurCartItemQuantityInput = (e, item) => {
    }

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
                        <Button danger onClick={() => { hanldeDeleteCartIem(record) }} disabled={order?.orderStatus?.id !== 1}>Cập Nhật</Button>
                    </div>
                )
            },
        }
    ];

    useEffect(() => {
        if (cart) {
            setData(cart.map((item) => ({
                ...item, key: item.id
            })))
        }
    }, [cart])

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
                            }).format(cart.reduce(((total, item) => total + item.product.price * item.quantity), 0))
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
                            }).format(order?.totalPrice + order?.shipfee - order?.discount)
                        }
                    </div>
                </div>
            </div>
        </>

    )
}

const AdmOrderDetail = () => {
    const { id } = useParams();
    const [loadingData, setLoadingData] = useState(true);
    const [data, setData] = useState(undefined);
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate()

    const [isModalStatus, setIsModalStatus] = useState(false)
    const statusModalColumns = [
        {
            title: '',
            render: (record) => {
                return (
                    <>
                        {getIconByOrderStatus(record.orderStatus)}
                        {record?.description}
                    </>
                )
            }
        },
        {
            title: 'Thời Gian',
            render: (record) => {
                return (
                    <>
                        {moment(record?.timeDate).format('DD/MM/YYYY, H:mm:ss')}
                    </>
                )
            }
        },
        {
            title: 'Người Xác Nhận',
            render: (record) => {
                return (
                    <>
                        {record?.createdUser?.username}
                    </>
                )
            }
        },
        {
            title: 'Ghi Chú',
            render: (record) => {
                console.log(record)
                return (
                    <>
                        {record?.description}
                    </>
                )
            }
        }
    ]



    //modal desc update status
    const [isModalStatusDesc, setIsModalStatusDesc] = useState(false);
    const [updateSttDesc, setUpdateSttDesc] = useState('');
    const [nextStatus, setNextStatus] = useState(undefined);
    const onClickUpdateOrderStatus = (payload) => {
        setNextStatus(payload.nextStatus)
        setIsModalStatusDesc(true)
    }
    const onCloseModalDesc = () => {
        setUpdateSttDesc('');
        setIsModalStatusDesc(false)
        setNextStatus(undefined)
    }

    const handleUpdateStatus = () => {
        if (nextStatus) {
            let payload = {
                id,
                orderId: parseInt(id),
                updatedUser: auth?.auth?.info?.username,
                description: updateSttDesc,
                statusOrderId: nextStatus?.id
            }
            console.log(payload)
            orderAPI.updateOrderStatus(payload)
                .then(res => {
                    if (!res.status) {
                        setData({ ...res })
                        console.log(res)
                        Modal.success({
                            title: "Hộp Thoại Thông Báo",
                            content: "Cập nhật trạng thái đơn hàng thành công!"
                        })
                        onCloseModalDesc()
                    } else {
                        console.log(res)
                    }
                })
                .catch(err => console.log(err))
        }
    }


    //end modal desc update status


    //modal update orderinfo
    const [isEditingOrderInfo, setIsEditingOrderInfo] = useState(false)
    const [editAddressForm] = useForm();
    const [selectedAddressData, setSelectedAddressData] = useState({
        cityCode: null,
        districtCode: null,
        wardCode: null,
        cityName: '',
        districtName: '',
        wardName: ''
    })
    const [cityData, setCityData] = useState([]);
    const [districtData, setDistrictData] = useState(undefined);
    const [wardData, setWardData] = useState(undefined);

    const onChangeCity = (value) => {
        ghnFeeAPI.getDistrictData({ "province_id": value })
            .then(res => {
                if (res.status === 200) {
                    editAddressForm.setFieldValue('districtCode', null)
                    editAddressForm.setFieldValue('wardCode', null)
                    setDistrictData(res?.data?.data.map((item) => ({ key: item?.DistrictID, districtCode: item?.DistrictID, districtName: item?.DistrictName })))
                    setSelectedAddressData({
                        cityCode: value,
                        districtCode: null,
                        wardCode: null,
                        cityName: (cityData.find(c => c.cityCode === value)).cityName,
                        districtName: '',
                        wardName: ''
                    })
                }

            })
            .catch(err => console.log(err))

    }

    const onChangeDistrict = (value) => {
        ghnFeeAPI.getWardData({ "district_id": value })
            .then(res => {
                if (res.status === 200) {
                    setWardData(res?.data?.data.map((item) => ({ key: item?.WardCode, wardCode: item?.WardCode, wardName: item?.WardName })))
                    editAddressForm.setFieldValue('wardCode', null)
                    setSelectedAddressData({
                        ...selectedAddressData,
                        districtCode: value,
                        districtName: (districtData.find(d => d.districtCode === value)).districtName,
                        wardCode: null,
                        wardName: ''
                    })
                }

            })
            .catch(err => console.log(err))
    }

    const onChangeWard = (value) => {
        setSelectedAddressData({
            ...selectedAddressData,
            wardCode: value,
            wardName: (wardData.find(w => w.wardCode === value)).wardName
        })
    }


    const onClickEditOrderInfo = () => {
        setIsEditingOrderInfo(true)
    }

    const onClickCloseEditOrderInfo = () => {
        setIsEditingOrderInfo(false);
        setSelectedAddressData({
            cityCode: null,
            districtCode: null,
            wardCode: null,
            cityName: '',
            districtName: '',
            wardName: ''
        })
    }

    const onSubmitEditAddress = () => {
        editAddressForm.submit();
    }

    const onFinishEditAddress = (value) => {
        let shipfee = 0;
        ghnFeeAPI.getShipTypes({
            "shop_id": 3529371,
            "from_district": 3440,
            "to_district": selectedAddressData.districtCode
        })
            .then(res => {
                if (res.status === 200) {
                    let shipTypes = res.data.data.map((item) => ({ shipTypeName: item?.short_name, shipTypeId: item?.service_id }))
                    if (shipTypes.length > 0) {
                        ghnFeeAPI.getShippingFee({
                            "service_id": shipTypes[0].shipTypeId,
                            "insurance_value": 200000,
                            "coupon": null,
                            "from_district_id": 3440,
                            "to_district_id": selectedAddressData.districtCode,
                            "to_ward_code": null,
                            "height": 15,
                            "length": 15,
                            "weight": 1000,
                            "width": 15
                        })
                            .then(res => {
                                if (res.status === 200) {
                                    shipfee = res.data.data.total;
                                    const payload = {
                                        ...value,
                                        ...selectedAddressData,
                                        shipfee,
                                        updatedUser: auth?.auth?.info?.username
                                    }
                                    console.log({ ...payload, id: parseInt(id) })
                                    orderAPI.updateOrderInfo({ ...payload, id: data.id })
                                        .then(res => {
                                            if (!res.status) {
                                                setData({ ...res })
                                                openNotificationWithIcon('info', 'Thông Báo', 'Cập nhật thông tin thành công.')
                                                onClickCloseEditOrderInfo()
                                            }
                                        })
                                }

                            })
                            .catch(err => console.log(err))
                    }
                }

            })
            .catch(err => console.log(err))



    }

    //endmodal update orderinfo

    //modal creating payment
    const [isModalCreatingPayment, setIsCreatingAddressModal] = useState(false);
    const [createPaymentForm] = useForm();

    //payment timeline columns
    const paymentTimnelineColumns = [
        {
            title: 'Số Tiền',
            render: (record) => {
                return (
                    <div>
                        {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        }).format(record.paymentFee)}
                    </div>
                )
            }
        },
        {
            title: 'Thời Gian',
            render: (record) => {
                return(
                    <div>
                        {moment(record.createdAt).format('DD/MM/YYYY, H:mm:ss')}
                    </div>
                )
            }
        },
        {
            title: 'Loại Giao Dịch',
            render: (record) => {
                return(
                    <div>
                        <Tag color={record.paymentRefund ? 'orange': 'blue'}>{record.paymentStatus.title}</Tag>
                    </div>
                )
            }
        },
        {
            title: 'Phương Thức Thanh Toán',
            render: (record) => {
                return(
                    <div>
                        <Tag color={record.paymentType === 'tiền mặt' ? 'green': 'blue'}>{record.paymentType}</Tag>
                    </div>
                )
            }
        },
        {
            title: 'Ghi Chú',
            render: (record) => {
                return(
                    <div>
                        {record.description}
                    </div>
                )
            }
        },
        {
            title: 'Người Xác Nhận',
            render: (record) => {
                return(
                    <div>
                        {record.createdUser.username}
                    </div>
                )
            }
        }
        
    ]
    const onOpenCreatingPaymentModal = () => {
        createPaymentForm.setFieldsValue({
            paymentfee: data?.totalPrice - data?.discount + data?.shipfee,
            paymenttype: "tiền mặt",
            description: '',
            paymentRefund: false
        })
        setIsCreatingAddressModal(true);
    }

    const onCloseCreatingPaymentModal = () => {
        setIsCreatingAddressModal(false);
        createPaymentForm.setFieldsValue({
            paymentfee: data?.totalPrice - data?.discount + data?.shipfee,
            paymenttype: "tiền mặt",
            description: '',
            paymentRefund: false
        })
    }

    const onClickSubmitCreatePayment = () => {
        createPaymentForm.submit();
    }

    const onFinishCreatePayment = (value) => {
        const payload = {
            ...value,
            paymentId: value?.paymentRefund ? 2 : 1,
            updatedUser: auth?.auth?.info?.username,
            id: data.id
        }
        console.log(payload)
        orderAPI.updatePaymentInfo(payload)
            .then(res => {
                if (!res.status) {
                    openNotificationWithIcon('info', 'Thông Báo', 'Xác nhận thanh toán.');
                    setData({ ...res })
                    onCloseCreatingPaymentModal()
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }

    //end modal creating payment


    useEffect(() => {
        setLoadingData(true)
        orderAPI.getOrderInfo(id)
            .then(res => {
                if (!res.status) {
                    console.log(res)
                    setData(res)
                    setLoadingData(false)
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
        ghnFeeAPI.getCityData()
            .then(res => {
                if (res.status === 200) {
                    setCityData([...res?.data?.data.map((item, index) => ({
                        cityName: item?.ProvinceName,
                        cityCode: item?.ProvinceID
                    }))])
                }
            })
            .catch(err => console.log(err))
    }, [id])

    return (
        <Helmet
            title={"Thông Tin Đơn Hàng"}
        >
            {
                loadingData ?
                    (
                        <Spin />
                    )
                    :
                    (
                        <div className="adm--order">
                            <div className="adm--order__actions">
                                <Button type='primary' onClick={() => { navigate("/admin/order-list") }}>Danh Sách</Button>
                            </div>
                            <div className="adm--order__status--timeline">
                                <Steps
                                    items={[
                                        ...data.statusTimelineDetail.map((item) => ({
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
                                <div className="adm--order__status--timeline__actions">
                                    <UpdateButtonGroup order={data} onClickUpdate={onClickUpdateOrderStatus} />
                                    <Button onClick={() => { setIsModalStatus(true) }}>Chi Tiết</Button>
                                </div>
                            </div>
                            <div className="adm--order__info">
                                <div className="adm--order__info--title">
                                    <Typography.Title level={4}>Thông Tin Đơn Hàng</Typography.Title>
                                    <Button type='primary' disabled={data?.orderStatus?.id !== 1} onClick={onClickEditOrderInfo}>Cập Nhật</Button>
                                </div>
                                <div className="adm--order__info--detail">
                                    <div className="adm--order__info--detail__item">
                                        <div className="adm--order__info--detail__item--label">Trạng Thái</div>
                                        <div className="adm--order__info--detail__item--content">
                                            {data?.orderStatus?.title}
                                        </div>
                                    </div>
                                    <div className="adm--order__info--detail__item">
                                        <div className="adm--order__info--detail__item--label">Loại</div>
                                        <div className="adm--order__info--detail__item--content">{data?.orderType.toLowerCase() === 'giao hàng' ? <Tag color='blue'>{data?.orderType}</Tag> : <Tag color='green'>{data?.orderType}</Tag>}</div>
                                    </div>
                                    <div className="adm--order__info--detail__item">
                                        <div className="adm--order__info--detail__item--label">Khách Hàng</div>
                                        <div className="adm--order__info--detail__item--content">{
                                            data?.users?.username === 'khachle' ?
                                                <Tag color=''>Khách Lẻ</Tag>
                                                :
                                                (
                                                    <>
                                                        <div>{data.fullname}</div>
                                                        <div>{data.phone}</div>
                                                    </>
                                                )}
                                        </div>
                                    </div>
                                    {
                                        data?.orderType.toLowerCase() === 'giao hàng' &&
                                        <div className="adm--order__info--detail__item">
                                            <div className="adm--order__info--detail__item--label">Địa chỉ</div>
                                            <div className="adm--order__info--detail__item--content">
                                                {`${data?.location}, ${data?.wardName}, ${data?.districtName}, ${data?.cityName}`}
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="adm--order__pay--timeline">
                                <div className="adm--order__pay--timeline__title">
                                    <Typography.Title level={4}>Lịch Sử Thanh Toán</Typography.Title>
                                    <Button type='primary' onClick={onOpenCreatingPaymentModal}>Xác Nhận Thanh Toán</Button>
                                </div>
                                <div className="adm--order__pay--timeline__info">
                                    {
                                        data?.paymentTimelineDetail.length > 0 ?
                                            (
                                                <div className="adm--order__pay--timeline__info--detail">
                                                    <Table columns={paymentTimnelineColumns} dataSource={data?.paymentTimelineDetail} />
                                                </div>
                                            )
                                            :
                                            (
                                                <Empty description={"Không có dữ liệu thanh toán"} />
                                            )
                                    }
                                </div>
                            </div>
                            <div className="adm--order__cart">
                                <div className="adm--order__cart--title">
                                    <Typography.Title level={4}>Thông Tin Giỏ Hàng</Typography.Title>
                                    <Button type='primary' disabled={data?.orderStatus?.id !== 1}>Thêm Sản Phẩm</Button>
                                </div>
                                <div className="adm--order__cart--detail">
                                    <Cart cart={data.orderDetail} order={data} />
                                </div>
                            </div>
                            <Modal
                                open={isModalStatus}
                                centered
                                okText={false}
                                cancelText={"Đóng"}
                                onCancel={() => setIsModalStatus(false)}
                                width={1000}
                            >
                                <Table columns={statusModalColumns} dataSource={data?.statusTimelineDetail} pagination={false} />
                            </Modal>
                            <Modal
                                open={isModalStatusDesc}
                                centered
                                okText="Xác Nhận"
                                cancelText="Huỷ Bỏ"
                                onCancel={onCloseModalDesc}
                                onOk={handleUpdateStatus}
                            >
                                <Typography.Title level={5}>Ghi Chú</Typography.Title>
                                <Input.TextArea value={updateSttDesc} onChange={(e) => { setUpdateSttDesc(e.target.value) }} placeholder="Ghi chú" />
                            </Modal>
                            <Modal
                                open={isEditingOrderInfo}
                                centered
                                width={1000}
                                okText="Xác Nhận"
                                cancelText="Hủy Bỏ"
                                onCancel={onClickCloseEditOrderInfo}
                                onOk={onSubmitEditAddress}
                            >
                                <Typography.Title level={4}>Thông Tin Giao Hàng</Typography.Title>
                                <Form
                                    form={editAddressForm}
                                    labelCol={24}
                                    wrapperCol={24}
                                    layout={'vertical'}
                                    onFinish={onFinishEditAddress}
                                >
                                    <Form.Item
                                        label="Họ và tên"
                                        name="fullname"
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập họ tên người nhận hàng!' },
                                            { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Số điện thoại"
                                        name="phone"
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập Số điện thoại!' },
                                            { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
                                                    if (!value || vnf_regex.test(value)) {
                                                        return Promise.resolve()
                                                    }
                                                    return Promise.reject('Vui lòng nhập đúng định dạng số điện thoại!')
                                                }
                                            })
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <div style={{ width: '100%', display: 'flex' }}>
                                        <div style={{ flex: 1, padding: '0px 5px' }}>
                                            <Form.Item
                                                label="Tỉnh/Thành Phố"
                                                name="cityCode"
                                                rules={[
                                                    { required: true, message: 'Vui lòng chọn Tỉnh/Thành Phố!' }
                                                ]}
                                            >
                                                <Select
                                                    showSearch
                                                    placeholder="Chọn Tỉnh/Thành Phố"
                                                    onChange={onChangeCity}
                                                    filterOption={(input, option) => {
                                                        return (option?.label).toLowerCase().includes(input.toLowerCase())
                                                    }
                                                    }
                                                    options={cityData.map((item) => ({
                                                        value: item.cityCode,
                                                        label: item.cityName
                                                    }))}
                                                />
                                            </Form.Item>
                                        </div>
                                        <div style={{ flex: 1, padding: '0px 5px' }}>
                                            <Form.Item
                                                label="Quận/Huyện"
                                                name="districtCode"
                                                rules={[
                                                    { required: true, message: 'Vui lòng chọn Quận/Huyện!' }
                                                ]}
                                            >
                                                <Select
                                                    showSearch
                                                    placeholder="Chọn Quận/Huyện"
                                                    disabled={!districtData}
                                                    onChange={onChangeDistrict}
                                                    filterOption={(input, option) => {
                                                        return (option?.label).toLowerCase().includes(input.toLowerCase())
                                                    }
                                                    }
                                                    options={!districtData ? [] : districtData.map((item) => ({
                                                        value: item.districtCode,
                                                        label: item.districtName
                                                    }))}
                                                />
                                            </Form.Item>
                                        </div>
                                        <div style={{ flex: 1, padding: '0px 5px' }}>
                                            <Form.Item
                                                label="Xã/Phường/Thị Trấn"
                                                name="wardCode"
                                                rules={[
                                                    { required: true, message: 'Vui lòng chọn Xã/Phường/Thị Trấn!' }
                                                ]}
                                            >
                                                <Select
                                                    showSearch
                                                    placeholder="Chọn Xã/Phường/Thị Trấn"
                                                    disabled={!wardData}
                                                    onChange={onChangeWard}
                                                    filterOption={(input, option) => {
                                                        return (option?.label).toLowerCase().includes(input.toLowerCase())
                                                    }
                                                    }
                                                    options={!wardData ? [] : wardData.map((item) => ({
                                                        value: item.wardCode,
                                                        label: item.wardName
                                                    }))}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <Form.Item
                                        label="Địa Chỉ"
                                        name="location"
                                        rules={[
                                            { required: true, message: 'Vui lòng chọn Xã/Phường/Thị Trấn!' },
                                            { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Form>
                            </Modal>
                            <Modal
                                open={isModalCreatingPayment}
                                centered
                                width={650}
                                okText="Xác Nhận"
                                cancelText="Hủy Bỏ"
                                onCancel={onCloseCreatingPaymentModal}
                                onOk={onClickSubmitCreatePayment}
                            >
                                <Typography.Title level={5}>Xác Nhận Thanh Toán</Typography.Title>
                                <Form
                                    form={createPaymentForm}
                                    labelCol={24}
                                    wrapperCol={24}
                                    layout={'vertical'}
                                    onFinish={onFinishCreatePayment}
                                >
                                    <Form.Item
                                        label="Hoàn Tiền"
                                        name="paymentRefund"
                                        valuePropName="checked"
                                    >
                                        <Switch />
                                    </Form.Item>
                                    <Form.Item
                                        label="Số Tiền"
                                        name="paymentfee"
                                    >
                                        <Input defaultValue={(data?.totalPrice - data?.discount + data?.shipfee)} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Hình Thức Thanh Toán"
                                        name="paymenttype"
                                    >
                                        <Radio.Group defaultValue={"tiền mặt"}>
                                            <Radio.Button value={"tiền mặt"}>Tiền Mặt</Radio.Button>
                                            <Radio.Button value={"chuyển khoản"}>Chuyển Khoản</Radio.Button>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item
                                        label="Ghi Chú"
                                        name="description"
                                    >
                                        <Input.TextArea />
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </div>
                    )
            }
        </Helmet>
    )
}

export default AdmOrderDetail