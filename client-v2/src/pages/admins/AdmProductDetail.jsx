import { DeleteOutlined, EditOutlined, PlusOutlined, ReloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Empty, Form, Input, InputNumber, message, Modal, notification, Select, Switch, Table, Tag, Typography, Upload } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { productAPI } from '../../apis/productAPI';
import Helmet from '../../components/Helmet';


const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description: des,
    });
};
const AdmProductDetail = () => {
    const { id } = useParams();
    const [info, setInfo] = useState(undefined);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [colors, setColors] = useState([]);
    const [editingForm] = useForm();
    const onClickNavToProductList = () => {
        navigate("/admin/product-list");
    };

    const onClickNavToNewProduct = () => {
        navigate("/admin/product/new");
    };


    const onFinishEditProduct = (value) => {
        const payload = {
            ...value,
            id: info?.id
        }
        Modal.confirm({
            title: 'Hộp Thoại Xác Nhận',
            content: 'Bạn có muốn cập nhật thông tin sản phẩm không.',
            okText: 'Xác Nhận',
            cancelText: 'Hủy Bỏ',
            onOk: () => {
                productAPI.updateProduct(payload)
                    .then(res => {
                        if (!res.status) {
                            openNotificationWithIcon('info', 'Thông Báo', 'Cập nhật thông tin sản phẩm.');
                            setInfo({ ...res });
                        }
                    })
            }
        })

    };

    const sizesColumn = [
        {
            title: 'Size',
            render: (record) => {
                return (
                    <Tag>{record?.size?.title}</Tag>
                )
            }
        },
        {
            title: 'Số Lượng',
            dataIndex: 'quantity'
        },
        {
            title: 'Trạng Thái',
            render: (record) => {
                return (
                    record?.isActive ?
                        (
                            <Tag color='green'>Kinh Doanh</Tag>
                        )
                        :
                        (
                            <Tag color='red'>Ngừng Kinh Doanh</Tag>
                        )
                )
            }
        },
        {
            title: 'Thao Tác',
            render: (record) => {
                return (
                    <div>
                        <Button icon={<EditOutlined />}></Button>
                        <Button icon={<DeleteOutlined />} danger style={{ marginLeft: 10 }}></Button>
                    </div>
                )
            }
        }
    ]


    //creating size modal 

    const [isAddingSizeModal, setIsAddingSizeModal] = useState(false);
    const [addSizeForm] = useForm();

    const onClickSubmitAddSize = () => {
        addSizeForm.submit();
    };

    const onClickCancelAddSize = () => {
        setIsAddingSizeModal(false);
    };

    const handleAddSize = (value) => {
        const payload = {
            ...value,
            id: info?.id
        }
        productAPI.createProductSize(payload)
            .then(res => {
                if (!res.status) {
                    const newSizes = [{ ...res }, ...info?.productsizes]
                    console.log(newSizes)
                    setInfo({ ...info, productsizes: [...newSizes] })
                    openNotificationWithIcon('info', 'Thông Báo', 'Thêm size thành công.')
                    onClickCancelAddSize();
                } else {
                    console.log(res);
                }
            })
            .catch(err => console.log(err))
    };
    const onClickOpenAddSize = () => {
        setIsAddingSizeModal(true);
    };

    //end creating size modal 


    //product images

    const onUploadImage = (info) => {
        console.log(info)
    }

    //end product images

    useEffect(() => {
        if (info) {
            editingForm.setFieldsValue({
                id: info?.id,
                name: info?.name,
                description: info?.descTitle,
                price: info?.price,
                categoryId: info?.category?.id,
                materialId: info?.material?.id,
                colorId: info?.color?.id,
                isActive: info?.isActive
            })
        }
    }, [info])

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
        setInfo(undefined)
        productAPI.getProductById(id)
            .then(res => {
                if (!res.status) {
                    console.log(res)
                    setInfo(res)
                }
            })
            .catch(err => console.log(err))
    }, [id])


    return (
        <Helmet
            title={"Thông Tin Sản Phẩm"}
        >
            <div className="adm--prdetail">
                <div className="adm--prdetail__title">
                    <Typography.Title level={4}>Thông Tin Sản Phẩm</Typography.Title>
                    <div>
                        <Button type='primary' onClick={onClickNavToProductList}>Danh Sách</Button>
                        <Button onClick={onClickNavToNewProduct} danger icon={<PlusOutlined />}>Thêm Mới</Button>
                    </div>
                </div>
                <div className="adm--prdetail__body">
                    <div className="adm--prdetail__body--form">
                        <Form
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 12 }}
                            onFinish={onFinishEditProduct}
                            form={editingForm}
                        >
                            <Form.Item
                                label="Mã Sản Phẩm"
                                name="id"
                            >
                                <Input disabled value={id} />
                            </Form.Item>
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
                                label="Trạng Thái"
                                name="isActive"
                                valuePropName='checked'
                            >
                                <Switch />
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
                                    <Button icon={<ReloadOutlined />} danger htmlType="submit" >Cập Nhật</Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="adm--prdetail__body--sizes">
                        <div className="adm--prdetail__body--sizes__title">
                            <Typography.Title level={5}>Danh sách size</Typography.Title>
                            <Button type='primary' onClick={onClickOpenAddSize}>Thêm Size</Button>
                        </div>
                        <div className="adm--prdetail__body--sizes__content">
                            <Table columns={sizesColumn} dataSource={info?.productsizes.map(i => ({ ...i, key: i.id }))} size='small' />
                        </div>
                    </div>
                    <div className="adm--prdetail__body--images">
                        <div className="adm--prdetail__body--images__title">
                            <Typography.Title level={5}>Ảnh</Typography.Title>
                            <Upload
                                name="file"
                                accept='.png,.jpg,.jpeg'
                                beforeUpload={(file) => {
                                    const isPNG = file.type === 'image/png';
                                    console.log(file)
                                    if (!isPNG) {
                                        message.error(`${file.name} is not a png file`);
                                    }
                                    return isPNG || Upload.LIST_IGNORE;
                                }}
                                onChange={(info) => {
                                    onUploadImage(info)
                                }}
                            >
                                <Button style={{ borderRadius: "20px" }} icon={<UploadOutlined />}>Chọn Ảnh</Button>
                            </Upload>
                        </div>
                        <div className="adm--prdetail__body--images__content">
                            {
                                info?.images.length > 0 ?
                                    (
                                        <div className="adm--prdetail__body--images__content--list">
                                            {
                                                info?.images.map((item, index) => (
                                                    <div className="adm--prdetail__body--images__content--list__item" key={item.id}>
                                                        <img src={`http://localhost:8080/api/file/images/${item.photo}`} />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                    :
                                    (
                                        <Empty description="Không có ảnh nào" />
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                open={isAddingSizeModal}
                centered
                okText="Xác Nhận"
                cancelText="Hủy Bỏ"
                onOk={onClickSubmitAddSize}
                onCancel={onClickCancelAddSize}
            >
                <Form
                    name='size'
                    labelCol={24}
                    wrapperCol={24}
                    layout={'vertical'}
                    style={{ width: '100%' }}
                    form={addSizeForm}
                    onFinish={handleAddSize}
                >
                    <Form.Item
                        label="Size"
                        name="sizeId"
                        rules={[
                            ((getFieldValue) => ({
                                validator(_, value) {
                                    if (value && value > 0) {
                                        let index = info?.productsizes.findIndex(s => s.size.id === value)
                                        if (index === -1) {
                                            return Promise.resolve()
                                        } else {
                                            return Promise.reject('Sản phẩm đã có size này')
                                        }

                                    }
                                    return Promise.reject('Vui lòng chọn size!')
                                }
                            }))
                        ]}
                        hasFeedback
                    >
                        <Select defaultValue={0}>
                            <Select.Option value={0} disabled>Size</Select.Option>
                            {
                                sizes.length > 0 && sizes.map(item => (
                                    <Select.Option value={item.id} key={item.id}>{item.title}</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Số Lượng"
                        name="quantity"
                        rules={[
                            { required: true, message: "Số lượng không được nhập khoảng trắng!" },
                            ({ getFieldValue, setFieldValue }) => ({
                                validator(_, value) {
                                    if (value && value > 0) {
                                        setFieldValue('quantity', Math.floor(value))
                                        return Promise.resolve()
                                    }
                                    return Promise.reject('Số lượng không được nhỏ hơn 0!')
                                }
                            })
                        ]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                </Form>
            </Modal>
        </Helmet >
    )
}

export default AdmProductDetail