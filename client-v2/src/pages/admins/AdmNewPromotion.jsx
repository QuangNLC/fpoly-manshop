import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Modal, notification, Table, Tooltip, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import promotionAPI from '../../apis/promotionAPI';
import Helmet from '../../components/Helmet'


const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description: des,
    });
};
const AdmNewPromotion = () => {
    const auth = useSelector(state => state.auth.auth);
    const navigate = useNavigate();
    const [listPr, setListPr] = useState([]);
    const [selectedListPr, setSelectedListPr] = useState([]);
    const listPrColumn = [
        {
            title: 'STT',
            dataIndex: 'index',
        },
        {
            title: 'Tên Sản Phẩm',
            dataIndex: 'name',
        },
        {
            title: 'Mã Sản Phẩm',
            dataIndex: 'id',
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
            dataIndex: 'price',
            render: (text) => {
                return (
                    <>
                        {text}
                    </>
                )
            }
        },
        ,
        {
            title: 'Thao Tác',
            render: (record) => {
                return (
                    <Checkbox onChange={(e) => { handleClickSelectListPrItem(e, record) }} />
                )
            }
        }
    ]

    const handleClickSelectListPrItem = (e, item) => {
        console.log(e.target.checked, item)
        if (e.target.checked) {
            let index = selectedListPr.findIndex((pr) => pr.id === item.id)
            if (index === -1) {
                selectedListPr.push(item);
                setSelectedListPr([...selectedListPr])
            }
        } else {
            let index = selectedListPr.findIndex((pr) => pr.id === item.id)
            if (index !== -1) {
                selectedListPr.splice(index, 1);
                setSelectedListPr([...selectedListPr])
            }
        }
    }

    const handleDeleteSelectedListPrItem = () => {
        if (selectedListPr) {
            selectedListPr.forEach((item) => {
                let index = listPr.findIndex(pr => pr.id === item.id)
                if (index !== -1) {
                    listPr.splice(index, 1)
                    products.push(item)
                }
            })
            setProducts([...products])
            setListPr([...listPr])
            setSelectedListPr([])
            openNotificationWithIcon('warning', 'Thông Báo', 'Xóa sản phẩm thành công')
        }
    }


    const [products, setProducts] = useState([])
    const [selectedProducts, setSelectedProducts] = useState([])
    const productsColumn = [
        {
            title: 'STT',
            dataIndex: 'index',
        },
        {
            title: 'Tên Sản Phẩm',
            dataIndex: 'name',
        },
        {
            title: 'Mã Sản Phẩm',
            dataIndex: 'id',
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
            dataIndex: 'price',
            render: (text) => {
                return (
                    <>
                        {text}
                    </>
                )
            }
        },
        {
            title: '',
            render: (record) => {
                return (
                    <Checkbox onChange={(e) => { handleClickSelectProductItem(e, record) }} />
                )
            }
        }
    ]

    const handleClickSelectProductItem = (e, item) => {
        console.log(e.target.checked, item)
        if (e.target.checked) {
            let index = selectedProducts.findIndex((pr) => pr.id === item.id)
            if (index === -1) {
                selectedProducts.push(item);
                setSelectedProducts([...selectedProducts])
            }
        } else {
            let index = selectedProducts.findIndex((pr) => pr.id === item.id)
            if (index !== -1) {
                selectedProducts.splice(index, 1);
                setSelectedProducts([...selectedProducts])
            }
        }
    }

    const handleAddSelectedProductsToList = () => {
        if (selectedProducts) {
            selectedProducts.forEach((item) => {
                let index = products.findIndex(pr => pr.id === item.id)
                if (index !== -1) {
                    products.splice(index, 1)
                }
            })
            setProducts([...products])
            setListPr([...listPr, ...selectedProducts])
            setSelectedProducts([])
            openNotificationWithIcon('success', 'Thông Báo', 'Thêm sản phẩm thành công')
        }

    }


    const handleClickSubmitForm = (value) => {
        console.log(value)
        let payload = {
            title: value?.name,
            dateafter: new Date(value?.date_after),
            datebefor: new Date(value?.date_before),
            users: {
                username: auth?.info?.username
            },
            bypersent: value?.discount,
            listpr: [...listPr.map(item => item.id)]
        }
        promotionAPI.createPromotion(payload)
            .then(res => {
                if (!res.status) {
                    Modal.success({ title: 'Hộp Thoại Thông Báo', content: 'Tạo khuyến mại thành công', okText: 'Xác Nhận' });
                    navigate('/admin/promotion-list')
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        console.log(selectedListPr)
    }, [selectedListPr])

    useEffect(() => {
        console.log(selectedProducts)
    }, [selectedProducts])

    useEffect(() => {
        promotionAPI.getProductNotExist()
            .then(res => {
                if (!res.status) {
                    setProducts(res.map((item, index) => ({
                        index: index + 1,
                        key: item.id,
                        ...item
                    })))
                    console.log(res)
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Helmet
            title={"Thêm Mới Khuyến Mại"}
        >
            <div className="adm--newpromotion">
                <div className="adm--newpromotion__title">
                    <Typography.Title level={4}>Tạo Khuyến Mại</Typography.Title>
                    <Button type='primary' onClick={() => { navigate('/admin/promotion-list') }}>Danh Sách</Button>
                </div>
                <div className="adm--newpromotion__body">
                    <div className="adm--newpromotion__body--form">
                        <Typography.Title level={5}>Thông Tin Khuyến Mại</Typography.Title>
                        <Form
                            layout='vertical'
                            wrapperCol={{ span: 24 }}
                            labelCol={{ span: 24 }}
                            onFinish={handleClickSubmitForm}
                        >
                            <Form.Item
                                label="Tên Khuyến Mại"
                                name="name"
                                hasFeedback
                                rules={[
                                    { required: true, message: 'Vui lòng nhập tên khuyến mại.' },
                                    { whitespace: true, message: 'Vui lòng không nhập khoảng trống.' }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Mức Giảm Giá (%)"
                                name="discount"
                                hasFeedback
                                rules={[
                                    { required: true, message: 'Vui lòng nhập tên khuyến mại.' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (value < 0) {
                                                return Promise.reject("Vui lòng nhập số lớn hơn 0.")
                                            } else if (value > 100) {
                                                return Promise.reject("Vui lòng nhập số nhỏ hơn 100.")
                                            } else {
                                                return Promise.resolve();
                                            }
                                        }
                                    })
                                ]}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                label="Ngày Bắt Đầu"
                                name="date_after"
                                hasFeedback
                                rules={[
                                    { required: true, message: 'Vui lòng nhập ngày bắt đầu.' }
                                ]}
                            >
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                label="Ngày Kết Thúc"
                                name="date_before"
                                hasFeedback
                                rules={[
                                    { required: true, message: 'Vui lòng nhập ngày kết thúc.' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('date_before') > getFieldValue('date_after')) {
                                                return Promise.resolve()
                                            }
                                            return Promise.reject('Ngày kết thúc phải sau ngày bắt đầu!')
                                        }
                                    })
                                ]}
                            >
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item>
                                {
                                    listPr && listPr.length > 0 ?
                                        (
                                            <Button type='primary' htmlType='submit'>Tạo Khuyến Mại</Button>
                                        )
                                        :
                                        (
                                            <Tooltip
                                                title="Vui lòng chọn sản phẩm khuyến mại."
                                            >
                                                <Button type='primary' htmlType='submit' disabled>Tạo Khuyến Mại</Button>
                                            </Tooltip>
                                        )
                                }
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="adm--newpromotion__body--tables">
                        <div className="adm--newpromotion__body--tables__discountpr">
                            <Typography.Title level={5}>Sản Phẩm Khuyến Mại</Typography.Title>
                            <Button type='primary' disabled={!selectedListPr || selectedListPr <= 0} onClick={handleDeleteSelectedListPrItem}>Xoá Sản Phẩm</Button>
                            <Table
                                dataSource={listPr}
                                columns={listPrColumn}
                                scroll={{
                                    y: '40vh'
                                }}
                                bordered
                            />
                        </div>
                        <div className="adm--newpromotion__body--tables__undiscountpr">
                            <Typography.Title level={5}>Danh Sách Sản Phẩm</Typography.Title>
                            <Button type='primary' disabled={!selectedProducts || selectedProducts <= 0} onClick={handleAddSelectedProductsToList}>Thêm Sản Phẩm</Button>
                            <Table
                                dataSource={products}
                                columns={productsColumn}
                                scroll={{
                                    y: '40vh'
                                }}
                                bordered
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default AdmNewPromotion