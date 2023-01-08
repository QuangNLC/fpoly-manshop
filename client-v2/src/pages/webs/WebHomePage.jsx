import React from 'react'
import Helmet from '../../components/Helmet'
import { Carousel } from 'antd'
import { sliderData } from "../../assets/data/data";
const WebHomePage = () => {
    return (
        <Helmet
            title={"Trang Chủ"}
        >
            <div className="web--homepage">
                <div className="web--homepage__slider">
                    <Carousel autoplay={true}>
                        {
                            sliderData.map((item) => {
                                return (
                                    <div className="web--homepage__slider--img" key={item.id}>
                                        <img src={item.img}/>
                                    </div>
                                )
                            })

                        }
                    </Carousel>
                </div>
            </div>
        </Helmet>
    )
}

export default WebHomePage