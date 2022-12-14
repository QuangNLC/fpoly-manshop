import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import productAPI from '../../api/productsAPI'
import { Button, Form, Input, InputNumber, Select, Upload, notification, Empty, Modal } from 'antd';
import Helmet from '../../components/Helmet'
import fileAPI from '../../api/fileAPI';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DialogHOC from '../../hoc/DialogHOC';
import sizesAPI from '../../api/sizesAPI';
import { useForm } from 'antd/es/form/Form';
import { useNavigate } from 'react-router-dom';
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
    font-weight: 500;
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


const AdmNewProduct = () => {

    const [uploadList, setUploadList] = useState([])
    const [categories, setCategories] = useState([])
    const [materials, setMaterials] = useState([])
    const [sizes, setSizes] = useState([])
    const [reqImg, setReqImg] = useState([])
    const [editingSizes, setEditingSizes] = useState([])
    const [product, setProduct] = useState({
        "name": "",
        "export_price": 0,
        "title": "ao dep mau dep mac vao sieu dep",
        "cover": "acc",
        "category": {
            "id": 1,
            "title": "??o thun"
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
            quantity: null,
        })
    }

    const handleAddSize = (value) => {
        console.log(value)
        let index = sizes.findIndex(item => item.id === value.id);
        if (index !== -1) {
            console.log({size: sizes[index] })
            let sIndex = editingSizes.findIndex(s => s.size.id === value.id)
            if (sIndex !== -1) {
                openNotificationWithIcon('info', 'Th??ng b??o', `???? t???n t???i size ${sizes[index].title}`)
            } else {
                setEditingSizes([...editingSizes, {size: sizes[index]}])
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
            productsizes: editingSizes.length > 0 ? editingSizes.map((s) => ({ size: s.size, quantity: value[`sizeId${s.size.id}`] })) : [],
        }

        console.log(reqValue)
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
                                openNotificationWithIcon('success', 'Th??nh c??ng', 'T???o m???i s???n ph???m th??nh c??ng!');
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
                        openNotificationWithIcon('success', 'Th??nh c??ng', 'T???o m???i s???n ph???m th??nh c??ng!');
                        navigate('/admin/product-list')
                    } else {
                        console.log(res)
                    }
                })
                .catch(err => console.log(err));
        }

    }


    const handleDeleteProductSize = (value) => {
        let index = product.productsizes.findIndex(item => item.size.id === value.id)
        if (index !== -1) {
            let newSizes = product.productsizes
            newSizes.splice(index, 1)
            setProduct({
                ...product,
                productsizes: [...newSizes]
            })
            sizeForm.setFieldsValue({
                id: 0,
                quantity: ""
            })
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
            openNotificationWithIcon('warning', 'T???o m???i th???t b???i !', `S???n ph???m ???? c?? size n??y!`)
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

    return (
        <Helmet
            title="Create Product"
        >
            <Container>
                <Wrapper>
                    <Title>T???O M???I S???N PH???M</Title>
                    <Button style={{ marginLeft: 20 }} type='primary' onClick={() => { navigate('/admin/product-list') }} >Danh S??ch</Button>
                    <Details>
                        <Left>
                            <ProductDetailsFormContainer>
                                <Form
                                    name='product-details'
                                    wrapperCol={24}
                                    labelCol={24}
                                    layout={'vertical'}
                                    onFinish={onFinish}
                                >
                                    <Form.Item>
                                        T???O M???I
                                    </Form.Item>
                                    <Form.Item
                                        label="T??n s???n ph???m"
                                        name="name"
                                        rules={[
                                            { required: true, message: "T??n s???n ph???m kh??ng ???????c ????? tr???ng!" },
                                            { whitespace: true, message: "Kh??ng ???????c nh???p kho???ng tr???ng!" }
                                        ]}
                                        hasFeedback
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Th??ng tin m?? t???"
                                        name="title"
                                        rules={[
                                            { required: true, message: "Th??ng tin m?? t??? kh??ng ???????c ????? tr???ng!" },
                                            { whitespace: true, message: "Kh??ng ???????c nh???p kho???ng tr???ng!" }
                                        ]}
                                        hasFeedback
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Gi?? b??n"
                                        name="export_price"
                                        rules={[
                                            { required: true, message: "Gi?? b??n kh??ng ???????c ????? tr???ng !" },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (value && value > 0) {
                                                        return Promise.resolve()
                                                    }
                                                    return Promise.reject('Gi?? kh??ng th??? nh??? h??n 0!')
                                                }
                                            })
                                        ]}
                                    >
                                        <InputNumber style={{ width: '100%' }} />
                                    </Form.Item>
                                    <div
                                        style={{ width: '100%', display: 'flex' }}
                                    >
                                        <div
                                            style={{ width: '50%', padding: '5px' }}
                                        >
                                            {/* <Button style={{ marginBottom: '5px' }}>Th??m Th??? Lo???i</Button> */}
                                            <Form.Item
                                                label="Th??? lo???i s???n ph???m"
                                                name="category"
                                                rules={[
                                                    ((getFieldValue) => ({
                                                        validator(_, value) {
                                                            if (value && value > 0) {
                                                                return Promise.resolve()
                                                            }
                                                            return Promise.reject('Vui l??ng ch???n th??? lo???i!')
                                                        }
                                                    }))
                                                ]}
                                            >
                                                <Select defaultValue={0}>
                                                    <Select.Option value={0} disabled>Vui l??ng ch???n th??? lo???i</Select.Option>
                                                    {
                                                        categories && categories.length > 0 && categories.map((item, index) => (
                                                            <Select.Option key={item.id} value={item.id}>{item.title}</Select.Option>
                                                        ))
                                                    }

                                                </Select>
                                            </Form.Item>
                                        </div>
                                        <div
                                            style={{ width: '50%', padding: '5px' }}
                                        >
                                            {/* <Button style={{ marginBottom: '5px' }}>Th??m ch???t li???u</Button> */}

                                            <Form.Item
                                                label="Ch???t li???u s???n ph???m"
                                                name="material"
                                                rules={[
                                                    ((getFieldValue) => ({
                                                        validator(_, value) {
                                                            if (value && value > 0) {
                                                                return Promise.resolve()
                                                            }
                                                            return Promise.reject('Vui l??ng ch???n ch???t li???u!')
                                                        }
                                                    }))
                                                ]}
                                            >
                                                <Select defaultValue={0}>
                                                    <Select.Option value={0} disabled>Vui l??ng ch???n ch???t li???u</Select.Option>
                                                    {
                                                        materials && materials.length > 0 && materials.map((item, index) => (
                                                            <Select.Option key={item.id} value={item.id}>{item.title}</Select.Option>
                                                        ))
                                                    }

                                                </Select>
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <Form.Item>
                                        <Button onClick={onClickOpenAddSize}>Th??m size s???n ph???m</Button>
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
                                                                        { required: true, message: "S??? l?????ng kh??ng ???????c nh???p kho???ng tr???ng!" },
                                                                        ({ getFieldValue, setFieldValue }) => ({
                                                                            validator(_, value) {
                                                                                if (value && value > 0) {
                                                                                    setFieldValue('quantity', Math.floor(value))
                                                                                    return Promise.resolve()
                                                                                }
                                                                                return Promise.reject('S??? l?????ng kh??ng ???????c nh??? h??n 0!')
                                                                            }
                                                                        })
                                                                    ]}
                                                                >
                                                                    <InputNumber style={{ width: '100%' }} />
                                                                </Form.Item>
                                                                <Button icon={<DisabledByDefaultOutlinedIcon />} onClick={() => handleRemoveSize(item, index)}></Button>
                                                            </div>

                                                        )
                                                    })
                                                )
                                                :
                                                (
                                                    <Empty description={'Size tr???ng.'} />
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
                                            <Button style={{ borderRadius: "20px" }} >Ch???n ???nh</Button>
                                        </Upload.Dragger>
                                    </Form.Item>
                                    <Form.Item
                                    >
                                        <Button htmlType='submit' style={{ borderRadius: "20px" }}> T???o S???n Ph???m </Button>
                                    </Form.Item>
                                </Form>
                            </ProductDetailsFormContainer>
                        </Left>
                        {/* <Right>
                            <ProductSizesDetails>
                                <ProductSizesTitleContainer>
                                    <ProductSizesTitle>Size s???n ph???m</ProductSizesTitle>
                                    <ProductSizesButton style={{ borderRadius: "20px" }}>T???o size</ProductSizesButton>
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
                                                        return Promise.reject('Vui l??ng ch???n size!')
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
                                            label="S??? l?????ng"
                                            name="quantity"
                                            rules={[
                                                { required: true, message: "S??? l?????ng kh??ng ???????c nh???p kho???ng tr???ng!" },
                                                ({ getFieldValue, setFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (value && value > 0) {
                                                            setFieldValue('quantity', Math.floor(value))
                                                            return Promise.resolve()
                                                        }
                                                        return Promise.reject('S??? l?????ng kh??ng ???????c nh??? h??n 0!')
                                                    }
                                                })
                                            ]}
                                            hasFeedback
                                        >
                                            <InputNumber style={{ width: '100%' }} />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button style={{ borderRadius: "20px" }} htmlType='submit'>Th??m size</Button>
                                        </Form.Item>
                                    </Form>
                                </SizeFormContainer>
                                <SizesContainer>
                                    <SizesContainerTitle>Danh s??ch size s???n ph???m</SizesContainerTitle>
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
                                                                <SizeDetailsItemLabel>S??? l?????ng: </SizeDetailsItemLabel>
                                                                <SizeDetailsItemInfo>{item.quantity}</SizeDetailsItemInfo>
                                                            </SizeDetailsItem>
                                                        </SizeDetails>
                                                        <SizeDetailsAction>
                                                            <DialogHOC
                                                                title="Th??ng b??o!"
                                                                content="B???n c?? mu???n x??a size kh??ng?"
                                                                onYes={() => { handleDeleteProductSize(item.size) }}
                                                            >
                                                                <Button
                                                                    icon={<DeleteOutlineOutlinedIcon />}
                                                                    style={{ marginTop: 10, borderRadius: 10 }}
                                                                >
                                                                </Button>
                                                            </DialogHOC>
                                                        </SizeDetailsAction>
                                                    </SizeDetailsContainer>
                                                ))
                                            )
                                            :
                                            (
                                                <>
                                                    <Empty description={'Size tr???ng !'} />

                                                </>
                                            )
                                    }
                                </SizesContainer>
                            </ProductSizesDetails>
                        </Right> */}
                    </Details>
                    <Modal
                        open={isAddingSizeModal}
                        centered
                        okText="X??c Nh???n"
                        cancelText="H???y B???"
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
                                            return Promise.reject('Vui l??ng ch???n size!')
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

export default AdmNewProduct