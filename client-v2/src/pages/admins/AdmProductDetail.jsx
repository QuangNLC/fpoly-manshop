import { DeleteOutlined, EditOutlined, PlusOutlined, ReloadOutlined, RetweetOutlined, StarFilled, StarOutlined, UploadOutlined } from '@ant-design/icons';
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
                        <Button icon={<EditOutlined />} onClick={() => { onClickEditSize(record) }}></Button>
                        <Button icon={<DeleteOutlined />} danger style={{ marginLeft: 10 }} onClick={() => { onClickDeleteSize(record) }}></Button>
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




    //editing size modal

    const [editingSize, setEditingSize] = useState(undefined);
    const [editSizeForm] = useForm();

    const onChangeSizeActive = (checked) => {
        setEditingSize({
            ...editingSize,
            isActive: checked
        })
    }

    const onCloseEditingSizeModal = () => {
        setEditingSize(undefined);
    }

    const onClickEditSize = (size) => {
        console.log(size);
        setEditingSize(size);
        editSizeForm.setFieldsValue({ isActive: size?.isActive, quantity: size?.quantity });
    }

    const onClickUpdateSize = () => {
        editSizeForm.submit();
    }

    const onClickDeleteSize = (size) => {
        const payload = {
            id: size?.id
        };

        Modal.confirm({
            title: 'Hộp Thoại Xác Nhận',
            content: 'Bạn có muốn xóa size không.',
            okText: 'Xác Nhận',
            cancelText: 'Hủy Bỏ',
            onOk: () => {
                productAPI.deleteProductSize(payload)
                    .then(res => {
                        if (!res.status) {
                            let index = info?.productsizes.findIndex(i => i.id === payload.id);
                            if (index !== -1) {
                                const newSizes = [...info?.productsizes];
                                newSizes.splice(index, 1);
                                setInfo({ ...info, productsizes: [...newSizes] });
                            }
                            onCloseEditingSizeModal();
                            openNotificationWithIcon('warning', 'Thông Báo', 'Xoá size thành công .');
                        } else {
                            console.log(res);
                        }
                    })
                    .catch(err => console.log(err))
            }
        })
    }

    const handleSubmitEditSizeForm = (value) => {
        const payload = {
            id: info?.id,
            sizeId: editingSize?.id,
            quantity: value?.quantity,
            isActive: value?.isActive
        };
        console.log(payload);
        Modal.confirm({
            title: 'Hộp Thoại Xác Nhận',
            content: 'Bạn có muốn cập nhật thông tin size không.',
            okText: 'Xác Nhận',
            cancelText: 'Hủy Bỏ',
            onOk: () => {
                productAPI.updateProductSize(payload)
                    .then(res => {
                        if (!res.status) {
                            let index = info?.productsizes.findIndex(i => i.id === res.id);
                            if (index !== -1) {
                                const newSizes = [...info?.productsizes];
                                newSizes[index] = { ...res }
                                setInfo({ ...info, productsizes: [...newSizes] });
                            }
                            onCloseEditingSizeModal();
                            openNotificationWithIcon('info', 'Thông Báo', 'Cập nhật thông tin size thành công .');
                        } else {
                            console.log(res);
                        }
                    })
                    .catch(err => console.log(err));
            }
        })
    }


    //end editing size modal






    //product images

    const [uploadList, setUploadList] = useState([]);

    const onUploadImage = (info) => {
        console.log(info)
        // uploadList.forEach(item => {
        //     formData.append('file', item)
        // })
        // usersAPI.updateUserAvatar(auth.info.username, formData)
        //     .then(res => {
        //         dispatch(setAuthAction({ ...auth, info: res }));
        //         setUploadList([])
        //         Modal.success({
        //             title: "Hộp Thoại Thông Báo",
        //             content: "Thay đổi ảnh đại diện thành công!"
        //         })
        //     })
        //     .catch(err => console.log(err))
    }

    const onClickSetDefaultImage = (item) => {
        if (!item.isdefault) {
            const payload = {
                id: info?.id,
                photo: item?.photo,
                isDefault: true,
                imgId: item?.id
            }
            Modal.confirm({
                title: 'Hộp Thoại Xác Nhận',
                content: 'Bạn có muốn đặt làm ảnh mặc định không',
                okText: 'Xác Nhận',
                cancelText: 'Hủy Bỏ',
                onOk: () => {
                    productAPI.setDefaultImage(payload)
                        .then(res => {
                            if (!res.status) {
                                let index = info?.images.findIndex(i => i.id === payload.imgId);
                                if (index !== -1) {
                                    const newImgs = info?.images.map(i => ({ ...i, isdefault: false }));
                                    newImgs[index].isdefault = true;
                                    setInfo({ ...info, images: [...newImgs] });
                                }
                                openNotificationWithIcon('info', 'Thông Báo', 'Đặt làm ảnh mặc định .')
                            } else {
                                console.log(res);
                            }
                        })
                        .catch(err => console.log(err))
                }
            })
        }
    }


    const onClickDeleteImage = (item) => {
        const payload = {
            id: info?.id,
            photo: item?.photo,
            isDefault: item?.isdefault,
            imgId: item?.id
        }
        console.log(payload)
        Modal.confirm({
            title: 'Hộp Thoại Xác Nhận',
            content: 'Bạn có muốn xóa ảnh không',
            okText: 'Xác Nhận',
            cancelText: 'Hủy Bỏ',
            onOk: () => {
                productAPI.deleteProductImage(payload)
                    .then(res => {
                        if (!res.status) {
                            let index = info?.images.findIndex(i => i.id === payload.imgId);
                            if (index !== -1) {
                                const newImgs = [...info?.images];
                                newImgs.splice(index, 1);
                                setInfo({ ...info, images: [...newImgs] });
                            }
                            openNotificationWithIcon('warning', 'Thông Báo', 'Xóa ảnh .')
                        } else {
                            console.log(res);
                        }
                    })
                    .catch(err => console.log(err))
            }
        })
    }


    useEffect(() => {
        if (uploadList && uploadList.length > 0) {
            console.log(uploadList)
            const formData = new FormData();
            uploadList.forEach(item => {
                formData.append('file', item)
            });
            productAPI.uploadProductImage({
                id: info?.id,
                formData
            })
                .then(res => {
                    if (!res.status) {
                        openNotificationWithIcon('info', 'Thông Báo', 'Thêm ảnh thành công.');
                        setUploadList([])
                        setInfo({
                            ...info,
                            images: [{ ...res }, ...info?.images]
                        })
                        console.log(res)
                    } else {
                        console.log(res)
                    }
                })
                .catch(err => console.log(err))


        }
    }, [uploadList])

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
                                fileList={uploadList}
                                beforeUpload={(file, fileList) => {
                                    setUploadList(prev => [...prev, file])
                                    return false
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
                                                        <div className="adm--prdetail__body--images__content--list__item--defaulticon" onClick={() => onClickSetDefaultImage(item)}>
                                                            {
                                                                item?.isdefault ?
                                                                    (
                                                                        <>
                                                                            <StarFilled />
                                                                            <Tag color='green'>Mặc Định</Tag>
                                                                        </>
                                                                    )
                                                                    :
                                                                    (
                                                                        <StarOutlined />
                                                                    )
                                                            }
                                                        </div>
                                                        <div className="adm--prdetail__body--images__content--list__item--deleteicon" onClick={() => onClickDeleteImage(item)}>
                                                            <DeleteOutlined />
                                                        </div>
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
            <Modal
                open={editingSize}
                onCancel={onCloseEditingSizeModal}
                centered
                footer={[
                    <Button danger icon={<DeleteOutlined />} onClick={() => onClickDeleteSize(editingSize)}> Xóa Size</Button>,
                    <Button type='primary' icon={<RetweetOutlined />} onClick={onClickUpdateSize}> Cập Nhật</Button>
                ]}
            >
                <Typography.Title level={5}>Cập nhật size <Tag>{editingSize?.size?.title}</Tag></Typography.Title>
                <Form
                    form={editSizeForm}
                    layout={'horizontal'}
                    initialValues={editSizeForm}
                    onFinish={handleSubmitEditSizeForm}
                >
                    <Form.Item
                        label={"Trạng Thái"}
                        name="isActive"
                        valuePropName={'checked'}
                    >
                        <Switch />
                        {/* <Tag color={editingSize?.isActive ? 'green' : 'red'}>{editingSize?.isActive ? 'Kinh Doanh' : 'Ngừng Kinh Doanh'}</Tag> */}
                    </Form.Item>

                    <Form.Item
                        label={"Số lượng"}
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
                        <InputNumber />
                    </Form.Item>
                </Form>
            </Modal>
        </Helmet >
    )
}

export default AdmProductDetail