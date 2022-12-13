import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import productAPI from '../../api/productsAPI'
import { Button, Form, Input, InputNumber, Select, Upload, notification, Empty } from 'antd';
import Helmet from '../../components/Helmet'
import fileAPI from '../../api/fileAPI';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DialogHOC from '../../hoc/DialogHOC';
import sizesAPI from '../../api/sizesAPI';
import { useForm } from 'antd/es/form/Form';
import { useNavigate, useParams } from 'react-router-dom';


const Container = styled.div`
    padding: 20px;
`
const Wrapper = styled.div`
`
const Details = styled.div`
    width: 100%;
    display: flex;
`
const Left = styled.div`
    width: calc(2/3 *  100%);
    padding: 20px
    
`
const ProductDetailsFormContainer = styled.div`
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    width:  100%;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
`
const Right = styled.div`
    width: calc(1/3 *  100%);
    padding: 20px 10px;
    
`
const ProductSizesDetails = styled.div`
    width: 100%;
    padding:  20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    background-color: white;
    border-radius: 10px;
`

const ProductSizesTitleContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const ProductSizesTitle = styled.span`
    flex:  1;
`
const ProductSizesButton = styled.div`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: teal;
    color: white;
    cursor: pointer;
    trasition: all 0.25s ease-in;
    text-transform: capitalize;
    &:hover{
        background-color: darkblue;
    }
`
const Title = styled.h1`
    font-size : 40px;
    font-weight: 300;
`

const SizesContainer = styled.ul`
    width: 100%;
    margin-top: 20px;
    padding: 0 10px;
    border-top: 0.5px solid lightgray;
`
const SizesContainerTitle = styled.div`
    font-size: 18px;
    font-weight:  500;
    margin-top: 5px;
`
const SizeFormContainer = styled.div`
    width: 100%;
`
const SizeDetailsContainer = styled.li`
    padding: 15px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid teal;
    border-radius: 10px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`
