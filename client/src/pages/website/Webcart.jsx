import React, { useEffect, useState } from 'react'
import Helmet from '../../components/Helmet'
import styled from 'styled-components'
import { Add, OtherHouses, Remove } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { formatter } from '../../utils';
import checkoutAPI from '../../api/checkoutAPI';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DialogHOC from '../../hoc/DialogHOC';
import { Link, useNavigate } from 'react-router-dom'
import { changeCartItemQuantity, changeCartItemQuantityAction, changeCartItemSizeAction, clearCartAction } from '../../redux/actions/CartReducerAtion'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { notification, Drawer, Typography, Modal, Select, message } from 'antd';
import { CHANGE_CART_ITEM_QUANTITY } from '../../redux/types'
import CustomerInfoForm from '../../components/CustomerInfoForm'

const Container = styled.div``
const Wrapper = styled.div`
    padding: 20px;
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`
const Top = styled.div`
    display: flex;
    align-item:center;
    justify-content: space-between;
    padding: 20px;
`
const TopTexts = styled.div`
`
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0 10px;
`
const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props => props.type === "filled" && "none"};
    background-color: ${props => props.type === "filled" ? "black" : "transparent"};
    color: ${props => props.type === "filled" && "white"};
`

const Bottom = styled.div`
    padding: 20px;
    display: flex;
    justify-content: space-between;
`
const Info = styled.div`
    flex:3;
`
const Product = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`
const Image = styled.img`
    width: 200px;
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
`
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
`
const ProductDelete = styled.div`
    margin: 10px 20px;
    cursor: pointer;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
        background-color: rgba(0,0,0,0.35);
        color: red;
    }
`
const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`

const Summary = styled.div`
    flex:1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`
const SummaryTitle = styled.h1`
    font-weight: 200;
`
const SummaryItem = styled.div`
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === "total" && "500"};
    font-size: ${props => props.type === "total" && "24px"};
`
const SummaryItemText = styled.span`
`
const SummaryItemPrice = styled.span``
const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black:
    color: white;
    font-weight: 600;
`
const CustomerInputContainer = styled.div`
    margin-top: 30px;
`
const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-item: left;
`
const Label = styled.label`
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 5px;
`
const Input = styled.input`
    padding: 10px;
    border: none;
    border-bottom: 1px solid gray;
