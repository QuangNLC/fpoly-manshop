import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, notification, Select, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { productAPI } from '../../apis/productAPI'
import Helmet from '../../components/Helmet'


const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description: des,
    });
};
const AdmNewProduct = () => {

    const [categories, setCategories] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [colors, setColors] = useState([]);

    const navigate = useNavigate();

    const onClickNavToProductList = () => {
        navigate("/admin/product-list")
    }

    const onFinishCreateProduct = (value) => {
        const payload = {
            ...value,
            description: value?.description ? value?.description : ''
        }
        productAPI.createProduct(payload)
        .then(res => {
            if(!res.status){
                console.log(res);
                openNotificationWithIcon('info','Thông Báo','Tạo sản phẩm mới thành công.');
                navigate(`/admin/product/edit/${res}`);
            }else{
                console.log(res);
            }
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        productAPI.getFilterInfo()
            .then(res => {
                if (!res.status) {
                    setCategories(res.categories)
                    setSizes(res.sizes)
                    setMaterials(res.materials)
                    setColors(res.colors)
                } else {
                    console.log(res);
                }
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <Helmet
            title={"Thêm Sản Phẩm"}
        >
            <div className="adm--newpr">
                <div className="adm--newpr__title">
                    <Typography.Title level={4}>Thêm Mới Sản Phẩm</Typography.Title>
                    <Button type='primary' onClick={onClickNavToProductList}>Danh Sách</Button>
                </div>
                <div className="adm--newpr__body">
                    <div className="adm--newpr__body--form">
                        <Form
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 12 }}
                            onFinish={onFinishCreateProduct}
                        >
                            <Form.Item
                                label="Tên Sản Phẩm"
                                name="name"
                                rules={[
                                    { required: true, message: "Tên sản phẩm không được để trống!" },
                                    { whitespace: true, message: "Không được nhập khoảng trắng!" }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Giá"
                                name="price"
                                rules={[
                                    { required: true, message: "Giá bán không được để trống !" },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (value && value > 0) {
                                                return Promise.resolve()
                                            }
                                            return Promise.reject('Giá không thể nhỏ hơn 0!')
                                        }
                                    })
                                ]}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                label="Mô Tả"
                                name="description"
                            >
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item
                                label="Thể Loại"
                                name="categoryId"
                                rules={[
                                    ((getFieldValue) => ({
                                        validator(_, value) {
                                            if (value && value > 0) {
                                                return Promise.resolve()
                                            }
                                            return Promise.reject('Vui lòng chọn thể loại!')
                                        }
                                    }))
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Thể Loại"
                                    optionFilterProp="children"
                                    style={{
                                        width: '100%',
                                    }}
                                    filterOption={(input, option) => {
                                        return (option?.children).toLowerCase().includes(input.toLowerCase())
                                    }
                                    }
                                >
                                    {
                                        categories.map((c) => (
                                            <Select.Option key={c.id} value={c.id}>
                                                {c.title}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Chất Liệu"
                                name="materialId"
                                rules={[
                                    ((getFieldValue) => ({
                                        validator(_, value) {
                                            if (value && value > 0) {
                                                return Promise.resolve()
                                            }
                                            return Promise.reject('Vui lòng chọn chất liệu!')
                                        }
                                    }))
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Chất liệu"
                                    style={{
                                        width: '100%',
                                    }}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => {
                                        return (option?.children).toLowerCase().includes(input.toLowerCase())
                                    }
                                    }

                                >
                                    {
                                        materials.map((c) => (
                                            <Select.Option key={c.id} value={c.id}>
                                                {c.title}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Màu Sắc"
                                name="colorId"
                                rules={[
                                    ((getFieldValue) => ({
                                        validator(_, value) {
                                            if (value && value > 0) {
                                                return Promise.resolve()
                                            }
                                            return Promise.reject('Vui lòng chọn màu!')
                                        }
                                    }))
                                ]}
                            >
                                <Select
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    {
                                        colors.map(c => (
                                            <Select.Option key={c.id} value={c.id}>
                                                <div style={{ width: 20, height: 20, backgroundColor: `${c.colorCode}`, marginTop: 4 }}>
                                                </div>
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                            >
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button icon={<PlusOutlined />} type={'primary'} htmlType="submit" >Thêm Mới</Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default AdmNewProduct