import React, { useEffect } from 'react'
import Helmet from '../../components/Helmet'
import styled from 'styled-components'
import productAPI from '../../api/productsAPI'
import { useState } from 'react'
import { Button, Table, Tag } from 'antd'
import { formatter } from '../../utils'
import ordersAPI from '../../api/ordersAPI'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
    width: 100%;
    padding: 50px;
`

const Wrapper = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    background-color: white;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    border-radius: 10px;
`

const ActionContainer = styled.div`
    width: 100%;
    margin-bottom: 5px;
    display: flex;
    justify-content: flex-end;
`
const ListContainer = styled.div`
    width: 100%;
`

const StatusBadge = (props) => {

    const [color, setColor] = useState('blue')

    useEffect(() => {
        console.log(props.status)
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
        <Tag color={color}>{props?.status?.title}</Tag>
    )
}
const columns = [
    {
        title: 'STT',
        dataIndex: 'index',
        key: 'index'
    },
    {
        title: 'Trạng Thái',
        dataIndex: 'status',
        render: (text) => {
            console.log(text)
            return (
                <StatusBadge status={text} />
            )
        },
        filters: [
            {
                text: 'Chờ Xác Nhận',
                value: 1,
            },
            {
                text: 'Đã Xác Nhận',
                value: 2,
            },
            {
                text: 'Đang Giao',
                value: 3,
            },
            {
                text: 'Hoàn Thành',
                value: 4,
            },
        ],
        onFilter: (value, record) => record.status.id === value,
    },
    {
        title: 'Người Mua',
        dataIndex: 'username',
        key: 'username'
    },
    {
        title: 'Tổng Sản Phẩm',
        dataIndex: 'totalQuantity',
        key: 'totalQuantity',
        sorter: (a, b) => a.totalQuantity - b.totalQuantity
    },
    {
        title: 'Thanh Toán',
        dataIndex: 'total_price',
        key: 'total_price',
        render: (text) => (<>{formatter.format(text)}</>),
        sorter: (a, b) => a.total_price - b.total_price
    },
    {
        title: 'Ngày Tạo',
        dataIndex: 'createdDate',
        key: 'createdDate',
        sorter: (a, b) => (a.createdDate > b.createdDate ? -1 : 1)
    },
    {
        render: (text) => {
            return (
                <Button type='primary' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Chi Tiết</Button>
            )
        }
    }
];

const AdmBills = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate()

    const  handleCreateNewBill = () => {
        navigate('/admin/bill/new')
    }

    useEffect(() => {
        ordersAPI.getWatingOrderList()
        .then(res => {
            if(!res.status){
                setData(res)
            }else{
                console.log(res)
            }
        })
        .catch(err => console.log(err))
    },[])
    return (
        <Helmet title="Hoá Đơn">
            <Container>
                <Wrapper>
                    <ActionContainer>
                        <Button type='primary' onClick={handleCreateNewBill}>Tạo Đơn Hàng</Button>
                    </ActionContainer>
                    <ListContainer>
                    <Table data={data} columns={columns} style={{width: '100%'}}/>
                    </ListContainer>
                </Wrapper>
            </Container>
        </Helmet>
    )
}

export default AdmBills