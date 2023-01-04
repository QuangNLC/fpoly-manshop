import { Button, Col, InputNumber, notification, Row, Tooltip, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import {useDispatch} from 'react-redux';
import {addToCartAction} from '../redux/actions/CartReducerAction.js'

const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description: des,
    });
};

const ProductDetail = ({ product }) => {
    const [previewImg, setPreviewImg] = useState(null)
    const [selectedSize, setSelectedSize] = useState(undefined)
    const [quantityInfo, setQuantityInfo] = useState(1)

    const dispatch = useDispatch();

    const onSelectSize = (size) => {
        setSelectedSize(size)
        setQuantityInfo(1)
    }
    const onChangeQuantityValue = (value) => {
        if (!value) {
            setQuantityInfo(1)
        } else {
            if (value <= 0) {
                openNotificationWithIcon('info', 'Thông báo', 'Nhập lớn hơn 0')
                setQuantityInfo(1)
            } else if (Math.floor(value) > selectedSize.quantity) {
                openNotificationWithIcon('info', 'Thông báo', `Hiện có sẵn ${selectedSize.quantity} sản phẩm.`)
                setQuantityInfo(selectedSize.quantity)
            } else {
                setQuantityInfo(Math.floor(value))
            }
        }
    }

    const handleAddToCart = () => {
        if (!selectedSize || !quantityInfo) {
            openNotificationWithIcon('info', 'Thông báo', 'Vui lòng chọn size và số lượng.')
        } else {
            const payload = {
                product,
                selectedSize,
                quantity: quantityInfo
            }
            openNotificationWithIcon('success','Thông báo','Thêm sản phẩm vào giỏ hàng thành côngg.')
            dispatch(addToCartAction(payload));

        }
    }



    useEffect(() => {
        setPreviewImg(`http://localhost:8080/api/file/images/${product?.images[0]?.photo}`)
    }, [product])

    return (
        <Row className='product--details' gutter={[32, 0]}>
            <Col span={12}>
                <div className="show--img">
                    <img src={previewImg} alt="" />
                </div>
                <div className="preview--imgs">
                    {
                        product.images && product.images.map((item, index) => {
                            return (
                                <div className="preview--imgs__item" key={item.id} onClick={() => { setPreviewImg(`http://localhost:8080/api/file/images/${item.photo}`) }}>
                                    <img src={`http://localhost:8080/api/file/images/${item.photo}`} alt="" />
                                </div>
                            )
                        })
                    }

                </div>
            </Col>
            <Col span={12}>
                <Typography.Title level={2}>{product?.name}</Typography.Title>
                <div className="details--gr">
                    <div className="details--gr__title">
                        <Typography.Text>Thể Loại</Typography.Text>
                    </div>
                    <div className="details--gr__content">
                        <Typography.Title level={4} style={{ marginBottom: 0 }}>{product?.category?.title}</Typography.Title>
                    </div>
                </div>
                <div className="details--gr">
                    <div className="details--gr__title">
                        <Typography.Text>Chất Liệu</Typography.Text>
                    </div>
                    <div className="details--gr__content">
                        <Typography.Title level={4} style={{ marginBottom: 0 }}>{product?.material?.title}</Typography.Title>
                    </div>
                </div>
                <div className="details--gr">
                    <div className="details--gr__title">
                        <Typography.Text>Mô Tả</Typography.Text>
                    </div>
                    <div className="details--gr__content">
                        {product?.descTitle}
                    </div>
                </div>
                <div className="details--price">
                    {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    }).format(product?.price)}
                </div>
                <div className="details--sizes">
                    <div className="details--gr__title">
                        <Typography.Title level={4}>Size</Typography.Title>
                    </div>
                    <div className="details--sizes__gr">
                        {product.productsizes.map((item, index) => (
                            <div className="details--sizes__gr--item" key={item.id}>
                                <Button disabled={!item.isActive || item.quantity <= 0} className={`details--sizes__gr--item__btn ${selectedSize && selectedSize.id === item.id ? 'selected' : ''}`} onClick={() => onSelectSize(item)}>
                                    {item.size.title}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
                {selectedSize &&
                    <div className='size--detail'>
                        {`${selectedSize.quantity} sản phẩm có sẵn.`}
                    </div>
                }
                <div className="details--actions">
                    <div className="details--actions__top">
                        <div className="details--actions__quantity">
                            <div className="details--actions__quantity--minus">
                                <MinusOutlined onClick={() => { onChangeQuantityValue(quantityInfo - 1) }} />
                            </div>
                            <div className="details--actions__quantity--info">
                                <InputNumber value={quantityInfo} onChange={onChangeQuantityValue} style={{ border: 'none', textAlign: 'center' }} disabled={!selectedSize} />
                            </div>
                            <div className="details--actions__quantity--plus">
                                <PlusOutlined onClick={() => { onChangeQuantityValue(quantityInfo + 1) }} />
                            </div>
                        </div>
                        <div className="details--actions__add">
                            {
                                (!selectedSize || !quantityInfo) ?
                                    (
                                        <Button className="details--actions__add--btn" disabled>THÊM VÀO GIỎ HÀNG</Button>
                                    )
                                    :
                                    (
                                        <Button className="details--actions__add--btn" onClick={() => { handleAddToCart() }}>THÊM VÀO GIỎ HÀNG</Button>
                                    )
                            }
                        </div>
                    </div>
                    <div className="details--actions__bottom">
                        {
                            (!selectedSize || !quantityInfo) ?
                                (
                                    <Button className="details--actions__bottom--btn" disabled>MUA NGAY</Button>
                                )
                                :
                                (

                                    <Button className="details--actions__bottom--btn">MUA NGAY</Button>
                                )
                        }
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default ProductDetail