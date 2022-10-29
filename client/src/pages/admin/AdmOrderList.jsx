import ordersAPI from '../../api/ordersAPI';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Helmet from '../../components/Helmet'
import { useSelector } from 'react-redux'
import { formatter } from '../../utils/index'
import { Card, Badge, Tabs, Typography, Button, Empty, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { South } from '@mui/icons-material';

const Container = styled.div`
    width: 100%;
`
const Wrapper = styled.div`
    width: 100%;
    background-color: rgba(0,0,0, 0.075);
`
const Title = styled.h2`
    width: 100%;
    text-align: center;
    text-transform: capitalize;
    font-size: 40px;
    font-weight: 300;
    margin-bottom: 50px;
`
const ListContainer = styled.div`
    width: 100%;
    padding: 50px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`
const ProductImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;

`

const ContentContainer = styled.div`
    width: 100%;
    padding: 20px;
    background-color: white;
    border-radius:  20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`
const OrderContainer = styled.div`
    width: 100%;
    padding: 20px;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: right;
    justify-content: flex-start;
`
const OrderDetails = styled.div`
`

const OrderDetailsItem = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`
const OrderDetailsItemImage = styled.div`
    width: 138px;
    height: 138px;
    padding: 4px;
    border: 1px solid lightgray;
`
const ItemImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: top;
`
const OrderDetailsItemTitle = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
`
const OrderDetailsItemPrice = styled.div`
    width: 200px;
`
const OrderDetailsItemQuantity = styled.div`
    width: 30px;
`
const OrderInfo = styled.div`    
    width: 100%;
    display: flex;
    border-top: 1px solid teal;
`
const OrderCustomer = styled.div`
    flex: 1;
    padding: 10px;
    margin-right: 10px;
    border-right: 1px solid lightgray;
`
const OrderCustomnerItem = styled.div`
    margin-left: 10px;
    display: flex;
    align-items: center;
`
const OrderCustomnerItemLabel = styled.div`
    font-size: 14px;
    font-weight: 500;
    margin-right: 10px;
`
const OrderCustomnerItemInfo = styled.div`
    font-size: 16px;
    font-weight: 300;
`
const OrderSummary = styled.div`
    width: 300px;
    padding-right: 20px;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const OrderSummaryTitle = styled.div`
`
const OrderSummaryDetail = styled.div`
    font-size: 20px;
    color: darkblue;
    font-weight: 500;
    margin-top: 5px;
`
const OrderAction = styled.div`
    width: 100%;
    padding: 20px;
    border-top: 1px solid teal;
    display: flex;
    justify-content: flex-end;
`



const Order = ({ order, onAction }) => {


    return (
        <OrderContainer>
            <Badge.Ribbon text={order.statusOrders.title}>
                <Card title={`Đặt hàng lúc : ${order.order_date}     ||     ${order.orderDetail.reduce(((total, item) => (total + item.quantity)), 0)} sản phẩm`} size="small">
                    <OrderDetails>
                        {
                            order.orderDetail.map((item, index) => (
                                <OrderDetailsItem key={item.id}>
                                    <OrderDetailsItemImage>
                                        <ItemImage src={item.product.images && `http://localhost:8080/api/file/images/${item.product.images[0].photo}`} />
                                    </OrderDetailsItemImage>
                                    <OrderDetailsItemTitle>
                                        {item.product.name}
                                    </OrderDetailsItemTitle>
                                    <OrderDetailsItemPrice>
                                        {formatter.format(item.product.export_price)}
                                    </OrderDetailsItemPrice>
                                    <OrderDetailsItemQuantity>
                                        x{item.quantity}
                                    </OrderDetailsItemQuantity>
                                </OrderDetailsItem>
                            ))
                        }
                    </OrderDetails>
                    <OrderInfo>
                        <OrderCustomer>
                            <Typography.Text>Thông tin người đặt</Typography.Text>
                            <OrderCustomnerItem>
                                <OrderCustomnerItemLabel>Tên đăng nhập: </OrderCustomnerItemLabel>
                                <OrderCustomnerItemInfo>{order.users.username}</OrderCustomnerItemInfo>
                            </OrderCustomnerItem>
                            <OrderCustomnerItem>
                                <OrderCustomnerItemLabel>Email: </OrderCustomnerItemLabel>
                                <OrderCustomnerItemInfo>{order.users.email}</OrderCustomnerItemInfo>
                            </OrderCustomnerItem>
                            <OrderCustomnerItem>
                                <OrderCustomnerItemLabel>Số điện thoại: </OrderCustomnerItemLabel>
                                <OrderCustomnerItemInfo>{order.users.phone}</OrderCustomnerItemInfo>
                            </OrderCustomnerItem>
                            <Typography.Text>Thông tin giao hàng</Typography.Text>
                            <OrderCustomnerItem>
                                <OrderCustomnerItemLabel>Người nhận: </OrderCustomnerItemLabel>
                                <OrderCustomnerItemInfo>{order.users.username}</OrderCustomnerItemInfo>
                            </OrderCustomnerItem>
                            <OrderCustomnerItem>
                                <OrderCustomnerItemLabel>Số điện thoại: </OrderCustomnerItemLabel>
                                <OrderCustomnerItemInfo>{order.customers.phone}</OrderCustomnerItemInfo>
                            </OrderCustomnerItem>
                            <OrderCustomnerItem>
                                <OrderCustomnerItemLabel>Địa chỉ: </OrderCustomnerItemLabel>
                                <OrderCustomnerItemInfo>{order.customers.address}</OrderCustomnerItemInfo>
                            </OrderCustomnerItem>
                        </OrderCustomer>
                        <OrderSummary>
                            <OrderSummaryTitle>
                                Thanh Toán
                            </OrderSummaryTitle>
                            <OrderSummaryDetail>
                                {formatter.format(order.total_price)}
                            </OrderSummaryDetail>
                        </OrderSummary>
                    </OrderInfo>
                    <OrderAction>
                        <ButtonUpdateStatus status={order.statusOrders} onAction={onAction} />
                    </OrderAction>
                </Card>
            </Badge.Ribbon>
        </OrderContainer>
    )

}

