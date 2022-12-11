import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import Helmet from '../../components/Helmet';
import styled from 'styled-components';
import { List, Spin, Steps, Tag, Typography, Select, Button, Skeleton, Modal, notification, Table, Input, Form } from 'antd';
import ordersAPI from '../../api/ordersAPI';
import { formatter } from '../../utils';
import AdmWatingOrder from './AdmWatingOrder';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useForm } from 'antd/es/form/Form';
import addressAPI from '../../api/addressAPI';

const Container = styled.div`
    width: 100%;
`
const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    flex-wrap: wrap;
`

const StepsContainer = styled.div`
    width: 100%;
    padding: 30px 20px;
    background-color: white;
    margin-bottom: 20px;
`
const StepsWrapper = styled.div`
    width: 100%;
`
const StepsActionsContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const PaymentContainer = styled.div`
    width: 100%;
    padding: 30px 20px;
    background-color:white;
    margin-bottom: 20px;
`
const PaymentWrapper = styled.div``
const PaymentTitle = styled.div`
    width: 100%;
    text-transform: capitalize;
    text-align: left;
    padding-bottom: 15px;
    border-bottom: 1px solid teal;
    font-size: 20px;
    font-weight: 300;
    margin-bottom: 5px;
`
const PaymentType = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom :5px;
`
const PaymentDetail = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom :5px;
`


const CustomerInfoContainer = styled.div`
    width: 100%;
    padding: 30px 20px;
    background-color: white;
    display: flex;
    flex-wrap: wrap;
`
const Title = styled.div`
    width: 100%;
    text-transform: capitalize;
    text-align: left;
    padding-bottom: 15px;
    border-bottom: 1px solid teal;
    font-size: 20px;
    font-weight: 300;
`
const CustomerInfo = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
`
const CustomerInfoItem = styled.div`
    width: 50%;
    padding: 10px;
    display: flex;
`
const CustomerInfoItemLabel = styled.div`
    width: 20%;
    text-transform: capitalize;
    font-weight: 600;
`
const CustomerInfoItemContent = styled.div`
    color: #666;
`

const CustomerInfoActions = styled.div`
    width: 100%;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
const CartContainer = styled.div`
    width: 100%;
`
const CartDetails = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 80vh;
    margin-bottom: 50px;
`
const CartBody = styled.div`
`
const CartFooter = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: white;
    padding: 0px 30px;
    font-size: 20px;
`
const Product = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    margin-bottom: 10px;
    width: 100%;
    padding-bottom: 5px;
    border-bottom: 1px solid #999;
`
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`
const Image = styled.img`
    width: 120px;
    object-fit: cover;
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductName = styled.span`
    cursor: pointer;
    text-decoration: underline;
`
const ProductId = styled.span``
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
`
const ProductSize = styled.span``
const PriceDetail = styled.span`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
const QuantityButton = styled.div`
    width:  30px;
    height: 30px;
    border: 0.5px  solid  lightgray;
`
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    width: max-content;
`

const AmountInput = styled.input`
    width:  120px;
    height: 100%;
    border:none;
    outline: none;   
    padding: 5px;
    text-align: center;
`
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
`
const ProductAction = styled.div`
    display: flex;
    align-items: center;
`

const FormContainer = styled.div`
    width: 100%;
    display: flex;
`

