import React, { useState, useRef } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import Helmet from '../../components/Helmet';
import styled from 'styled-components';
import { List, Spin, Steps, Tag, Typography, Select, Button, Skeleton, Modal, notification, Table, Input, Form, Space, InputNumber } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ordersAPI from '../../api/ordersAPI';
import { formatter } from '../../utils';
import AdmWatingOrder from './AdmWatingOrder';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useForm } from 'antd/es/form/Form';
import addressAPI from '../../api/addressAPI';
import { Add, Remove } from '@mui/icons-material';
import Highlighter from 'react-highlight-words';
import productAPI from '../../api/productsAPI';

const Container = styled.div`
    width: 100%;
`
const ProductContainer = styled.div`
    width: 100%;
`
const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    flex-wrap: wrap;
`

const StepsContainer = styled.div`
    width: 100%;
    padding: 30px 20px;
    background-color: white;
    margin-bottom: 20px;
`
const StepsWrapper = styled.div`
    width: 100%;
`
const StepsActionsContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const PaymentContainer = styled.div`
    width: 100%;
    padding: 30px 20px;
    background-color:white;
    margin-bottom: 20px;
`
const PaymentWrapper = styled.div``
const PaymentTitle = styled.div`
    width: 100%;
    text-transform: capitalize;
    text-align: left;
    padding-bottom: 15px;
    border-bottom: 1px solid teal;
    font-size: 20px;
    font-weight: 300;
    margin-bottom: 5px;
`
const PaymentType = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom :5px;
`
const PaymentDetail = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom :5px;
`


const CustomerInfoContainer = styled.div`
    width: 100%;
    padding: 30px 20px;
    background-color: white;
    display: flex;
    flex-wrap: wrap;
`
const Title = styled.div`
    width: 100%;
    text-transform: capitalize;
    text-align: left;
    padding-bottom: 15px;
    border-bottom: 1px solid teal;
    font-size: 20px;
    font-weight: 300;
`
const CustomerInfo = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
`
const CustomerInfoItem = styled.div`
    width: 50%;
    padding: 10px;
    display: flex;
`
const CustomerInfoItemLabel = styled.div`
    width: 20%;
    text-transform: capitalize;
    font-weight: 600;
`
const CustomerInfoItemContent = styled.div`
    color: #666;
`

const CustomerInfoActions = styled.div`
    width: 100%;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
const CartContainer = styled.div`
    width: 100%;
    margin-top: 20px;
`
const CartActions = styled.div`
    width: 100%;
    padding: 10px;
    display: flex;
    align-items:  center;
    justify-content: flex-end;
    background-color: white;
`
const CartDetails = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: max-content;
    margin-bottom: 50px;
`
const CartBody = styled.div`
    max-height: 60vh;
`
const CartFooter = styled.div`
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    background-color: white;
    padding: 10px 30px;
    font-size: 16px;
`
const Product = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    margin-bottom: 10px;
    width: 100%;
    padding-bottom: 5px;
    border-bottom: 1px solid #999;
`
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`
const Image = styled.img`
    width: 120px;
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
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
`
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
const QuantityButton = styled.div`
    width:  30px;
    height: 30px;
    border: 0.5px  solid  lightgray;
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
    text-align: center;
`
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
`
const ProductAction = styled.div`
    display: flex;
    align-items: center;
`

const FormContainer = styled.div`
    width: 100%;
    display: flex;
`

const ActionContainer = styled.div`
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const FormLocationGroup = styled.div`
    width: 100%;
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`


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
                default: {
                    setColor('blue')
                    break;
                }
            }
        }
    }, [])

    return (
        <Tag color={color}>{props.status.title}</Tag>
    )
}


const UpdateStatusButton = ({ item, onClickUpdate }) => {
    const [btnText, setBtnText] = useState('X??c Nh???n')
    const [modalContent, setModalContent] = useState('B???n c?? ch???c ch???n kh??ng?')
    const [nextStatus, setNextStatus] = useState(undefined)
    const [statusList, setStatusList] = useState([
        {
            id: 1,
            title: 'Ch??? X??c Nh???n'
        },
        {
            id: 2,
            title: '???? X??c Nh???n'
        },
        {
            id: 3,
            title: '??ang Giao'
        },
        {
            id: 4,
            title: 'Ho??n T???t'
        },
        {
            id: 6,
            title: 'H???y ????n'
        }
    ])

    const handleUpdateItemStatusToCancel = () => {
        let payload = {
            id: item.id,
            DescriptionOder: '',
            statusOrder: 'H???y ????n',
            isFinish: true,
            orderDetail: item.orderDetail
        }
        onClickUpdate(payload)
    }
    
    const handleUpdateItemStatus = () => {

        if (item && nextStatus) {
            let payload = {
                id: item.id,
                DescriptionOder: 'test des',
                statusOrder: nextStatus.title,
                isFinish: true,
                orderDetail: item.orderDetail
            }
            onClickUpdate(payload)
        }
    }


    useEffect(() => {
        switch (item?.statusDetail[item?.statusDetail.length - 1].statusOrder?.id) {
            case (1): {
                setBtnText('X??c Nh???n')
                setNextStatus(statusList[1])
                break;
            }
            case (2): {
                setBtnText('??ang Giao H??ng')
                setNextStatus(statusList[2])
                break;
            }
            case (3): {
                setBtnText('????n H??ng Ho??n Th??nh')
                setNextStatus(statusList[3])
                break;
            }
            case (4): {
                setBtnText('X??c Nh???n')
                setNextStatus(undefined)
                break;
            }
            default: {
                setBtnText('X??c Nh???n')
                setNextStatus(undefined)
                break;
            }
        }
    }, [item])
    return (
        item?.statusDetail[item?.statusDetail.length - 1].statusOrder?.id === 4 ?
            (
                <></>
            )
            :
            (   
                
                item?.statusDetail[item?.statusDetail.length - 1].statusOrder?.id === 6 ? 
                (
                    <></>
                )
                :
                (<>
                    <Button style={{ borderRadius: "20px" }} onClick={handleUpdateItemStatusToCancel} type='primary' danger>H???y ????n</Button>
                    <Button style={{ borderRadius: "20px" }} onClick={handleUpdateItemStatus} type='primary'>{btnText}</Button >
                </>
            ))
                
    )
}

