import { Col, Row } from 'antd'
import React from 'react'
import ProductCard from './ProductCard'

const ProductList = ({list}) => {
    console.log(list)
    return (
        <Row gutter={[32, 64]}>
            {list && list.length > 0 && 
                list.map((item, index) => {
                    return(
                        <Col span={6} key={item.id}>
                            <ProductCard product={item} />
                        </Col>
                    )
                })
            }
        </Row>
    )
}

export default ProductList