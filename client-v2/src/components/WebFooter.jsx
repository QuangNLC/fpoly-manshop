import React from 'react'
import { HomeOutlined, GiftOutlined, MailOutlined, PhoneOutlined, ShopOutlined } from '@ant-design/icons'
import logoImg from '../assets/imgs/logo.png'
import { Button, Input, Typography } from 'antd'
const WebFooter = () => {
    return (
        <div className="web--footer">
            <div className="web--footer__column">
                <div className="web--footer__column--item">
                    <img src={logoImg} alt="logo" />
                </div>
                <div className="web--footer__column--item">
                    <div className="web--footer__column--item__label">
                        <HomeOutlined />
                    </div>
                    <div className="web--footer__column--item__content">
                        Ship COD Toàn Quốc
                    </div>
                </div>
                <div className="web--footer__column--item">
                    <div className="web--footer__column--item__label">
                        <GiftOutlined />
                    </div>
                    <div className="web--footer__column--item__content">
                        Ưu Đãi Thành Viên Hấp Dẫn
                    </div>
                </div>
                <div className="web--footer__column--item">
                    <div className="web--footer__column--item__label">

                    </div>
                    <div className="web--footer__column--item__content">

                    </div>
                </div>
            </div>
            <div className="web--footer__column">
                <div className="web--footer__column--item">
                    <div className="web--footer__column--item__label">
                        <PhoneOutlined />
                    </div>
                    <div className="web--footer__column--item__content">
                        039.999.999
                    </div>
                </div>
                <div className="web--footer__column--item">
                    <div className="web--footer__column--item__label">
                        <MailOutlined />
                    </div>
                    <div className="web--footer__column--item__content">
                        quangniph12613@fpt.edu.vn
                    </div>
                </div>
                <div className="web--footer__column--item">
                    <div className="web--footer__column--item__label">
                        <ShopOutlined />
                    </div>
                    <div className="web--footer__column--item__content">
                        1, Trịnh Văn Bô, Nam Từ Liêm, Hà Nội
                    </div>
                </div>
            </div>
            <div className="web--footer__column">
                <div className="web--footer__column--item">
                    <Typography.Text>Nhận thông tin mới nhất về sản phẩm, tin khuyến mại, và nhiều hơn thế nữa.</Typography.Text>
                </div>
                <div className="web--footer__column--item">
                    <Input placeholder='Nhập địa chỉ email'/>
                    <Button>ĐĂNG KÝ</Button>
                </div>
            </div>
        </div>
    )
}

export default WebFooter