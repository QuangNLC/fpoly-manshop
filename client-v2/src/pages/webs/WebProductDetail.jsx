import { Spin } from 'antd';
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';
import { productAPI } from '../../apis/productAPI';
import ProductDetail from '../../components/ProductDetail';



const WebProductDetail = () => {
    const {id} = useParams();
    const [product, setProduct] = useState(undefined)

    useEffect(() => {
        setProduct(undefined)
        productAPI.getProductById(id)
        .then(res => {
            if(!res.status){
                console.log(res)
                setProduct(res)
            }
        })
        .catch(err => console.log(err))
    },[id])

    return (
        <div style={{width: '100%'}}>
        {
            product ? 
            (
                <ProductDetail product={product}/>
            )
            :
            (
                <Spin />
            )
        }
        </div>
    )
}

export default WebProductDetail