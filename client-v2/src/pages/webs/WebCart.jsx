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
        openNotificationWithIcon('info', 'Th??ng B??o', 'Ch???n ?????a ch??? th??nh c??ng.');
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
                openNotificationWithIcon('success', 'Th??ng B??o', 'Th??m ?????a ch??? th??nh c??ng.');
                setCheckoutAddress(res);
                let authPayload = {
                    ...auth.auth,
                    info: {
                        ...auth.auth.info,
                        addressList: [...auth.auth.info.addressList, { ...res }]
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
            title: 'H???p Tho???i X??c Nh???n',
            content: 'B???n c?? mu???n x??a gi??? h??ng kh??ng.',
            okText: 'X??c Nh???n',
            cancelText: 'H???y B???',
            onOk: () => {
                dispatch(clearCartAction());
                openNotificationWithIcon('warning', 'Th??ng B??o', 'X??a gi??? h??ng th??nh c??ng.');
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
                    openNotificationWithIcon('success', 'Th??ng B??o', '?????t ?????a ch??? m???c ?????nh th??nh c??ng.');
                } else {
                    console.log(res);
                }
            })
            .catch(err => console.log(err))
    }

    // checkoout

    const onClickCheckoutBtn = () => {
        const orderDetail = [
            ...cart?.cart.map((item) => {
                return ({
                    product: { id: item?.product?.id },
                    size: item?.selectedSize?.size?.title,
                    price: item?.product?.price,
                    prDiscount: 0,
                    quantity: item?.quantity,
                    status: 1
                })
            })
        ]
        let payloadCheckout = {
            username: auth?.auth?.info?.username,
            note: '',
            orderDetail,
            orderType: 'giao h??ng',
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
                    openNotificationWithIcon('success', 'Th??ng B??o', '?????t h??ng th??nh c??ng.');
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
            // let index = findDefaultIndex(auth?.auth?.info?.addressList)
            // if (index !== -1) {
            //     setCheckoutAddress(auth?.auth?.info?.addressList[index])
            // } else {
            //     setCheckoutAddress(undefined)
            // }
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
            title={"Gi??? H??ng"}
        >
            <div className="web--cart">
                <div className="web--cart__info">
                    {
                        cart.cart.length > 0 ?
                            (
                                <>
                                    <Button danger icon={<DeleteOutlined />} style={{ marginBottom: 10 }} onClick={onCLickClearCart}>X??a Gi??? H??ng</Button>
                                    <Cart cart={cart} />
                                </>
                            )
                            :
                            (
                                <div
                                    style={{ width: '100%', padding: 20, backgroundColor: 'white', borderRadius: 10, textAlign: 'center' }}
                                >
                                    <Empty description={"Gi??? h??ng tr???ng"} style={{ marginBottom: 20 }} />
                                    <Button type='primary' onClick={() => { navigate("/products") }}>Mua S???m Ngay</Button>
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
                                        ?????A CH??? NH???N H??NG
                                    </Typography.Title>
                                    {
                                        (!auth?.auth?.info?.addressList || auth?.auth?.info?.addressList?.length <= 0) ?
                                            (
                                                <div className='web--cart__payinfo--user__empty'>
                                                    <div className="web--cart__payinfo--user__empty--desc">
                                                        <Empty description={"T??i kho???n ch??a c?? ?????a ch??? nh???n h??ng. Vui l??ng th??m ?????a ch???"} />
                                                    </div>
                                                    <div className="web--cart__payinfo--user__empty--actions">
                                                        <Button style={{ marginLeft: 20 }} danger onClick={() => { onClickOpenCreateAddressModal() }}>Th??m ?????a Ch??? M???i</Button>
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
                                                        <Button type='primary' onClick={() => { onOpenSelectCheckoutAddressModal() }}>Ch???n ?????a Ch???</Button>
                                                        <Button style={{ marginLeft: 20 }} danger onClick={() => { onClickOpenCreateAddressModal() }}>Th??m ?????a Ch??? M???i</Button>
                                                    </div>
                                                    <div className="web--cart__payinfo--user__ships">
                                                        <div className="web--cart__payinfo--user__ships--fee">
                                                            <img src={shipLogoImg} style={{ width: '60px' }} />
                                                        </div>
                                                        <div className="web--cart__payinfo--user__ships--fee">
                                                            ????n v??? v???n chuy???n : <b>Giao H??ng Nhanh</b>
                                                        </div>
                                                        {shipFeeLoading ?
                                                            (<Spin />)
                                                            :
                                                            (
                                                                <div className="web--cart__payinfo--user__ships--fee">
                                                                    Ph?? v???n chuy???n : <b>{
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
                                                                    D??? ki???n giao h??ng : <b>{moment.unix(shipTimeInfo.leadtime).format("DD-MM-YYYY")}</b>
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
                                        <Typography.Title level={3}>Th??ng Tin Thanh To??n</Typography.Title>
                                    </div>
                                    <div className="web--cart__payinfo--price__item">
                                        <div className="web--cart__payinfo--price__item--title">
                                            Ti???n S???n Ph???m
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
                                    {
                                        shipFeeInfo &&
                                        <div className="web--cart__payinfo--price__item">
                                            <div className="web--cart__payinfo--price__item--title">
                                                Ph?? V???n Chuy???n
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
                                            Thanh To??n
                                        </div>
                                        <div className="web--cart__payinfo--price__item--content">
                                            {
                                                new Intl.NumberFormat("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                }).format(cart.cart.reduce(((total, item) => total + item.product.price * item.quantity), 0) + (shipFeeInfo?.total ? shipFeeInfo?.total : 0))
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
                                            Thanh To??n
                                        </Button>

                                        {!checkoutAddress
                                            &&
                                            <div>
                                                <Typography.Text>Vui l??ng ch???n ?????a ch??? nh???n h??ng.</Typography.Text>
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
                okText="X??c Nh???n"
                cancelText="H???y B???"
                width={600}
                onCancel={onCloseCreateAddressModal}
                onOk={onSubmitCreateAddress}
            >
                <Typography.Title level={4}>Th??ng Tin Giao H??ng</Typography.Title>
                <Form
                    form={createAddressForm}
                    labelCol={24}
                    wrapperCol={24}
                    layout={'vertical'}
                    onFinish={onFinishCreateAddress}
                >
                    <Form.Item
                        label="H??? v?? t??n"
                        name="name"
                        rules={[
                            { required: true, message: 'Vui l??ng nh???p h??? t??n ng?????i nh???n h??ng!' },
                            { whitespace: true, message: 'Vui l??ng kh??ng nh???p kho???ng tr???ng!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="S??? ??i???n tho???i"
                        name="phone"
                        rules={[
                            { required: true, message: 'Vui l??ng nh???p S??? ??i???n tho???i!' },
                            { whitespace: true, message: 'Vui l??ng kh??ng nh???p kho???ng tr???ng!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
                                    if (!value || vnf_regex.test(value)) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject('Vui l??ng nh???p ????ng ?????nh d???ng s??? ??i???n tho???i!')
                                }
                            })
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <div style={{ width: '100%', display: 'flex' }}>
                        <div style={{ flex: 1, padding: '0px 5px' }}>
                            <Form.Item
                                label="T???nh/Th??nh Ph???"
                                name="cityCode"
                                rules={[
                                    { required: true, message: 'Vui l??ng ch???n T???nh/Th??nh Ph???!' }
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Ch???n T???nh/Th??nh Ph???"
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
                                label="Qu???n/Huy???n"
                                name="districtCode"
                                rules={[
                                    { required: true, message: 'Vui l??ng ch???n Qu???n/Huy???n!' }
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Ch???n Qu???n/Huy???n"
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
                                label="X??/Ph?????ng/Th??? Tr???n"
                                name="wardCode"
                                rules={[
                                    { required: true, message: 'Vui l??ng ch???n X??/Ph?????ng/Th??? Tr???n!' }
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Ch???n X??/Ph?????ng/Th??? Tr???n"
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
                        label="?????a Ch???"
                        name="location"
                        rules={[
                            { required: true, message: 'Vui l??ng ch???n X??/Ph?????ng/Th??? Tr???n!' },
                            { whitespace: true, message: 'Vui l??ng kh??ng nh???p kho???ng tr???ng!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                open={isSelectCheckoutAddressModal}
                footer={[
                    <Button danger onClick={() => { onCloseSelectCheckoutAddressModal() }}>????ng</Button>
                ]}
                width={750}
                onCancel={() => { onCloseSelectCheckoutAddressModal() }}
            >
                <Typography.Title level={4}>?????a Ch??? Giao H??ng</Typography.Title>
                {
                    auth?.auth?.info?.addressList.length > 0 ?
                        (
                            <div className="web--cart__checkoutaddress">
                                {auth?.auth?.info?.addressList.map((item) => {
                                    return (
                                        item.id === checkoutAddress?.id ?
                                            (
                                                <Badge.Ribbon text={"??ang Ch???n"} color={"orange"}>
                                                    <div className={`web--cart__checkoutaddress--item selected`} key={item.id}>
                                                        {
                                                            item?.isDefault &&
                                                            <div className="web--cart__checkoutaddress--item__icon">
                                                                <StarFilled style={{ fontSize: 18 }} className="web--cart__checkoutaddress--item__icon--i" />
                                                                M???c ?????nh
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
                                                                        <Button danger style={{ marginRight: 10 }} onClick={() => onSetDefaultAddress(item)}>?????t M???c ?????nh</Button>
                                                                    )
                                                            }
                                                            <Button type='primary' onClick={() => { onClickSelectCheckoutAddress(item) }}>Ch???n ?????a Ch???</Button>
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
                                                            M???c ?????nh
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
                                                                    <Button danger style={{ marginRight: 10 }} onClick={() => onSetDefaultAddress(item)}>?????t M???c ?????nh</Button>
                                                                )
                                                        }
                                                        <Button type='primary' onClick={() => { onClickSelectCheckoutAddress(item) }}>Ch???n ?????a Ch???</Button>
                                                    </div>

                                                </div>
                                            )

                                    )
                                })}
                            </div>
                        )
                        :
                        (
                            <Empty description="T??i kho???n ch??a c?? ?????a ch??? n??o." />
                        )
                }
            </Modal>
        </Helmet>
    )
}

export default WebCart