const ActionContainer = styled.div`
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const FormLocationGroup = styled.div`
    width: 100%;
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`


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
                default: {
                    setColor('blue')
                    break;
                }
            }
        }
    }, [])

    return (
        <Tag color={color}>{props.status.title}</Tag>
    )
}


const UpdateStatusButton = ({ item, onClickUpdate }) => {
    const [btnText, setBtnText] = useState('Xác Nhận')
    const [modalContent, setModalContent] = useState('Bạn có chắc chắn không?')
    const [nextStatus, setNextStatus] = useState(undefined)
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
            title: 'Đang Giao'
        },
        {
            id: 4,
            title: 'Hoàn Tất'
        }
    ])
    const handleUpdateItemStatus = () => {

        if (item && nextStatus) {
            let payload = {
                id: item.id,
                DescriptionOder: 'test des',
                statusOrder: nextStatus.title,
                isFinish: true,
                orderDetail: item.orderDetail
            }
            onClickUpdate(payload)
        }
    }


    useEffect(() => {
        switch (item?.statusDetail[item?.statusDetail.length - 1].statusOrder?.id) {
            case (1): {
                setBtnText('Xác Nhận')
                setNextStatus(statusList[1])
                break;
            }
            case (2): {
                setBtnText('Đang Giao Hàng')
                setNextStatus(statusList[2])
                break;
            }
            case (3): {
                setBtnText('Đơn Hàng Hoàn Thành')
                setNextStatus(statusList[3])
                break;
            }
            case (4): {
                setBtnText('Xác Nhận')
                setNextStatus(undefined)
                break;
            }
            default: {
                setBtnText('Xác Nhận')
                setNextStatus(undefined)
                break;
            }
        }
    }, [item])
    return (
        item?.statusOrders?.id === 4 ?
            (
                <></>
            )
            :
            (
                <Button style={{ borderRadius: "20px" }} onClick={handleUpdateItemStatus} type='primary'>{btnText}</Button >
            )
    )
}

const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description: des,
    });
};

const findStepIndex = (arr, sttId) => {
    let result = -1;
    if (arr) {
        arr.forEach((item, index) => {
            if (item.statusOrder.id === sttId) {
                result = index
            }
        });
    }

    return result;
}



const AdmOrderInfo = () => {

    const { id } = useParams();
    const [info, setInfo] = useState(undefined)
    const [IsLoadingInfo, setIsLoadingInfo] = useState(true)
    const [isModalStatus, setIsModalStatus] = useState(false)
    const [isModalDesc, setIsModalDesc] = useState(false)
    const [isModalCustomerInfo, setIsModalCustomerInfo] = useState(false)
    const [editingCustomerInfo, setEditingCustomerInfo] = useState(undefined)
    const [editingOrderItem, setEdittingOrderItem] = useState(undefined)
    const [updateSttDesc, setUpdateSttDesc] = useState('')
    const auth = useSelector(state => state.auth.auth);
    const [steps, setSteps] = useState([
        { index: 1, id: 5, title: "Đang Chờ" },
        { index: 2, id: 1, title: "Chờ Xác Nhận" },
        { index: 3, id: 2, title: "Đã Xác Nhận" },
        { index: 4, id: 3, title: "Đang Giao" },
        { index: 5, id: 4, title: "Hoàn Tất" }
    ])
    const navigate = useNavigate();
    const [updateForm] = useForm()
    const statusModalColumns = [
        {
            title: '',
            render: (record) => {
                return (
                    <>
                        {record?.statusOrder?.title}
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
                        {record?.usersUpdate?.username}
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


    const onClickUpdateWatingOrder = (item) => {
        ordersAPI.updateOrderStatus({
            ...item,
            users: {
                username: auth?.info?.username
            },
            isFinish: true
        })
            .then(res => {
                if (!res.status) {
                    console.log(res)
                    setInfo({ ...res })
                    Modal.success({
                        title: "Hộp Thoại Thông Báo",
                        content: "Cập nhật trạng thái đơn hàng thành công!"
                    })
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
        console.log(item)
        let payload = {

        }
    }

    const onClickUpdateStatus = (item) => {
        if (auth) {
            let payload = {
                ...item,
                users: {
                    username: auth?.info?.username
                }
            }
            setEdittingOrderItem(payload)
            setIsModalDesc(true)

        }
    }

    const handleUpdateStatus = () => {
        if (editingOrderItem) {
            let payload = {
                ...editingOrderItem,
                DescriptionOder: updateSttDesc
            }
            console.log(payload)
            ordersAPI.updateOrderStatus(payload)
                .then(res => {
                    if (!res.status) {
                        setInfo({ ...res })
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

    const onClickUpdateCustomerInfo = () => {
        setIsModalCustomerInfo(true);
        setEditingCustomerInfo({
            name: info?.customers?.name,
            phone: info?.customers?.phone,
            location: info?.customers?.address?.location,
            note: info?.note ? info?.note : '',
            cityId: info?.customers?.address?.city?.id,
            districtId: info?.customers?.address?.district?.id,
            wardId: info?.customers?.address?.ward?.id
        })
        setSelectedData({
            cityId: info?.customers?.address?.city?.id,
            districtId: info?.customers?.address?.district?.id,
            wardId: info?.customers?.address?.ward?.id
        })
    }

    const onCloseModalCustomerInfo = () => {
        setEditingCustomerInfo(undefined);
        setIsModalCustomerInfo(false)
    }

    const onCloseModalDesc = () => {
        setEdittingOrderItem(undefined);
        setUpdateSttDesc('');
        setIsModalDesc(false)
    }

    const onChangeCity = (value) => {
        updateForm.setFieldValue('districtId', null)
        updateForm.setFieldValue('wardId', null)
        setSelectedData({
            cityId: value,
            districtId: null,
            wardId: null
        })
    }

    const onChangeDistrict = (value) => {
        updateForm.setFieldValue('wardId', null)
        setSelectedData({
            ...selectedData,
            districtId: value,
            wardId: null
        })
    }

    const onChangeWard = (value) => {
        setSelectedData({
            ...selectedData,
            wardId: value
        })
    }

    const [cityData, setCityData] = useState([])
    const [selectedData, setSelectedData] = useState({
        cityId: null,
        districtId: null,
        wardId: null
    })

    const handleUpdateCustomerInfo = (value) => {
        Modal.confirm({
            title: 'Hộp Thoại Xác Nhận',
            content: 'Bạn có muốn cập nhật đơn hàng không?',
            okText: 'Xác Nhận',
            cancelText: 'Hủy Bỏ',
            onOk: () => {
                let payload = {
                    ...info,
                    customers:{
                        "phone": value?.phone,
                        "name": value?.name,
                        "note": value.note ? value.note : '',
                        "user": {
                            "username": auth?.info?.username
                        }
                    }
                    ,
                    statusOrder : "Chờ Xác Nhận",
                    isFinish: false,
                    cityId: value.cityId,
                    districtId: value.districtId,
                    wardId: value.wardId,
                    location: value.location
                }
                console.log(payload)
                ordersAPI.updateOrderStatus(payload)
                .then(res => {
                    if(!res.status){
                        openNotificationWithIcon('success','Thông Báo','Cập nhật đơn hàng thành công!')
                        setInfo(res)
                        setIsModalCustomerInfo(false)
                        console.log(res)
                    }else{
                        console.log(res)
                    }
                })
                .catch(err => console.log(err))
            }
        })
    }


    useEffect(() => {
        if (editingCustomerInfo) {
            console.log(editingCustomerInfo)
            console.log('reset field form')
            updateForm.setFieldValue('phone', editingCustomerInfo.phone)
            updateForm.resetFields()
        }
    }, [editingCustomerInfo])

    useEffect(() => {
        ordersAPI.getOrderInfo(id)
            .then(res => {
                if (!res.status) {
                    setInfo(res)
                    console.log(res)
                    setIsLoadingInfo(false)
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }, [id])

    useEffect(() => {
        addressAPI.getCityData()
            .then(res => {
                if (!res.status) {
                    setCityData(res)
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <Helmet
            title={"Quản Lý Đơn Hàng"}
        >
            {
                IsLoadingInfo ?
                    (
                        <Container>
                            <Wrapper>
                                Loading... <Spin />
                            </Wrapper>
                        </Container>
                    )
                    :
                    (
                        info?.statusDetail[info?.statusDetail.length - 1].statusOrder?.id === 5?
                            (
                                <AdmWatingOrder id={info?.id} info={info} onClickUpdateStatus={onClickUpdateWatingOrder} />
                            )
                            :
                            (<Container>
                                <Wrapper>
                                    <ActionContainer>
                                        <Button type='primary' onClick={() => { navigate("/admin/order-list") }}>Danh Sách</Button>
                                    </ActionContainer>
                                    <StepsContainer>
                                        <StepsWrapper>
                                            {
                                                steps && steps.length > 0 &&
                                                <Steps current={steps.findIndex((item) => item.id === info?.statusDetail[info?.statusDetail.length - 1]?.statusOrder.id)}>
                                                    {steps.map(item => {
                                                        let checkDesc = findStepIndex(info?.statusDetail, item.id)
                                                        let des = checkDesc === -1 ? '' : info?.statusDetail[checkDesc]?.timeDate
                                                        return (
                                                            (
                                                                <Steps.Step
                                                                    title={item.title}
                                                                    key={item.id}
                                                                    description={des !== '' ? moment(des).format('DD/MM/YYYY, H:mm:ss') : ''}
                                                                />
                                                            )
                                                        )
                                                    }
                                                    )}
                                                </Steps>
                                            }
                                            <br />
                                        </StepsWrapper>
                                        <StepsActionsContainer>
                                            <UpdateStatusButton item={info} onClickUpdate={onClickUpdateStatus} />
                                            <Button style={{ borderRadius: "20px" }} onClick={() => { setIsModalStatus(true) }}>Chi Tiết</Button>
                                        </StepsActionsContainer>
                                    </StepsContainer>
                                    <PaymentContainer>
                                        <PaymentWrapper>
                                            <PaymentTitle>thông tin thanh toán</PaymentTitle>
                                            <PaymentType>
                                                <Typography.Title level={5}>Phương thức thanh toán</Typography.Title>
                                                <Typography.Text level={5}>{info?.orderPayment[0]?.payment?.title}</Typography.Text>
                                            </PaymentType>
                                            <PaymentDetail>
                                                <Typography.Title level={5}>Tài khoản thụ hưởng</Typography.Title>
                                                <Typography.Text level={5}>Techcombank - 19037049661012</Typography.Text>
                                            </PaymentDetail>
                                            <PaymentDetail>
                                                <Typography.Title level={5}>Người thụ hưởng</Typography.Title>
                                                <Typography.Text level={5}>Nguyễn Ích Quang</Typography.Text>
                                            </PaymentDetail>
                                            <PaymentDetail>
                                                <Typography.Title level={5}>Nội dung</Typography.Title>
                                                <Typography.Text level={5}>{info?.orderPayment[0]?.decriptions}</Typography.Text>
                                            </PaymentDetail>
                                            <PaymentDetail>
                                                <Typography.Title level={5}>Thanh toán</Typography.Title>
                                                <Typography.Text level={5}>{formatter.format(info?.total_price)}</Typography.Text>
                                            </PaymentDetail>
                                        </PaymentWrapper>
                                    </PaymentContainer>
                                    <CustomerInfoContainer>
                                        <Title>thông tin đơn hàng</Title>
                                        <CustomerInfoActions>
                                            {
                                                !isModalCustomerInfo ?
                                                    (<Button
                                                        style={{ borderRadius: "20px" }}
                                                        disabled={info?.statusDetail[info?.statusDetail.length - 1]?.statusOrder?.id >= 2}
                                                        onClick={() => { onClickUpdateCustomerInfo() }}
                                                    >
                                                        Cập Nhật
                                                    </Button>)
                                                    :
                                                    (
                                                        <>
                                                            <Button
                                                                style={{ borderRadius: "20px" }}
                                                                disabled={info?.statusDetail[info?.statusDetail.length - 1]?.statusOrder?.id >= 2}
                                                                onClick={() => { setIsModalCustomerInfo(false) }}
                                                            >
                                                                Hủy
                                                            </Button>
                                                        </>


                                                    )
                                            }

                                        </CustomerInfoActions>
                                        {
                                            !isModalCustomerInfo ?
                                                (
                                                    <CustomerInfo>
                                                        <CustomerInfoItem>
                                                            <CustomerInfoItemLabel>trạng thái</CustomerInfoItemLabel>
                                                            <CustomerInfoItemContent>
                                                                <StatusBadge status={info?.statusDetail[info?.statusDetail.length - 1]?.statusOrder} />
                                                            </CustomerInfoItemContent>
                                                        </CustomerInfoItem>
                                                        <CustomerInfoItem>
                                                            <CustomerInfoItemLabel>mã đơn hàng</CustomerInfoItemLabel>
                                                            <CustomerInfoItemContent>{info?.id}</CustomerInfoItemContent>
                                                        </CustomerInfoItem>
                                                        <CustomerInfoItem>
                                                            <CustomerInfoItemLabel>họ và tên</CustomerInfoItemLabel>
                                                            <CustomerInfoItemContent>{info?.customers?.name}</CustomerInfoItemContent>
                                                        </CustomerInfoItem>
                                                        <CustomerInfoItem>
                                                            <CustomerInfoItemLabel>số điện thoại</CustomerInfoItemLabel>
                                                            <CustomerInfoItemContent>{info?.customers?.phone}</CustomerInfoItemContent>
                                                        </CustomerInfoItem>
                                                        <CustomerInfoItem>
                                                            <CustomerInfoItemLabel>địa chỉ</CustomerInfoItemLabel>
                                                            <CustomerInfoItemContent>{`${info?.customers?.address?.location} - ${info?.customers?.address?.ward?.title} - ${info?.customers?.address?.district?.title} - ${info?.customers?.address?.city?.title}`}</CustomerInfoItemContent>
                                                        </CustomerInfoItem>
                                                    </CustomerInfo>)
                                                :
                                                (
                                                    <div
                                                        style={{ width: '100%' }}
                                                    >
                                                        <Form
                                                            form={updateForm}
                                                            initialValues={editingCustomerInfo}
                                                            layout='vertical'
                                                            wrapperCol={{ span: 24 }}
                                                            labelCol={{ span: 24 }}
                                                            onFinish={handleUpdateCustomerInfo}
                                                        >
                                                            <div
                                                                style={{ display: 'flex', alignItems: 'center' }}
                                                            >
                                                                <div
                                                                    style={{ width: '50%', padding: '5px' }}
                                                                >
                                                                    <Form.Item
                                                                        label="Họ và tên"
                                                                        name="name"
                                                                        hasFeedback
                                                                        rules={[
                                                                            { required: true, message: "Vui lòng nhập họ và tên!" },
                                                                            { whitespace: true, message: "Vui lòng không nhập khoảng trắng!" }
                                                                        ]}
                                                                    >
                                                                        <Input />
                                                                    </Form.Item>
                                                                </div>
                                                                <div
                                                                    style={{ width: '50%', padding: '5px' }}
                                                                >
                                                                    <Form.Item
                                                                        label="Số điện thoại"
                                                                        name="phone"
                                                                        hasFeedback
                                                                        rules={[
                                                                            { required: true, message: "Vui lòng nhập số điện thoại!" },
                                                                            // { whitespace: true, message: "Vui lòng không nhập khoảng trắng!" }
                                                                        ]}
                                                                    >
                                                                        <Input />
                                                                    </Form.Item>
                                                                </div>
                                                            </div>
                                                            <Form.Item style={{ marginBottom: "0px" }}>
                                                                <Typography>Địa chỉ giao hàng</Typography>
                                                                <FormLocationGroup>
                                                                    <Form.Item
                                                                        label="Tỉnh/Thành Phố"
                                                                        name="cityId"
                                                                        hasFeedback
                                                                        rules={[
                                                                            { required: true, message: 'Vui lòng chọn Tỉnh/Thành Phố!' }
                                                                        ]}
                                                                        style={{ width: '30%' }}
                                                                    >
                                                                        <Select
                                                                            onChange={onChangeCity}
                                                                            placeholder="Tỉnh/Thành"
                                                                        >
                                                                            {
                                                                                cityData.map((item, index) => (
                                                                                    <Select.Option key={item.id} value={item.id}>{item.title}</Select.Option>
                                                                                ))
                                                                            }
                                                                        </Select>
                                                                    </Form.Item>
                                                                    <Form.Item
                                                                        label="Quận/Huyện"
                                                                        name="districtId"
                                                                        hasFeedback
                                                                        rules={[
                                                                            { required: true, message: 'Vui lòng chọn Quận/Huyện' }
                                                                        ]}
                                                                        style={{ width: '30%' }}
                                                                    >
                                                                        <Select placeholder="Quận/Huyện" disabled={!selectedData.cityId}
                                                                            onChange={onChangeDistrict}
                                                                        >
                                                                            {
                                                                                selectedData.cityId ?
                                                                                    (
                                                                                        <>
                                                                                            {
                                                                                                (cityData.find(item => item.id === selectedData.cityId)).districts.map(item => (
                                                                                                    <Select.Option value={item.id} key={item.id} >{item.title}</Select.Option>
                                                                                                ))
                                                                                            }
                                                                                        </>
                                                                                    )
                                                                                    :
                                                                                    (
                                                                                        <>

                                                                                        </>
                                                                                    )
                                                                            }
                                                                        </Select>
                                                                    </Form.Item>
                                                                    <Form.Item
                                                                        label="Phường/Xã"
                                                                        name="wardId"
                                                                        hasFeedback
                                                                        rules={[
                                                                            { required: true, message: 'Vui lòng chọn Phường/Xã!' }
                                                                        ]}
                                                                        style={{ width: '30%' }}
                                                                    >
                                                                        <Select disabled={!selectedData.districtId}
                                                                            onChange={onChangeWard}
                                                                            placeholder="Phường/Xã"
                                                                        >
                                                                            {
                                                                                selectedData.cityId && selectedData.districtId ?
                                                                                    (
                                                                                        <>
                                                                                            {
                                                                                                ((cityData.find(item => item.id === selectedData.cityId)).districts.find(item => item.id === selectedData.districtId))?.wards.map(item => (
                                                                                                    <Select.Option value={item.id} key={item.id} >{item.title}</Select.Option>
                                                                                                ))
                                                                                            }
                                                                                        </>
                                                                                    )
                                                                                    :
                                                                                    (
                                                                                        <>

                                                                                        </>
                                                                                    )
                                                                            }
                                                                        </Select>
                                                                    </Form.Item>
                                                                </FormLocationGroup>
                                                            </Form.Item>
                                                            <Form.Item
                                                                label="Địa chỉ"
                                                                name="location"
                                                                hasFeedback
                                                                rules={[
                                                                    { required: true, message: 'Vui lòng nhập địa chỉ nhận hàng!' },
                                                                    { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' }
                                                                ]}
                                                            >
                                                                <Input />
                                                            </Form.Item>
                                                            <Form.Item
                                                                label="Ghi Chú"
                                                                name="note"
                                                            >
                                                                <Input.TextArea />
                                                            </Form.Item>
                                                            <Form.Item>


                                                                <Button
                                                                    style={{ borderRadius: "20px" }}
                                                                    type={'primary'}
                                                                    htmlType="submit"
                                                                >
                                                                    Lưu
                                                                </Button>
                                                            </Form.Item>
                                                        </Form>
                                                    </div>
                                                )
                                        }

                                    </CustomerInfoContainer>
                                    <CartContainer>
                                        <CartDetails>
                                            <CartBody>
                                                <List
                                                    bordered
                                                    dataSource={info?.orderDetail}
                                                    style={{
                                                        height: '100%',
                                                        maxHeight: '60vh',
                                                        overflowY: 'scroll',
                                                        backgroundColor: 'white'
                                                    }}
                                                    renderItem={(item, index) => (
                                                        <List.Item>
                                                            <Product key={index}>
                                                                <ProductDetail>
                                                                    <Image src={item.product.images && `http://localhost:8080/api/file/images/${item.product.images[0].photo}`} />
                                                                    <Details>
                                                                        <ProductName style={{ textDecoration: "none" }} onClick={() => { navigate(`/product/${item.product.id}`) }}>
                                                                            <b>Tên Sản Phẩm:</b> {item.product?.name}
                                                                        </ProductName>
                                                                        <ProductId>
                                                                            <b>Mã sản phẩm:</b> {item.product.id}
                                                                        </ProductId>
                                                                        <b>Size:</b> {item.size}
                                                                    </Details>
                                                                </ProductDetail>
                                                                <PriceDetail>
                                                                    <ProductAmountContainer>
                                                                        <ProductAmount>
                                                                            <AmountInput
                                                                                type='text'
                                                                                value={'x ' + item.quantity}
                                                                            />
                                                                        </ProductAmount>
                                                                    </ProductAmountContainer>
                                                                    <ProductPrice>{formatter.format(item.total_price)}</ProductPrice>
                                                                </PriceDetail>
                                                            </Product>
                                                        </List.Item>
                                                    )}
                                                />
                                            </CartBody>
                                            <CartFooter>
                                                {/* Tổng tiền : <b>{formatter.format(data.reduce((total, item) => { return total + item.quantity * item.price }, 0))}</b> */}
                                            </CartFooter>
                                        </CartDetails>
                                    </CartContainer>
                                </Wrapper >
                                <Modal
                                    open={isModalStatus}
                                    centered
                                    okText={false}
                                    cancelText={"Đóng"}
                                    onCancel={() => setIsModalStatus(false)}
                                    width={1000}
                                >
                                    <Table columns={statusModalColumns} dataSource={info?.statusDetail} pagination={false} />
                                </Modal>
                                <Modal
                                    open={isModalDesc}
                                    centered
                                    okText="Xác Nhận"
                                    cancelText="Huỷ Bỏ"
                                    onCancel={onCloseModalDesc}
                                    onOk={handleUpdateStatus}
                                >
                                    <Typography.Title level={5}>Ghi Chú</Typography.Title>
                                    <Input.TextArea value={updateSttDesc} onChange={(e) => { setUpdateSttDesc(e.target.value) }} placeholder="Ghi chú" />
                                </Modal>
                            </Container >

                            )
                    )
            }
        </Helmet >
    )
}

export default AdmOrderInfo