import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import productAPI from '../../api/productsAPI'
import { Button, Form, Input, InputNumber, Select, Upload, notification, Empty, Modal, Typography } from 'antd';
import Helmet from '../../components/Helmet'
import fileAPI from '../../api/fileAPI';
import sizesAPI from '../../api/sizesAPI';
import { useForm } from 'antd/es/form/Form';
import { useNavigate, useParams } from 'react-router-dom';
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';

const Container = styled.div`
    padding: 20px;
`
const Wrapper = styled.div`
`
const Details = styled.div`
    width: 100%;
    display: flex;
`
// width: calc(2/3 *  100%);
const Left = styled.div`
    width: 100%;
    padding: 20px;
    
`
const ProductDetailsFormContainer = styled.div`
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    width:  100%;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
`

const Title = styled.h1`
    font-size : 40px;
    font-weight: 300;
`

const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description:
            des,
    });
};


const AdmEditProductDetails = () => {

    const { productId } = useParams()
    const [uploadList, setUploadList] = useState([])
    const [categories, setCategories] = useState([])
    const [materials, setMaterials] = useState([])
    const [sizes, setSizes] = useState([])
    const [editingSizes, setEditingSizes] = useState([])
    const [product, setProduct] = useState({
        "name": "",
        "export_price": 200000.0,
        "title": "ao dep mau dep mac vao sieu dep",
        "cover": "acc",
        "category": {
            "id": 1,
            "title": "Áo thun"
        },
        "productsizes": [],
        "images": [
            {

                "photo": "default-product-img.jpg",
                "isdefault": true
            }
        ]
    })
    const [formInitValue, setFormInitValue] = useState({
        name: '',
        export_price: 0,
        title: '',
        category: 0,
        material: 0
    })
    const navigate = useNavigate();
    const [sizeForm] = useForm();
    const [detailsForm] = useForm();


    /////////add size
    const [isAddingSizeModal, setIsAddingSizeModal] = useState(false)
    const [addSizeForm] = useForm();

    const onClickOpenAddSize = () => {
        setIsAddingSizeModal(true)
        addSizeForm.setFieldsValue({
            id: 0,
            quantity: null,
        })
    }

    const onClickSubmitAddSize = () => {
        addSizeForm.submit()
    }

    const onClickCancelAddSize = () => {
        setIsAddingSizeModal(false)
        addSizeForm.setFieldsValue({
            id: 0,
        })
    }

    const handleAddSize = (value) => {
        console.log(value)
        let index = sizes.findIndex(item => item.id === value.id);
        if (index !== -1) {
            console.log({ size: sizes[index] })
            let sIndex = editingSizes.findIndex(s => s.size.id === value.id)
            if (sIndex !== -1) {
                openNotificationWithIcon('info', 'Thông báo', `Đã tồn tại size ${sizes[index].title}`)
            } else {
                setEditingSizes([...editingSizes, { size: sizes[index] }])
            }
        }
        onClickCancelAddSize()
    }

    const handleRemoveSize = (item, index) => {
        console.log(item, index)
        editingSizes.splice(index, 1)
        console.log(editingSizes)
        setEditingSizes([...editingSizes])
    }

    ////////




    const onFinish = (value) => {
        let images = []
        let reqValue = {
            id: product.id,
            ...value,
            category: {
                id: value.category
            },
            images: product.images,
            productsizes: editingSizes.length > 0 ? editingSizes.map((s) => ({ size: s.size, quantity: value[`sizeId${s.size.id}`] })) : [],
            material: {
                id: value.material
            }
        }
        console.log(reqValue)
        Modal.confirm({
            title: 'Hộp Thoại Xác Nhận',
            content: 'Bạn có muốn cập nhật sản phẩm không',
            okText: 'Xác Nhận',
            cancelText: 'Hủy Bỏ',
            onOk: () => {
                if (uploadList.length > 0) {
                    const formData = new FormData();
                    uploadList.forEach(item => {
                        formData.append('file', item)
                    })
                    fileAPI.upload('images', formData)
                        .then(res => {
                            if (!res.status) {
                                return res.map((item, index) => {
                                    return {
                                        photo: item,
                                        isdefault: index === 1
                                    }
                                })
                            } else {
                                console.log(res)
                            }
                        })
                        .then(imgsRes => {
                            productAPI.updateProduct({ ...reqValue, images: [...product.images, ...imgsRes] })
                                .then(res => {
                                    if (!res.status) {
                                        console.log(res)
                                        setProduct({ ...res });
                                        setUploadList([])
                                        setFormInitValue({
                                            ...formInitValue,
                                            name: res?.name,
                                            export_price: res?.export_price,
                                            category: res?.category?.id,
                                            material: res?.material?.id,
                                            title: res?.title
                                        })
                                        Modal.info({ title: 'Hộp Thoại Thông Báo', content: 'Cập Nhật Thông Tin Sản Phẩm Thành Công' })
                                    } else {
                                        console.log(res)
                                    }
                                })
                                .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
                } else {
                    productAPI.updateProduct(reqValue)
                        .then(res => {
                            if (!res.status) {
                                console.log(res)
                                setProduct({ ...res });
                                setFormInitValue({
                                    ...formInitValue,
                                    name: res?.name,
                                    export_price: res?.export_price,
                                    category: res?.category?.id,
                                    material: res?.material?.id,
                                    title: res?.title
                                })
                                Modal.info({ title: 'Hộp Thoại Thông Báo', content: 'Cập Nhật Thông Tin Sản Phẩm Thành Công' })
                            } else {
                                Modal.error({
                                    title: 'Hộp Thoại Thông Báo',
                                    content: res?.data ? res?.data : 'Cập nhật thất bại.'
                                })
                            }
                        })
                        .catch(err => console.log(err))
                }
            }
        })
    }

    useEffect(() => {
        productAPI.getAllCategory().then(res => {
            if (!res.status) {
                setCategories(res)
            } else {
                console.log(res);
            }
        })
            .catch(err => console.log(err))
        productAPI.getAllMaterial().then(res => {
            if (!res.status) {
                setMaterials(res)
            } else {
                console.log(res)
            }
        })
            .catch(err => console.log(err))
        sizesAPI.getAll()
            .then(res => {
                if (!res.status) {
                    {
                        setSizes(res)
                    }
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        productAPI.getProduct(productId)
            .then(res => {
                if (!res.status) {
                    setProduct({ ...res });
                    console.log(res)
                    setFormInitValue({
                        ...formInitValue,
                        name: res?.name,
                        export_price: res?.export_price,
                        category: res?.category?.id,
                        material: res?.material?.id,
                        title: res?.title
                    })
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }, [productId])

    useEffect(() => {
        if (product) {
            setFormInitValue({
                ...formInitValue,
                name: product?.name,
                export_price: product?.export_price,
                category: product?.category?.id,
                material: product?.material?.id,
                title: product?.title
            })
            detailsForm.resetFields();
            if (product.productsizes) {
                setEditingSizes(product.productsizes.length > 0 ? product.productsizes.map(s => ({ size: s.size })) : [])
                product.productsizes.map(s => {
                    detailsForm.setFieldValue(`sizeId${s.size.id}`, s.quantity)
                })
            }
        }
    }, [product])

    return (
        <Helmet
            title="Quản lý sản phẩm"
        >
            <Container>
                <Wrapper>
                    <Title>CHỈNH SỬA SẢN PHẨM VỚI MÃ LÀ {productId}</Title>
                    <Details>
                        <Left>
                            <ProductDetailsFormContainer>
                                <Form
                                    name='product-details'
                                    wrapperCol={24}
                                    labelCol={24}
                                    layout={'vertical'}
                                    onFinish={onFinish}
                                    initialValues={formInitValue}
                                    form={detailsForm}
                                >
                                    <Form.Item>
                                        <Typography.Title level={4}>
                                            Cập nhật sản phẩm
                                        </Typography.Title>
                                    </Form.Item>
                                    <Form.Item
                                        label="Tên sản phẩm"
                                        name="name"
                                        rules={[
                                            { required: true },
                                            { whitespace: true }
                                        ]}
                                        hasFeedback
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Thông tin mô tả"
                                        name="title"
                                        rules={[
                                            { required: true },
                                            { whitespace: true }
                                        ]}
                                        hasFeedback
                                    >
                                        <Input.TextArea />
                                    </Form.Item>
                                    <Form.Item
                                        label="Giá bán"
                                        name="export_price"
                                        rules={[
                                            { required: true },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (value && value > 0) {
                                                        return Promise.resolve()
                                                    }
                                                    return Promise.reject('Giá bán phải lớn hơn 0!')
                                                }
                                            })
                                        ]}
                                    >
                                        <InputNumber style={{ width: '100%' }} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Thể loại sản phẩm"
                                        name="category"
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
                                        defaultValue={product.category.id}
                                    >
                                        <Select defaultValue={0}>
                                            <Select.Option value={0} disabled>Vui lòng chọn thể loại</Select.Option>
                                            {
                                                categories && categories.length > 0 && categories.map((item, index) => (
                                                    <Select.Option key={item.id} value={item.id}>{item.title}</Select.Option>
                                                ))
                                            }

                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        label="Chất liệu sản phẩm"
                                        name="material"
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
                                        <Select defaultValue={0}>
                                            <Select.Option value={0} disabled>Vui lòng chọn chất liệu</Select.Option>
                                            {
                                                materials && materials.length > 0 && materials.map((item, index) => (
                                                    <Select.Option key={item.id} value={item.id}>{item.title}</Select.Option>
                                                ))
                                            }

                                        </Select>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button onClick={onClickOpenAddSize}>Thêm size sản phẩm</Button>
                                    </Form.Item>
                                    <Form.Item>
                                        {
                                            editingSizes.length > 0 ?
                                                (
                                                    editingSizes.map((item, index) => {
                                                        return (
                                                            <div
                                                                key={item?.size?.id}
                                                                style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                                            >
                                                                <Form.Item
                                                                    label={item?.size?.title}
                                                                    name={`sizeId${item?.size?.id}`}
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
                                                                    <InputNumber/>
                                                                </Form.Item>
                                                                <Button icon={<DisabledByDefaultOutlinedIcon />} onClick={() => handleRemoveSize(item, index)}></Button>
                                                            </div>

                                                        )
                                                    })
                                                )
                                                :
                                                (
                                                    <Empty description={'Size trống.'} />
                                                )
                                        }
                                    </Form.Item>
                                    <Form.Item
                                        label="Ảnh"
                                    >
                                        {
                                            product && product.images.length > 0 ?
                                                (
                                                    <>
                                                        {product.images.map((item, index) => {
                                                            return (
                                                                <img style={{ width: '90px', height: '160px', marginRight: '10px', objectFit: 'contain', cursor: 'pointer' }} src={`http://localhost:8080/api/file/images/${item.photo}`} />
                                                            )
                                                        })}
                                                    </>

                                                )
                                                :
                                                (
                                                    <Empty />
                                                )
                                        }
                                    </Form.Item>
                                    <Form.Item>
                                        <Upload.Dragger
                                            action={"http://localhost:3000/api/file/images"}
                                            multiple
                                            listType='picture'
                                            showUploadList={{ showRemoveIcon: true }}
                                            accept='.png,.jpg,.jpeg'
                                            fileList={uploadList}
                                            beforeUpload={(file, fileList) => {
                                                setUploadList(prev => [...prev, file])
                                                return false
                                            }}
                                            onRemove={(file) => {
                                                setUploadList(uploadList.filter((item) => file.uid !== item.uid))
                                            }}
                                        >
                                            <br />
                                            <Button style={{ borderRadius: "20px" }}>Chọn ảnh</Button>
                                        </Upload.Dragger>
                                    </Form.Item>
                                    <Form.Item
                                    >
                                        <Button htmlType='submit' style={{ borderRadius: "20px" }}> Cập nhật </Button>
                                    </Form.Item>
                                </Form>
                            </ProductDetailsFormContainer>
                        </Left>
                    </Details>
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
                                name="id"
                                rules={[
                                    ((getFieldValue) => ({
                                        validator(_, value) {
                                            if (value && value > 0) {
                                                return Promise.resolve()
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
                        </Form>
                    </Modal>
                </Wrapper>
            </Container>
        </Helmet>
    )
}

export default AdmEditProductDetails