`

const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description: des,
    });
};

const Webcart = () => {
    const [isModalInfo, setIsModalInfo] = useState(false);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const cartReducer = useSelector(state => state.cartReducer);
    const [data, setData] = useState([]);
    const auth = useSelector(state => state.auth.auth);
    const isAuth = useSelector(state => state.auth.isAuth);
    const [customerValue, setCustomerValue] = useState({
        adress: auth ? auth.info.adress : "",
        phone: auth ? auth.info.phone : "",
    });


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const hanldleCheckout = (value) => {
        if (data && data.length > 0) {
            let payload = {
                "users": {
                    "username": auth.info.username
                },
                "total_price": data.reduce((total, item) => { return total + item.quantity * item.price }, 0) * 1.1,
                "customers": {
                    "phone": value.phone,
                    "address": value.adress,
                    "name": value.name,
                    "note": value.note,
                    "user": {
                        "username": auth.info.username
                    }
                },
                "orderDetail": [
                    ...data.map((item) => ({
                        product: {
                            id: item.product.id
                        },
                        size: item.selectedSize.size.title,
                        quantity: item.quantity,
                        total_price: item.price * item.quantity
                    }))
                ]
            };
            checkoutAPI.checkout(payload)
                .then(res => {
                    console.log(res);
                    dispatch(clearCartAction());
                    setIsModalInfo(false);
                    Modal.success({
                        title:"Thành công",
                        content: "Đơn đặt hàng của bạn đã được tạo thành công. Tự động chuyển trang đến đơn hàng của tôi!"
                    })
                    navigate("/my-orders")
                })
                .catch(err => {
                    console.log(err);
                });

        }
    }

    const hanldeDeleteCartIem = (item) => {
        const action = {
            type: "DELETE_CART_ITEM",
            payload: item
        }

        // dispatch(action);
        console.log(item)
    }

    const handleClickUpdateCartItemQuantity = (item, newQuantity) => {
        if (newQuantity <= 0) {
            let action = {
                type: "DELETE_CART_ITEM",
                payload: item
            };
            dispatch(action);
        } else {
            let action = {
                type: "CHANGE_CART_ITEM_QUANTITY",
                payload: {
                    ...item,
                    quantity: newQuantity
                }
            }
            dispatch(action);
        }
    }
    const handleClearCart = () => {
        dispatch(clearCartAction());
    }

    const onChangeCustomerValue = (e) => {
        setCustomerValue({
            ...customerValue,
            [e.target.name]: e.target.value
        });
    };

    const handleChangeCartItemQuantity = (e, item) => {
        let index = data.findIndex(dataItem => (dataItem.product.id === item.product.id && dataItem.size.id === item.size.id));
        if (index !== -1) {
            data[index].quantity = e.target.value;
            setData([...data])
        }
    }

    const handleBlurCartItemQuantityInput = (e, item) => {
        let index = data.findIndex(dataItem => (dataItem.product.id === item.product.id && dataItem.size.id === item.size.id));
        if (index !== -1) {
            if (Number.isNaN(Number.parseInt(data[index].quantity))) {
                data[index].quantity = 1;
                let payload = {
                    ...item,
                    quantity: 1
                }
                dispatch(changeCartItemQuantityAction(payload));
                setData([...data])
                openNotificationWithIcon('error', 'Lỗi nhập liệu', 'Vui lòng nhập  số lượng mua hàng là một số tự nhiên lớn hơn  0!')
            } else {
                if (Number.parseInt(data[index].quantity) < 0) {
                    data[index].quantity = 1;
                    let payload = {
                        ...item,
                        quantity: 1
                    }
                    dispatch(changeCartItemQuantityAction(payload));
                    setData([...data])
                    openNotificationWithIcon('error', 'Lỗi nhập liệu', 'Vui lòng nhập  số lượng mua hàng là một số tự nhiên lớn hơn  0!')
                } else {
                    let quantity = Number.parseInt(data[index].quantity)
                    console.log(quantity)
                    if (quantity > cartReducer.cart[index].size.quantity) {
                        quantity = cartReducer.cart[index].size.quantity
                        data[index].quantity = quantity;
                        let payload = {
                            ...item,
                            quantity: quantity
                        }
                        dispatch(changeCartItemQuantityAction(payload));
                        setData([...data])
                        openNotificationWithIcon('warning', 'Thông báo', `Trong kho hiện  còn lại ${cartReducer.cart[index].size.quantity}  sản phẩm!`)
                    } else {
                        data[index].quantity = quantity;
                        let payload = {
                            ...item,
                            quantity: quantity
                        }
                        dispatch(changeCartItemQuantityAction(payload));
                        setData([...data])
                    }
                }
            }
        }
    }

    const handleChangeCartItemSize = (item, newSizeId, index) => {
        const newItem = {
            ...item,
            selectedSize: item.size.find(s => s.id === newSizeId),
            currentIndex: index 
        }
        console.log(newItem)
        dispatch(changeCartItemSizeAction(newItem))
        message.success("Thay đổi size thành công!")
    }

    useEffect(() => {
        setCustomerValue(
            {
                adress: auth ? auth.info.adress : "",
                phone: auth ? auth.info.phone : "",
            }
        )
    }, [auth])

    useEffect(() => {
        let cartData = [...cartReducer.cart];
        setData([...cartData])
    }, [cartReducer.cart])

    return (
        <Helmet
            title={"Giỏ Hàng"}
        >
            <Container>
                <Wrapper>
                    <Title>Giỏ Hàng</Title>
                    <Top>
                        {
                            data.length > 0 &&
                            <DialogHOC
                                title="Xác Nhận"
                                content="Bạn có muốn xóa hết mặt hàng trong giỏ không?"
                                cancelText="Hủy Bỏ"
                                okText="Đồng Ý"
                                onYes={() => { handleClearCart() }}
                            >
                                <TopButton>Xóa Giỏ Hàng</TopButton>
                            </DialogHOC>
                        }
                        <TopTexts>
                            <TopText>Danh sách yêu thích</TopText>
                        </TopTexts>
                    </Top>
                    <Bottom>
                        <Info>
                            {
                                data && data.length <= 0 &&
                                (
                                    <>
                                        <p>
                                            Không có sản phẩm trong giỏ hàng
                                        </p>
                                        <Link to="/products">
                                            Mua Hàng Ngay
                                        </Link>
                                    </>
                                )
                            }
                            {
                                data && data.length > 0 && data.map((item, index) => {
                                    return (
                                        <Product key={index}>
                                            <ProductDetail>
                                                <Image src={item.product.images && `http://localhost:8080/api/file/images/${item.product.images[0].photo}`} />
                                                <Details>
                                                    <ProductName onClick={() => {navigate(`/product/${item.product.id}`)}}>
                                                        <b>Product:</b> {item.product?.name}
                                                    </ProductName>
                                                    <ProductId>
                                                        <b>ID:</b> {item.product.id}
                                                    </ProductId>
                                                    <ProductSize>
                                                        <b>Size:</b> {item.selectedSize.size.title}
                                                        <br />
                                                        <Select value={item.selectedSize.size.title} onChange={(e) => {handleChangeCartItemSize(item, e, index)}}>
                                                            {
                                                                item.size.map((size) => (
                                                                    <Select.Option value={size.id} key={size.id}>{size.size.title}</Select.Option>
                                                                ))
                                                            }
                                                        </Select>
                                                    </ProductSize>
                                                </Details>
                                            </ProductDetail>
                                            <PriceDetail>
                                                <ProductAmountContainer>
                                                    <QuantityButton onClick={() => { handleClickUpdateCartItemQuantity(item, item.quantity + 1) }}>
                                                        <Add />
                                                    </QuantityButton>
                                                    <ProductAmount>
                                                        <AmountInput
                                                            type='text'
                                                            value={item.quantity}
                                                            onChange={(e) => { handleChangeCartItemQuantity(e, item) }}
                                                            onBlur={(e) => { handleBlurCartItemQuantityInput(e, item) }}
                                                        />
                                                    </ProductAmount>
                                                    {
                                                        item.quantity === 1 ?
                                                            (
                                                                <DialogHOC
                                                                    title="Xác Nhận"
                                                                    content="Bạn có muốn xóa sản phẩm này khỏi giỏ hàng không?"
                                                                    onYes={() => { handleClickUpdateCartItemQuantity(item, item.quantity - 1) }}
                                                                    okText="Xác Nhận"
                                                                    cancelText="Hủy Bỏ"
                                                                >
                                                                    <QuantityButton>
                                                                        <Remove />
                                                                    </QuantityButton>
                                                                </DialogHOC>
                                                            )
                                                            :
                                                            (
                                                                <QuantityButton onClick={() => { handleClickUpdateCartItemQuantity(item, item.quantity - 1) }} >
                                                                    <Remove />
                                                                </QuantityButton>
                                                            )
                                                    }

                                                </ProductAmountContainer>
                                                <ProductPrice>{formatter.format(item.quantity * item.price)}</ProductPrice>
                                            </PriceDetail>
                                            <ProductDelete>
                                                <DialogHOC
                                                    title="Xác Nhận"
                                                    content="Bạn có muốn xóa sản phẩm này khỏi giỏ hàng không?"
                                                    onYes={() => hanldeDeleteCartIem(item)}
                                                    okText="Xác Nhận"
                                                    cancelText="Hủy Bỏ"
                                                >
                                                    <DeleteOutlineOutlinedIcon />
                                                </DialogHOC>
                                            </ProductDelete>
                                        </Product>
                                    )
                                })
                            }
                        </Info>
                        <Summary>
                            <SummaryTitle>Thông Tin Hóa Đơn</SummaryTitle>
                            <SummaryItem>
                                <SummaryItemText>Tổng tiền</SummaryItemText>
                                <SummaryItemPrice>{data && formatter.format(data.reduce((total, item) => { return total + item.quantity * item.price }, 0))}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>VAT</SummaryItemText>
                                <SummaryItemPrice>{data && formatter.format(data.reduce((total, item) => { return total + item.quantity * item.price }, 0) * 0.1)}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem type="total">
                                <SummaryItemText>Thanh toán</SummaryItemText>
                                <SummaryItemPrice>{data && formatter.format(data.reduce((total, item) => { return total + item.quantity * item.price }, 0) * 1.1)}</SummaryItemPrice>
                            </SummaryItem>
                            <Button
                                onClick={() => {
                                    if (isAuth) {
                                        // setIsModalInfo(true)
                                        setIsOpenDrawer(true)
                                    } else {
                                        navigate('/login')
                                    }
                                }}
                                disabled={data.length <= 0}
                            >
                                Đặt Hàng Ngay
                            </Button>
                        </Summary>
                    </Bottom>
                </Wrapper>
                <Drawer
                    title="Thông  tin  đặt hàng."
                    placement='right'
                    open={isOpenDrawer}
                    onClose={() => { setIsOpenDrawer(false) }}
                    width={660}
                >
                    <CustomerInfoForm onClose={() => { setIsOpenDrawer(false) }} onFinish={(value) => { hanldleCheckout(value) }} />
                </Drawer>
            </Container>
        </Helmet >
    )
}

export default Webcart