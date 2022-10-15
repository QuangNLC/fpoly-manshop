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
import { clearCartAction } from '../../redux/actions/CartReducerAtion'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


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
const ProductName = styled.span``
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
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
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
const AmountInput = styled.input`
    width :30px;
    height: 100%;
    border:none;
    outline: none;
`

const Webcart = () => {
    const [isModalInfo, setIsModalInfo] = useState(false);
    const cartReducer = useSelector(state => state.cartReducer);
    const auth = useSelector(state => state.auth.auth);
    const isAuth = useSelector(state => state.auth.isAuth);
    const [customerValue, setCustomerValue] = useState({
        adress: auth ? auth.info.adress :"",
        phone:auth ? auth.info.phone : "",
    });


    const dispatch = useDispatch();
    const navigate = useNavigate()

    const hanldleCheckout = () => {
        if (cartReducer.cart && cartReducer.cart.length > 0) {
            let payload = {
                "users": {
                    "username": auth.info.username
                },
                "total_price": cartReducer.cart.reduce((total, item) => { return total + item.quantity * item.price }, 0) * 1.1,
                "customers": {
                    "phone": customerValue.phone,
                    "address": customerValue.adress,
                    "customerInfor": "hoang chuong canh ba phu tho",
                    "user": {
                        "username": auth.info.username
                    }
                },
                "orderDetail": [
                    ...cartReducer.cart.map((item) => ({
                        product: {
                            id: item.product.id
                        },
                        size: item.size.size.tile,
                        quantity: item.quantity,
                        total_price: item.price * item.quantity
                    }))
                ]
            };
            checkoutAPI.checkout(payload)
                .then(res => {
                    console.log(res);
                    dispatch({
                        type: "CLEAR_CART"
                    });
                    setIsModalInfo(false);
                })
                .catch(err => {
                    console.log(err);
                });

        }
    };

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

    const onChangeQuantity = (e, item) => {
        console.log(item)
        if (e.target.value) {
            if (e.target.value > 0) {
                if (e.target.value > item.size.quantity) {
                    handleClickUpdateCartItemQuantity(item, 30);
                } else {
                    handleClickUpdateCartItemQuantity(item, e.target.value);
                }
            }
            else {
                handleClickUpdateCartItemQuantity(item, 1);
            };
        };
    };

    useEffect(() => {
        setCustomerValue(
            {
                adress: auth ? auth.info.adress : "",
                phone: auth ? auth.info.phone : "",
            }
        )
    }, [auth])

    return (
        <Helmet
            title={"Giỏ Hàng"}
        >
            <Container>
                <Wrapper>
                    <Title>Giỏ Hàng</Title>
                    <Top>
                        {
                            cartReducer.cart.length > 0 &&
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
                                cartReducer.cart && cartReducer.cart.length <= 0 &&
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
                                cartReducer.cart && cartReducer.cart.length > 0 && cartReducer.cart.map((item, index) => {
                                    return (
                                        <Product key={index}>
                                            <ProductDetail>
                                                <Image src={item.product.images[0].photo || "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1614188818-TD1MTHU_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_THUNDER_b01b1013-cd8d-48e7-bed9-52db26515dc4.png?crop=1xw:1.00xh;center,top&resize=480%3A%2A"} />
                                                <Details>
                                                    <ProductName>
                                                        <b>Product:</b> {item.product?.name}
                                                    </ProductName>
                                                    <ProductId>
                                                        <b>ID:</b> {item.product.id}
                                                    </ProductId>
                                                    <ProductSize>
                                                        <b>Size:</b> {item.size.size.title}
                                                    </ProductSize>
                                                </Details>
                                            </ProductDetail>
                                            <PriceDetail>
                                                <ProductAmountContainer>
                                                    <div onClick={() => { handleClickUpdateCartItemQuantity(item, item.quantity + 1) }}>
                                                        <Add />
                                                    </div>
                                                    <ProductAmount>
                                                        <AmountInput
                                                            type='number'
                                                            value={item.quantity}
                                                            onChange={(e) => { onChangeQuantity(e, item) }}
                                                        // onBlur={(e) => {
                                                        //     if (e.target.value <= 0) {
                                                        //         setSelectedQuantity(1)
                                                        //     } else if (e.target.value > product.productsizes[selectedSizeIndex].quantity) {
                                                        //         setSelectedQuantity(product.productsizes[selectedSizeIndex].quantity)
                                                        //     } else {
                                                        //         setSelectedQuantity(e.target.value % 1 === 0 ? e.target.value : Math.floor(e.target.value))
                                                        //     }
                                                        // }}
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
                                                                    <Remove />
                                                                </DialogHOC>
                                                            )
                                                            :
                                                            (
                                                                <div onClick={() => { handleClickUpdateCartItemQuantity(item, item.quantity - 1) }} >
                                                                    <Remove />
                                                                </div>
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
                                <SummaryItemPrice>{cartReducer.cart && formatter.format(cartReducer.cart.reduce((total, item) => { return total + item.quantity * item.price }, 0))}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>VAT</SummaryItemText>
                                <SummaryItemPrice>{cartReducer.cart && formatter.format(cartReducer.cart.reduce((total, item) => { return total + item.quantity * item.price }, 0) * 0.1)}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem type="total">
                                <SummaryItemText>Thanh toán</SummaryItemText>
                                <SummaryItemPrice>{cartReducer.cart && formatter.format(cartReducer.cart.reduce((total, item) => { return total + item.quantity * item.price }, 0) * 1.1)}</SummaryItemPrice>
                            </SummaryItem>
                            <Button
                                onClick={() => { 
                                    if(isAuth){
                                        setIsModalInfo(true)
                                    }else{
                                        navigate('/login')
                                    } 
                                }}
                                disabled={cartReducer.cart.length <= 0}
                            >
                                Đặt Hàng Ngay
                            </Button>
                        </Summary>
                    </Bottom>
                </Wrapper>
                <Dialog open={isModalInfo} onClose={() => { setIsModalInfo(false) }}>
                    <DialogTitle>Thông tin nhận hàng</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Vui lòng nhập thông tin nhận hàng
                        </DialogContentText>
                        <CustomerInputContainer>
                            <InputGroup>
                                <Label>Địa chỉ nhận hàng</Label>
                                <Input
                                    value={customerValue.adress}
                                    onChange={onChangeCustomerValue}
                                    name="adress"
                                />
                            </InputGroup>
                            <InputGroup>
                                <Label>Số điện thoại</Label>
                                <Input
                                    value={customerValue.phone}
                                    onChange={onChangeCustomerValue}
                                    name="phone"
                                />
                            </InputGroup>
                        </CustomerInputContainer>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setIsModalInfo(false) }}>Hủy Bỏ</Button>
                        <Button onClick={() => { hanldleCheckout() }}>Đặt Hàng</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Helmet >
    )
}

export default Webcart