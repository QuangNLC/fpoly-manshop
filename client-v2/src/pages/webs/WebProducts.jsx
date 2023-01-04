import { Checkbox, Col, Row, Select, Slider } from 'antd';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { productAPI } from '../../apis/productAPI';
import Helmet from '../../components/Helmet';
import ProductList from '../../components/ProductList';

const WebProducts = () => {

    const [data, setData] = useState([])

    const [categories, setCategories] = useState([])
    const [sizes, setSizes] = useState([])

    useEffect(() => {
        productAPI.getFilterInfo()
            .then(res => {
                if (!res.status) {
                    console.log(res)
                    setCategories(res.categories)
                    setSizes([...res.sizes])
                } else {
                    console.log(res);
                }
            })
            .catch(err => console.log(err));


        productAPI.getAllPr()
            .then(res => {
                if (!res.status) {
                    setData(res)
                }
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Helmet
            title={'Danh sách sản phẩm'}
        >
            <div className='web--products'>
                <Row
                    gutter={[16, 16]}
                >
                    <Col span={4} className='web--products__filters'>
                        <div className="web--products__filters--item">
                            <div className="web--products__filters--item__title">
                                Thể Loại
                            </div>
                            <div className="web--products__filters--item__body">
                                <Select style={{ width: '100%' }}>
                                    <Select.Option value={0}>
                                        Tất cả
                                    </Select.Option>
                                    <Select.Option value={0}>
                                        Tất cả
                                    </Select.Option>
                                    <Select.Option value={0}>
                                        Tất cả
                                    </Select.Option>
                                    <Select.Option value={0}>
                                        Tất cả
                                    </Select.Option>
                                </Select>
                            </div>
                        </div>
                        <div className="web--products__filters--item">
                            <div className="web--products__filters--item__title">
                                Chất Liệu
                            </div>
                            <div className="web--products__filters--item__body">
                                <Select style={{ width: '100%' }}>
                                    <Select.Option value={0}>
                                        Tất cả
                                    </Select.Option>
                                </Select>
                            </div>
                        </div>
                        <div className="web--products__filters--item">
                            <div className="web--products__filters--item__title">
                                Màu Sắc
                            </div>
                            <div className="web--products__filters--item__body">
                                <Select style={{ width: '100%' }}>
                                    <Select.Option value={0}>
                                        Tất cả
                                    </Select.Option>
                                </Select>
                            </div>
                        </div>
                        <div className="web--products__filters--item">
                            <div className="web--products__filters--item__title">
                                Sizes
                            </div>
                            <div className="web--products__filters--item__body">
                                <Checkbox /> S
                                <Checkbox /> M
                                <Checkbox /> L
                                <Checkbox /> XL
                            </div>
                        </div>
                        <div className="web--products__filters--item">
                            <div className="web--products__filters--item__title">
                                Khoảng Giá
                            </div>
                            <div className="web--products__filters--item__body">
                                <Slider
                                    range
                                    step={10}
                                    defaultValue={[0, 100000]}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col span={20} className='web--products__list'>
                        <ProductList list={data} />
                    </Col>
                </Row>
            </div>
        </Helmet>
    )
}

export default WebProducts