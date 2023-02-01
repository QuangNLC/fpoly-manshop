
import React, { useEffect, useState } from 'react'
import img from '../assets/imgs/product-img-1.jpg'
import { WalletOutlined, ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { notification, Tag } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCartAction } from '../redux/actions/CartReducerAction';



const findFirstValidSizeIndex = (product) => {
    let index = -1;

    if (product?.productsizes.length > 0) {
        for (let i = 0; i < product?.productsizes.length; i++) {
            if (product?.productsizes[i].isActive && (product?.productsizes[i].quantity > 0)) {
                index = i;
                break;
            }
        }
    }

    return index;
}


const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description: des,
    });
};

const checkPrDiscount = (prm) => {
    let result = false;
    let now = new Date();
    if (prm.isactive) {
        result = (now >= new Date(prm.dateafter) && now <= new Date(prm.datebefor))
    }
    return result
}
const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isDiscount, setIsDiscount] = useState(false);

    const onAddToCart = () => {
        const index = findFirstValidSizeIndex(product);
        if (index !== -1) {
            const payload = {
                product,
                selectedSize: product?.productsizes[index],
                quantity: 1
            }
            openNotificationWithIcon('success', 'Thông báo', 'Thêm sản phẩm vào giỏ hàng thành công.')
            dispatch(addToCartAction(payload));
        }
    }

    const onBuyNow = () => {
        const index = findFirstValidSizeIndex(product);
        if (index !== -1) {
            const payload = {
                product,
                selectedSize: product?.productsizes[index],
                quantity: 1
            }
            openNotificationWithIcon('success', 'Thông báo', 'Thêm sản phẩm vào giỏ hàng thành công.')
            dispatch(addToCartAction(payload));
            navigate("/cart");
        }
    }

    useEffect(() => {
        if (product && product.promotions) {
            if (product.promotions.length > 0) {
                if (checkPrDiscount(product.promotions[0].promition)) {
                    console.log(product.promotions[0])
                    setIsDiscount(
                        true
                    )
                }

            } else {
                setIsDiscount(false)
            }
        }
    }, [product])


    return (
        product &&
        (
            <div className="product--card">
                {
                    isDiscount &&
                    (
                        <div className="product--card__discountbage">
                            <Tag color="orange">{`Khuyến Mại: ${product?.promotions[0]?.promition?.title}`}</Tag>
                        </div>
                    )
                }
                <div className="product--card__modal">
                    <div className="product--card__modal--item" onClick={() => { onAddToCart() }}>
                        <ShoppingCartOutlined />
                        Thêm Vào Giỏ
                    </div>
                    <div className="product--card__modal--item" onClick={() => { onBuyNow() }}>
                        <WalletOutlined />
                        Mua Ngay
                    </div>
                    <div className="product--card__modal--item" onClick={() => { navigate(`/product/${product.id}`) }}>
                        <SearchOutlined />
                        Thông Tin
                    </div>
                </div>
                <div className="product--card__img">
                    <img src={`http://localhost:8080/api/file/images/${product?.images[0]?.photo}`} alt="" />
                </div>
                <div className="product--card__title">
                    <p>
                        {product?.name}
                    </p>
                </div>
                <div className="product--card__price">
                    {
                        isDiscount ?
                            (
                                <>
                                    <div className="product--card__price--new">
                                        {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(product.price - product.price * (product?.promotions[0]?.promition?.bypersent / 100))}
                                    </div>
                                    <div className="product--card__price--old">
                                        {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(product?.price)}
                                    </div>
                                </>

                            )
                            :
                            (
                                <>
                                    <div className="product--card__price--new">
                                        {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(product?.price)}
                                    </div>
                                </>
                            )
                    }
                </div>
            </div>
        )
    )
}

export default ProductCard