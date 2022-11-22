import React from 'react'
import Helmet from '../../components/Helmet'
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
`

const Wrapper = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    align-items: flex-start;
`
const Right = styled.div`
    width: 75%;
    padding: 20px;
`
const CartWrapper = styled.div`
    width: 100%;
`
const Cart = styled.div``
const CartTitle = styled.div`
    width: 100%;
    text-transform: capitalize;
    font-size: 20px;
    font-weight: 300;
`
const ProductListWrapper = styled.div``
const ProductList = styled.div``
const Left = styled.div`
    width: 25%;
`
const BillWrapper = styled.div``
const Bill = styled.div``

const AdmBills = () => {
    return (
        <Helmet title="Hoá Đơn">
            <Container>
                <Wrapper>
                    <Right>
                        <CartWrapper>
                            <CartTitle>giỏ hàng</CartTitle>
                            <Cart>

                            </Cart>
                        </CartWrapper>
                        <ProductListWrapper>
                            <ProductList>

                            </ProductList>
                        </ProductListWrapper>
                    </Right>
                    <Left>
                        <BillWrapper>
                            hóa đơn
                            <Bill>
                                
                            </Bill>
                        </BillWrapper>
                    </Left>
                </Wrapper>
            </Container>
        </Helmet>
    )
}

export default AdmBills