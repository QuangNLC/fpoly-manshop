
import React from 'react'
import img from '../assets/imgs/product-img-1.jpg'
import { WalletOutlined, ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    return (
        product &&
        (
            <div className="product--card">
                <div className="product--card__modal">
                    <div className="product--card__modal--item">
                        <ShoppingCartOutlined />
                        Thêm Vào Giỏ
                    </div>
                    <div className="product--card__modal--item">
                        <WalletOutlined />
                        Mua Ngay
                    </div>
                    <div className="product--card__modal--item" onClick={() => {navigate(`/product/${product.id}`)}}>
                        <SearchOutlined />
                        Thông Tin
                    </div>
                </div>
                <div className="product--card__img">
                    <img src={`http://localhost:8080/api/file/images/${product?.images[0]?.photo}`} alt="" />
                </div>
                <div className="product--card__title">
                    {product?.name}
                </div>
                <div className="product--card__price">
                    {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    }).format(product?.price)}
                </div>
            </div>
        )
    )
}

export default ProductCard