const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description: des,
    });
};

const findStepIndex = (arr, sttId) => {
    let result = -1;
    if (arr) {
        arr.forEach((item, index) => {
            if (item.statusOrder.id === sttId) {
                result = index
            }
        });
    }

    return result;
}

const checkPr = (product) => {
    let result = false;
    let now = new Date();
    if (product && product.promotions) {
        if (product.promotions.length > 0) {
            if (product.promotions[0]?.promition.isactive) {
                result = (now >= new Date(product.promotions[0]?.promition.date_after) && now <= new Date(product.promotions[0]?.promition.date_befor))
            }
        }
    }

    return result
}

const getDiscountPercent = (product) => {
    let result = 0
    if (product) {
        result = product.promotions[0]?.promition?.by_persent
    }
    return result
}

const findByProductIdAndSizeId = (arr, prId, sId) => {
    let result = -1
    if (arr && arr.length > 0) {
        arr.forEach((item, index) => {
            if (item.item.id === prId && item.selectedSize.id === sId) {
                result = index;
                return result;
            }
        })
    }
    return result
}


const AdmOrderInfo = () => {

    const { id } = useParams();
    const [info, setInfo] = useState(undefined)
    const [IsLoadingInfo, setIsLoadingInfo] = useState(true)
    const [isModalStatus, setIsModalStatus] = useState(false)
    const [isModalCustomerInfo, setIsModalCustomerInfo] = useState(false)
    const [editingCustomerInfo, setEditingCustomerInfo] = useState(undefined)
    const [editingOrderItem, setEdittingOrderItem] = useState(undefined)
    const [isModalDesc, setIsModalDesc] = useState(false)
    const [updateSttDesc, setUpdateSttDesc] = useState('')
    const auth = useSelector(state => state.auth.auth);



    ///////////////////

    const [isEditingCart, setIsEditingCart] = useState(false);
    const [editingCartInfo, setEditingCartInfo] = useState(undefined);
    const [cartLoading, setCartLoading] = useState(true);
    const [addingProduct, setAddingProduct] = useState(undefined)
    const [product, setProduct] = useState([])
    const [selectProductForm] = useForm()

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };


    const productColumn = [
        {
            title: 'STT',
            dataIndex: 'index',
        },
        {
            title: '???nh',
            render: (record) => {
                return (
                    <>
                        <img src={`http://localhost:8080/api/file/images/${record?.images[0]?.photo}`} style={{ width: '60px' }} />
                    </>
                )
            }
        },
        {
            title: 'T??n S???n Ph???m',
            dataIndex: 'name',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Lo???i S???n Ph???m',
            render: (record) => {
                return (
                    <>
                        {record?.category?.title}
                    </>
                )
            }
        },
        {
            title: 'Gi??',
            dataIndex: 'export_price',
            render: (text) => {
                return (
                    <>
                        {formatter.format(text)}
                    </>
                )
            },
            sorter: (a, b) => a.export_price - b.export_price
        },
        {
            title: 'Thao T??c',
            render: (record) => {
                return (
                    <>
                        <Button type='primary' onClick={() => { setAddingProduct(record) }}>Th??m S???n Ph???m</Button>
                    </>
                )
            }
        }
    ]

    const onClickEditCartInfo = () => {
        setIsEditingCart(true)
        setCartLoading(true)
        if (info?.orderDetail) {
            setEditingCartInfo([
                ...info?.orderDetail.map((c, index) => {
                    return (
                        {
                            item: c?.product,
                            quantity: c?.quantity,
                            size: c.size,
                            selectedSize: c?.product?.productsizes.find(s => s?.size?.title === c?.size)
                        }
                    )
                })
            ])
            setCartLoading(false)
        }
    }

    const handleChangeCartItemSize = (item, newSizeId, currIndex) => {
        const newSize = item?.item?.productsizes.find((size) => size.id === newSizeId)

        const index = findByProductIdAndSizeId(editingCartInfo, item?.item?.id, newSize.id)
        // setCartLoading(true)
        if (index !== -1) {
            editingCartInfo[index] = {
                ...editingCartInfo[index],
                selectedSize: newSize,
                quantity: 1
            }
            editingCartInfo.splice(currIndex, 1)
            setEditingCartInfo([...editingCartInfo])
        } else {
            editingCartInfo.splice(currIndex, 1)
            editingCartInfo.push({ item: item.item, selectedSize: newSize, quantity: 1 })
            setEditingCartInfo([...editingCartInfo])
        }
        // let payload = {
        //     users: {
        //         username: auth?.info?.username
        //     },
        //     id,
        //     orderDetail: [
        //         ...editingCartInfo.map((item, index) => ({
        //             product: { id: item?.item?.id },
        //             quantity: item?.quantity,
        //             size: item?.selectedSize?.size?.title,
        //             total_price: item?.item?.export_price * item?.quantity
        //         }))
        //     ],
        //     statusOrders: ({ id: 5, title: '??ang Ch???' }),
        //     total_price: editingCartInfo.length > 0 ? (editingCartInfo.reduce((total, curr) => (total + curr?.quantity * curr?.item?.export_price), 0)) : 0
        // }
        // ordersAPI.updateWatingOrder(payload)
        //     .then(res => {
        //         if (!res.status) {
        //             openNotificationWithIcon('success', 'Th??m S???n Ph???m V??o Gi??? H??ng', 'Thay ?????i size th??nh c??ng!')
        //             setCartLoading(false)
        //         }
        //     }
        //     )
        //     .catch(err => {
        //         openNotificationWithIcon('error', 'L???i ', err)
        //         setCartLoading(true)
        //         console.log(err)
        //     })
    }

    const handleClickUpdateCartItemQuantity = (item, newQuantity, currIndex) => {

        if (newQuantity <= 0) {
            handleDeleteCartItem(currIndex);
        } else {
            if (newQuantity > item.selectedSize.quantity) {
                openNotificationWithIcon('warning', 'Th??ng b??o', `Trong kho hi???n  c??n l???i ${item.selectedSize.quantity}  s???n ph???m!`);
            } else {
                editingCartInfo[currIndex].quantity = newQuantity
                setEditingCartInfo([...editingCartInfo])
                // let payload = {
                //     users: {
                //         username: auth?.info?.username
                //     },
                //     id,
                //     orderDetail: [
                //         ...editingCartInfo.map((item, index) => ({
                //             product: { id: item?.item?.id },
                //             quantity: item?.quantity,
                //             size: item?.selectedSize?.size?.title,
                //             total_price: item?.item?.export_price * item?.quantity
                //         }))
                //     ],
                //     statusOrders: ({ id: 5, title: '??ang Ch???' }),
                //     total_price: editingCartInfo.length > 0 ? (editingCartInfo.reduce((total, curr) => (total + curr?.quantity * curr?.item?.export_price), 0)) : 0
                // }
                // ordersAPI.updateWatingOrder(payload)
                //     .then(res => {
                //         if (!res.status) {
                //             openNotificationWithIcon('success', 'Th??m S???n Ph???m V??o Gi??? H??ng', 'Thay ?????i size th??nh c??ng!')
                //             setCartLoading(false)
                //         }
                //     }
                //     )
                //     .catch(err => {
                //         openNotificationWithIcon('error', 'L???i ', err)
                //         setCartLoading(true)
                //         console.log(err)
                //     })
            }

        }
    }




    const onSelectSizeAndQuantityFinish = (value) => {
        const selectedSize = addingProduct.productsizes.find(size => size.id === value.sizeId)
        const index = findByProductIdAndSizeId(editingCartInfo, addingProduct.id, selectedSize.id)
        if (index === -1) {
            editingCartInfo.push({ item: addingProduct, selectedSize, quantity: (value.quantity > selectedSize.id ? selectedSize.quantity : value.quantity) })
            setEditingCartInfo([...editingCartInfo])

        } else {
            if (editingCartInfo[index].quantity + 1 > editingCartInfo[index].selectedSize.quantity) {
                editingCartInfo[index].quantity = editingCartInfo[index].selectedSize.quantity;
                openNotificationWithIcon('warning', 'Th??ng B??o', `Hi???n ch??? c??n ${editingCartInfo[index].selectedSize.quantity} s???n ph???m trong kho!`)
            } else {
                editingCartInfo[index].quantity += 1;
            }
            setEditingCartInfo([...editingCartInfo])

        }
        openNotificationWithIcon('success', 'Th??m S???n Ph???m V??o Gi??? H??ng', '???? th??m s???n ph???m v??o gi??? h??ng')
        setAddingProduct(undefined)
        // let payload = {
        //     users: {
        //         username: auth?.info?.username
        //     },
        //     id,
        //     orderDetail: [
        //         ...editingCartInfo.map((item, index) => ({
        //             product: { id: item?.item?.id },
        //             quantity: item?.quantity,
        //             size: item?.selectedSize?.size?.title,
        //             total_price: item?.item?.export_price * item?.quantity
        //         }))
        //     ],
        //     statusOrders: ({ id: 5, title: '??ang Ch???' }),
        //     total_price: editingCartInfo.length > 0 ? (editingCartInfo.reduce((total, curr) => (total + curr?.quantity * curr?.item?.export_price), 0)) : 0
        // }

        // ordersAPI.updateWatingOrder(payload)
        //     .then(res => {
        //         if (!res.status) {
        //             openNotificationWithIcon('success', 'Th??m S???n Ph???m V??o Gi??? H??ng', '???? th??m s???n ph???m v??o gi??? h??ng')
        //             setCartLoading(false)
        //         }
        //     }
        //     )
        //     .catch(err => {
        //         openNotificationWithIcon('error', 'L???i ', err)
        //         setCartLoading(true)
        //         console.log(err)
        //     })
    }

    const handleDeleteCartItem = (index) => {
        if (editingCartInfo[index]) {
            Modal.confirm({
                title: "H???p Tho???i X??c Nh???n",
                content: "B???n c?? mu???n x??a s???n ph???m kh???i gi??? h??ng kh??ng?",
                okText: "X??c Nh???n",
                cancelText: "H???y B???",
                onOk: () => {
                    // setCartLoading(true)
                    editingCartInfo.splice(index, 1)
                    setEditingCartInfo([...editingCartInfo])
                    openNotificationWithIcon('info', 'X??a S???n Ph???m Kh???i Gi??? H??ng', '???? x??a s???n ph???m kh???i gi??? h??ng')
                    // let payload = {
                    //     users: {
                    //         username: auth?.info?.username
                    //     },
                    //     id,
                    //     orderDetail: [
                    //         ...editingCartInfo.map((item, index) => ({
                    //             product: { id: item?.item?.id },
                    //             quantity: item?.quantity,
                    //             size: item?.selectedSize?.size?.title,
                    //             total_price: item?.item?.export_price * item?.quantity
                    //         }))
                    //     ],
                    //     statusOrders: ({ id: 5, title: '??ang Ch???' })
                    // }
                    // ordersAPI.updateWatingOrder(payload)
                    //     .then(res => {
                    //         if (!res.status) {
                    //             openNotificationWithIcon('info', 'X??a S???n Ph???m Kh???i Gi??? H??ng', '???? x??a s???n ph???m kh???i gi??? h??ng')
                    //             setCartLoading(false)
                    //         }
                    //     }
                    //     )
                    //     .catch(err => {
                    //         openNotificationWithIcon('error', 'L???i ', err)
                    //         setCartLoading(true)
                    //         console.log(err)
                    //     })
                }
            })
        }
    }

    const handleChangeCartItemQuantity = (e, item) => {
        let index = editingCartInfo.findIndex(dataItem => (dataItem.item.id === item.item.id && dataItem.selectedSize.id === item.selectedSize.id));
        if (index !== -1) {
            editingCartInfo[index].quantity = e.target.value;
            setEditingCartInfo([...editingCartInfo])
        }
    }

    const handleBlurCartItemQuantityInput = (e, item) => {
        let index = editingCartInfo.findIndex(dataItem => (dataItem.item.id === item.item.id && dataItem.selectedSize.id === item.selectedSize.id));
        if (Number.isNaN(Number.parseInt(editingCartInfo[index].quantity))) {
            editingCartInfo[index].quantity = 1;
            setEditingCartInfo([...editingCartInfo])
            openNotificationWithIcon('error', 'L???i nh???p li???u', 'Vui l??ng nh???p  s??? l?????ng mua h??ng l?? m???t s??? t??? nhi??n l???n h??n  0!')
        } else {
            if (Number.parseInt(editingCartInfo[index].quantity) <= 0) {
                editingCartInfo[index].quantity = 1;
                setEditingCartInfo([...editingCartInfo])
                openNotificationWithIcon('error', 'L???i nh???p li???u', 'Vui l??ng nh???p  s??? l?????ng mua h??ng l?? m???t s??? t??? nhi??n l???n h??n  0!')
            } else {
                let quantity = Number.parseInt(editingCartInfo[index].quantity)
                if (quantity > editingCartInfo[index].selectedSize.quantity) {
                    quantity = editingCartInfo[index].selectedSize.quantity
                    editingCartInfo[index].quantity = quantity;
                    setEditingCartInfo([...editingCartInfo])
                    openNotificationWithIcon('warning', 'Th??ng b??o', `Trong kho hi???n  c??n l???i ${editingCartInfo[index].selectedSize.quantity}  s???n ph???m!`)
                } else {
                    editingCartInfo[index].quantity = quantity;
                    let payload = {
                        ...item,
                        quantity: quantity
                    }
                    setEditingCartInfo([...editingCartInfo])
                }
            }
        }
    }


    const onClickSubmitEditingCart = () => {
        Modal.confirm({
            title: 'H???p Tho???i X??c Nh???n',
            content: 'B???n c?? mu???n c???p nh???t ????n h??ng kh??ng?',
            okText: 'X??c Nh???n',
            cancelText: 'H???y B???',
            onOk: () => {
                let payload = {
                    users: {
                        username: auth?.info?.username
                    },
                    id,
                    orderDetail: [
                        ...editingCartInfo.map((item, index) => ({
                            product: { id: item?.item?.id },
                            quantity: item?.quantity,
                            size: item?.selectedSize?.size?.title,
                            total_price: item?.item?.export_price * item?.quantity
                        }))
                    ],
                    statusOrders: ({ id: 5, title: '??ang Ch???' }),
                    reduce_price: editingCartInfo.reduce((total, item) => {
                        if (checkPr(item.item)) {
                            return total + item.quantity * (item.item?.export_price * (getDiscountPercent(item.item) / 100))
                        } else {
                            return total
                        }
                    }, 0),
                    total_price: editingCartInfo.reduce((total, item) => {
                        if (checkPr(item.item)) {
                            return total + item.quantity * (item.item?.export_price - item.item?.export_price * (getDiscountPercent(item.item) / 100))
                        } else {

                            return total + item.quantity * item.item?.export_price
                        }
                    }, 0)
                }
                console.log(payload)
                ordersAPI.updateWatingOrder(payload)
                    .then(res => {
                        if (!res.status) {
                            openNotificationWithIcon('success', 'C???p Nh???t Gi??? H??ng', '???? c???p nh???t gi??? h??ng th??nh c??ng')
                            setCartLoading(false)
                            setIsEditingCart(false)
                            setEditingCartInfo(undefined)
                            return res?.id
                        }
                    })
                    .then(id => {
                        setIsLoadingInfo(true)
                        ordersAPI.getOrderInfo(id)
                            .then(res => {
                                if (!res.status) {
                                    setInfo(res)
                                    console.log(res)
                                    setIsLoadingInfo(false)
                                } else {
                                    console.log(res)
                                }
                            })
                            .catch(err => console.log(err))
                    })
                    .catch(err => {
                        openNotificationWithIcon('error', 'L???i ', err)
                        setCartLoading(true)
                        console.log(err)
                    })
            }
        })

    }

    const onClickCloseEditingCart = () => {
        setIsEditingCart(false);
        setEditingCartInfo(undefined);
    }




    //////////
    const [steps, setSteps] = useState([
        { index: 1, id: 5, title: "??ang Ch???" },
        { index: 2, id: 1, title: "Ch??? X??c Nh???n" },
        { index: 3, id: 2, title: "???? X??c Nh???n" },
        { index: 4, id: 3, title: "??ang Giao" },
        { index: 5, id: 4, title: "Ho??n T???t" },
        { index: 6, id: 6, title: 'H???y ????n' }
    ])
    const navigate = useNavigate();
    const [updateForm] = useForm()
    const statusModalColumns = [
        {
            title: '',
            render: (record) => {
                return (
                    <>
                        {record?.statusOrder?.title}
                    </>
                )
            }
        },
        {
            title: 'Th???i Gian',
            render: (record) => {
                return (
                    <>
                        {moment(record?.timeDate).format('DD/MM/YYYY, H:mm:ss')}
                    </>
                )
            }
        },
        {
            title: 'Ng?????i X??c Nh???n',
            render: (record) => {
                return (
                    <>
                        {record?.usersUpdate?.username}
                    </>
                )
            }
        },
        {
            title: 'Ghi Ch??',
            render: (record) => {
                console.log(record)
                return (
                    <>
                        {record?.description}
                    </>
                )
            }
        }
    ]


    const onClickUpdateWatingOrder = (item) => {
        ordersAPI.updateOrderStatus({
            ...item,
            users: {
                username: auth?.info?.username
            },
            isFinish: true
        })
            .then(res => {
                if (!res.status) {
                    console.log(res)
                    setInfo({ ...res })
                    Modal.success({
                        title: "H???p Tho???i Th??ng B??o",
                        content: "C???p nh???t tr???ng th??i ????n h??ng th??nh c??ng!"
                    })
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
        console.log(item)
        let payload = {

        }
    }

    const onClickUpdateStatus = (item) => {
        if (auth) {
            let payload = {
                ...item,
                users: {
                    username: auth?.info?.username
                }
            }
            setEdittingOrderItem(payload)
            setIsModalDesc(true)
        }
    }

    const handleUpdateStatus = () => {
        if (editingOrderItem) {
            let payload = {
                ...editingOrderItem,
                DescriptionOder: updateSttDesc
            }
            console.log(payload)
            ordersAPI.updateOrderStatus(payload)
                .then(res => {
                    if (!res.status) {
                        setInfo({ ...res })
                        console.log(res)
                        Modal.success({
                            title: "H???p Tho???i Th??ng B??o",
                            content: "C???p nh???t tr???ng th??i ????n h??ng th??nh c??ng!"
                        })
                        onCloseModalDesc()
                    } else {
                        console.log(res)
                    }
                })
                .catch(err => console.log(err))
        }
    }

    const onClickUpdateCustomerInfo = () => {
        setIsModalCustomerInfo(true);
        setEditingCustomerInfo({
            name: info?.customers?.name,
            phone: info?.customers?.phone,
            location: info?.customers?.address?.location,
            note: info?.note ? info?.note : '',
            cityId: info?.customers?.address?.city?.id,
            districtId: info?.customers?.address?.district?.id,
            wardId: info?.customers?.address?.ward?.id
        })
        setSelectedData({
            cityId: info?.customers?.address?.city?.id,
            districtId: info?.customers?.address?.district?.id,
            wardId: info?.customers?.address?.ward?.id
        })
    }

    const onCloseModalCustomerInfo = () => {
        setEditingCustomerInfo(undefined);
        setIsModalCustomerInfo(false)
    }

    const onCloseModalDesc = () => {
        setEdittingOrderItem(undefined);
        setUpdateSttDesc('');
        setIsModalDesc(false)
    }

    const onChangeCity = (value) => {
        updateForm.setFieldValue('districtId', null)
        updateForm.setFieldValue('wardId', null)
        setSelectedData({
            cityId: value,
            districtId: null,
            wardId: null
        })
    }

    const onChangeDistrict = (value) => {
        updateForm.setFieldValue('wardId', null)
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

    const [cityData, setCityData] = useState([])
    const [selectedData, setSelectedData] = useState({
        cityId: null,
        districtId: null,
        wardId: null
    })

    const handleUpdateCustomerInfo = (value) => {
        Modal.confirm({
            title: 'H???p Tho???i X??c Nh???n',
            content: 'B???n c?? mu???n c???p nh???t ????n h??ng kh??ng?',
            okText: 'X??c Nh???n',
            cancelText: 'H???y B???',
            onOk: () => {
                let payload = {
                    ...info,
                    customers: {
                        "phone": value?.phone,
                        "name": value?.name,
                        "note": value.note ? value.note : '',
                        "user": {
                            "username": auth?.info?.username
                        }
                    }
                    ,
                    statusOrder: "Ch??? X??c Nh???n",
                    isFinish: false,
                    cityId: value.cityId,
                    districtId: value.districtId,
                    wardId: value.wardId,
                    location: value.location
                }
                console.log(payload)
                ordersAPI.updateOrderStatus(payload)
                    .then(res => {
                        if (!res.status) {
                            openNotificationWithIcon('success', 'Th??ng B??o', 'C???p nh???t ????n h??ng th??nh c??ng!')
                            setInfo(res)
                            setIsModalCustomerInfo(false)
                            console.log(res)
                        } else {
                            console.log(res)
                        }
                    })
                    .catch(err => console.log(err))
            }
        })
    }


    useEffect(() => {
        if (editingCustomerInfo) {
            console.log(editingCustomerInfo)
            console.log('reset field form')
            updateForm.setFieldValue('phone', editingCustomerInfo.phone)
            updateForm.resetFields()
        }
    }, [editingCustomerInfo])

    useEffect(() => {
        ordersAPI.getOrderInfo(id)
            .then(res => {
                if (!res.status) {
                    setInfo(res)
                    console.log(res)
                    setIsLoadingInfo(false)
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }, [id])

    useEffect(() => {
        productAPI.getAll()
            .then(res => {
                if (!res.status) {
                    setProduct(res.map((item, index) => {
                        return ({
                            index: index + 1,
                            key: item.id,
                            ...item
                        })
                    }))
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
        addressAPI.getCityData()
            .then(res => {
                if (!res.status) {
                    setCityData(res)
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <Helmet
            title={"Qu???n L?? ????n H??ng"}
        >
            {
                IsLoadingInfo ?
                    (
                        <Container>
                            <Wrapper>
                                Loading... <Spin />
                            </Wrapper>
                        </Container>
                    )
                    :
                    (
                        info?.statusDetail[info?.statusDetail.length - 1].statusOrder?.id === 5 ?
                            (
                                <AdmWatingOrder id={info?.id} info={info} onClickUpdateStatus={onClickUpdateWatingOrder} />
                            )
                            :
                            (<Container>
                                <Wrapper>
                                    <ActionContainer>
                                        <Button type='primary' onClick={() => { navigate("/admin/order-list") }}>Danh S??ch</Button>
                                    </ActionContainer>
                                    <StepsContainer>
                                        <StepsWrapper>
                                            {
                                                steps && steps.length > 0 &&
                                                <Steps current={steps.findIndex((item) => item.id === info?.statusDetail[info?.statusDetail.length - 1]?.statusOrder.id)}>
                                                    {steps.map(item => {
                                                        let checkDesc = findStepIndex(info?.statusDetail, item.id)
                                                        let des = checkDesc === -1 ? '' : info?.statusDetail[checkDesc]?.timeDate
                                                        return (
                                                            (
                                                                <Steps.Step
                                                                    title={item.title}
                                                                    key={item.id}
                                                                    description={des !== '' ? moment(des).format('DD/MM/YYYY, H:mm:ss') : ''}
                                                                />
                                                            )
                                                        )
                                                    }
                                                    )}
                                                </Steps>
                                            }
                                            <br />
                                        </StepsWrapper>
                                        <StepsActionsContainer>
                                            <UpdateStatusButton item={info} onClickUpdate={onClickUpdateStatus} />
                                            <Button style={{ borderRadius: "20px" }} onClick={() => { setIsModalStatus(true) }}>Chi Ti???t</Button>
                                        </StepsActionsContainer>
                                    </StepsContainer>
                                    <PaymentContainer>
                                        <PaymentWrapper>
                                            <PaymentTitle>th??ng tin thanh to??n</PaymentTitle>
                                            <PaymentType>
                                                <Typography.Title level={5}>Ph????ng th???c thanh to??n</Typography.Title>
                                                <Typography.Text level={5}>{info?.orderPayment[0]?.payment?.title}</Typography.Text>
                                            </PaymentType>
                                            <PaymentDetail>
                                                <Typography.Title level={5}>T??i kho???n th??? h?????ng</Typography.Title>
                                                <Typography.Text level={5}>Techcombank - 19037049661012</Typography.Text>
                                            </PaymentDetail>
                                            <PaymentDetail>
                                                <Typography.Title level={5}>Ng?????i th??? h?????ng</Typography.Title>
                                                <Typography.Text level={5}>Nguy???n ??ch Quang</Typography.Text>
                                            </PaymentDetail>
                                            <PaymentDetail>
                                                <Typography.Title level={5}>N???i dung</Typography.Title>
                                                <Typography.Text level={5}>{info?.orderPayment[0]?.decriptions}</Typography.Text>
                                            </PaymentDetail>
                                            <PaymentDetail>
                                                <Typography.Title level={5}>Thanh to??n</Typography.Title>
                                                <Typography.Text level={5}>{formatter.format(info?.total_price)}</Typography.Text>
                                            </PaymentDetail>
                                        </PaymentWrapper>
                                    </PaymentContainer>
                                    <CustomerInfoContainer>
                                        <Title>th??ng tin ????n h??ng</Title>
                                        <CustomerInfoActions>
                                            {
                                                !isModalCustomerInfo ?
                                                    (<Button
                                                        style={{ borderRadius: "20px" }}
                                                        disabled={info?.statusDetail[info?.statusDetail.length - 1]?.statusOrder?.id >= 2}
                                                        onClick={() => { onClickUpdateCustomerInfo() }}
                                                    >
                                                        C???p Nh???t
                                                    </Button>)
                                                    :
                                                    (
                                                        <>
                                                            <Button
                                                                style={{ borderRadius: "20px" }}
                                                                disabled={info?.statusDetail[info?.statusDetail.length - 1]?.statusOrder?.id >= 2}
                                                                onClick={() => { setIsModalCustomerInfo(false) }}
                                                            >
                                                                H???y
                                                            </Button>
                                                        </>
                                                    )
                                            }
                                        </CustomerInfoActions>
                                        {
                                            !isModalCustomerInfo ?
                                                (
                                                    <CustomerInfo>
                                                        <CustomerInfoItem>
                                                            <CustomerInfoItemLabel>tr???ng th??i</CustomerInfoItemLabel>
                                                            <CustomerInfoItemContent>
                                                                <StatusBadge status={info?.statusDetail[info?.statusDetail.length - 1]?.statusOrder} />
                                                            </CustomerInfoItemContent>
                                                        </CustomerInfoItem>
                                                        <CustomerInfoItem>
                                                            <CustomerInfoItemLabel>m?? ????n h??ng</CustomerInfoItemLabel>
                                                            <CustomerInfoItemContent>{info?.id}</CustomerInfoItemContent>
                                                        </CustomerInfoItem>
                                                        <CustomerInfoItem>
                                                            <CustomerInfoItemLabel>h??? v?? t??n</CustomerInfoItemLabel>
                                                            <CustomerInfoItemContent>{info?.customers?.name}</CustomerInfoItemContent>
                                                        </CustomerInfoItem>
                                                        <CustomerInfoItem>
                                                            <CustomerInfoItemLabel>s??? ??i???n tho???i</CustomerInfoItemLabel>
                                                            <CustomerInfoItemContent>{info?.customers?.phone}</CustomerInfoItemContent>
                                                        </CustomerInfoItem>
                                                        <CustomerInfoItem>
                                                            <CustomerInfoItemLabel>?????a ch???</CustomerInfoItemLabel>
                                                            <CustomerInfoItemContent>{`${info?.customers?.address?.location} - ${info?.customers?.address?.ward?.title} - ${info?.customers?.address?.district?.title} - ${info?.customers?.address?.city?.title}`}</CustomerInfoItemContent>
                                                        </CustomerInfoItem>
                                                    </CustomerInfo>)
                                                :
                                                (
                                                    <div
                                                        style={{ width: '100%' }}
                                                    >
                                                        <Form
                                                            form={updateForm}
                                                            initialValues={editingCustomerInfo}
                                                            layout='vertical'
                                                            wrapperCol={{ span: 24 }}
                                                            labelCol={{ span: 24 }}
                                                            onFinish={handleUpdateCustomerInfo}
                                                        >
                                                            <div
                                                                style={{ display: 'flex', alignItems: 'center' }}
                                                            >
                                                                <div
                                                                    style={{ width: '50%', padding: '5px' }}
                                                                >
                                                                    <Form.Item
                                                                        label="H??? v?? t??n"
                                                                        name="name"
                                                                        hasFeedback
                                                                        rules={[
                                                                            { required: true, message: "Vui l??ng nh???p h??? v?? t??n!" },
                                                                            { whitespace: true, message: "Vui l??ng kh??ng nh???p kho???ng tr???ng!" }
                                                                        ]}
                                                                    >
                                                                        <Input />
                                                                    </Form.Item>
                                                                </div>
                                                                <div
                                                                    style={{ width: '50%', padding: '5px' }}
                                                                >
                                                                    <Form.Item
                                                                        label="S??? ??i???n tho???i"
                                                                        name="phone"
                                                                        hasFeedback
                                                                        rules={[
                                                                            { required: true, message: "Vui l??ng nh???p s??? ??i???n tho???i!" },
                                                                            // { whitespace: true, message: "Vui l??ng kh??ng nh???p kho???ng tr???ng!" }
                                                                        ]}
                                                                    >
                                                                        <Input />
                                                                    </Form.Item>
                                                                </div>
                                                            </div>
                                                            <Form.Item style={{ marginBottom: "0px" }}>
                                                                <Typography>?????a ch??? giao h??ng</Typography>
                                                                <FormLocationGroup>
                                                                    <Form.Item
                                                                        label="T???nh/Th??nh Ph???"
                                                                        name="cityId"
                                                                        hasFeedback
                                                                        rules={[
                                                                            { required: true, message: 'Vui l??ng ch???n T???nh/Th??nh Ph???!' }
                                                                        ]}
                                                                        style={{ width: '30%' }}
                                                                    >
                                                                        <Select
                                                                            onChange={onChangeCity}
                                                                            placeholder="T???nh/Th??nh"
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
                                                                        style={{ width: '30%' }}
                                                                    >
                                                                        <Select placeholder="Qu???n/Huy???n" disabled={!selectedData.cityId}
                                                                            onChange={onChangeDistrict}
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
                                                                        style={{ width: '30%' }}
                                                                    >
                                                                        <Select disabled={!selectedData.districtId}
                                                                            onChange={onChangeWard}
                                                                            placeholder="Ph?????ng/X??"
                                                                        >
                                                                            {
                                                                                selectedData.cityId && selectedData.districtId ?
                                                                                    (
                                                                                        <>
                                                                                            {
                                                                                                ((cityData.find(item => item.id === selectedData.cityId)).districts.find(item => item.id === selectedData.districtId))?.wards.map(item => (
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
                                                                </FormLocationGroup>
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
                                                                <Input />
                                                            </Form.Item>
                                                            <Form.Item
                                                                label="Ghi Ch??"
                                                                name="note"
                                                            >
                                                                <Input.TextArea />
                                                            </Form.Item>
                                                            <Form.Item>


                                                                <Button
                                                                    style={{ borderRadius: "20px" }}
                                                                    type={'primary'}
                                                                    htmlType="submit"
                                                                >
                                                                    L??u
                                                                </Button>
                                                            </Form.Item>
                                                        </Form>
                                                    </div>
                                                )
                                        }

                                    </CustomerInfoContainer>
                                    <CartContainer>
                                        {
                                            !isEditingCart ?
                                                (
                                                    <CartDetails>
                                                        <CartActions>
                                                            <Button onClick={onClickEditCartInfo}>C???p Nh???t</Button>
                                                        </CartActions>
                                                        <CartBody>
                                                            <List
                                                                bordered
                                                                dataSource={info?.orderDetail}
                                                                style={{
                                                                    height: '100%',
                                                                    maxHeight: '60vh',
                                                                    overflowY: 'scroll',
                                                                    backgroundColor: 'white'
                                                                }}
                                                                renderItem={(item, index) => (
                                                                    <List.Item>
                                                                        <Product key={index}>
                                                                            <ProductDetail>
                                                                                <Image src={item.product.images && `http://localhost:8080/api/file/images/${item.product.images[0].photo}`} />
                                                                                <Details>
                                                                                    <ProductName style={{ textDecoration: "none" }} onClick={() => { navigate(`/product/${item.product.id}`) }}>
                                                                                        <b>T??n S???n Ph???m:</b> {item.product?.name}
                                                                                    </ProductName>
                                                                                    <ProductId>
                                                                                        <b>M?? s???n ph???m:</b> {item.product.id}
                                                                                    </ProductId>
                                                                                    <b>Size:</b> {item.size}
                                                                                </Details>
                                                                            </ProductDetail>
                                                                            <PriceDetail>
                                                                                <ProductAmountContainer>
                                                                                    <ProductAmount>
                                                                                        <AmountInput
                                                                                            type='text'
                                                                                            value={'x ' + item.quantity}
                                                                                        />
                                                                                    </ProductAmount>
                                                                                </ProductAmountContainer>
                                                                                <ProductPrice>
                                                                                    {
                                                                                        checkPr(item.product) ?
                                                                                            (
                                                                                                <div style={{}}>
                                                                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                                                        <span style={{ fontSize: '20px', textDecoration: 'line-through', marginRight: 5 }}>
                                                                                                            {formatter.format(item.quantity * item.product.export_price)}
                                                                                                        </span>
                                                                                                        <Tag color='magenta' >- {getDiscountPercent(item.product)} %</Tag>
                                                                                                    </div>
                                                                                                    <div>
                                                                                                        {formatter.format(item.quantity * (item.product.export_price - item.product.export_price * (getDiscountPercent(item.product) / 100)))}
                                                                                                    </div>
                                                                                                </div>
                                                                                            )
                                                                                            :
                                                                                            (
                                                                                                <>
                                                                                                    {formatter.format(item.quantity * item.product.export_price)}
                                                                                                </>
                                                                                            )
                                                                                    }
                                                                                </ProductPrice>
                                                                            </PriceDetail>
                                                                        </Product>
                                                                    </List.Item>
                                                                )}
                                                            />
                                                        </CartBody>
                                                        <CartFooter>
                                                            <div>
                                                                T???ng Ti???n: {info && formatter.format(info?.orderDetail.reduce((total, item) => { return total + item.quantity * item.product.export_price }, 0))}
                                                            </div>
                                                            <div>
                                                                Gi???m Gi??: {info && formatter.format(info?.orderDetail.reduce((total, item) => {
                                                                    if (checkPr(item.product)) {
                                                                        return total + item.quantity * (item.product.export_price * (getDiscountPercent(item.product) / 100))
                                                                    } else {
                                                                        return total
                                                                    }
                                                                }, 0))}
                                                            </div>
                                                            <div>
                                                                Thanh To??n : <b>{formatter.format(info?.orderDetail.reduce((total, item) => {
                                                                    if (checkPr(item.product)) {
                                                                        return total + item.quantity * (item.product.export_price - item.product.export_price * (getDiscountPercent(item.product) / 100))
                                                                    } else {

                                                                        return total + item.quantity * item.product.export_price
                                                                    }
                                                                }, 0))}</b>
                                                            </div>

                                                        </CartFooter>
                                                    </CartDetails>
                                                )
                                                :
                                                (
                                                    <>
                                                        <CartDetails>
                                                            <CartActions>
                                                                <Button type='primary' onClick={() => { onClickSubmitEditingCart() }} style={{ marginRight: 20 }}> L??u Thay ?????i</Button>
                                                                <Button onClick={() => { onClickCloseEditingCart() }}> H???y</Button>
                                                            </CartActions>
                                                            <CartBody>
                                                                {cartLoading ?
                                                                    (
                                                                        <>
                                                                            <Spin />
                                                                        </>
                                                                    )
                                                                    :
                                                                    (
                                                                        <List
                                                                            bordered
                                                                            dataSource={editingCartInfo}
                                                                            style={{
                                                                                width: '100%',
                                                                                height: '50vh',
                                                                                overflowY: 'scroll',
                                                                                backgroundColor: 'white'
                                                                            }}
                                                                            renderItem={(item, index) => (
                                                                                <List.Item>
                                                                                    <Product key={item.item.id}>
                                                                                        <ProductDetail>
                                                                                            <Image src={item.item.images && `http://localhost:8080/api/file/images/${item.item.images[0].photo}`} />
                                                                                            <Details style={{}}>
                                                                                                <ProductName style={{ textDecoration: "none" }} onClick={() => { navigate(`/product/${item.item.id}`) }}>
                                                                                                    <b>T??n s???n ph???m:</b> {item.item?.name}
                                                                                                </ProductName>
                                                                                                <ProductId>
                                                                                                    <b>M?? s???n ph???m: </b> {item.item.id}
                                                                                                </ProductId>
                                                                                                <ProductSize >
                                                                                                    <Select value={item.selectedSize.id} onChange={(e) => { handleChangeCartItemSize(item, e, index) }}>
                                                                                                        {item.item?.productsizes.map(size => (
                                                                                                            <Select.Option value={size.id}>{size.size.title}</Select.Option>
                                                                                                        ))}
                                                                                                    </Select>
                                                                                                </ProductSize>
                                                                                            </Details>
                                                                                        </ProductDetail>
                                                                                        <PriceDetail>
                                                                                            <ProductAmountContainer >
                                                                                                <QuantityButton onClick={() => { handleClickUpdateCartItemQuantity(item, item.quantity + 1, index) }}>
                                                                                                    <Add />
                                                                                                </QuantityButton>
                                                                                                <ProductAmount>
                                                                                                    <AmountInput style={{ textAlign: "center" }}
                                                                                                        type='text'
                                                                                                        value={item.quantity}
                                                                                                        onChange={(e) => { handleChangeCartItemQuantity(e, item) }}
                                                                                                        onBlur={(e) => { handleBlurCartItemQuantityInput(e, item) }}
                                                                                                    />
                                                                                                </ProductAmount>
                                                                                                <QuantityButton>
                                                                                                    <Remove onClick={() => { handleClickUpdateCartItemQuantity(item, item.quantity - 1, index) }} />
                                                                                                </QuantityButton>

                                                                                            </ProductAmountContainer>
                                                                                            <ProductPrice>{formatter.format(item.quantity * item.item.export_price)}</ProductPrice>
                                                                                        </PriceDetail>
                                                                                        <ProductAction>
                                                                                            <Button danger onClick={() => { handleDeleteCartItem(index) }}>Xo?? S???n Ph???m</Button>
                                                                                        </ProductAction>
                                                                                    </Product>
                                                                                </List.Item>
                                                                            )}
                                                                        />
                                                                    )
                                                                }
                                                            </CartBody>
                                                            <CartFooter>
                                                                <div>
                                                                    T???ng Ti???n: {formatter.format(editingCartInfo.reduce((total, item) => { return total + item.quantity * item.item?.export_price }, 0))}
                                                                </div>
                                                                <div>
                                                                    Gi???m Gi??: {formatter.format(editingCartInfo.reduce((total, item) => {
                                                                        if (checkPr(item.item)) {
                                                                            return total + item.quantity * (item.item?.export_price * (getDiscountPercent(item.item) / 100))
                                                                        } else {
                                                                            return total
                                                                        }
                                                                    }, 0))}
                                                                </div>
                                                                <div>
                                                                    Thanh To??n : <b>{formatter.format(editingCartInfo.reduce((total, item) => {
                                                                        if (checkPr(item.item)) {
                                                                            return total + item.quantity * (item.item?.export_price - item.item?.export_price * (getDiscountPercent(item.item) / 100))
                                                                        } else {

                                                                            return total + item.quantity * item.item?.export_price
                                                                        }
                                                                    }, 0))}</b>
                                                                </div>
                                                            </CartFooter>
                                                        </CartDetails>

                                                        <ProductContainer>
                                                            <Table dataSource={product} columns={productColumn} />
                                                        </ProductContainer>
                                                    </>
                                                )
                                        }

                                    </CartContainer>
                                </Wrapper >
                                <Modal
                                    open={addingProduct}
                                    centered
                                    onCancel={() => { setAddingProduct(undefined) }}
                                    okText={"Th??m V??o Gi???"}
                                    onOk={() => { selectProductForm.submit() }}
                                    cancelText={"H???y B???"}
                                >
                                    <Form
                                        name="selectSizeAndQuantityForm"
                                        layout='vertical'
                                        wrapperCol={{ span: 24 }}
                                        labelCol={{ span: 24 }}
                                        form={selectProductForm}
                                        onFinish={onSelectSizeAndQuantityFinish}
                                    >
                                        <Form.Item
                                            label="Size"
                                            name="sizeId"
                                            hasFeedback
                                            rules={[
                                                { required: true, message: 'Vui l??ng ch???n size!' }
                                            ]}
                                        >
                                            <Select>
                                                {addingProduct?.productsizes.map((size) => (
                                                    <Select.Option key={size.id} value={size.id}>
                                                        {size.size.title}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            label="S??? L?????ng"
                                            name="quantity"
                                            rules={[
                                                { required: true, message: 'Vui l??ng nh???p s??? l?????ng!' },
                                                { type: 'integer', message: 'Vui l??ng nh???p s??? t??? nhi??n!' },
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!value || value >= 1) {
                                                            return Promise.resolve()
                                                        }
                                                        return Promise.reject('Vui l??ng nh???p s??? l?????ng l?? s??? t??? nhi??n l???n h??n ho???c b???ng 1!')
                                                    }
                                                })
                                            ]}
                                        >
                                            <InputNumber style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Form>
                                </Modal>
                                <Modal
                                    open={isModalStatus}
                                    centered
                                    okText={false}
                                    cancelText={"????ng"}
                                    onCancel={() => setIsModalStatus(false)}
                                    width={1000}
                                >
                                    <Table columns={statusModalColumns} dataSource={info?.statusDetail} pagination={false} />
                                </Modal>
                                <Modal
                                    open={isModalDesc}
                                    centered
                                    okText="X??c Nh???n"
                                    cancelText="Hu??? B???"
                                    onCancel={onCloseModalDesc}
                                    onOk={handleUpdateStatus}
                                >
                                    <Typography.Title level={5}>Ghi Ch??</Typography.Title>
                                    <Input.TextArea value={updateSttDesc} onChange={(e) => { setUpdateSttDesc(e.target.value) }} placeholder="Ghi ch??" />
                                </Modal>
                            </Container >
                            )
                    )
            }
        </Helmet >
    )
}

export default AdmOrderInfo