import React, { useState } from 'react'
import { useEffect } from 'react';
import { Form, useNavigate, useParams } from 'react-router-dom'
import Helmet from '../../components/Helmet';
import styled from 'styled-components';
import { List, Spin, Steps, Tag, Typography, Select, Button, Skeleton, Modal, notification, Table, Input } from 'antd';
import ordersAPI from '../../api/ordersAPI';
import { formatter } from '../../utils';
import AdmWatingOrder from './AdmWatingOrder';
import moment from 'moment';
import { useSelector } from 'react-redux';

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
        setEditingCustomerInfo(info?.customers);
        setIsModalCustomerInfo(true)
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
        // form.setFieldValue('districtId', null)
        // form.setFieldValue('wardId', null)
        setSelectedData({
            cityId: value,
            districtId: null,
            wardId: null
        })
    }

    const onChangeDistrict = (value) => {
        // form.setFieldValue('wardId', null)
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




    useEffect(() => {
        ordersAPI.getOrderInfo(id)
            .then(res => {
                if (!res.status) {
                    setInfo(res)
                    console.log(res)
                    setIsLoadingInfo(false)
                    // ordersAPI.getAllOrderStatus()
                    //     .then(stepsRes => {
                    //         if (!stepsRes.status) {
                    //             setSteps(stepsRes)
                    //         } else {
                    //             console.log(stepsRes)
                    //         }
                    //     }).then(() => {
                    //     })
                    //     .catch(err => console.log(err))
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }, [id])
    console.log(steps[0])
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
                        info?.statusDetail[info?.statusDetail.length - 1].statusOrder?.id === 5 ?
                            (
                                <AdmWatingOrder id={info?.id} info={info} onClickUpdateStatus={onClickUpdateWatingOrder} />
                            )
                            :
                            (<Container>
                                <Wrapper>
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
                                    <CustomerInfoContainer>
                                        <Title>thông tin đơn hàng</Title>
                                        <CustomerInfoActions>
                                            <Button
                                                style={{ borderRadius: "20px" }}
                                                disabled={info?.statusDetail[info?.statusDetail.length - 1]?.statusOrder?.id > 2}
                                                onClick={() => { onClickUpdateCustomerInfo() }}
                                            >
                                                Cập Nhật
                                            </Button>
                                        </CustomerInfoActions>
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
                                        </CustomerInfo>
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
                                                                        {/* <ProductSize>
                                                                        <br />
                                                                        <Select value={item.selectedSize.size.title} disabled>
                                                                            {
                                                                                item.size.map((size) => (
                                                                                    <Select.Option value={size.id} key={size.id}>{size.size.title}</Select.Option>
                                                                                ))
                                                                            }
                                                                        </Select>
                                                                    </ProductSize> */}
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

                                <Modal
                                    open={isModalCustomerInfo}
                                    centered
                                    okText="Xác Nhận"
                                    cancelText="Hủy Bỏ"
                                    onCancel={() => onCloseModalCustomerInfo()}
                                >

                                </Modal>
                            </Container >

                            )
                    )
            }
        </Helmet >
    )
}

export default AdmOrderInfo