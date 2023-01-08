import { Button, Empty, Modal, Spin, Steps, Table, Tag, Typography, InputNumber, Input, Form, Select, notification, Tooltip, Radio, Switch, Row, Col } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { orderAPI } from '../../apis/orderAPI';
import Helmet from '../../components/Helmet';
import { EllipsisOutlined, FileDoneOutlined, FileOutlined, CarOutlined, ScheduleOutlined, SyncOutlined, FileExcelOutlined, FormOutlined, MinusOutlined, PlusOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'antd/es/form/Form';
import ghnFeeAPI from '../../apis/ghnFeeAPI';
import { productAPI } from '../../apis/productAPI';

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


const Cart = ({ cart, order, onEditItem }) => {

    const dispatch = useDispatch()
    const [data, setData] = useState([])

    const onClickEditIem = (item) => {
        onEditItem(item)
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

                        <Button danger onClick={() => { onClickEditIem(record) }} disabled={order?.orderStatus?.id !== 1}>Cập Nhật</Button>
                        {
                            order?.orderStatus?.id !== 1
                            &&
                            <Button style={{ marginLeft: 10, backgroundColor: '#ad0e33', color: 'white' }}>Hoàn Trả</Button>
                        }
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
                            }).format(cart.reduce(((total, item) => total + item.product.price * item.quantity), 0) + order?.shipfee - order?.discount)
                        }
                    </div>
                </div>
            </div>
        </>

    )
}


