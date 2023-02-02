import { Badge, Button, Empty, Form, Input, Modal, notification, Select, Spin, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addressAPI } from '../../apis/addressAPI'
import ghnFeeAPI from '../../apis/ghnFeeAPI'
import Cart from '../../components/Cart'
import Helmet from '../../components/Helmet'
import moment from 'moment'
import shipLogoImg from '../../assets/imgs/ship-logo.png'
import { UserOutlined, PhoneOutlined, HomeOutlined, StarOutlined, StarFilled, DeleteOutlined } from '@ant-design/icons';
import { setAuthAction } from '../../redux/actions/AuthReducerAction'
import { orderAPI } from '../../apis/orderAPI'
import { clearCartAction } from '../../redux/actions/CartReducerAction'
import { useNavigate } from 'react-router-dom'
import { userAPI } from '../../apis/userAPI'

const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description: des,
    });
};

const findDefaultIndex = (addressList) => {
    let result = -1;
    if (addressList && addressList.length > 0) {
        for (var i = 0; i < addressList.length; i++) {
            if (addressList[i].isDefault) {
                result = i;
                break;
            }
        }
    }
    return result;
}

const findDefaultAddressIndex = (list) => {
    let index = -1;

    if (list && list.length > 0) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].isDefault) {
                index = i;
                break;
            }
        }
    }

    return index;
}

