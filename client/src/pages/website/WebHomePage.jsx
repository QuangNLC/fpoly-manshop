import React from 'react'
import Helmet from '../../components/Helmet'
import { sliderData } from '../../assets/data/data'
import Slider from '../../components/Slider'
import styled from 'styled-components'
import CurrencyExchangeTwoToneIcon from '@mui/icons-material/CurrencyExchangeTwoTone';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';

const ServiceContainer = styled.div`
    width: 100%;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
`
const ServiceItem = styled.div`
    width: 250px;
    padding 10px;
    border: 1px solid rgb(223, 91, 91);
    margin: 5px 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const ServiceIcon = styled.div`
    color: red;
    margin: 10px 0;
`
const ServiceDetail = styled.div`
    font-size: 16px;
    color: #666;
    text-align: justify;
`

const WebHomePage = () => {
    return (
        <Helmet title={"Trang Chủ"}>
            <Slider items={sliderData} />
            <ServiceContainer>
                <ServiceItem>
                    <ServiceIcon> <CurrencyExchangeTwoToneIcon style={{fontSize: "50px"}}/></ServiceIcon>
                    <ServiceDetail>
                        Đổi trả trong 15 ngày đầu nếu có lỗi từ phía nhà sản xuất.
                    </ServiceDetail>
                </ServiceItem>
                <ServiceItem>
                    <ServiceIcon> <FeedbackOutlinedIcon style={{fontSize: "50px"}}/></ServiceIcon>
                    <ServiceDetail>
                        Feeback để nhận nhiều phần quà hấp dẫn.
                    </ServiceDetail>
                </ServiceItem>
                <ServiceItem>
                    <ServiceIcon> <DiamondOutlinedIcon style={{fontSize: "50px"}}/></ServiceIcon>
                    <ServiceDetail>
                        Đăng ký hội viên để nhận nhiều ưu đãi.
                    </ServiceDetail>
                </ServiceItem>
                <ServiceItem>
                    <ServiceIcon> <PaymentsOutlinedIcon style={{fontSize: "50px"}}/></ServiceIcon>
                    <ServiceDetail>
                        Hỗ trợ thanh toán nhiều hình thức.
                    </ServiceDetail>
                </ServiceItem>
            </ServiceContainer>
            abcxyz
        </Helmet>
    )
}

export default WebHomePage