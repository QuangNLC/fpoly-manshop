import { Button, Col, Empty, Form, Input, InputNumber, Modal, notification, Row, Select, Spin, Switch, Table, Tag, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import Helmet from '../../components/Helmet'
import { productAPI } from '../../apis/productAPI';
import { MinusOutlined, PlusOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { addToCartAction } from '../../redux/actions/CartReducerAction.js'
import { deleteWaitingOrderAction, updateWaitingOrderDetail, updateWaitingOrderDetailAction, updateWaitingOrderUserAction } from '../../redux/actions/WaitingOrderReducerAction';
import { userAPI } from '../../apis/userAPI';
import shipLogoImg from '../../assets/imgs/ship-logo.png'
import moment from 'moment';
import { useForm } from 'antd/es/form/Form';
import ghnFeeAPI from '../../apis/ghnFeeAPI';
import { orderAPI } from '../../apis/orderAPI';

const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description: des,
    });
};

const checkItemByProductIdAndSizeId = (arr, id, sizeId) => {
    let result = -1;

    arr.forEach((item, index) => {
        if (item.selectedSize.id === sizeId && item.product.id === id) {
            result = index;
        }
    });

    return result;
}
const checkPrDiscount = (product) => {
    let result = false;
    let now = new Date();
    if (product && product.promotions) {
        if (product.promotions.length > 0) {
            if (product.promotions[0]?.promition.isactive) {
                result = (now >= new Date(product.promotions[0]?.promition.dateafter) && now <= new Date(product.promotions[0]?.promition.datebefor))
            }
        }
    }

    return result
}

const checkPrActive = (pr) => {
    let result = true;

    if (!pr?.category?.isActive) {
        return false;
    } else if (!pr?.material?.isActive) {
        return false;
    } else if (!pr?.color?.isActive) {
        return false;
    } else if (!pr?.isActive) {
        return false;
    }

    return result;
}

