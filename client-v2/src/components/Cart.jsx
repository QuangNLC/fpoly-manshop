import React, { useEffect, useState } from 'react'
import { Table, Typography, InputNumber, Button, Modal, notification } from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { changeCartItemQuantityAction, deleteCartItemAction } from '../redux/actions/CartReducerAction';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';



const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description: des,
    });
};
const Cart = ({ cart }) => {

    const dispatch = useDispatch()
    const [data, setData] = useState([])

    const hanldeDeleteCartIem = (item) => {
        Modal.confirm({
            title: "Hộp Thoại Xác Nhận",
            content: "Bạn có muốn xóa sản phẩm khỏi giỏ hàng không?",
            okText: "Xác Nhận",
            cancelText: "Hủy Bỏ",
            onOk: () => {
                openNotificationWithIcon('warning', 'Thông báo', `Xóa sản phẩm khỏi giỏ hàng!`);
                dispatch(deleteCartItemAction(item));
            }
        })
    }

    const handleClickUpdateCartItemQuantity = (item, newQuantity) => {
        if (newQuantity <= 0) {
            hanldeDeleteCartIem(item);
        } else {
            if (newQuantity > item.selectedSize.quantity) {
                openNotificationWithIcon('warning', 'Thông báo', `Trong kho hiện  còn lại ${item.selectedSize.quantity}  sản phẩm!`);
                dispatch(changeCartItemQuantityAction({ ...item, quantity: item.selectedSize.quantity }));
            } else {
                dispatch(changeCartItemQuantityAction({ ...item, quantity: newQuantity }));
            }

        }
    }

    const handleChangeCartItemQuantity = (e, item) => {
        let index = data.findIndex(dataItem => (dataItem.product.id === item.product.id && dataItem.selectedSize.id === item.selectedSize.id));
        if (index !== -1) {
            data[index].quantity = e;
            setData([...data])
        }
    }

    const handleBlurCartItemQuantityInput = (e, item) => {
        let index = data.findIndex(dataItem => (dataItem.product.id === item.product.id && dataItem.selectedSize.id === item.selectedSize.id));
        // console.log(index)
        if (index !== -1) {
            if (Number.isNaN(Number.parseInt(data[index].quantity))) {
                data[index].quantity = 1;
                let payload = {
                    ...item,
                    quantity: 1
                }
                dispatch(changeCartItemQuantityAction(payload));
                setData([...data])
                openNotificationWithIcon('error', 'Lỗi nhập liệu', 'Vui lòng nhập  số lượng mua hàng là một số tự nhiên lớn hơn  0!')
            } else {
                if (Number.parseInt(data[index].quantity) <= 0) {
                    data[index].quantity = 1;
                    let payload = {
                        ...item,
                        quantity: 1
                    }
                    dispatch(changeCartItemQuantityAction(payload));
                    setData([...data])
                    openNotificationWithIcon('error', 'Lỗi nhập liệu', 'Vui lòng nhập  số lượng mua hàng là một số tự nhiên lớn hơn  0!')
                } else {
                    let quantity = Number.parseInt(data[index].quantity)
                    if (quantity > cart.cart[index].selectedSize.quantity) {
                        quantity = cart.cart[index].selectedSize.quantity
                        data[index].quantity = quantity;
                        let payload = {
                            ...item,
                            quantity: quantity
                        }
                        dispatch(changeCartItemQuantityAction(payload));
                        setData([...data])
                        openNotificationWithIcon('warning', 'Thông báo', `Trong kho hiện  còn lại ${cart.cart[index].selectedSize.quantity}  sản phẩm!`)
                    } else {
                        data[index].quantity = quantity;
                        let payload = {
                            ...item,
                            quantity: quantity
                        }
                        dispatch(changeCartItemQuantityAction(payload));
                        setData([...data])
                    }
                }
            }
        }
    }

    const columns = [
        {
            title: '',
            render: (record) => {
                return (
                    <div className="cart--item__img">
                        <img src={`http://localhost:8080/api/file/images/${record.product.images[0].photo}`} />
                    </div>
                )
            },
            width: 150
        },
        {
            title: 'Sản phẩm',
            render: (record) => {
                return (
                    <div className="cart--item__pr">
                        <div className="cart--item__pr--name">
                            <Typography.Title level={5}>
                                <Link to={`/product/${record?.product?.id}`}>
                                    {record?.product?.name}
                                </Link>
                            </Typography.Title>
                        </div>
                        <div className="cart--item__pr--price">
                            {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(record?.product?.price)}
                        </div>
                        <div className="cart--item__pr--size">
                            Size: <b>{record?.selectedSize?.size?.title}</b>
                        </div>
                    </div>
                )
            }
        },
        {
            title: 'Số lượng',
            render: (record) => {
                return (
                    <div className="cart--item__quantity">
                        <div className="cart--item__quantity--minus">
                            <MinusOutlined onClick={() => { handleClickUpdateCartItemQuantity(record, record.quantity - 1) }} />
                        </div>
                        <div className="cart--item__quantity--info">
                            <InputNumber
                                value={record?.quantity}
                                style={{ border: 'none', textAlign: 'center' }}
                                onChange={(e) => { handleChangeCartItemQuantity(e, record) }}
                                onBlur={(e) => { handleBlurCartItemQuantityInput(e, record) }}
                            />
                        </div>
                        <div className="cart--item__quantity--plus">
                            <PlusOutlined onClick={() => { handleClickUpdateCartItemQuantity(record, record.quantity + 1) }} />
                        </div>
                    </div>
                )
            },
            width: 200
        },
        {
            title: 'Số tiền',
            render: (record) => {
                return (
                    <div className="cart--item__totalprice">
                        {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        }).format(record?.product?.price * record?.quantity)}
                    </div>
                )
            },
        },
        {
            title: '',
            render: (record) => {
                return (
                    <div className="cart--item__actions">
                        <Button type={'primary'} danger onClick={() => { hanldeDeleteCartIem(record) }}>Xoá Khỏi Giỏ</Button>
                    </div>
                )
            },
        }
    ];

    useEffect(() => {
        if (cart) {
            setData(cart.cart.map((item) => ({
                ...item, key: item.id
            })))
        }
    }, [cart])

    return (
        <div className="cart">
            <Table
                columns={columns}
                dataSource={data}
                style={{ width: '100%' }}
                scroll={{
                    y: '60vh',
                }}
                pagination={false}
            />
            <div className="cart--total">
                <div className="cart--total__item">
                    <div className="cart--total__item--title">Tổng Số Tiền</div>
                    <div className="cart--total__item--content">
                        {
                            new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(cart.cart.reduce(((total, item) => total + item.product.price * item.quantity), 0))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart