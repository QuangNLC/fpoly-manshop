import { Button, Empty, Form, Input, Modal, notification, Select, Tag, Typography, Upload } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Helmet from '../../components/Helmet';
import { RetweetOutlined, DeleteOutlined, PlusOutlined, UserOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';
import { userAPI } from '../../apis/userAPI';
import { setAuthAction } from '../../redux/actions/AuthReducerAction';
import ghnFeeAPI from '../../apis/ghnFeeAPI';
import { addressAPI } from '../../apis/addressAPI';

const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description: des,
    });
};
const WebMyAccount = () => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.auth);
    const navigate = useNavigate();
    const location = useLocation();
    const [prevAvt, setPrevAvt] = useState(null);
    const [form] = useForm();
    const [uploadList, setUploadList] = useState([]);
    const onFinish = (value) => {
        Modal.confirm({
            title: "Hộp Thoại Xác Nhận",
            content: "Bạn có muốn cập nhật thông tin tài khoản không?",
            okText: "Xác Nhận",
            cancelText: "Hủy Bỏ",
            onOk: () => {
                const payload = {
                    ...value,
                    username: auth?.info?.username,
                }
                console.log(payload)
                userAPI.updateUserInfo(payload)
                    .then(res => {
                        if (!res.status) {
                            dispatch(setAuthAction({ ...auth, info: res }));
                            Modal.success({
                                title: "Hộp Thoại Thông Báo",
                                content: "Cập nhật thông tin tài khoản thành công!"
                            })
                        } else {
                            console.log(res)
                        }
                    })
                    .catch(err => console.log(err))
            }
        })
    }



    const handleUploadAvatar = () => {
        Modal.confirm({
            title: "Hộp Thoại Xác Nhận",
            content: "Bạn có đồng ý thay đổi ảnh đại diện hay không?",
            okText: "Xác Nhận",
            cancelText: "Hủy Bỏ",
            onOk: () => {
                if (uploadList && uploadList.length > 0) {
                    const formData = new FormData();
                    uploadList.forEach(item => {
                        formData.append('file', item)
                    })
                    userAPI.updateUserAvatar(auth.info.username, formData)
                        .then(res => {
                            dispatch(setAuthAction({ ...auth, info: res }));
                            setUploadList([])
                            Modal.success({
                                title: "Hộp Thoại Thông Báo",
                                content: "Thay đổi ảnh đại diện thành công!"
                            })
                        })
                        .catch(err => console.log(err))

                }
            }
        })
    }

    const onSelectDefaultAddress = (address) => {
        Modal.confirm({
            title: 'Hộp Thoại Xác Nhận',
            content: 'Bạn có muốn đặt địa chỉ mặc định không.',
            okText: 'Xác Nhận',
            cancelText: 'Hủy Bỏ',
            onOk: () => {
                const payload = {
                    username: auth?.info?.username,
                    addressId: address?.id
                }
                userAPI.setDefaultAddress(payload)
                    .then(res => {
                        if (!res.status) {
                            console.log(res)
                            const index = auth?.info?.addressList.findIndex(a => a.id === res.id);
                            const newAddressList = [...auth?.info?.addressList.map(a => ({ ...a, isDefault: false }))]
                            if (index !== -1) {
                                newAddressList[index] = { ...res }
                            }
                            let authPayload = {
                                ...auth,
                                info: {
                                    ...auth.info,
                                    addressList: [...newAddressList]
                                }
                            }
                            dispatch(setAuthAction(authPayload));
                            openNotificationWithIcon('success', 'Thông Báo', 'Đặt địa chỉ mặc định thành công.');
                        } else {
                            console.log(res);
                        }
                    })
                    .catch(err => console.log(err))
            }
        })

    }

    const onDeleteAddress = (address) => {
        Modal.confirm({
            title: 'Hộp Thoại Xác Nhận',
            content: 'Bạn có muốn xóa địa chỉ không.',
            okText: 'Xác Nhận',
            cancelText: 'Hủy Bỏ',
            onOk: () => {
                const payload = {
                    username: auth?.info?.username,
                    addressId: address?.id
                }
                console.log(payload)
                userAPI.deleteAddress(payload)
                    .then(res => {
                        if (!res.status) {
                            console.log(res)
                            const index = auth?.info?.addressList.findIndex(a => a.id === payload.addressId);
                            const newAddressList = [...auth?.info?.addressList.map(a => ({ ...a }))]
                            if (index !== -1) {
                                newAddressList.splice(index, 1);
                            }
                            let authPayload = {
                                ...auth,
                                info: {
                                    ...auth.info,
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

    const [isCreatingAddressModal, setIsCreatingAddressModal] = useState(false);
    const [createAddressForm] = useForm();
    const [selectedAddressData, setSelectedAddressData] = useState({
        cityCode: null,
        districtCode: null,
        wardCode: null,
        cityName: '',
        districtName: '',
        wardName: ''
    });
    const [cityData, setCityData] = useState([]);
    const [districtData, setDistrictData] = useState(undefined);
    const [wardData, setWardData] = useState(undefined);
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
            username: auth?.info?.username
        }
        console.log(payload)
        addressAPI.createAddress(payload)
            .then(res => {
                console.log(res)
                openNotificationWithIcon('success', 'Thông Báo', 'Thêm địa chỉ thành công.');
                let authPayload = {
                    ...auth,
                    info: {
                        ...auth.info,
                        addressList: [...auth.info.addressList, { ...res }]
                    }
                }
                console.log(authPayload)
                dispatch(setAuthAction(authPayload));
                onCloseCreateAddressModal();
            })
            .catch(err => console.log(err))
    }


    useEffect(() => {
        if (uploadList.length > 0) {
            let url = URL.createObjectURL(uploadList[0])
            console.log(url)
            setPrevAvt(url)
        } else {

            auth && setPrevAvt(`http://localhost:8080/api/file/images/${auth.info.photo}`)
        }
    }, [uploadList])

    useEffect(() => {
        return () => {
            if (prevAvt && (prevAvt !== `http://localhost:8080/api/file/images/${auth.info.photo}`)) {
                URL.revokeObjectURL(prevAvt)
            }
        }
    }, [prevAvt])
    useEffect(() => {
        console.log(auth)
        if (auth) {
            setPrevAvt(`http://localhost:8080/api/file/images/${auth.info.photo}`);
            form.setFieldsValue({
                email: auth.info.email,
                fullname: auth.info.fullname,
                username: auth.info.username,
                phone: auth.info.phone,
            })
        } else {
            navigate("/login")
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
            title={"Tài Khoản Của Tôi"}
        >
            <div className="web--myaccount">
                <div className="web--myaccount__navs">
                    <div className={`web--myaccount__navs--item ${location.pathname === '/my-account' ? 'active' : ''}`}>
                        <Link
                            to="/my-account"
                            style={{ color: 'inherit' }}
                            className={`web--myaccount__navs--item__link ${location.pathname === '/my-account' ? 'active' : ''}`}
                        >
                            tài  khoản  của tôi
                        </Link>
                    </div>
                    <div className={`web--myaccount__navs--item ${location.pathname === '/change-password' ? 'active' : ''}`}>
                        <Link
                            to="/change-password"
                            style={{ color: 'inherit' }}
                             className={`web--myaccount__navs--item__link ${location.pathname === '/change-password' ? 'active' : ''}`}
                        >
                            đổi mật khẩu
                        </Link>
                    </div>
                    <div className={`web--myaccount__navs--item ${location.pathname === '/my-orders' ? 'active' : ''}`}>
                        <Link
                            to="/my-orders"
                            style={{ color: 'inherit' }}
                             className={`web--myaccount__navs--item__link ${location.pathname === '/my-orders' ? 'active' : ''}`}
                        >
                            đơn  hàng
                        </Link>
                    </div>
                </div>
                <div className="web--myaccount__body">
                    <div className="web--myaccount__body--info">
                        <div className="web--myaccount__body--info__form">
                            <Typography.Title level={5} style={{ marginBottom: 20 }}>Thông Tin Tài Khoản</Typography.Title>
                            <Form
                                name="user"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 18 }}
                                layout='horizontal'
                                form={form}
                                onFinish={onFinish}
                                style={{ width: '80%' }}
                            >
                                <Form.Item
                                    label="Tên Đăng Nhập"
                                >
                                    <Typography.Text>{auth.info.username}</Typography.Text>
                                </Form.Item>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                >
                                    <Typography.Text>{auth.info.email}</Typography.Text>
                                </Form.Item>
                                <Form.Item
                                    label="Họ Tên"
                                    name="fullname"
                                    hasFeedback
                                    rules={[
                                        { required: true, message: "Vui lòng nhập họ và tên!" },
                                        { whitespace: true, message: "Vui lòng không nhập khoảng trống!" }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Số Điện Thoại"
                                    name="phone"
                                    rules={[
                                        { required: true, message: "Vui lòng nhập số điện thoại!" },
                                        { whitespace: true, message: "Vui lòng không nhập khoảng trống!" }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                >
                                    <Button icon={<RetweetOutlined />} type='primary' htmlType='submit'>Cập Nhật</Button>
                                </Form.Item>
                            </Form>
                        </div>
                        <div className="web--myaccount__body--info__avt">
                            <div className="web--myaccount__body--info__avt--preview">
                                <img src={prevAvt} alt="avatar" />
                            </div>
                            <div className="web--myaccount__body--info__avt--actions">
                                {
                                    uploadList && uploadList.length > 0 && (
                                        <Button icon={<DeleteOutlined />} style={{ marginBottom: 10 }} onClick={() => { setUploadList([]) }}></Button>
                                    )
                                }
                                <Upload
                                    name="file"
                                    beforeUpload={(file, fileList) => { setUploadList([file]); return false }}
                                    showUploadList={{ showRemoveIcon: false }}
                                    listType='picture'
                                    accept='.png,.jpg,.jpeg'
                                    fileList={uploadList}
                                >
                                    <Button style={{ borderRadius: "20px" }}>Chọn Ảnh</Button>
                                </Upload>
                                <Typography.Text>Dung lượng tối đa: 1MB</Typography.Text>
                                <Typography.Text>Định dạng: .JPG, .JPEG, .PNG</Typography.Text>
                                {
                                    uploadList && uploadList.length > 0 && (
                                        <Button style={{ marginTop: 20 }} onClick={handleUploadAvatar}>Lưu Ảnh</Button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="web--myaccount__body--address">
                        <div className="web--myaccount__body--address__title">
                            <Typography.Title level={5}>Thông Tin Địa Chỉ</Typography.Title>
                            <Button icon={<PlusOutlined />} type={'primary'} onClick={() => { onClickOpenCreateAddressModal() }}>Thêm Địa Chỉ</Button>
                        </div>
                        {
                            auth?.info?.addressList.length > 0 ?
                                (
                                    auth?.info?.addressList.map((item) => (
                                        <div className="web--myaccount__body--address__item" key={item.id}>
                                            <div className="web--myaccount__body--address__item__content">
                                                <UserOutlined style={{ fontSize: 18, marginRight: 10 }} /> <Typography.Title level={5}>{item?.name}</Typography.Title>
                                            </div>
                                            <div className="web--myaccount__body--address__item__content">
                                                <PhoneOutlined style={{ fontSize: 18, marginRight: 10 }} /> <Typography.Text>{item?.phone}</Typography.Text>
                                            </div>
                                            <div className="web--myaccount__body--address__item__content">
                                                <HomeOutlined style={{ fontSize: 18, marginRight: 10 }} />
                                                <Typography.Text>
                                                    {`${item?.location}, ${item?.wardName}, ${item?.districtName}, ${item?.cityName}`}
                                                </Typography.Text>
                                            </div>
                                            <div className="web--cart__checkoutaddress--item__actions">
                                                {
                                                    item?.isDefault ?
                                                        (
                                                            <>
                                                                <Tag color='orange'>Mặc Định</Tag>
                                                            </>
                                                        )
                                                        :
                                                        (
                                                            <>
                                                                <Button style={{ marginRight: 10 }} type={'primary'} onClick={() => onSelectDefaultAddress(item)}>Đặt Mặc Định</Button>
                                                                <Button danger onClick={() => onDeleteAddress(item)}>Xóa</Button>
                                                            </>
                                                        )
                                                }

                                            </div>
                                        </div>
                                    ))
                                )
                                :
                                (
                                    <Empty description={"Không có thông tin địa chỉ"} />
                                )
                        }

                    </div>
                </div>
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
        </Helmet>
    )
}

export default WebMyAccount