const ProductDetail = ({ product, onAddToCart }) => {
    const [previewImg, setPreviewImg] = useState(null)
    const [selectedSize, setSelectedSize] = useState(undefined)
    const [quantityInfo, setQuantityInfo] = useState(1)
    const [isDiscount, setIsDiscount] = useState(false);
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
        if (product && product.promotions) {
            if (product.promotions.length > 0) {
                if (checkPrDiscount(product)) {
                    console.log(product.promotions[0])
                    setIsDiscount(
                        true
                    )
                }

            } else {
                setIsDiscount(false)
            }
        }
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
                        <Typography.Text>Trạng Thái</Typography.Text>
                    </div>
                    <div className="details--gr__content">
                        {
                            product?.isActive ?
                                (
                                    <Tag color='green'>Kinh Doanh</Tag>

                                )
                                :
                                (
                                    <Tag color='red'>Ngừng Kinh Doanh</Tag>
                                )
                        }
                    </div>
                </div>
                <div className="details--gr">
                    <div className="details--gr__title">
                        <Typography.Text>Màu Sắc</Typography.Text>
                    </div>
                    <div className="details--gr__content">
                        <div style={{ width: 30, height: 30, backgroundColor: `${product?.color?.colorCode}` }}></div>
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
                {
                    isDiscount &&
                    (
                        <div className="details--gr">
                            <div className="details--gr__title">
                                <Typography.Text>Khuyến Mại</Typography.Text>
                            </div>
                            <div className="details--gr__content">
                                {isDiscount && <Tag color="orange">{`Khuyến Mại: ${product?.promotions[0]?.promition?.title}`}</Tag>}
                                {isDiscount && <Tag color="magenta">{`- ${product?.promotions[0]?.promition?.bypersent}  %`}</Tag>}
                            </div>
                        </div>
                    )
                }
                <div className="details--price">
                    {
                        isDiscount ?
                            (
                                <>
                                    <div className="details--price__new">
                                        {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(product.price - product.price * (product?.promotions[0]?.promition?.bypersent / 100))}
                                    </div>
                                    <div className="details--price__old">
                                        {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(product?.price)}
                                    </div>
                                </>

                            )
                            :
                            (
                                <>
                                    <div className="details--price__new">
                                        {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(product?.price)}
                                    </div>
                                </>
                            )
                    }
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
                {
                    (!selectedSize || !quantityInfo || !checkPrActive(product)) ?
                        (
                            <>
                                <Typography.Text level={5}>Vui lòng chọn size để mua sắm</Typography.Text>

                                {!product?.material?.isActive && <><br /><Tag>Chất liệu {product?.material?.title} hiện ngừng kinh doanh</Tag></>}
                                {!product?.color?.isActive && <><br /><Tag>Màu {product?.color?.description} hiện ngừng kinh doanh</Tag></>}
                                {!product?.category?.isActive && <><br /><Tag>Thể loại {product?.category?.title} hiện ngừng kinh doanh</Tag></>}
                            </>
                        )

                        :
                        (
                            <></>
                        )
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
                                (!selectedSize || !quantityInfo || !checkPrActive(product)) ?
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

const Cart = ({ cart, onDeleteItem, onUpdateItemQuantity }) => {

    const dispatch = useDispatch()
    const [data, setData] = useState([])

    const hanldeDeleteCartIem = (item) => {
        onDeleteItem(item)
    }

    const handleClickUpdateCartItemQuantity = (item, newQuantity) => {
        if (newQuantity <= 0) {
            onDeleteItem(item);
        } else {
            if (newQuantity > item.selectedSize.quantity) {
                openNotificationWithIcon('warning', 'Thông báo', `Trong kho hiện  còn lại ${item.selectedSize.quantity}  sản phẩm!`);
                onUpdateItemQuantity({ ...item, quantity: item.selectedSize.quantity });
            } else {
                onUpdateItemQuantity({ ...item, quantity: newQuantity });
            }

        }
    }

    const handleChangeCartItemQuantity = (e, item) => {
        let index = data.findIndex(dataItem => (dataItem.product.id === item.product.id && dataItem.selectedSize.id === item.selectedSize.id));
        if (index !== -1) {
            data[index].quantity = e;
            setData([...data])
        }
    }

    const handleBlurCartItemQuantityInput = (e, item) => {
        let index = data.findIndex(dataItem => (dataItem.product.id === item.product.id && dataItem.selectedSize.id === item.selectedSize.id));
        if (index !== -1) {
            if (Number.isNaN(Number.parseInt(data[index].quantity))) {
                data[index].quantity = 1;
                let payload = {
                    ...item,
                    quantity: 1
                }
                onUpdateItemQuantity(payload);
                setData([...data])
                openNotificationWithIcon('error', 'Lỗi nhập liệu', 'Vui lòng nhập  số lượng mua hàng là một số tự nhiên lớn hơn  0!')
            } else {
                if (Number.parseInt(data[index].quantity) <= 0) {
                    data[index].quantity = 1;
                    let payload = {
                        ...item,
                        quantity: 1
                    }
                    onUpdateItemQuantity(payload);
                    setData([...data])
                    openNotificationWithIcon('error', 'Lỗi nhập liệu', 'Vui lòng nhập  số lượng mua hàng là một số tự nhiên lớn hơn  0!')
                } else {
                    let quantity = Number.parseInt(data[index].quantity)
                    if (quantity > cart[index].selectedSize.quantity) {
                        quantity = cart[index].selectedSize.quantity
                        data[index].quantity = quantity;
                        let payload = {
                            ...item,
                            quantity: quantity
                        }
                        onUpdateItemQuantity(payload);
                        setData([...data])
                        openNotificationWithIcon('warning', 'Thông báo', `Trong kho hiện  còn lại ${cart[index].selectedSize.quantity}  sản phẩm!`)
                    } else {
                        data[index].quantity = quantity;
                        let payload = {
                            ...item,
                            quantity: quantity
                        }
                        onUpdateItemQuantity(payload);
                        setData([...data])
                    }
                }
            }
        }
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
                            {
                                checkPrDiscount(record?.product) ?
                                    (
                                        <>
                                            <div className="cart--item__pr--price__old">
                                                {new Intl.NumberFormat("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                }).format(record?.product?.price)}
                                                <Tag style={{ marginLeft: 10 }}>{`- ${(record?.product?.promotions[0]?.promition?.bypersent)} %`}</Tag>
                                            </div>
                                            <div className="cart--item__pr--price__new">
                                                {new Intl.NumberFormat("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                }).format(record?.product.price - record?.product.price * (record?.product?.promotions[0]?.promition?.bypersent / 100))}

                                            </div>

                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <div className="cart--item__pr--price--new">
                                                {new Intl.NumberFormat("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                }).format(record?.product?.price)}
                                            </div>
                                        </>
                                    )
                            }
                        </div>
                        <div className="cart--item__pr--size">
                            Size: <b>{record?.selectedSize?.size?.title}</b>
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
                        <div className="cart--item__quantity--minus">
                            <MinusOutlined onClick={() => { handleClickUpdateCartItemQuantity(record, record.quantity - 1) }} />
                        </div>
                        <div className="cart--item__quantity--info">
                            <InputNumber
                                value={record?.quantity}
                                style={{ border: 'none', textAlign: 'center' }}
                                onChange={(e) => { handleChangeCartItemQuantity(e, record) }}
                                onBlur={(e) => { handleBlurCartItemQuantityInput(e, record) }}
                            />
                        </div>
                        <div className="cart--item__quantity--plus">
                            <PlusOutlined onClick={() => { handleClickUpdateCartItemQuantity(record, record.quantity + 1) }} />
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
                        }).format((record?.product.price - ((record?.product.price * (checkPrDiscount(record?.product) ? record?.product?.promotions[0]?.promition?.bypersent / 100 : 0)))) * record?.quantity)}
                    </div>
                )
            },
        },
        {
            title: '',
            render: (record) => {
                return (
                    <div className="cart--item__actions">
                        <Button type={'primary'} danger onClick={() => { hanldeDeleteCartIem(record) }}>Xoá Khỏi Giỏ</Button>
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
        <div className="cart">
            <Table
                columns={columns}
                dataSource={data}
                style={{ width: '100%' }}
                scroll={{
                    y: '60vh',
                }}
                pagination={false}
            />
            <div className="cart--total">
                <div className="cart--total__item">
                    <div className="cart--total__item--title">Tổng Số Tiền</div>
                    <div className="cart--total__item--content">
                        {
                            new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(cart.reduce(((total, item) => total + item.product.price * item.quantity), 0))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}



const AdmWaitingOrderDetail = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({ orderDetail: [] })
    const waitingList = useSelector(state => state.waitingOrder)
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [isCreatingAddressModal, setIsCreatingAddressModal] = useState(false);
    const [createAddressForm] = useForm();
    const [selectedAddressData, setSelectedAddressData] = useState({
        cityCode: null,
        districtCode: null,
        wardCode: null,
        cityName: '',
        districtName: '',
        wardName: ''
    })
    const [isOrderShip, setIsOrderShip] = useState(false)
    const [checkoutAddress, setCheckoutAddress] = useState(undefined)
    const [cityData, setCityData] = useState([]);
    const [districtData, setDistrictData] = useState(undefined);
    const [wardData, setWardData] = useState(undefined);
    const [shipFeeLoading, setShipFeeLoading] = useState(true);
    const [shipFeeInfo, setShipFeeInfo] = useState(undefined);
    const [shipTimeLoading, setShipTimeLoading] = useState(true);
    const [shipTimeInfo, setShipTimeInfo] = useState(undefined);


    const onChangeShipType = (checked) => {
        setCheckoutAddress(undefined)
        setIsOrderShip(checked)
    }

    const onChangeCity = (value) => {
        ghnFeeAPI.getDistrictData({ "province_id": value })
            .then(res => {
                if (res.status === 200) {
                    createAddressForm.setFieldValue('districtCode', null)
                    createAddressForm.setFieldValue('wardCode', null)
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
                    createAddressForm.setFieldValue('wardCode', null)
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
    const onClickOpenCreateAddressModal = () => {
        setSelectedAddressData({
            cityCode: null,
            districtCode: null,
            wardCode: null,
            cityName: '',
            districtName: '',
            wardName: ''
        });
        onClearCreateAddressForm()
        setIsCreatingAddressModal(true);
    }

    const onClearCreateAddressForm = () => {
        createAddressForm.setFieldsValue({
            name: '',
            phone: '',
            cityCode: null,
            districtCode: null,
            wardCode: null,
            location: null
        })
    }

    const onCloseCreateAddressModal = () => {
        setIsCreatingAddressModal(false);
        setSelectedAddressData({
            cityCode: null,
            districtCode: null,
            wardCode: null,
            cityName: '',
            districtName: '',
            wardName: ''
        })
    }

    const onSubmitCreateAddress = () => {
        createAddressForm.submit();
    }


    const onFinishCreateAddress = (value) => {


        if (!data.users) {
            const payload = {
                ...value,
                ...selectedAddressData
            }
            console.log(payload)
            setCheckoutAddress(payload)
            onCloseCreateAddressModal()
        } else {
            const payload = {
                ...value,
                ...selectedAddressData,
                username: data?.users?.username
            }
            console.log(payload)
            setCheckoutAddress(payload)
            onCloseCreateAddressModal()
            // addressAPI.createAddress(payload)
            //     .then(res => {
            //         console.log(res)
            //         openNotificationWithIcon('success', 'Thông Báo', 'Thêm địa chỉ thành công.');
            //         setCheckoutAddress(res);
            //         let authPayload = {
            //             ...auth.auth,
            //             info: {
            //                 ...auth.auth.info,
            //                 addressList: auth.auth.info.addressList.push(res)
            //             }
            //         }
            //         console.log(authPayload)
            //         dispatch(setAuthAction(authPayload));
            //         setCheckoutAddress(res)
            //         onCloseCreateAddressModal();
            //     })
            //     .catch(err => console.log(err))
        }


    }

    const onClickCheckoutBtn = () => {
        const orderDetail = [
            ...data.orderDetail.map((item) => {
                return ({
                    product: { id: item?.product?.id },
                    size: item?.selectedSize?.size?.title,
                    price: item?.product?.price,
                    prDiscount: checkPrDiscount(item?.product) ? item?.product?.price * (item?.product?.promotions[0]?.promition?.bypersent / 100) : 0,
                    quantity: item?.quantity,
                    status: 1
                })
            })
        ]
        let payloadCheckout = {
            username: data?.users ? data?.users?.username : "khachle",
            orderType: isOrderShip ? "Giao Hàng" : "Tại Quầy",
            note: '',
            orderDetail,
            totalPrice: orderDetail.reduce(((total, curr) => (total + curr?.price * curr?.quantity)), 0),
            discount: 0,
            surcharge: 0,
            refund: 0,
            shipFee: shipFeeInfo?.total ? shipFeeInfo?.total : 0,
            fullname: checkoutAddress?.name,
            phone: checkoutAddress?.phone,
            cityName: checkoutAddress?.cityName,
            cityCode: checkoutAddress?.cityCode,
            districtName: checkoutAddress?.districtName,
            districtCode: checkoutAddress?.districtCode,
            wardName: checkoutAddress?.wardName,
            wardCode: checkoutAddress?.wardCode,
            location: checkoutAddress?.location
        }
        console.log(payloadCheckout)

        orderAPI.checkOut(payloadCheckout)
            .then(res => {
                if (!res.status) {
                    console.log(res)
                    openNotificationWithIcon('success', 'Thông Báo', 'Tạo đơn hàng')
                    navigate(`/admin/order/${res}`)
                    dispatch(deleteWaitingOrderAction({ id: data.id }))
                }
            })
            .catch(err => console.log(err))
    }

    //modal product table
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
                console.log(record)
                return (
                    checkPrDiscount(record) ?
                        (
                            <>
                                <div style={{ color: '#999', textDecoration: 'line-through' }}>
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(record?.price)
                                    }
                                    <Tag style={{ marginLeft: 10 }}>{`- ${record?.promotions[0]?.promition?.bypersent} %`}</Tag>
                                </div>
                                <div>
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(record?.price - record?.price * record?.promotions[0]?.promition?.bypersent / 100)
                                    }

                                </div>
                                <div>
                                    <Tag color='orange'>{record?.promotions[0]?.promition?.title}</Tag>
                                </div>
                            </>
                        )
                        :
                        (

                            <>
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(record?.price)
                                }
                            </>
                        )

                )
            }
        },
        {
            title: "Thao Tác",
            render: (record) => {
                return (
                    <div>
                        <Button danger onClick={() => {
                            setSelectedProduct(record)
                        }} disabled={!checkPrActive(record)}>Chọn</Button>
                        <div>
                            {!record?.isActive && <><br /><Tag>Sản phẩm hiện ngừng kinh doanh</Tag></>}
                            {!record?.material?.isActive && <><br /><Tag>Chất liệu {record?.material?.title} hiện ngừng kinh doanh</Tag></>}
                            {!record?.color?.isActive && <><br /><Tag>Màu {record?.color?.description} hiện ngừng kinh doanh</Tag></>}
                            {!record?.category?.isActive && <><br /><Tag>Thể loại {record?.category?.title} hiện ngừng kinh doanh</Tag></>}
                        </div>
                    </div>

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
        let newDetails = [...data.orderDetail]
        let index = checkItemByProductIdAndSizeId(newDetails, payload.product.id, payload.selectedSize.id);
        if (index == -1) {
            newDetails.push(payload);
        } else {
            (newDetails[index].quantity + payload.quantity) > payload.selectedSize.quantity ? (newDetails.quantity = payload.selectedSize.quantity) : (newDetails[index].quantity += payload.quantity);
        };
        const newData = { ...data, orderDetail: [...newDetails] }
        dispatch(updateWaitingOrderDetailAction(newData))
        openNotificationWithIcon('info', 'Thông Báo', 'Thêm sản phẩm vào giỏ hàng.')
        setSelectedProduct(undefined)
    }

    const onDeleteCartItem = (payload) => {
        let newDetails = [...data.orderDetail]
        let index = checkItemByProductIdAndSizeId(newDetails, payload.product.id, payload.selectedSize.id);
        if (index === -1) {
            openNotificationWithIcon('warn', 'Thông Báo', 'Không thấy sản phẩm trong giỏ hàng. Vui lòng tải lại trang.');
        } else {
            Modal.confirm({
                title: "Hộp Thoại Xác Nhận",
                content: "Bạn có muốn xóa sản phẩm khỏi giỏ hàng không?",
                okText: "Xác Nhận",
                cancelText: "Hủy Bỏ",
                onOk: () => {
                    newDetails.splice(index, 1);
                    const newData = { ...data, orderDetail: [...newDetails] };
                    dispatch(updateWaitingOrderDetailAction(newData));
                    openNotificationWithIcon('warning', 'Thông báo', `Xóa sản phẩm khỏi giỏ hàng!`);
                }
            })
        }

    }

    const onUpdateCartItemQuantity = (payload) => {
        let newDetails = [...data.orderDetail]
        let index = checkItemByProductIdAndSizeId(newDetails, payload.product.id, payload.selectedSize.id);
        if (index === -1) {
            openNotificationWithIcon('warn', 'Thông Báo', 'Không thấy sản phẩm trong giỏ hàng. Vui lòng tải lại trang.');
        } else {
            newDetails[index] = { ...payload };
            const newData = { ...data, orderDetail: [...newDetails] };
            dispatch(updateWaitingOrderDetailAction(newData))
        }
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


    //end modalproduct table

    //modal user table
    const [usersData, setUsersData] = useState([])
    const [usersTableData, setUsersTableData] = useState([])
    const [isUsersTableModal, setIsUsersTableModal] = useState(false)
    const [userFilterInputValue, setUserFilterInputValue] = useState('')
    const userColumns = [
        {
            title: 'Ảnh',
            width: 80,
            render: (record) => {
                return (
                    <div className="user--table__imgcl">
                        <img src={`http://localhost:8080/api/file/images/${record?.photo}`} alt={record?.fullname} />
                    </div>
                )

            }
        },
        {
            title: 'Tên Tài Khoản',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: 'Tên Khách Hàng',
            dataIndex: 'fullname',
            key: 'fullname'
        },
        {
            title: 'Số Điện Thoại',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Thao Tác',
            render: (record) => {
                return (
                    <div className="user--table__actionscl">
                        <Button onClick={() => {
                            onSelectUser(record)
                        }}>Chọn</Button>
                    </div>
                )
            }
        }
    ]

    const onCloseUsersTableModal = () => {
        setIsUsersTableModal(false)
    }

    const onOpenUsersTableModal = () => {
        setIsUsersTableModal(true)
        setUsersTableData(usersData)
    }

    const onSelectUser = (user) => {
        const newData = { ...data, users: { ...user } }
        console.log({ ...newData })
        dispatch(updateWaitingOrderUserAction({ ...newData }))
        openNotificationWithIcon('info', 'Thông Báo', 'Chọn tài khoản.')
        onCloseUsersTableModal()
    }

    const onClickSearchUser = () => {
        if (userFilterInputValue.trim() !== '') {
            let newData = usersData.filter((u) => {
                if (
                    u.username.toLowerCase().includes(userFilterInputValue.trim().toLocaleLowerCase()) ||
                    u.fullname.toLowerCase().includes(userFilterInputValue.trim().toLocaleLowerCase()) ||
                    u.phone.toLowerCase().includes(userFilterInputValue.trim().toLocaleLowerCase()) ||
                    u.email.toLowerCase().includes(userFilterInputValue.trim().toLocaleLowerCase())
                ) {
                    return true;
                } else {
                    return false;
                }
            })
            setUsersTableData(newData);
        }
    }

    const onClearUserSearch = () => {
        setUsersTableData(usersData);
        setUserFilterInputValue('')
    }

    //end modal usertable





    useEffect(() => {

        if (checkoutAddress) {
            console.log(checkoutAddress)
            setShipFeeLoading(true)
            setShipTimeLoading(true)
            ghnFeeAPI.getShipTypes({
                "shop_id": 3529371,
                "from_district": 3440,
                "to_district": checkoutAddress.districtCode
            })
                .then(res => {
                    if (res.status === 200) {
                        let shipTypes = res.data.data.map((item) => ({ shipTypeName: item?.short_name, shipTypeId: item?.service_id }))
                        console.log(shipTypes)
                        if (shipTypes.length > 0) {
                            ghnFeeAPI.getShippingFee({
                                "service_id": shipTypes[0].shipTypeId,
                                "insurance_value": 200000,
                                "coupon": null,
                                "from_district_id": 3440,
                                "to_district_id": checkoutAddress.districtCode,
                                "to_ward_code": null,
                                "height": 15,
                                "length": 15,
                                "weight": 1000,
                                "width": 15
                            })
                                .then(res => {
                                    if (res.status === 200) {
                                        setShipFeeLoading(false)
                                        setShipFeeInfo(res.data.data)
                                    }
                                })
                                .catch(err => console.log(err))

                            ghnFeeAPI.getShipTime({
                                "from_district_id": 3440,
                                "from_ward_code": "13010",
                                "to_district_id": checkoutAddress.districtCode,
                                "to_ward_code": checkoutAddress.wardCode,
                                "service_id": shipTypes[0].shipTypeId
                            })
                                .then(res => {
                                    setShipTimeLoading(false)
                                    setShipTimeInfo(res.data.data)
                                })
                                .catch(err => console.log(err))
                        }
                    }

                })
                .catch(err => console.log(err))
        }
    }, [checkoutAddress])

    useEffect(() => {
        const newDataList = filterProductData(productData, filterInfo)
        setProductTableData(newDataList)
    }, [filterInfo, productData])



    useEffect(() => {
        setLoading(true)
        if (id) {
            let index = waitingList.list.findIndex(item => item.id === id)
            if (index !== -1) {
                setData({ ...waitingList.list[index] })
                setLoading(false)
                productAPI.getAllPr()
                    .then(res => {
                        if (!res.status) {
                            setProductData(res)
                        }
                    })
                    .catch(err => console.log(err))
            } else {

            }
        } else {
            navigate("/admin/waiting-order-list")

        }
    }, [id, waitingList])

    useEffect(() => {
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
        userAPI.getAllUser()
            .then(res => {
                if (!res.status) {
                    setUsersData([...res])
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
    }, [])

    return (
        <Helmet
            title={"Bán Hàng Tại Quầy"}
        >
            {
                loading ?
                    (<Spin />)
                    :
                    (
                        <div className="adm--wtorder--detail">
                            <div className="adm--wtorder--detail__actions">
                                <Button type='primary' onClick={() => navigate("/admin/waiting-order-list")}>Danh Sách</Button>
                                <Button type='primary' onClick={() => { onClickOpenProductModal() }}>Thêm Sản Phẩm</Button>
                            </div>
                            <div className="adm--wtorder--detail__cart">
                                {
                                    data.orderDetail.length > 0 ?
                                        (
                                            <div className="adm--wtorder--detail__cart--info">
                                                <Cart cart={data.orderDetail} onDeleteItem={onDeleteCartItem} onUpdateItemQuantity={onUpdateCartItemQuantity} />
                                            </div>
                                        )
                                        :
                                        (
                                            <div className="adm--wtorder--detail__cart--emppty">
                                                <Empty description={"Không có sản phẩm nào trong giỏ hàng."} />
                                            </div>
                                        )
                                }
                            </div>
                            {
                                data.orderDetail.length > 0 &&
                                (
                                    <div className="adm--wtorder--detail__user">
                                        <div className="adm--wtorder--detail__user--title">
                                            <Typography.Title level={4}>Chọn Tài Khoản</Typography.Title>
                                            <Button onClick={() => { onOpenUsersTableModal() }}>Chọn</Button>
                                        </div>
                                        <div className="adm--wtorder--detail__user--actions">

                                        </div>
                                        <div className="adm--wtorder--detail__user--info">
                                            {
                                                (!data.users) ?
                                                    (
                                                        <Tag color='orange'>Khách Lẻ</Tag>
                                                    )
                                                    :
                                                    (
                                                        <>
                                                            <div className="adm--wtorder--detail__user--info__item">
                                                                <div className="adm--wtorder--detail__user--info__item--label">
                                                                    Tên Khách Hàng
                                                                </div>
                                                                <div className="adm--wtorder--detail__user--info__item--label">
                                                                    {data?.users?.fullname}
                                                                </div>
                                                            </div>
                                                            <div className="adm--wtorder--detail__user--info__item">
                                                                <div className="adm--wtorder--detail__user--info__item--label">
                                                                    Số Điện Thoại
                                                                </div>
                                                                <div className="adm--wtorder--detail__user--info__item--label">
                                                                    {data?.users?.phone}
                                                                </div>
                                                            </div>
                                                            <div className="adm--wtorder--detail__user--info__item">
                                                                <div className="adm--wtorder--detail__user--info__item--label">
                                                                    Tên Tài Khoản
                                                                </div>
                                                                <div className="adm--wtorder--detail__user--info__item--label">
                                                                    {data?.users?.username}
                                                                </div>
                                                            </div>
                                                        </>

                                                    )
                                            }
                                        </div>

                                    </div>
                                )
                            }
                            {
                                data.orderDetail.length > 0 &&
                                (
                                    <div className="adm--wtorder--detail__pay">
                                        <div className="adm--wtorder--detail__pay--user">
                                            <div className="adm--wtorder--detail__pay--user__actions">
                                                Giao hàng:
                                                <Switch checked={isOrderShip} style={{ marginLeft: 10 }} onChange={onChangeShipType} />
                                            </div>
                                            {
                                                !isOrderShip ?
                                                    (
                                                        <Tag color='orange' style={{ marginTop: 10 }}>Mua Trực Tiếp</Tag>
                                                    )
                                                    :
                                                    (
                                                        <div className="adm--wtorder--detail__pay--user__shipinfo">
                                                            <div className="adm--wtorder--detail__pay--user__shipinfo--title">
                                                                <Typography.Title level={4}>
                                                                    Địa Chỉ Nhận Hàng
                                                                </Typography.Title>
                                                            </div>
                                                            <div className="adm--wtorder--detail__pay--user__shipinfo--actions">
                                                                <Button danger onClick={() => { onClickOpenCreateAddressModal() }}>Địa Chỉ Mới</Button>
                                                                {
                                                                    data?.users && <Button type='primary'>Chọn Tài Khoản</Button>
                                                                }
                                                            </div>
                                                            <div className="adm--wtorder--detail__pay--user__shipinfo--details">
                                                                {checkoutAddress ?
                                                                    (
                                                                        <>
                                                                            <Typography.Title level={4}>{checkoutAddress?.name}</Typography.Title>
                                                                            <Typography.Text>{checkoutAddress?.phone}</Typography.Text>
                                                                            <Typography.Text>
                                                                                {`${checkoutAddress?.location}, ${checkoutAddress?.wardName}, ${checkoutAddress?.districtName}, ${checkoutAddress?.cityName}`}
                                                                            </Typography.Text>
                                                                        </>
                                                                    )
                                                                    :
                                                                    (
                                                                        <>
                                                                            <Empty description={'Chưa có thông tin giao hàng'} />

                                                                        </>
                                                                    )
                                                                }
                                                            </div>
                                                            <div className="web--cart__payinfo--user__shipinfo">
                                                                <div className="web--cart__payinfo--user__shipinfo--fee">
                                                                    <img src={shipLogoImg} style={{ width: '60px' }} />
                                                                </div>
                                                                <div className="web--cart__payinfo--user__shipinfo--fee">
                                                                    Đơn vị vận chuyển : <b>Giao Hàng Nhanh</b>
                                                                </div>
                                                                {shipFeeLoading ?
                                                                    (<Spin />)
                                                                    :
                                                                    (
                                                                        <div className="web--cart__payinfo--user__shipinfo--fee">
                                                                            Phí vận chuyển : <b>{
                                                                                new Intl.NumberFormat("vi-VN", {
                                                                                    style: "currency",
                                                                                    currency: "VND",
                                                                                }).format(shipFeeInfo.total)
                                                                            }</b>
                                                                        </div>
                                                                    )
                                                                }
                                                                {shipTimeLoading ?
                                                                    (<Spin />)
                                                                    :
                                                                    (
                                                                        <div className="web--cart__payinfo--user__shipinfo--fee">
                                                                            Dự kiến giao hàng : <b>{moment.unix(shipTimeInfo.leadtime).format("DD-MM-YYYY")}</b>
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                            }
                                        </div>

                                        <div className="adm--wtorder--detail__pay--price">
                                            <div className="adm--wtorder--detail__pay--price__item">
                                                <Typography.Title level={3}>Thông Tin Thanh Toán</Typography.Title>
                                            </div>
                                            <div className="adm--wtorder--detail__pay--price__item">
                                                <div className="adm--wtorder--detail__pay--price__item--title">
                                                    Tiền Sản Phẩm
                                                </div>
                                                <div className="adm--wtorder--detail__pay--price__item--content">
                                                    {
                                                        new Intl.NumberFormat("vi-VN", {
                                                            style: "currency",
                                                            currency: "VND",
                                                        }).format(data.orderDetail.reduce(((total, item) => total + item.product.price * item.quantity), 0))
                                                    }
                                                </div>
                                            </div>
                                            <div className="web--cart__payinfo--price__item">
                                                <div className="web--cart__payinfo--price__item--title">
                                                    Giảm Giá
                                                </div>
                                                <div className="web--cart__payinfo--price__item--content">
                                                    {
                                                        new Intl.NumberFormat("vi-VN", {
                                                            style: "currency",
                                                            currency: "VND",
                                                        }).format(data.orderDetail.reduce(((total, item) => (total + (checkPrDiscount(item?.product) ? item?.product?.price * (item?.product?.promotions[0]?.promition?.bypersent / 100) * item?.quantity : 0))), 0))
                                                    }
                                                </div>
                                            </div>
                                            {
                                                shipFeeInfo &&
                                                <div className="adm--wtorder--detail__pay--price__item">
                                                    <div className="adm--wtorder--detail__pay--price__item--title">
                                                        Phí Vận Chuyển
                                                    </div>
                                                    <div className="adm--wtorder--detail__pay--price__item--content">
                                                        {
                                                            new Intl.NumberFormat("vi-VN", {
                                                                style: "currency",
                                                                currency: "VND",
                                                            }).format(shipFeeInfo?.total)
                                                        }
                                                    </div>
                                                </div>
                                            }
                                            <div className="web--cart__payinfo--price__item">
                                                <div className="web--cart__payinfo--price__item--title">
                                                    Thanh Toán
                                                </div>
                                                <div className="web--cart__payinfo--price__item--content">
                                                    {
                                                        new Intl.NumberFormat("vi-VN", {
                                                            style: "currency",
                                                            currency: "VND",
                                                        }).format(data.orderDetail.reduce(((total, item) => (total + (checkPrDiscount(item?.product) ? (item?.product?.price - item?.product?.price * (item?.product?.promotions[0]?.promition?.bypersent / 100)) * item?.quantity : item?.product?.price * item?.quantity))), 0))
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <Button
                                                    type='primary'
                                                    style={{ marginTop: 20, width: '100%' }}
                                                    onClick={() => { onClickCheckoutBtn() }}
                                                >
                                                    Xác Nhận Đặt Hàng
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
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
                                open={isUsersTableModal}
                                footer={false}
                                onCancel={onCloseUsersTableModal}
                                width={1200}
                            >
                                <div className="usersmodal--filters">
                                    <div className="usersmodal--filters__search">
                                        <Input value={userFilterInputValue} placeholder={'Họ và tên, tên đăng nhập, số điện thoại, gmail'} onChange={e => setUserFilterInputValue(e.target.value)} />
                                        <Button icon={<SearchOutlined />} type='primary' onClick={onClickSearchUser}>Tìm Kiếm</Button>
                                        <Button icon={<ReloadOutlined />} danger onClick={onClearUserSearch}>Làm Mới</Button>
                                        <Button icon={<PlusOutlined />} type="primary" danger>Thêm Mới</Button>
                                    </div>
                                </div>
                                <div className="usersmodal--table">
                                    <Table columns={userColumns} dataSource={usersTableData} />
                                </div>
                            </Modal>
                            <Modal
                                open={isCreatingAddressModal}
                                okText="Xác Nhận"
                                cancelText="Hủy Bỏ"
                                width={600}
                                onCancel={onCloseCreateAddressModal}
                                onOk={onSubmitCreateAddress}
                            >
                                <Typography.Title level={4}>Thông Tin Giao Hàng</Typography.Title>
                                <Form
                                    form={createAddressForm}
                                    labelCol={24}
                                    wrapperCol={24}
                                    layout={'vertical'}
                                    onFinish={onFinishCreateAddress}
                                >
                                    <Form.Item
                                        label="Họ và tên"
                                        name="name"
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
                        </div>
                    )
            }
        </Helmet>
    )
}

export default AdmWaitingOrderDetail