const ButtonUpdateStatus = ({ status, onAction }) => {
    const statusList = [
        {
            "id": 1,
            "title": "Chờ Xác Nhận"
        },
        {
            "id": 2,
            "title": "Đã Xác Nhận"
        },
        {
            "id": 3,
            "title": "Đang Giao"
        },
        {
            "id": 4,
            "title": "Hoàn Tất"
        }
    ]

    const data = statusList.find(item => item.id - 1 === status.id)

    const onClick = () => {
        Modal.confirm({
            title: "Hộp Thoại Xác Nhận",
            content: `${data.title} đon hàng ?`,
            okText: "Xác Nhận",
            cancelText: "Hủy Bỏ",
            onOk: () => { onAction(data) }
        })
    }

    return (
        data &&
        <Button onClick={onClick}>
            {data.title}
        </Button>
    )
}

const AdmOrderList = () => {
    const auth = useSelector(state => state.auth.auth);
    const isAuth = useSelector(state => state.auth.isAuth);
    const [data, setData] = useState([]);
    const [statusList, setStatusList] = useState([{ id: 0, title: "Tất cả" }])
    const [tabData, setTabData] = useState([]);
    const { username } = auth ? auth.info : "";
    const navigate = useNavigate();

    const handleUpdateOrderStatus = (item) => {
        const newStatus = statusList.find(x => x.id - 1 === item.statusOrders.id)
        console.log('update stt')
        console.log({
            ...item,
            statusOrders: newStatus
        })
        ordersAPI.updateOrderStatus({
            ...item,
            statusOrders: newStatus
        })
            .then(res => {
                if (!res.status) {
                    let index = data.findIndex(x => x.id === item.id)
                    if (index !== -1) {
                        data[index] = {
                            ...item,
                            statusOrders: newStatus
                        }
                        setData([...data])
                        Modal.success({
                            title: "Hộp Thoại Thông Báo",
                            content: "Cập nhật trạng thái đơn hàng thành công!"
                        })
                    }

                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))

    }



    const filterOrdersByStatus = (arr, id) => {
        let resArr = [];
        if (id > 0) {
            resArr = arr.filter(item => item.statusOrders.id === id)
            return resArr;
        } else if (id === 0) {
            return arr;
        } else {
            return [];
        }
    };


    useEffect(() => {
        if (auth) {
            ordersAPI.getMyOrders(username)
                .then(res => {
                    if (!res.status) {
                        console.log(res)
                        setData(res);
                    } else {
                        console.log(res)
                    }
                })
                .catch(err => console.log(err));
        } else {
            navigate("/login")
        }
    }, [auth])

    useEffect(() => {
        ordersAPI.getAllOrderStatus()
            .then(res => {
                if (!res.status) {
                    console.log(res)
                    setStatusList([
                        { id: 0, title: "Tất cả" },
                        ...res
                    ])
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (data.length && data.length >= 0) {
            let arr = [];
            statusList.forEach(item => {
                arr.push({
                    label: item.title,
                    key: item.id,
                    children: (
                        filterOrdersByStatus(data, item.id).length > 0 ?
                            (
                                filterOrdersByStatus(data, item.id).sort((a, b) => (a.createdDate > b.createdDate ? -1 : 1))
                                    .map(item => (
                                        <Order key={item.id} order={item} onAction={() => { handleUpdateOrderStatus(item) }} />
                                    ))
                            )
                            :
                            (
                                <><Empty /></>
                            )
                    )
                })
            })
            setTabData(arr)
        }
    }, [data, statusList])

    return (
        <Helmet
            title="Danh Sách Đơn Hàng"
        >
            <Container>
                <Wrapper>
                    <ListContainer>
                        <Title>danh sách đơn hàng</Title>
                        <ContentContainer>
                            {
                                tabData && tabData.length > 0 &&
                                (
                                    <Tabs items={tabData} />
                                )
                            }
                        </ContentContainer>
                    </ListContainer>
                </Wrapper>
            </Container>
        </Helmet>
    )
}

export default AdmOrderList