const SizeDetails = styled.div`
    flex:  1;
`
const SizeDetailsItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const SizeDetailsItemLabel = styled.span`
    text-transform: capitalize;
    margin-left: 5px;
    font-size: 16px;
    font-weight:  400;
`
const SizeDetailsItemInfo = styled.div``
const SizeDetailsAction = styled.div`
    width: 120px;
    display: flex;
    justify-content: flex-start;
    align-items:  center;
    flex-direction: column;
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
    const [sizes, setSizes] = useState([])
    const [reqImg, setReqImg] = useState([])
    const [product, setProduct] = useState({
        "name": "",
        "export_price": 200000.0,
        "import_price": 300000.0,
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
    const navigate = useNavigate();
    const [sizeForm] = useForm();
    const [detailsForm] = useForm();

    const handleUploadImage = () => {
        const formData = new FormData();
        uploadList.forEach(item => {
            formData.append('file', item)
        })
        fileAPI.upload('images', formData)
            .then(res => {
                if (!res.status) {
                    console.log(res)
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }

    const onFinish = (value) => {
        let images = []
        let reqValue = {
            ...value,
            category: {
                id: value.category
            },
            images: product.images,
            productsizes: product.productsizes
        }
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
                    console.log(imgsRes)
                    productAPI.createProduct({ ...reqValue, images: imgsRes })
                        .then(res => {
                            if (!res.status) {
                                openNotificationWithIcon('success', 'Thông báo', 'Cập nhật thành công!');
                                navigate('/admin/product-list')
                            } else {
                                console.log(res)
                            }
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        } else {
            productAPI.createProduct(reqValue)
                .then(res => {
                    if (!res.status) {
                        openNotificationWithIcon('success', 'Thông báo', 'Cập nhật thành công!');
                        navigate('/admin/product-list')
                    } else {
                        console.log(res)
                    }
                })
                .catch(err => console.log(err));
        }

    }

    const handleCreateProductSize = (value) => {
        let index = product.productsizes.findIndex(item => item.size.id === value.id)
        if (index === -1) {
            setProduct({
                ...product,
                productsizes: [...product.productsizes, { quantity: value.quantity, size: sizes.find(item => item.id === value.id) }]
            })
            sizeForm.setFieldsValue({
                id: 0,
                quantity: ""
            })
        } else {
            openNotificationWithIcon('warning', 'Cập nhật thất bại', 'Chưa chọn size!')
            sizeForm.setFieldsValue({
                id: 0,
                quantity: ""
            })
        }

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
                    detailsForm.setFieldValue('category', res.category.id)
                    console.log(res.category.id)
                    setProduct({ ...res });
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }, [productId])

    useEffect(() => {
        detailsForm.resetFields();
    }, [product])

    return (
        <Helmet
            title="Create Product"
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
                                    initialValues={product}
                                    form={detailsForm}
                                >
                                    <Form.Item>
                                        Cập nhật sản phẩm
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
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Giá bán"
                                        name="export_price"
                                        rules={[
                                            { required: true },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (value && value >= getFieldValue('import_price')) {
                                                        return Promise.resolve()
                                                    }
                                                    return Promise.reject('Giá bán không được thấp hơn giá nhập!')
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
                                            <p>Kéo thả ảnh hoặc</p>
                                            <br />
                                            <Button style={{ borderRadius: "20px" }}>Chọn ảnh</Button>
                                        </Upload.Dragger>

                                        {/* <Button onClick={() => {handleUploadImage()}}>Upload</Button> */}
                                    </Form.Item>
                                    <Form.Item
                                    >
                                        <Button htmlType='submit' style={{ borderRadius: "20px" }}> Cập nhật </Button>
                                        <Button style={{ borderRadius: "20px", marginLeft: "20px" }}> Làm mới </Button>
                                    </Form.Item>
                                </Form>
                            </ProductDetailsFormContainer>
                        </Left>
                        <Right>
                            <ProductSizesDetails>
                                <ProductSizesTitleContainer>
                                    <ProductSizesTitle>Size sản phẩm</ProductSizesTitle>
                                    <ProductSizesButton>Size mới</ProductSizesButton>
                                </ProductSizesTitleContainer>
                                <SizeFormContainer>
                                    <Form
                                        name='size'
                                        labelCol={24}
                                        wrapperCol={24}
                                        layout={'vertical'}
                                        style={{ width: '70%' }}
                                        onFinish={handleCreateProductSize}
                                        form={sizeForm}
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
                                        <Form.Item
                                            label="Số lượng"
                                            name="quantity"
                                            rules={[
                                                { required: true },
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
                                            hasFeedback
                                        >
                                            <InputNumber style={{ width: '100%' }} />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button style={{ borderRadius: "20px" }} htmlType='submit'>Tạo size</Button>
                                        </Form.Item>
                                    </Form>
                                </SizeFormContainer>
                                <SizesContainer>
                                    <SizesContainerTitle>Danh sách size sản phẩm</SizesContainerTitle>
                                    {
                                        product.productsizes.length > 0 ?
                                            (
                                                product.productsizes.map(item => (
                                                    <SizeDetailsContainer key={item.size.id}>
                                                        <SizeDetails>
                                                            <SizeDetailsItem>
                                                                <SizeDetailsItemLabel>Size: </SizeDetailsItemLabel>
                                                                <SizeDetailsItemInfo>{item.size.title}</SizeDetailsItemInfo>
                                                            </SizeDetailsItem>
                                                            <SizeDetailsItem>
                                                                <SizeDetailsItemLabel>Số lượng: </SizeDetailsItemLabel>
                                                                <SizeDetailsItemInfo>{item.quantity}</SizeDetailsItemInfo>
                                                            </SizeDetailsItem>
                                                        </SizeDetails>
                                                        <SizeDetailsAction>
                                                            <DialogHOC
                                                                title="Thông báo!"
                                                                content="Bạn có muốn xóa size này không?"
                                                                onYes={() => { console.log('Đã xóa size') }}
                                                            >
                                                                <Button
                                                                    icon={<DeleteOutlineOutlinedIcon />}
                                                                    style={{ marginTop: 10, borderRadius: 10 }}
                                                                >
                                                                </Button>
                                                            </DialogHOC>
                                                            <Button
                                                                icon={<CreateOutlinedIcon />}
                                                                style={{ marginTop: 10, borderRadius: 10 }}
                                                            >
                                                            </Button>
                                                        </SizeDetailsAction>
                                                    </SizeDetailsContainer>
                                                ))
                                            )
                                            :
                                            (
                                                <>
                                                    <Empty description={'Size trống!'} />
                                                </>
                                            )
                                    }
                                </SizesContainer>
                            </ProductSizesDetails>
                        </Right>
                    </Details>
                </Wrapper>
            </Container>
        </Helmet>
    )
}

export default AdmEditProductDetails