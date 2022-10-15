import React from 'react'
import styled from 'styled-components'
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { formatter } from "../utils";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/actions/CartReducerAtion';

const HoverOptionsContainer = styled.div`
    position:absolute;
    overflow: hidden;
    bottom: 10px;
    left:50%;
    display:flex;
    transform: translateX(-50%) translateY(120%);
    transition: all 0.25s ease-in;
    z-index: -1;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const Container = styled.div`
    width: 25%;
    height: 520px;
    padding: 20px;
    display:flex;
    justify-content: center;
    transition: all 0.25s ease-in;
    margin-bottom: 80px;
    &:hover ${HoverOptionsContainer}{
        transform:translateX(-50%);
        z-index: 1;
    }
    &:hover ${Image}{
        transform: scale(1.025);
    }
`
const Wrapper = styled.div`
    width: 320px;
    height: 100%;
`
const ImgContainer = styled.div`
    width: 100%;
    height: 380px;
    position: relative;
`


const HoverOption = styled.div`
    width: 50px;
    height: 50px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border : 0.5px solid #666;
    transition: all 0.25s ease-in;
    cursor: pointer;

    &:hover{
        background-color: red;
        color: white;
    }
`
const DetailContainer = styled.div`
    background-color: white;
    padding: 20px;
    border: 0.5px solid #999;
`
const Title = styled.h2``
const PriceContainer = styled.div`
    display: flex;
    align-items:center;
    justify-content: space-between;
    margin-top: 10px;
`
const NewPrice = styled.div`
    color: red;
    font-weight: 500;
`
const OldPrice = styled.div`
    color: #999;
    text-decoration: line-through;
`

const Product = ({ item }) => {
    const isAuth = useSelector(state => state.auth.isAuth)
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleClickAddToCart = (item) => {
        if (isAuth) {
            const payload = {
                size: item.productsizes[0],
                quantity: 1,
                price: item.export_price,
                product: {
                    ...item
                }
            }
            dispatch(addToCart(payload))
            navigate("/cart")
        } else {
            navigate("/login")
        }

    };

    return (
        <Container>
            <Wrapper>
                <ImgContainer>
                    <Image src={item.images && item.images[0].photo || item.img} />
                    <HoverOptionsContainer>
                        <HoverOption onClick={() => handleClickAddToCart(item)}><AddShoppingCartOutlinedIcon /></HoverOption>
                        <HoverOption><FavoriteBorderOutlinedIcon /></HoverOption>
                        <Link to={`/product/${item.id}`} style={{ color: 'black' }}>
                            <HoverOption><SearchOutlinedIcon /></HoverOption>
                        </Link>
                    </HoverOptionsContainer>
                </ImgContainer>
                <DetailContainer>
                    <Title>{item.name}</Title>
                    <PriceContainer>
                        <NewPrice>{formatter.format(item.import_price)}</NewPrice>
                        <OldPrice>{formatter.format(item.import_price * 1.1)}</OldPrice>
                    </PriceContainer>
                </DetailContainer>
            </Wrapper>
        </Container>
    )
}

export default Product