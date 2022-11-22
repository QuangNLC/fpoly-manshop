import React, { useEffect } from 'react'
import Helmet from '../../components/Helmet'
import styled from 'styled-components'
import productAPI from '../../api/productsAPI'
import { useState } from 'react'
import { Table } from 'antd'

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
const ProductTitle = styled.div`
    width: 100%;
    text-transform: capitalize;
    font-size: 20px;
    font-weight: 300;
`
const Left = styled.div`
    width: 25%;
`
const BillWrapper = styled.div``
const Bill = styled.div``


const productColumn = [
    {
        title: 'STT',
        dataIndex: 'index',
    },
    {
        title: 'Mã SP',
        dataIndex: 'id',
    },
    {
        title: 'Tên Sản Phẩm',
        dataIndex: 'title',
    },
    {
        title: 'Thể Loại',
        dataIndex: 'category',
    },
    {
        title: 'Size',
        dataIndex: 'size',
    },
    {
        title: 'Số Lượng',
        dataIndex: 'quantity',
    },
    {
        title: 'Đơn Giá',
        dataIndex: 'price',
    }
];

const AdmBills = () => {

    const [productData, setProductData] = useState([])
    const [productTableData, setProductTableData] = useState([])

    useEffect(() => {
        if (productData && productData.length > 0) {
            setProductTableData(productData.map((item, index) => {
                return (
                    {
                        key: item?.id,
                        index,
                        id: item?.id,
                        title: item?.name,
                        category: item?.category?.title,
                        size: 'X',
                        quantity: 1,
                        price: item?.export_price
                    }
                )
            }))
        }
    }, [productData])

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    useEffect(() => {
        productAPI.getAll()
            .then(res => {
                if (!res.status) {
                    setProductData(res)
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }, [])
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
                            <ProductTitle>Danh Sách Sản Phẩm</ProductTitle>
                            <ProductList>
                                <Table
                                    columns={productColumn}
                                    dataSource={productTableData}
                                    bordered
                                    onChange={onChange}
                                />
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