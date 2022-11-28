import React, { useState } from 'react'
import Helmet from '../../components/Helmet'
import styled from 'styled-components'
import { useEffect } from 'react'
import productAPI from '../../api/productsAPI'
import { Button, Table } from 'antd'
import { formatter } from '../../utils'

const Container = styled.div`
    width: 100%;
`
const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
`
const Left = styled.div`
    flex: 3;
    padding: 10px;
`
const ProductsContainer = styled.div`
    width: 100%;
    padding: 5px;
    background-color: white;
    border-radius: 10px;
`
const Right = styled.div`
    flex : 1;
    padding: 10px;
`

const AdmPromotions = () => {
    const [products, setProducts] = useState([])
    const productColumn = [
        {
            title: 'STT',
            dataIndex: 'index',
        },
        {
            title: 'Tên Sản Phẩm',
            dataIndex: 'name',
        },
        {
            title: 'Loại Sản Phẩm',
            render: (record) => {
                return (
                    <>
                        {record?.category?.title}
                    </>
                )
            }
        },
        {
            title: 'Giá',
            dataIndex: 'export_price',
            render: (text) => {
                return (
                    <>
                        {formatter.format(text)}
                    </>
                )
            },
            sorter: (a, b) => a.export_price - b.export_price
        },
        {
            title: 'Thao Tác',
            render: (record) => {
                return (
                    <>
                        <Button type='primary'>Thêm Sản Phẩm</Button>
                    </>
                )
            }
        }
    ]

    useEffect(() => {
        productAPI.getAll()
            .then(res => {
                if (!res.status) {
                    setProducts(res.map((item, index) => {
                        return ({
                            index: index + 1,
                            key: item.id,
                            ...item
                        })
                    }))
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <Helmet
            title={"Quản Lý Khuyến Mại"}
        >
            <Container>
                <Wrapper>
                    <Left>
                        <ProductsContainer>
                            <Table dataSource={products} columns={productColumn} />
                        </ProductsContainer>
                    </Left>
                    <Right>Right</Right>
                </Wrapper>
            </Container>
        </Helmet>
    )
}

export default AdmPromotions