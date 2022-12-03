import React, { useState } from 'react'
import Helmet from '../../components/Helmet'
import styled from 'styled-components'
import { useEffect } from 'react'
import productAPI from '../../api/productsAPI'
import { useNavigate } from 'react-router-dom'
import { Button, Table } from 'antd'
import { formatter } from '../../utils'
import promotionsAPI from '../../api/promotionsAPI'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const Container = styled.div`
    width: 100%;
`
const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`

const PromotionsContainer = styled.div`
    width: 100%;
    padding: 10px;
    background-color: white;
    border-radius: 10px;
`

const ActionsContainer = styled.div`
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-end;
`

const AdmPromotions = () => {
    const [promotions, setPromotions] = useState([])
    const navigate = useNavigate();
    const promotionsColumn = [
        {
            title: 'STT',
            dataIndex: 'index',
        },
        {
            title: 'Tên Khuyến Mại',
            dataIndex: 'title',
        },
        {
            title: 'Ngày Bắt Đầu',
            dataIndex: 'date_after'
        },
        {
            title: 'Ngày Kết Thúc',
            dataIndex: 'date_befor'
        },
        {
            title: 'Giảm Giá',
            render: (record) => (<>{record?.by_persent} %</>)
        },
        {
            title: 'Thao Tác',
            render: (record) => (<Button type='primary' onClick={() => {navigate(`/admin/promotion/detail/${record?.id}`)}} icon={<RemoveRedEyeOutlinedIcon />} ></Button>)
        }
    ]

    useEffect(() => {
        promotionsAPI.getAll()
        .then(res => {
            console.log(res)
            setPromotions(res.map((item, index) => ({
                index: index+1,
                key: item.id,
                ...item
            })))
        })
        .catch(err => console.log(err))
    }, [])
    return (
        <Helmet
            title={"Quản Lý Khuyến Mại"}
        >
            <Container>
                <Wrapper>
                    <ActionsContainer>
                        <Button type='primary' onClick={() => {navigate(`/admin/promotion/new`)}}>Tạo Khuyến Mại</Button>
                    </ActionsContainer>
                    <PromotionsContainer>
                        <Table dataSource={promotions} columns={promotionsColumn} />
                    </PromotionsContainer>
                </Wrapper>
            </Container>
        </Helmet>
    )
}

export default AdmPromotions