const ProductDetail = ({ product, onAddToCart }) => {
    const [previewImg, setPreviewImg] = useState(null)
    const [selectedSize, setSelectedSize] = useState(undefined)
    const [quantityInfo, setQuantityInfo] = useState(1)

    const dispatch = useDispatch();

    const onSelectSize = (size) => {
        setSelectedSize(size)
        setQuantityInfo(1)
    }
    const onChangeQuantityValue = (value) => {
        if (!value) {
            setQuantityInfo(1)
        } else {
            if (value <= 0) {
                openNotificationWithIcon('info', 'Thông báo', 'Nhập lớn hơn 0')
                setQuantityInfo(1)
            } else if (Math.floor(value) > selectedSize.quantity) {
                openNotificationWithIcon('info', 'Thông báo', `Hiện có sẵn ${selectedSize.quantity} sản phẩm.`)
                setQuantityInfo(selectedSize.quantity)
            } else {
                setQuantityInfo(Math.floor(value))
            }
        }
    }

    const handleAddToCart = () => {
        if (!selectedSize || !quantityInfo) {
            openNotificationWithIcon('info', 'Thông báo', 'Vui lòng chọn size và số lượng.')
        } else {
            const payload = {
                product,
                selectedSize,
                quantity: quantityInfo
            }
            onAddToCart(payload)
        }
    }



    useEffect(() => {
        setPreviewImg(`http://localhost:8080/api/file/images/${product?.images[0]?.photo}`)
    }, [product])

    return (
        <Row className='product--details' gutter={[32, 0]}>
            <Col span={12}>
                <div className="show--img">
                    <img src={previewImg} alt="" />
                </div>
                <div className="preview--imgs">
                    {
                        product.images && product.images.map((item, index) => {
                            return (
                                <div className="preview--imgs__item" key={item.id} onClick={() => { setPreviewImg(`http://localhost:8080/api/file/images/${item.photo}`) }}>
                                    <img src={`http://localhost:8080/api/file/images/${item.photo}`} alt="" />
                                </div>
                            )
                        })
                    }

                </div>
            </Col>
            <Col span={12}>
                <Typography.Title level={2}>{product?.name}</Typography.Title>
                <div className="details--gr">
                    <div className="details--gr__title">
                        <Typography.Text>Thể Loại</Typography.Text>
                    </div>
                    <div className="details--gr__content">
                        <Typography.Title level={4} style={{ marginBottom: 0 }}>{product?.category?.title}</Typography.Title>
                    </div>
                </div>
                <div className="details--gr">
                    <div className="details--gr__title">
                        <Typography.Text>Chất Liệu</Typography.Text>
                    </div>
                    <div className="details--gr__content">
                        <Typography.Title level={4} style={{ marginBottom: 0 }}>{product?.material?.title}</Typography.Title>
                    </div>
                </div>
                <div className="details--gr">
                    <div className="details--gr__title">
                        <Typography.Text>Mô Tả</Typography.Text>
                    </div>
                    <div className="details--gr__content">
                        {product?.descTitle}
                    </div>
                </div>
                <div className="details--price">
                    {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    }).format(product?.price)}
                </div>
                <div className="details--sizes">
                    <div className="details--gr__title">
                        <Typography.Title level={4}>Size</Typography.Title>
                    </div>
                    <div className="details--sizes__gr">
                        {product.productsizes.map((item, index) => (
                            <div className="details--sizes__gr--item" key={item.id}>
                                <Button disabled={!item.isActive || item.quantity <= 0} className={`details--sizes__gr--item__btn ${selectedSize && selectedSize.id === item.id ? 'selected' : ''}`} onClick={() => onSelectSize(item)}>
                                    {item.size.title}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
                {selectedSize &&
                    <div className='size--detail'>
                        {`${selectedSize.quantity} sản phẩm có sẵn.`}
                    </div>
                }
                <div className="details--actions">
                    <div className="details--actions__top">
                        <div className="details--actions__quantity">
                            <div className="details--actions__quantity--minus">
                                <MinusOutlined onClick={() => { onChangeQuantityValue(quantityInfo - 1) }} />
                            </div>
                            <div className="details--actions__quantity--info">
                                <InputNumber value={quantityInfo} onChange={onChangeQuantityValue} style={{ border: 'none', textAlign: 'center' }} disabled={!selectedSize} />
                            </div>
                            <div className="details--actions__quantity--plus">
                                <PlusOutlined onClick={() => { onChangeQuantityValue(quantityInfo + 1) }} />
                            </div>
                        </div>
                        <div className="details--actions__add">
                            {
                                (!selectedSize || !quantityInfo) ?
                                    (
                                        <Button className="details--actions__add--btn" disabled>THÊM VÀO GIỎ HÀNG</Button>
                                    )
                                    :
                                    (
                                        <Button className="details--actions__add--btn" onClick={() => { handleAddToCart() }}>THÊM VÀO GIỎ HÀNG</Button>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
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
                return (
                    <div>
                        {moment(record.createdAt).format('DD/MM/YYYY, H:mm:ss')}
                    </div>
                )
            }
        },
        {
            title: 'Loại Giao Dịch',
            render: (record) => {
                return (
                    <div>
                        <Tag color={record.paymentRefund ? 'orange' : 'blue'}>{record.paymentStatus.title}</Tag>
                    </div>
                )
            }
        },
        {
            title: 'Phương Thức Thanh Toán',
            render: (record) => {
                return (
                    <div>
                        <Tag color={record.paymentType === 'tiền mặt' ? 'green' : 'blue'}>{record.paymentType}</Tag>
                    </div>
                )
            }
        },
        {
            title: 'Ghi Chú',
            render: (record) => {
                return (
                    <div>
                        {record.description}
                    </div>
                )
            }
        },
        {
            title: 'Người Xác Nhận',
            render: (record) => {
                return (
                    <div>
                        {record.createdUser.username}
                    </div>
                )
            }
        }

    ]
    const onOpenCreatingPaymentModal = () => {
        createPaymentForm.setFieldsValue({
            paymentfee: data?.orderDetail.reduce(((total, item) => total + item.product.price * item.quantity), 0) - data?.discount + data?.shipfee,
            paymenttype: "tiền mặt",
            description: '',
            paymentRefund: false
        })
        setIsCreatingAddressModal(true);
    }

    const onCloseCreatingPaymentModal = () => {
        setIsCreatingAddressModal(false);
        createPaymentForm.setFieldsValue({
            paymentfee: data?.orderDetail.reduce(((total, item) => total + item.product.price * item.quantity), 0) - data?.discount + data?.shipfee,
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


    //modal edit order cart item
    const [editingOrderCartItemModal, setEditingOrderCartItemModal] = useState(false)
    const [editingOrderCartItem, setEditingOrderCartItem] = useState(undefined)

    const onCloseEditCartItemModal = () => {
        setEditingOrderCartItemModal(false);
        setEditingOrderCartItem(undefined);
    }

    const onOpenEditCartItemModal = (item) => {
        setEditingOrderCartItem(item);
        setEditingOrderCartItemModal(true);
    }

    const handleChangeCartItemQuantity = (e, item) => {
        setEditingOrderCartItem({
            ...editingOrderCartItem,
            quantity: e
        })
    }

    const handleBlurCartItemQuantityInput = (e, item) => {
        if (Number.isNaN(Number.parseInt(item.quantity))) {
            editingOrderCartItem.quantity = 1;
            setEditingOrderCartItem({ ...editingOrderCartItem })
            openNotificationWithIcon('error', 'Lỗi nhập liệu', 'Vui lòng nhập  số lượng mua hàng là một số tự nhiên lớn hơn  0!')
        } else {
            if (Number.parseInt(item.quantity) <= 0) {
                editingOrderCartItem.quantity = 1;
                setEditingOrderCartItem({ ...editingOrderCartItem })
                openNotificationWithIcon('error', 'Lỗi nhập liệu', 'Vui lòng nhập  số lượng mua hàng là một số tự nhiên lớn hơn  0!')
            } else {
                let quantity = Number.parseInt(item.quantity)
                console.log(editingOrderCartItem?.product?.productsizes?.find(p => p.size.title === editingOrderCartItem.size))
                if (quantity > editingOrderCartItem?.product?.productsizes?.find(p => p.size.title === editingOrderCartItem.size).quantity) {
                    quantity = editingOrderCartItem?.product?.productsizes?.find(p => p.size.title === editingOrderCartItem.size).quantity
                    editingOrderCartItem.quantity = quantity;
                    setEditingOrderCartItem({ ...editingOrderCartItem })
                    openNotificationWithIcon('warning', 'Thông báo', `Trong kho hiện  còn lại ${editingOrderCartItem?.product?.productsizes?.find(p => p.size.title === editingOrderCartItem.size).quantity}  sản phẩm!`)
                } else {
                    editingOrderCartItem.quantity = quantity;
                    setEditingOrderCartItem({ ...editingOrderCartItem })
                }
            }
        }
    }

    const onUpdateOrderCartItem = () => {
        if (editingOrderCartItem) {

            const payload = {
                id: editingOrderCartItem?.id,
                orderId: data?.id,
                quantity: editingOrderCartItem?.quantity,
                updatedUser: auth?.auth?.info?.username,
                sizeId: editingOrderCartItem?.product?.productsizes?.find(p => p.size.title === editingOrderCartItem.size)?.size?.id
            }
            console.log(payload)
            orderAPI.updateCartItem(payload)
                .then(res => {
                    if (!res.status) {
                        setData({ ...res })
                        openNotificationWithIcon('info', 'Thông Báo', 'Cập nhật thông tin sản phẩm.')
                        onCloseEditCartItemModal()
                    } else {
                        console.log(res)
                    }
                })
                .catch(err => console.log(err))
        }
    }

    const onDeleteOrderCartItem = () => {
        if (editingOrderCartItem) {
            const payload = {
                id: editingOrderCartItem?.id,
                orderId: data?.id,
                quantity: 0,
                updatedUser: auth?.auth?.info?.username,
                sizeId: editingOrderCartItem?.product?.productsizes?.find(p => p.size.title === editingOrderCartItem.size)?.size?.id
            }
            Modal.confirm({
                title: "Hộp Thoại Xác Nhận",
                content: "Bạn có muốn xóa sản phẩm không.",
                okText: 'Xác Nhận',
                cancelText: 'Hủy Bỏ',
                onOk: () => {
                    orderAPI.deleteCartItem(payload)
                        .then(res => {
                            if (!res.status) {
                                setData({ ...res })
                                openNotificationWithIcon('info', 'Thông Báo', 'Xóa sản phẩm khỏi đơn hàng.')
                                onCloseEditCartItemModal()
                            } else {
                                console.log(res)
                            }
                        })
                        .catch(err => console.log(err))
                }
            })

        }
    }
    //add product to order cart
    const [isProductModal, setIsProductModal] = useState(false)
    const [productTableData, setProductTableData] = useState([])
    const [productData, setProductData] = useState([])
    const [categories, setCategories] = useState([])
    const [sizes, setSizes] = useState([])
    const [materials, setMaterials] = useState([])
    const [colors, setcolors] = useState([])
    const [searchInputValue, setSearchInputValue] = useState('')
    const sortOptions = [
        { id: 1, by: 'name', sort: 'asc', byTitle: 'Theo Tên Sản Phẩm', title: 'Từ A-Z' },
        { id: 2, by: 'name', sort: 'desc', byTitle: 'Theo Tên Sản Phẩm', title: 'Từ Z-A' },
        { id: 3, by: 'price', sort: 'asc', byTitle: 'Theo Giá Sản Phẩm', title: 'Giá tăng dần' },
        { id: 4, by: 'price', sort: 'desc', byTitle: 'Theo Giá Sản Phẩm', title: 'Giá giảm dần' },
        { id: 5, by: 'createdAt', sort: 'asc', byTitle: 'Theo Ngày Ra Mắt', title: 'Mới nhất' },
        { id: 6, by: 'createdAt', sort: 'desc', byTitle: 'Theo Ngày Ra Mắt', title: 'Cũ nhất' }
    ]
    const [filterInfo, setFilterInfo] = useState({
        categorId: 0,
        materialId: 0,
        sizeIds: [],
        colorIds: [],
        sortId: 1,
        searchText: ''
    })
    const [selectedProduct, setSelectedProduct] = useState(undefined)
    const prColumns = [
        {
            title: "Ảnh",
            render: (record) => {
                return (
                    <div className="pr--table__imgcl">
                        <img src={`http://localhost:8080/api/file/images/${record?.images[0]?.photo}`} alt={record?.name} />
                    </div>
                )
            },
            width: 120
        },
        {
            title: "Id",
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: "Tên Sản Phẩm",
            dataIndex: 'name'
        },
        {
            title: "Giá",
            render: (record) => {
                return (
                    <>{new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    }).format(record?.price)}</>
                )
            }
        },
        {
            title: "Thao Tác",
            render: (record) => {
                return (
                    <Button danger onClick={() => {
                        // setIsProductModal(false)
                        setSelectedProduct(record)
                    }}>Chọn</Button>
                )
            }
        }
    ]


    const onClickOpenProductModal = () => {
        setProductTableData(filterProductData(productData, filterInfo))
        setIsProductModal(true)
    }
    const onCloseProductModal = () => {
        onClearFiler()
        setIsProductModal(false)
    }

    const onAddToCart = (payload) => {
        console.log(payload)
        let index = data?.orderDetail.findIndex(o => (o?.product?.id === payload?.product?.id && o?.size === payload?.selectedSize?.size?.title))
        if(index === -1){
            let newPayload = {
                price: payload?.product?.price,
                discount: 0,
                quantity: payload?.quantity,
                size: payload?.selectedSize?.size?.title,
                sizeId: payload?.selectedSize?.size?.id,
                productId: payload?.product?.id,
                updatedUser: auth?.auth?.info?.username,
                id: data?.id
            }
            orderAPI.createCartItem(newPayload)
            .then(res => {
                if(!res.status){
                    setData({...res})
                    openNotificationWithIcon('info','Thông Báo','Thêm sản phẩm vào đơn hàng.')
                    setSelectedProduct(undefined)
                    onCloseProductModal()
                }else{
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
        }
        // let newDetails = [...data.orderDetail]
        // let index = checkItemByProductIdAndSizeId(newDetails, payload.product.id, payload.selectedSize.id);
        // if (index == -1) {
        //     newDetails.push(payload);
        // } else {
        //     (newDetails[index].quantity + payload.quantity) > payload.selectedSize.quantity ? (newDetails.quantity = payload.selectedSize.quantity) : (newDetails[index].quantity += payload.quantity);
        // };
        // const newData = { ...data, orderDetail: [...newDetails] }
        // dispatch(updateWaitingOrderDetailAction(newData))
        // openNotificationWithIcon('info', 'Thông Báo', 'Thêm sản phẩm vào giỏ hàng.')
        // setSelectedProduct(undefined)
    }

    const tagRender = (props) => {
        const { label, value, closable, onClose } = props;
        const onPreventMouseDown = (event) => {
            console.log([event])
            event.preventDefault();
            event.stopPropagation();
        };
        return (
            <Tag
                color={'orange'}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{
                    marginRight: 3,
                }}
            >
                {label}
            </Tag>
        );
    };

    const onChangeProductFilterSizes = (e) => {
        console.log([...e])
    }

    const onChangeProductFilterColors = (e) => {
        setFilterInfo({
            ...filterInfo,
            colorIds: [...e]
        })
    }

    const onChangeCategoryFilter = (categorId) => {
        setFilterInfo({
            ...filterInfo,
            categorId: categorId
        })
    }

    const onChangeMaterialFilter = (materialId) => {
        setFilterInfo({
            ...filterInfo,
            materialId: materialId
        })
    }

    const onChangeSortFilter = (sortId) => {
        setFilterInfo({
            ...filterInfo,
            sortId: sortId
        })
    }

    const onSearchText = () => {
        if (searchInputValue.trim() !== '') {
            setFilterInfo({
                ...filterInfo,
                searchText: searchInputValue
            })
        }
    }

    const onClearFiler = () => {
        setSearchInputValue('')
        setFilterInfo({
            categorId: 0,
            materialId: 0,
            sizeIds: [],
            colorIds: [],
            sortId: 1,
            searchText: ''
        })
    }

    const filterProductData = (prList, filter) => {
        let result = [...prList];

        if (filter.searchText !== '') {
            result = [...result.filter(i => i.name.toLowerCase().includes(filter.searchText.toLowerCase()))]
        }

        if (filter?.categorId !== 0) {
            result = [...result.filter(i => i.category.id === filter.categorId)]
        }
        if (filter?.materialId !== 0) {
            result = [...result.filter(i => i.material.id === filter.materialId)]
        }
        if (filter?.colorIds.length > 0) {
            result = [...result.filter(i => {
                let index = filter?.colorIds.findIndex(cId => cId === i.color.id)
                if (index !== -1) {
                    return true;
                } else {
                    return false;
                }
            })]
        }


        switch (filter.sortId) {
            case (1): {
                result = [...result.sort((a, b) => a.name > b.name ? 1 : -1)];
                break;
            }
            case (2): {
                result = [...result.sort((a, b) => a.name > b.name ? -1 : 1)];
                break;
            }
            case (3): {
                result = [...result.sort((a, b) => a.price - b.price)];
                break;
            }
            case (4): {
                result = [...result.sort((a, b) => b.price - a.price)];
                break;
            }
            case (5): {
                result = [...result.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1)];
                break;
            }
            case (6): {
                result = [...result.sort((a, b) => b.createdAt > a.createdAt ? 1 : -1)];
                break;
            }
            default: {
                break;
            }
        }

        return result;
    }


    //end modal edit order cart item

    useEffect(() => {
        const newDataList = filterProductData(productData, filterInfo)
        setProductTableData(newDataList)
    }, [filterInfo])


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
        productAPI.getFilterInfo()
            .then(res => {
                if (!res.status) {
                    setCategories(res.categories)
                    setSizes(res.sizes)
                    setMaterials(res.materials)
                    setcolors(res.colors)
                } else {
                    console.log(res);
                }
            })
            .catch(err => console.log(err));
        productAPI.getAllPr()
            .then(res => {
                if (!res.status) {
                    setProductData(res)
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
                                    <Button type='primary' disabled={data?.orderStatus?.id !== 1} onClick={() => { onClickOpenProductModal() }}>Thêm Sản Phẩm</Button>
                                </div>
                                <div className="adm--order__cart--detail">
                                    <Cart cart={data.orderDetail} order={data} onEditItem={onOpenEditCartItemModal} />
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
                            <Modal
                                open={isProductModal}
                                footer={false}
                                onCancel={() => { onCloseProductModal() }}
                                width={1200}
                            >
                                <div className="prmodal--filters">
                                    <div className="prmodal--filters__search">
                                        <Input value={searchInputValue} onChange={e => { setSearchInputValue(e.target.value) }} />
                                        <Button icon={<SearchOutlined />} type='primary' onClick={onSearchText}>Tìm Kiếm</Button>
                                        <Button icon={<ReloadOutlined />} danger onClick={() => { onClearFiler() }}>Làm Mới</Button>
                                    </div>
                                    <div className="prmodal--filters__options">
                                        <div className="prmodal--filters__options--item">
                                            <div className="prmodal--filters__options--item__label">
                                                Thể Loại
                                            </div>
                                            <div className="prmodal--filters__options--item__content">
                                                <Select
                                                    showSearch
                                                    placeholder="Thể Loại"
                                                    optionFilterProp="children"
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    filterOption={(input, option) => {
                                                        return (option?.children).toLowerCase().includes(input.toLowerCase())
                                                    }
                                                    }
                                                    value={filterInfo?.categorId}
                                                    onChange={onChangeCategoryFilter}
                                                >
                                                    <Select.Option value={0} key={0}>
                                                        Tất cả
                                                    </Select.Option>
                                                    {
                                                        categories.map((c) => (
                                                            <Select.Option key={c.id} value={c.id}>
                                                                {c.title}
                                                            </Select.Option>
                                                        ))
                                                    }
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="prmodal--filters__options--item">
                                            <div className="prmodal--filters__options--item__label">
                                                Chất Liệu
                                            </div>
                                            <div className="prmodal--filters__options--item__content">
                                                <Select
                                                    showSearch
                                                    placeholder="Chất liệu"
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    optionFilterProp="children"
                                                    filterOption={(input, option) => {
                                                        return (option?.children).toLowerCase().includes(input.toLowerCase())
                                                    }
                                                    }
                                                    value={filterInfo.materialId}
                                                    onChange={onChangeMaterialFilter}

                                                >
                                                    <Select.Option value={0} key={0}>
                                                        Tất cả
                                                    </Select.Option>
                                                    {
                                                        materials.map((c) => (
                                                            <Select.Option key={c.id} value={c.id}>
                                                                {c.title}
                                                            </Select.Option>
                                                        ))
                                                    }
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="prmodal--filters__options--item">
                                            <div className="prmodal--filters__options--item__label">
                                                Size
                                            </div>
                                            <div className="prmodal--filters__options--item__content">
                                                <Select
                                                    showSearch
                                                    mode="multiple"
                                                    tagRender={tagRender}
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    filterOption={(input, option) => {
                                                        return (option?.label).toLowerCase().includes(input.toLowerCase())
                                                    }
                                                    }
                                                    options={[...sizes.map((c) => ({
                                                        value: c.id,
                                                        label: c.title,
                                                        key: c.id
                                                    }))]}
                                                    onChange={onChangeProductFilterSizes}
                                                >
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="prmodal--filters__options--item">
                                            <div className="prmodal--filters__options--item__label">
                                                Màu Sắc
                                            </div>
                                            <div className="prmodal--filters__options--item__content">
                                                <Select
                                                    mode="multiple"
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    onChange={onChangeProductFilterColors}
                                                    value={filterInfo.colorIds}
                                                >
                                                    {
                                                        colors.map(c => (
                                                            <Select.Option key={c.id} value={c.id}>
                                                                <div style={{ width: 20, height: 20, backgroundColor: `${c.colorCode}` }}>
                                                                </div>
                                                            </Select.Option>
                                                        ))
                                                    }
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="prmodal--filters__options--item">
                                            <div className="prmodal--filters__options--item__label">
                                                Sắp Xếp
                                            </div>
                                            <div className="prmodal--filters__options--item__content">
                                                <Select
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    options={[...sortOptions.map((c) => ({
                                                        value: c.id,
                                                        label: `${c.byTitle} - ${c.title}`,
                                                        key: c.id
                                                    }))]}
                                                    value={filterInfo.sortId}
                                                    onChange={onChangeSortFilter}
                                                >
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="prmodal--table">
                                    <Table columns={prColumns} dataSource={productTableData} scroll={{ y: '50vh' }} />
                                </div>
                            </Modal>
                            <Modal
                                open={isProductModal}
                                footer={false}
                                onCancel={() => { onCloseProductModal() }}
                                width={1200}
                            >
                                <div className="prmodal--filters">
                                    <div className="prmodal--filters__search">
                                        <Input value={searchInputValue} onChange={e => { setSearchInputValue(e.target.value) }} />
                                        <Button icon={<SearchOutlined />} type='primary' onClick={onSearchText}>Tìm Kiếm</Button>
                                        <Button icon={<ReloadOutlined />} danger onClick={() => { onClearFiler() }}>Làm Mới</Button>
                                    </div>
                                    <div className="prmodal--filters__options">
                                        <div className="prmodal--filters__options--item">
                                            <div className="prmodal--filters__options--item__label">
                                                Thể Loại
                                            </div>
                                            <div className="prmodal--filters__options--item__content">
                                                <Select
                                                    showSearch
                                                    placeholder="Thể Loại"
                                                    optionFilterProp="children"
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    filterOption={(input, option) => {
                                                        return (option?.children).toLowerCase().includes(input.toLowerCase())
                                                    }
                                                    }
                                                    value={filterInfo?.categorId}
                                                    onChange={onChangeCategoryFilter}
                                                >
                                                    <Select.Option value={0} key={0}>
                                                        Tất cả
                                                    </Select.Option>
                                                    {
                                                        categories.map((c) => (
                                                            <Select.Option key={c.id} value={c.id}>
                                                                {c.title}
                                                            </Select.Option>
                                                        ))
                                                    }
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="prmodal--filters__options--item">
                                            <div className="prmodal--filters__options--item__label">
                                                Chất Liệu
                                            </div>
                                            <div className="prmodal--filters__options--item__content">
                                                <Select
                                                    showSearch
                                                    placeholder="Chất liệu"
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    optionFilterProp="children"
                                                    filterOption={(input, option) => {
                                                        return (option?.children).toLowerCase().includes(input.toLowerCase())
                                                    }
                                                    }
                                                    value={filterInfo.materialId}
                                                    onChange={onChangeMaterialFilter}

                                                >
                                                    <Select.Option value={0} key={0}>
                                                        Tất cả
                                                    </Select.Option>
                                                    {
                                                        materials.map((c) => (
                                                            <Select.Option key={c.id} value={c.id}>
                                                                {c.title}
                                                            </Select.Option>
                                                        ))
                                                    }
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="prmodal--filters__options--item">
                                            <div className="prmodal--filters__options--item__label">
                                                Size
                                            </div>
                                            <div className="prmodal--filters__options--item__content">
                                                <Select
                                                    showSearch
                                                    mode="multiple"
                                                    tagRender={tagRender}
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    filterOption={(input, option) => {
                                                        return (option?.label).toLowerCase().includes(input.toLowerCase())
                                                    }
                                                    }
                                                    options={[...sizes.map((c) => ({
                                                        value: c.id,
                                                        label: c.title,
                                                        key: c.id
                                                    }))]}
                                                    onChange={onChangeProductFilterSizes}
                                                >
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="prmodal--filters__options--item">
                                            <div className="prmodal--filters__options--item__label">
                                                Màu Sắc
                                            </div>
                                            <div className="prmodal--filters__options--item__content">
                                                <Select
                                                    mode="multiple"
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    onChange={onChangeProductFilterColors}
                                                    value={filterInfo.colorIds}
                                                >
                                                    {
                                                        colors.map(c => (
                                                            <Select.Option key={c.id} value={c.id}>
                                                                <div style={{ width: 20, height: 20, backgroundColor: `${c.colorCode}` }}>
                                                                </div>
                                                            </Select.Option>
                                                        ))
                                                    }
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="prmodal--filters__options--item">
                                            <div className="prmodal--filters__options--item__label">
                                                Sắp Xếp
                                            </div>
                                            <div className="prmodal--filters__options--item__content">
                                                <Select
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    options={[...sortOptions.map((c) => ({
                                                        value: c.id,
                                                        label: `${c.byTitle} - ${c.title}`,
                                                        key: c.id
                                                    }))]}
                                                    value={filterInfo.sortId}
                                                    onChange={onChangeSortFilter}
                                                >
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="prmodal--table">
                                    <Table columns={prColumns} dataSource={productTableData} scroll={{ y: '50vh' }} />
                                </div>
                            </Modal>
                            <Modal
                                open={selectedProduct}
                                footer={false}
                                onCancel={() => { setSelectedProduct(undefined) }}
                                width={1000}
                            >
                                <ProductDetail product={selectedProduct} onAddToCart={onAddToCart} />
                            </Modal>
                            <Modal
                                open={editingOrderCartItemModal}
                                centered
                                width={1000}
                                onCancel={onCloseEditCartItemModal}
                                okText="Xác Nhận"
                                cancelText="Hủy Bỏ"
                                onOk={onUpdateOrderCartItem}
                            >
                                {
                                    editingOrderCartItem &&
                                    <div className='edit--cartitem--modal'>
                                        <div className="edit--cartitem--modal__detail">
                                            <div className="edit--cartitem--modal__detail--img">
                                                <img src={`http://localhost:8080/api/file/images/${editingOrderCartItem?.product?.images[0]?.photo}`} />
                                            </div>
                                            <div className="edit--cartitem--modal__detail--info">
                                                <div>
                                                    <Typography.Title level={5}>{editingOrderCartItem?.product?.name}</Typography.Title>
                                                </div>
                                                <div>
                                                    Size: <Tag color='green'>{editingOrderCartItem?.size}</Tag>
                                                </div>
                                                <div>
                                                    {
                                                        new Intl.NumberFormat("vi-VN", {
                                                            style: "currency",
                                                            currency: "VND",
                                                        }).format(editingOrderCartItem?.price)
                                                    }
                                                </div>
                                                <div>
                                                    x{
                                                        editingOrderCartItem?.quantity
                                                    }
                                                </div>
                                            </div>
                                            <div className="edit--cartitem--modal__detail--total">
                                                <div>
                                                    {
                                                        new Intl.NumberFormat("vi-VN", {
                                                            style: "currency",
                                                            currency: "VND",
                                                        }).format(editingOrderCartItem?.price * editingOrderCartItem?.quantity)
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="edit--cartitem--modal__quantity">
                                            <div className="edit--cartitem--modal__quantity--detail">
                                                <div className="edit--cartitem--modal__quantity--detail__minus">
                                                    <MinusOutlined />
                                                </div>
                                                <div className="edit--cartitem--modal__quantity--detail__info">
                                                    <InputNumber
                                                        value={editingOrderCartItem?.quantity}
                                                        style={{ border: 'none', textAlign: 'center' }}
                                                        onChange={(e) => { handleChangeCartItemQuantity(e, editingOrderCartItem) }}
                                                        onBlur={(e) => { handleBlurCartItemQuantityInput(e, editingOrderCartItem) }}
                                                    />
                                                </div>
                                                <div className="edit--cartitem--modal__quantity--detail__plus">
                                                    <PlusOutlined />
                                                </div>
                                            </div>
                                            <div className="edit--cartitem--modal__quantity--delete">
                                                <Button danger onClick={onDeleteOrderCartItem}>Xóa Sản Phẩm</Button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </Modal>
                        </div>
                    )
            }
        </Helmet>
    )
}

export default AdmOrderDetail