const checkPr = (product) => {
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

const WebCart = () => {
    const cart = useSelector(state => state.cart);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    //checkout address
    const [isSelectCheckoutAddressModal, setIsSelectCheckoutAddressModal] = useState(false)

    const onOpenSelectCheckoutAddressModal = () => {
        setIsSelectCheckoutAddressModal(true);
    }

    const onCloseSelectCheckoutAddressModal = () => {
        setIsSelectCheckoutAddressModal(false);
    }

    const onClickSelectCheckoutAddress = (item) => {
        console.log(item)
        setCheckoutAddress(item);
        openNotificationWithIcon('info', 'Thông Báo', 'Chọn địa chỉ thành công.');
        onCloseSelectCheckoutAddressModal();
    }
    //new address
    const [isCreatingAddressModal, setIsCreatingAddressModal] = useState(false);
    const [createAddressForm] = useForm();
    const [checkoutAddress, setCheckoutAddress] = useState(undefined)
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
    const [shipFeeLoading, setShipFeeLoading] = useState(true);
    const [shipFeeInfo, setShipFeeInfo] = useState(undefined);
    const [shipTimeLoading, setShipTimeLoading] = useState(true);
    const [shipTimeInfo, setShipTimeInfo] = useState(undefined);
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
        console.log(value)
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
        console.log(value)
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

    const onSubmitCreateAddress = () => {
        createAddressForm.submit();
    }

    const onFinishCreateAddress = (value) => {

        const payload = {
            ...value,
            ...selectedAddressData,
            username: auth?.auth?.info?.username
        }
        console.log(payload)
        addressAPI.createAddress(payload)
            .then(res => {
                console.log(res)
                openNotificationWithIcon('success', 'Thông Báo', 'Thêm địa chỉ thành công.');
                setCheckoutAddress(res);
                let authPayload = {
                    ...auth.auth,
                    info: {
                        ...auth.auth.info,
                        addressList: [...auth.auth.info.addressList.map(i => ({ ...i, isDefault: false })), { ...res, isDefault: true }]
                    }
                }
                console.log(authPayload)
                setCheckoutAddress(res);
                dispatch(setAuthAction(authPayload));
                onCloseCreateAddressModal();
            })
            .catch(err => console.log(err))
    }

    const onCLickClearCart = () => {
        Modal.confirm({
            title: 'Hộp Thoại Xác Nhận',
            content: 'Bạn có muốn xóa giỏ hàng không.',
            okText: 'Xác Nhận',
            cancelText: 'Hủy Bỏ',
            onOk: () => {
                dispatch(clearCartAction());
                openNotificationWithIcon('warning', 'Thông Báo', 'Xóa giỏ hàng thành công.');
            }
        })
    }


    const onSetDefaultAddress = (address) => {
        const payload = {
            username: auth?.auth?.info?.username,
            addressId: address?.id
        }
        userAPI.setDefaultAddress(payload)
            .then(res => {
                if (!res.status) {
                    console.log(res)
                    const index = auth?.auth?.info?.addressList.findIndex(a => a.id === res.id);
                    const newAddressList = [...auth?.auth?.info?.addressList.map(a => ({ ...a, isDefault: false }))]
                    if (index !== -1) {
                        newAddressList[index] = { ...res }
                    }
                    let authPayload = {
                        ...auth.auth,
                        info: {
                            ...auth.auth.info,
                            addressList: [...newAddressList]
                        }
                    }
                    setCheckoutAddress(res);
                    dispatch(setAuthAction(authPayload));
                    onCloseSelectCheckoutAddressModal();
                    openNotificationWithIcon('success', 'Thông Báo', 'Đặt địa chỉ mặc định thành công.');
                } else {
                    console.log(res);
                }
            })
            .catch(err => console.log(err))
    }

    const onDeleteAddress = (address) => {
        Modal.confirm({
            title: 'Hộp Thoại Xác Nhận',
            content: 'Bạn có muốn xóa địa chỉ không.',
            okText: 'Xác Nhận',
            cancelText: 'Hủy Bỏ',
            onOk: () => {
                const payload = {
                    username: auth?.auth?.info?.username,
                    addressId: address?.id
                }
                console.log(payload)
                userAPI.deleteAddress(payload)
                    .then(res => {
                        if (!res.status) {
                            console.log(res)
                            const index = auth?.auth?.info?.addressList.findIndex(a => a.id === payload.addressId);
                            const newAddressList = [...auth?.auth?.info?.addressList.map(a => ({ ...a }))]
                            if (index !== -1) {
                                newAddressList.splice(index, 1);
                            }
                            let authPayload = {
                                ...auth?.auth,
                                info: {
                                    ...auth?.auth.info,
                                    addressList: [...newAddressList]
                                }
                            }
                            dispatch(setAuthAction(authPayload));
                            openNotificationWithIcon('warning', 'Thông Báo', 'Xóa địa chỉ thành công.');
                        } else {
                            console.log(res);
                        }
                    })
                    .catch(err => console.log(err))
            }
        })
    }

    // checkoout

    const onClickCheckoutBtn = () => {
        const orderDetail = [
            ...cart?.cart.map((item) => {
                return ({
                    product: { id: item?.product?.id },
                    size: item?.selectedSize?.size?.title,
                    price: item?.product?.price,
                    prDiscount: !checkPr(item?.product) ? item?.product?.price*(item?.product?.promotions[0]?.promition?.bypersent / 100): 0,
                    quantity: item?.quantity,
                    status: 1
                })
            })
        ]
        let payloadCheckout = {
            username: auth?.auth?.info?.username,
            note: '',
            orderDetail,
            orderType: 'giao hàng',
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
                    dispatch(clearCartAction());
                    openNotificationWithIcon('success', 'Thông Báo', 'Đặt hàng thành công.');
                    navigate(`/my-order/${res}`)
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }

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
        if (auth) {
            let index = findDefaultAddressIndex(auth?.auth?.info?.addressList);
            if (index !== -1) {
                setCheckoutAddress(auth?.auth?.info?.addressList[index])
            } else {
                setCheckoutAddress(undefined);
            }
        }
    }, [auth])

    useEffect(() => {
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
            title={"Giỏ Hàng"}
        >
            <div className="web--cart">
                <div className="web--cart__info">
                    {
                        cart.cart.length > 0 ?
                            (
                                <>
                                    <Button danger icon={<DeleteOutlined />} style={{ marginBottom: 10 }} onClick={onCLickClearCart}>Xóa Giỏ Hàng</Button>
                                    <Cart cart={cart} />
                                </>
                            )
                            :
                            (
                                <div
                                    style={{ width: '100%', padding: 20, backgroundColor: 'white', borderRadius: 10, textAlign: 'center' }}
                                >
                                    <Empty description={"Giỏ hàng trống"} style={{ marginBottom: 20 }} />
                                    <Button type='primary' onClick={() => { navigate("/products") }}>Mua Sắm Ngay</Button>
                                </div>

                            )
                    }
                </div>
                {
                    cart.cart.length > 0 ?
                        (
                            <div className="web--cart__payinfo">
                                <div className="web--cart__payinfo--user">
                                    <Typography.Title level={3}>
                                        ĐỊA CHỈ NHẬN HÀNG
                                    </Typography.Title>
                                    {
                                        (!auth?.auth?.info?.addressList || auth?.auth?.info?.addressList?.length <= 0) ?
                                            (
                                                <div className='web--cart__payinfo--user__empty'>
                                                    <div className="web--cart__payinfo--user__empty--desc">
                                                        <Empty description={"Tài khoản chưa có địa chỉ nhận hàng. Vui lòng thêm địa chỉ"} />
                                                    </div>
                                                    <div className="web--cart__payinfo--user__empty--actions">
                                                        <Button style={{ marginLeft: 20 }} danger onClick={() => { onClickOpenCreateAddressModal() }}>Thêm Địa Chỉ Mới</Button>
                                                    </div>
                                                </div>
                                            )
                                            :
                                            (
                                                <div className='web--cart__payinfo--user__exist'>
                                                    <div className="web--cart__payinfo--user__details">
                                                        {
                                                            checkoutAddress && (
                                                                <>
                                                                    <Typography.Title level={4}>{checkoutAddress?.name}</Typography.Title>
                                                                    <Typography.Text>{checkoutAddress?.phone}</Typography.Text>
                                                                    <Typography.Text>
                                                                        {`${checkoutAddress?.location}, ${checkoutAddress?.wardName}, ${checkoutAddress?.districtName}, ${checkoutAddress?.cityName}`}
                                                                    </Typography.Text>
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="web--cart__payinfo--user__actions">
                                                        <Button type='primary' onClick={() => { onOpenSelectCheckoutAddressModal() }}>Chọn Địa Chỉ</Button>
                                                        <Button style={{ marginLeft: 20 }} danger onClick={() => { onClickOpenCreateAddressModal() }}>Thêm Địa Chỉ Mới</Button>
                                                    </div>
                                                    <div className="web--cart__payinfo--user__ships">
                                                        <div className="web--cart__payinfo--user__ships--fee">
                                                            <img src={shipLogoImg} style={{ width: '60px' }} />
                                                        </div>
                                                        <div className="web--cart__payinfo--user__ships--fee">
                                                            Đơn vị vận chuyển : <b>Giao Hàng Nhanh</b>
                                                        </div>
                                                        {shipFeeLoading ?
                                                            (<Spin />)
                                                            :
                                                            (
                                                                <div className="web--cart__payinfo--user__ships--fee">
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
                                                                <div className="web--cart__payinfo--user__ships--fee">
                                                                    Dự kiến giao hàng : <b>{moment.unix(shipTimeInfo.leadtime).format("DD-MM-YYYY")}</b>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            )
                                    }

                                </div>
                                <div className="web--cart__payinfo--price">
                                    <div className="web--cart__payinfo--price__item">
                                        <Typography.Title level={3}>Thông Tin Thanh Toán</Typography.Title>
                                    </div>
                                    <div className="web--cart__payinfo--price__item">
                                        <div className="web--cart__payinfo--price__item--title">
                                            Tiền Sản Phẩm
                                        </div>
                                        <div className="web--cart__payinfo--price__item--content">
                                            {
                                                new Intl.NumberFormat("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                }).format(cart.cart.reduce(((total, item) => total + item.product.price * item.quantity), 0))
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
                                                }).format(cart.cart.reduce(((total, item) => (total + (!checkPr(item?.product) ? item?.product?.price*(item?.product?.promotions[0]?.promition?.bypersent / 100)*item?.quantity : 0))), 0))
                                            }
                                        </div>
                                    </div>
                                    {
                                        shipFeeInfo &&
                                        <div className="web--cart__payinfo--price__item">
                                            <div className="web--cart__payinfo--price__item--title">
                                                Phí Vận Chuyển
                                            </div>
                                            <div className="web--cart__payinfo--price__item--content">
                                                {
                                                    new Intl.NumberFormat("vi-VN", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    }).format(shipFeeInfo.total)
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
                                                }).format(cart.cart.reduce(((total, item) => (total + (item?.product.price - item?.product.price * (item?.product?.promotions[0]?.promition?.bypersent / 100)) * item?.quantity)), 0) + (shipFeeInfo?.total ? shipFeeInfo?.total : 0))
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <Button
                                            type='primary'
                                            style={{ marginTop: 20, width: '100%' }}
                                            disabled={!checkoutAddress}
                                            onClick={() => { onClickCheckoutBtn() }}
                                        >
                                            Thanh Toán
                                        </Button>

                                        {!checkoutAddress
                                            &&
                                            <div>
                                                <Typography.Text>Vui lòng chọn địa chỉ nhận hàng.</Typography.Text>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        (
                            <>
                            </>
                        )
                }

            </div>
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
            <Modal
                open={isSelectCheckoutAddressModal}
                footer={[
                    <Button danger onClick={() => { onCloseSelectCheckoutAddressModal() }}>Đóng</Button>
                ]}
                width={750}
                onCancel={() => { onCloseSelectCheckoutAddressModal() }}
            >
                <Typography.Title level={4}>Địa Chỉ Giao Hàng</Typography.Title>
                {
                    auth?.auth?.info?.addressList.length > 0 ?
                        (
                            <div className="web--cart__checkoutaddress">
                                {auth?.auth?.info?.addressList.map((item) => {
                                    return (
                                        item.id === checkoutAddress?.id ?
                                            (
                                                <Badge.Ribbon text={"Đang Chọn"} color={"orange"}>
                                                    <div className={`web--cart__checkoutaddress--item selected`} key={item.id}>
                                                        {
                                                            item?.isDefault &&
                                                            <div className="web--cart__checkoutaddress--item__icon">
                                                                <StarFilled style={{ fontSize: 18 }} className="web--cart__checkoutaddress--item__icon--i" />
                                                                Mặc Định
                                                            </div>
                                                        }
                                                        <div className="web--cart__checkoutaddress--item__content">
                                                            <UserOutlined style={{ fontSize: 18, marginRight: 10 }} /> <Typography.Title level={5}>{item?.name}</Typography.Title>
                                                        </div>
                                                        <div className="web--cart__checkoutaddress--item__content">
                                                            <PhoneOutlined style={{ fontSize: 18, marginRight: 10 }} /> <Typography.Text>{item?.phone}</Typography.Text>
                                                        </div>
                                                        <div className="web--cart__checkoutaddress--item__content">
                                                            <HomeOutlined style={{ fontSize: 18, marginRight: 10 }} />
                                                            <Typography.Text>
                                                                {`${item?.location}, ${item?.wardName}, ${item?.districtName}, ${item?.cityName}`}
                                                            </Typography.Text>
                                                        </div>
                                                        <div className="web--cart__checkoutaddress--item__actions">
                                                            {
                                                                item?.isDefault ?
                                                                    (
                                                                        <></>
                                                                    )
                                                                    :
                                                                    (
                                                                        <>
                                                                            <Button danger style={{ marginRight: 10 }} onClick={() => onSetDefaultAddress(item)}>Đặt Mặc Định</Button>
                                                                        </>
                                                                    )
                                                            }
                                                        </div>

                                                    </div>
                                                </Badge.Ribbon>
                                            )
                                            :
                                            (
                                                <div className={`web--cart__checkoutaddress--item`} key={item.id}>
                                                    {
                                                        item?.isDefault &&
                                                        <div className="web--cart__checkoutaddress--item__icon">
                                                            <StarFilled style={{ fontSize: 18 }} className="web--cart__checkoutaddress--item__icon--i" />
                                                            Mặc Định
                                                        </div>
                                                    }
                                                    <div className="web--cart__checkoutaddress--item__content">
                                                        <UserOutlined style={{ fontSize: 18, marginRight: 10 }} /> <Typography.Title level={5}>{item?.name}</Typography.Title>
                                                    </div>
                                                    <div className="web--cart__checkoutaddress--item__content">
                                                        <PhoneOutlined style={{ fontSize: 18, marginRight: 10 }} /> <Typography.Text>{item?.phone}</Typography.Text>
                                                    </div>
                                                    <div className="web--cart__checkoutaddress--item__content">
                                                        <HomeOutlined style={{ fontSize: 18, marginRight: 10 }} />
                                                        <Typography.Text>
                                                            {`${item?.location}, ${item?.wardName}, ${item?.districtName}, ${item?.cityName}`}
                                                        </Typography.Text>
                                                    </div>
                                                    <div className="web--cart__checkoutaddress--item__actions">
                                                        {
                                                            item?.isDefault ?
                                                                (
                                                                    <></>
                                                                )
                                                                :
                                                                (
                                                                    <>

                                                                        <Button danger style={{ marginRight: 10 }} type={'primary'} icon={<DeleteOutlined />} onClick={() => { onDeleteAddress(item) }}></Button>
                                                                        <Button danger style={{ marginRight: 10 }} onClick={() => onSetDefaultAddress(item)}>Đặt Mặc Định</Button>
                                                                    </>
                                                                )
                                                        }
                                                        <Button type='primary' onClick={() => { onClickSelectCheckoutAddress(item) }}>Chọn Địa Chỉ</Button>
                                                    </div>

                                                </div>
                                            )

                                    )
                                })}
                            </div>
                        )
                        :
                        (
                            <Empty description="Tài khoản chưa có địa chỉ nào." />
                        )
                }
            </Modal>
        </Helmet>
    )
}

export default WebCart