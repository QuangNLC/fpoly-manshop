import React, { useEffect, useState } from 'react'
import { Add, Remove } from '@mui/icons-material'
import Helmet from '../../components/Helmet'
import styled from '@emotion/styled'
import { useParams } from 'react-router-dom'
import productAPI from '../../api/productsAPI'
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import { formatter } from '../../utils'
import { useDispatch } from 'react-redux'

const Container = styled.div``
const Wrapper = styled.div`
    padding: 50px;
    display: flex;
`
const ImageContainer = styled.div`
    flex: 1;
    width : 50%;
`
const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 0 50px;
`
const Title = styled.h1`
    font-weight: 200;
`
const Rating = styled.div``

const Desc = styled.div`
    margin: 20px 0;
`
const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`
const FilterContainer = styled.div`
    width: 50%;
    display:flex;
    justify-content: space-between;
`
const Filter = styled.div`
    display:flex;
    align-items:center;
`
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;

`
const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: 10px;
    cursor: pointer;
    background-color: ${props => props.color};
    margin-top: 30px;
`

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`
const FilterSizeOption = styled.option`
`
const FilterSizeOptionQuantity = styled.div``
const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const AmountContainer = styled.div`
    display: flex;
    align-items:center;
    font-weight: 700;
    margin-top: 30px;
`
const Amount = styled.div`
    width:30px;
    height:30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
`
const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;

    &:hover{
        background-color: #f8f4f4;
    }
`
const ShowedImage = styled.div``

const PreviewImageList = styled.div`
    width: 100%;
`
const ImageList = styled.ul`
    width: 100%;
    display: flex;
    overflow-x: scroll;
`
const ImageListItem = styled.li`
    width: 120px;
    height: 180px;
    margin: 0px 10px;
`
const ImageListDetail = styled.img`
    width: 100%;
    height: 100%;
    object-fit:cover;    
`

const ProductDetail = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        const action = {
            type: "ADD_TO_CART",
            payload: {
                size: selectedSize,
                quantity: selectedQuantity,
                price: product.import_price,
                product: {
                    id: product.id,
                    name: product.name,
                    img: product.images[0] && product.images[0].photo
                }
            }
        }
        dispatch(action)
    };

    const hanleChangeSize = (e) => {
        setSelectedSize(e.target.value)
    }



    useEffect(() => {
        setIsLoading(true)
        productAPI.getProduct(id)
            .then((res) => {
                if (!res.status) {
                    console.log(res)
                    setIsLoading(false);
                    setProduct(res);
                    setSelectedSize(res.productsizes[0].size.title)
                } else {
                    console.log(res)
                }
            })
    }, [id])
    return (
        <Helmet
            title="ManShop - Sản Phẩm"
        >
            <Container>
                <Wrapper>
                    {
                        isLoading ?
                            (
                                <Skeleton>
                                    Loading...
                                </Skeleton>
                            ) :
                            (
                                <>
                                    <ImageContainer>
                                        <ShowedImage>
                                            <Image src={product?.images[0]?.photo || "https://i.ibb.co/S6qMxwr/jean.jpg"} />
                                        </ShowedImage>
                                        <PreviewImageList>
                                            <ImageList>
                                                {
                                                    product.images && product.images.map((item, index) => {
                                                        return (
                                                            <ImageListItem key={index}>
                                                                <ImageListDetail src={item.photo || "https://i.ibb.co/S6qMxwr/jean.jpg"} />
                                                            </ImageListItem>
                                                        )
                                                    })
                                                }

                                            </ImageList>
                                        </PreviewImageList>
                                    </ImageContainer>

                                    <InfoContainer>
                                        <Title>{product?.name}</Title>
                                        <Rating>

                                        </Rating>
                                        <Desc>Giới thiệu đến bạn chiếc áo đảm bảo sự thanh lịch mã vẫn đảm bảo được sự vừa vặn và thoải mái, Coolmate đã có những cải tiến để đem đến cho bạn chiếc áo tốt hơn đó chính là với chất liệu Cotton USA chất lượng cao. Đem đến cho bạn chiếc áo với phiên bản cải tiến hơn và trải nghiệm thực sự ổn so với những chiếc áo bạn đang mặc; và chắc chắn đây sẽ là chiếc áo đưa sự thoải mái lên hàng đầu.</Desc>
                                        <Price>{formatter.format(product?.import_price)}</Price>
                                        <FilterContainer>
                                            <Filter>
                                                <FilterTitle>Size</FilterTitle>
                                                <FilterSize onChange={hanleChangeSize}>
                                                    {
                                                        product?.productsizes.map(item => (
                                                            <React.Fragment key={item.id}>
                                                                <FilterSizeOption value={item.size.title}>{item.size.title}</FilterSizeOption>
                                                            </React.Fragment>
                                                        ))
                                                    }
                                                </FilterSize>
                                            </Filter>
                                        </FilterContainer>
                                        <AddContainer>
                                            <AmountContainer>
                                                <Remove onClick={() => { setSelectedQuantity(selectedQuantity > 0 ? selectedQuantity - 1 : 0) }} />
                                                <Amount>{selectedQuantity}</Amount>
                                                <Add onClick={() => { setSelectedQuantity(selectedQuantity + 1) }} />
                                            </AmountContainer>
                                            <Button onClick={() => { handleAddToCart(product) }}>ADD TO CART</Button>
                                        </AddContainer>
                                    </InfoContainer></>
                            )
                    }

                </Wrapper>
            </Container>
        </Helmet>
    )
}

export default ProductDetail