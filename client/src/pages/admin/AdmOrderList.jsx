import ordersAPI from '../../api/ordersAPI';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Helmet from '../../components/Helmet'
import { useSelector } from 'react-redux'
import { formatter } from '../../utils/index'
import { Card, Badge, Tabs, Typography, Button, Empty, Modal, Select, Table, List, Form, Input, notification, Drawer, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { South } from '@mui/icons-material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useForm } from 'antd/lib/form/Form';
import addressAPI from '../../api/addressAPI';
import moment from 'moment'

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
`

const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 50px;
`
const Title = styled.h2`
    width: 100%;
    text-align: center;
    text-transform: capitalize;
    font-size: 40px;
    font-weight: 300;
`
const ListContainer = styled.div`
    width: 100%;
    padding: 50px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    background-color: white;
`

const ListFilterContainer = styled.div`
    width: 100%;
    display: flex;
    align-items:center;
    justify-content: flex-start;
    margin-bottom: 30px;
    border-bottom: 1px solid teal;
`
const ListFilterItem = styled.div`
    padding: 5px;
    margin-right: 10px;
`
const ListFilterTitle = styled.div` 
    margin-bottom: 5px;
`
const ListItemWrapper = styled.div``
const ActionContainer = styled.div`
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const CartDetails = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 50vh;
`
const CartBody = styled.div`
`
const Product = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`
const Image = styled.img`
    width: 100px;
    object-fit: cover;
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductName = styled.span`
    cursor: pointer;
    text-decoration: underline;
`
const ProductId = styled.span``
const ProductSize = styled.span``
const PriceDetail = styled.span`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    width: max-content;
`

const AmountInput = styled.input`
    width:  120px;
    height: 100%;
    border:none;
    outline: none;   
    padding: 5px;
`
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
`

const Bottom = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column
`

const CustomerInfoContainer = styled.div`
    width: 100%;
    padding: 20px;
`
const SummaryContainer = styled.div`
    width: 100%;
    padding: 20px;
`




const Summary = styled.div`
    flex:1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`
const SummaryTitle = styled.h1`
    font-weight: 200;
`
const SummaryItem = styled.div`
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === "total" && "500"};
    font-size: ${props => props.type === "total" && "24px"};
`
const SummaryItemText = styled.span`
`
const SummaryItemPrice = styled.span``
const NewActionContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 5px;
    margin-bottom: 5px;
`


const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description: des,
    });
};

const StatusBadge = (props) => {

    const [color, setColor] = useState('blue')

    useEffect(() => {
        if (props.status) {
            switch (props.status.id) {
                case (1): {
                    setColor('orange')
                    break;
                }
                case (2): {
                    setColor('cyan')
                    break;
                }
                case (3): {
                    setColor('purple')
                    break;
                }
                case (4): {
                    setColor('blue')
                    break;
                }
                case(5):{
                    setColor('#abad6f')
                    break;
                }
                case(6):{
                    setColor('red')
                    break;
                }
                default: {
                    setColor('blue')
                    break;
                }
            }
        }
    }, [])

    return (
        <Tag color={color}>{props?.status?.title}</Tag>
    )
}

const AdmOrderList = () => {
    const columns = [
        {
            title: 'STT',
            render: (text, record, index) => {
                return (<>{index + 1}</>)
            }
        },
        {
            title: 'Tr???ng Th??i',
            dataIndex: 'status',
            render: (text) => {
                return (
                    <StatusBadge status={text} />
                )
            },
            filters: [
                {
                    text: "??ang Ch???",
                    value: 5
                },
                {
                    text: 'Ch??? X??c Nh???n',
                    value: 1,
                },
                {
                    text: '???? X??c Nh???n',
                    value: 2,
                },
                {
                    text: '??ang Giao',
                    value: 3,
                },
                {
                    text: 'Ho??n T???t',
                    value: 4,
                },
                {
                    text: 'H???y ????n',
                    value: 6,
                },
            ],
            onFilter: (value, record) => record.status.id === value,
        },
        {
            title: 'Ng?????i Mua',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: 'T???ng S???n Ph???m',
            dataIndex: 'totalQuantity',
            key: 'totalQuantity',
            sorter: (a, b) => a.totalQuantity - b.totalQuantity
        },
        {
            title: 'Thanh To??n',
            dataIndex: 'total_price',
            key: 'total_price',
            render: (text) => (<>{text ? formatter.format(text) : formatter.format(0)}</>),
            sorter: (a, b) => a.total_price - b.total_price
        },
        {
            title: 'Ng??y T???o',
            dataIndex: 'createdDate',
            key: 'createdDate',
            render: (text) => (<>{moment(text).format('DD/MM/YYYY, H:mm:ss')}</>),
            sorter: (a, b) => (a.createdDate > b.createdDate ? -1 : 1)
        },
        {
            render: (text) => {
                return (
                    <ActionContainer>
                        {/* <Button icon={<RemoveRedEyeOutlinedIcon />} onClick={() => handleClickViewOrderInfo(text)}></Button> */}
                        <Button type='primary' icon={<RemoveRedEyeOutlinedIcon />} onClick={() => { navigate(`/admin/order/${text.id}`) }} style={{ borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></Button>
                        {/* <Button icon={<DeleteOutlineOutlinedIcon />} danger type='primary' onClick={() => { handleDeleteOrder(text) }}></Button> */}
                    </ActionContainer>
                )
            }
        }
    ];
    const auth = useSelector(state => state.auth.auth);
    const isAuth = useSelector(state => state.auth.isAuth);
    const [data, setData] = useState([]);
    const [statusList, setStatusList] = useState([])
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState(undefined)
    const [customerValue, setCustomerValue] = useState(undefined)
    const [isViewModal, setIsViewModal] = useState(undefined)
    const [form] = useForm();
    const [cityData, setCityData] = useState([])
    const [selectedData, setSelectedData] = useState({
        cityId: null,
        districtId: null,
        wardId: null
    })
    const [editingItem, setEditingItem] = useState(undefined)
    const [isEditing, setIsEditing] = useState(false)
    const [newStatusValue, setNewStatusValue] = useState(undefined)


    const onChangeCity = (value) => {
        console.log(value)
        form.setFieldValue('districtId', null)
        form.setFieldValue('wardId', null)
        setSelectedData({
            cityId: value,
            districtId: null,
            wardId: null
        })
    }

    const onChangeDistrict = (value) => {
        form.setFieldValue('wardId', null)
        setSelectedData({
            ...selectedData,
            districtId: value,
            wardId: null
        })
    }

    const onChangeWard = (value) => {
        setSelectedData({
            ...selectedData,
            wardId: value
        })
    }



    const handleUpdateOrderStatusOld = (item) => {
        const newStatus = statusList.find(x => x.id - 1 === item.statusOrders.id)
        console.log('update stt')
        console.log({
            ...item,
            statusOrders: newStatus
        })
        ordersAPI.updateOrderStatus({
            ...item,
            statusOrders: newStatus
        })
            .then(res => {
                if (!res.status) {
                    let index = data.findIndex(x => x.id === item.id)
                    if (index !== -1) {
                        data[index] = {
                            ...item,
                            statusOrders: newStatus
                        }
                        setData([...data])
                        Modal.success({
                            title: "H???p Tho???i Th??ng B??o",
                            content: "C???p nh???t tr???ng th??i ????n h??ng th??nh c??ng!"
                        })
                    }

                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))

    }

    const hanldeUpdateOrderStatus = () => {
        if (editingItem && newStatusValue) {
            Modal.confirm({
                title: "H???p Tho???i X??c Nh???n",
                content: "B???n c?? mu???n x??a ????n h??ng n??y kh??ng?",
                okText: "X??c Nh???n",
                cancelText: "H???y B???",
                onOk: () => {
                    // console.log(editingItem, newStatusValue)
                    const newStatus = statusList.find(x => x.id === newStatusValue)
                    console.log({
                        ...editingItem,
                        statusOrders: newStatus
                    })
                    ordersAPI.updateOrderStatus({
                        ...editingItem,
                        statusOrders: newStatus
                    })
                        .then(res => {
                            if (!res.status) {
                                let index = data.findIndex(x => x.id === editingItem.id)
                                console.log(index)
                                if (index !== -1) {
                                    data[index] = {
                                        ...editingItem,
                                        statusOrders: newStatus,
                                        status: newStatus.title
                                    }
                                    console.log(data[index])
                                    setData([...data])

                                    handleCloseEditModal();
                                    Modal.success({
                                        title: "H???p Tho???i Th??ng B??o",
                                        content: "C???p nh???t tr???ng th??i ????n h??ng th??nh c??ng!"
                                    })
                                }

                            } else {
                                console.log(res)
                            }
                        })
                        .catch(err => console.log(err))
                }
            })
        }
    }

    const handleCreateNewBill = () => {
        if (auth) {
            ordersAPI.createWatingOrder({ users: { username: auth?.info?.username }, orderDetail: [], statusOrder: "??ang Ch???" })
                .then(res => {
                    if (!res.status) {
                        openNotificationWithIcon('success', 'T???o ????n Ch???', 'T???o ????n ch??? th??nh c??ng')
                        console.log(res)

                        setData(
                            [...data,
                            {
                                key: res.id,
                                id: res.id,
                                createdDate: res?.createdDate,
                                username: res?.customers?.name,
                                totalQuantity: 0,
                                status: { id: 5, title: '??ang Ch???' }
                            }
                            ]
                        )
                    } else {
                        console.log(res)
                    }
                })
                .catch(err => console.log(err))
            // navigate('/admin/bills')
        }
    }


    const handleClickViewOrderInfo = (item) => {
        if (item) {
            setSelectedItem(item)
        }
    }

    const hanldeCloseViewModal = () => {
        setIsViewModal(false);
        setSelectedItem(undefined);
    }




    const handleClickUpdateStatus = (item) => {
        setEditingItem(item)
    }

    const handleCloseEditModal = (item) => {
        setEditingItem(undefined)
        setIsEditing(false)
        setNewStatusValue(undefined)
    }


    const onSelectNewStatus = (value) => {
        setNewStatusValue(value)
    }

    useEffect(() => {
        if (selectedItem) {
            console.log(selectedItem.customers)
            setCustomerValue(
                {
                    name: selectedItem.customers.name,
                    phone: selectedItem.customers.phone,
                    cityId: selectedItem.customers.address.city.id,
                    districtId: selectedItem.customers.address.district.id,
                    wardId: selectedItem.customers.address.ward.id,
                    location: selectedItem.customers.address.location
                }
            )

            setIsViewModal(true)
            setSelectedData({
                cityId: selectedItem.customers.address.city.id,
                districtId: selectedItem.customers.address.district.id,
                wardId: selectedItem.customers.address.ward.id
            })
            form.resetFields();
        }
    }, [selectedItem])

    useEffect(() => {
        if (editingItem) {
            setNewStatusValue(editingItem.statusOrders.id)
            setIsEditing(true)
        }
    }, [editingItem])

    useEffect(() => {
        if (auth) {
            addressAPI.getCityData()
                .then(res => {
                    if (!res.status) {
                        setCityData(res)
                    } else {
                        console.log(res)
                    }
                })
            ordersAPI.getAllOrderStatus()
                .then(res => {
                    if (!res.status) {
                        console.log(res)
                        setStatusList([
                            ...res
                        ])
                    } else {
                        console.log(res)
                    }
                }).then((res => {
                    ordersAPI.getAll()
                        .then(res => {
                            if (!res.status) {
                                console.log("orders");
                                console.log(res);
                                setData([...res.map((item, index) => ({
                                    ...item,
                                    key: item.id,
                                    createdDate: item.createdDate,
                                    username: item.customers.name,
                                    totalQuantity: item?.orderDetail.reduce((total, curr) => (total + curr.quantity), 0),
                                    status: item?.statusDetail[item?.statusDetail.length - 1].statusOrder
                                }))]);
                            } else {
                                console.log(res)
                            }
                        })
                        .catch(err => console.log(err));
                }))
                .catch(err => console.log(err))

        } else {
            navigate("/login")
        }
    }, [auth])

    return (
        <Helmet
            title="Danh S??ch ????n H??ng"
        >
            <Container>
                <Wrapper>
                    <ListContainer>
                        <NewActionContainer>
                            <Button style={{ borderRadius: "20px" }} onClick={() => { handleCreateNewBill() }} type='primary' >T???o ????n H??ng</Button>
                        </NewActionContainer>
                        {/* <ListFilterContainer>
                            <ListFilterItem>
                                <ListFilterTitle>Ng??y t???o ????n</ListFilterTitle>
                                <Select value={0}>
                                    <Select.Option value={0}>M???i nh???t</Select.Option>
                                    <Select.Option value={1}>C?? nh???t</Select.Option>
                                </Select>
                            </ListFilterItem>
                            <ListFilterItem>
                                <ListFilterTitle>Tr???ng th??i ????n h??ng</ListFilterTitle>
                                <Select value={0}>
                                    <Select.Option value={0}>T???t c???</Select.Option>
                                </Select>
                            </ListFilterItem>
                        </ListFilterContainer> */}
                        <ListItemWrapper>
                            <Table columns={columns} dataSource={data.sort((a, b) => a.createdDate > b.createdDate ? -1 : 1)} bordered />
                        </ListItemWrapper>
                    </ListContainer>
                </Wrapper>
                {
                    isViewModal &&
                    <Drawer
                        title={'Th??ng Tin ????n H??ng'}
                        placement="right"
                        onClose={hanldeCloseViewModal}
                        open={isViewModal}
                        size='large'
                    >
                        {
                            selectedItem &&
                            <>
                                <Form
                                    name="districtForm"
                                    layout='vertical'
                                    wrapperCol={{ span: 24 }}
                                    labelCol={{ span: 24 }}
                                    form={form}
                                    onFinish={() => { }}
                                    initialValues={customerValue}
                                >

                                    <Bottom>
                                        <CustomerInfoContainer>
                                            <Form.Item>
                                                <Typography>Th??ng tin li??n h??? giao h??ng</Typography>
                                            </Form.Item>
                                            <Form.Item
                                                label="H??? v?? t??n"
                                                name="name"
                                                hasFeedback
                                                rules={[
                                                    { required: true, message: "Vui l??ng nh???p h??? v?? t??n!" },
                                                    { whitespace: true, message: "Vui l??ng kh??ng nh???p kho???ng tr???ng!" }
                                                ]}
                                            >
                                                <Input disabled />
                                            </Form.Item>
                                            <Form.Item
                                                label="S??? ??i???n tho???i"
                                                name="phone"
                                                hasFeedback
                                                rules={[
                                                    { required: true, message: "Vui l??ng nh???p s??? ??i???n tho???i!" },
                                                    { whitespace: true, message: "Vui l??ng kh??ng nh???p kho???ng tr???ng!" }
                                                ]}
                                            >
                                                <Input disabled />
                                            </Form.Item>
                                            <Form.Item>
                                                <Typography>?????a ch??? giao h??ng</Typography>
                                            </Form.Item>
                                            <Form.Item
                                                label="T???nh/Th??nh Ph???"
                                                name="cityId"
                                                hasFeedback
                                                rules={[
                                                    { required: true, message: 'Vui l??ng ch???n T???nh/Th??nh Ph???!' }
                                                ]}
                                            >
                                                <Select
                                                    onChange={onChangeCity}
                                                    placeholder="T???nh/Th??nh"
                                                    disabled
                                                >
                                                    {
                                                        cityData.map((item, index) => (
                                                            <Select.Option key={item.id} value={item.id}>{item.title}</Select.Option>
                                                        ))
                                                    }
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                label="Qu???n/Huy???n"
                                                name="districtId"
                                                hasFeedback
                                                rules={[
                                                    { required: true, message: 'Vui l??ng ch???n Qu???n/Huy???n' }
                                                ]}
                                                disabled
                                            >
                                                <Select placeholder="Qu???n/Huy???n"
                                                    onChange={onChangeDistrict}
                                                    disabled
                                                >
                                                    {
                                                        selectedData.cityId ?
                                                            (
                                                                <>
                                                                    {
                                                                        (cityData.find(item => item.id === selectedData.cityId)).districts.map(item => (
                                                                            <Select.Option value={item.id} key={item.id} >{item.title}</Select.Option>
                                                                        ))
                                                                    }
                                                                </>
                                                            )
                                                            :
                                                            (
                                                                <>

                                                                </>
                                                            )
                                                    }
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                label="Ph?????ng/X??"
                                                name="wardId"
                                                hasFeedback
                                                rules={[
                                                    { required: true, message: 'Vui l??ng ch???n Ph?????ng/X??!' }
                                                ]}
                                            >
                                                <Select disabled
                                                    onChange={onChangeWard}
                                                    placeholder="Ph?????ng/X??"
                                                >
                                                    {
                                                        selectedData.cityId && selectedData.districtId ?
                                                            (
                                                                <>
                                                                    {
                                                                        ((cityData.find(item => item.id === selectedData.cityId)).districts.find(item => item.id === selectedData.districtId)).wards.map(item => (
                                                                            <Select.Option value={item.id} key={item.id} >{item.title}</Select.Option>
                                                                        ))
                                                                    }
                                                                </>
                                                            )
                                                            :
                                                            (
                                                                <>

                                                                </>
                                                            )
                                                    }
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                label="?????a ch???"
                                                name="location"
                                                hasFeedback
                                                rules={[
                                                    { required: true, message: 'Vui l??ng nh???p ?????a ch??? nh???n h??ng!' },
                                                    { whitespace: true, message: 'Vui l??ng kh??ng nh???p kho???ng tr???ng!' }
                                                ]}
                                            >
                                                <Input disabled />
                                            </Form.Item>
                                            <Form.Item
                                                label="Ghi Ch??"
                                                name="note"
                                            >
                                                <Input.TextArea
                                                    disabled />
                                            </Form.Item>

                                        </CustomerInfoContainer>

                                        <CartDetails>
                                            <CartBody>
                                                <List
                                                    bordered
                                                    dataSource={selectedItem.orderDetail}
                                                    style={{
                                                        height: '50vh',
                                                        overflowY: 'scroll'
                                                    }}
                                                    renderItem={(item, index) => (
                                                        <List.Item>
                                                            <Product key={index}>
                                                                <ProductDetail>
                                                                    <Image src={item.product.images && `http://localhost:8080/api/file/images/${item.product.images[0].photo}`} />
                                                                    <Details>
                                                                        <ProductName onClick={() => { navigate(`/product/${item.product.id}`) }}>
                                                                            <b>Product:</b> {item.product?.name}
                                                                        </ProductName>
                                                                        <ProductId>
                                                                            <b>ID:</b> {item.product.id}
                                                                        </ProductId>
                                                                        <ProductSize>
                                                                            <b>Size:</b> {item.size}
                                                                        </ProductSize>
                                                                    </Details>
                                                                </ProductDetail>
                                                                <PriceDetail>
                                                                    <ProductAmountContainer>
                                                                        <ProductAmount>
                                                                            <AmountInput
                                                                                type='text'
                                                                                value={item.quantity}
                                                                            />
                                                                        </ProductAmount>
                                                                    </ProductAmountContainer>
                                                                    <ProductPrice>{formatter.format(item.total_price)}</ProductPrice>
                                                                </PriceDetail>
                                                            </Product>
                                                        </List.Item>
                                                    )}
                                                />
                                            </CartBody>
                                        </CartDetails>
                                        <SummaryContainer>
                                            <Form.Item>
                                                <Typography>Ph????ng Th???c Thanh To??n</Typography>
                                            </Form.Item>
                                            <Form.Item>
                                                <Select
                                                    placeholder="Ph????ng th???c thanh to??n"
                                                    value="1"
                                                    disabled
                                                >
                                                    <Select.Option value="1">Thanh to??n khi nh???n h??ng!</Select.Option>
                                                </Select>
                                            </Form.Item>
                                            <Summary>
                                                <SummaryTitle>Th??ng Tin H??a ????n</SummaryTitle>
                                                <SummaryItem type="total">
                                                    <SummaryItemText>Thanh to??n</SummaryItemText>
                                                    <SummaryItemPrice>{selectedItem && formatter.format(selectedItem.total_price)}</SummaryItemPrice>
                                                </SummaryItem>
                                            </Summary>
                                        </SummaryContainer>
                                    </Bottom>
                                </Form>
                            </>
                        }
                    </Drawer>
                }
                <Modal
                    open={isEditing}
                    onOk={hanldeUpdateOrderStatus}
                    onCancel={handleCloseEditModal}
                    okText="X??c Nh???n"
                    cancelText="H???y B???"
                >
                    {editingItem &&
                        <Select
                            onChange={onSelectNewStatus}
                            value={newStatusValue}
                        >
                            {statusList.map((item) => (
                                <Select.Option key={item.id} value={item.id}>{item.title}</Select.Option>
                            ))}
                        </Select>
                    }
                </Modal>
            </Container>
        </Helmet>
    )
}

export default AdmOrderList