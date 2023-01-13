import { Button, Checkbox, Col, Empty, Input, Pagination, Row, Select, Slider } from 'antd';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { productAPI } from '../../apis/productAPI';
import Helmet from '../../components/Helmet';
import ProductList from '../../components/ProductList';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons'


const checkProductExistSize = (product, sizeId) => {
    let index = -1;

    if (product?.productsizes.length > 0) {
        index = product?.productsizes.findIndex(s => ((s.size.id === sizeId) && s.isActive && s.quantity > 0));
    }

    return index;
}

const WebProducts = () => {
    const [productData, setProductData] = useState([])
    const [showData, setShowData] = useState([])
    const [categories, setCategories] = useState([])
    const [sizes, setSizes] = useState([])
    const [materials, setMaterials] = useState([])
    const [colors, setcolors] = useState([])
    const [searchInputValue, setSearchInputValue] = useState('')
    const sortOptions = [
        { id: 1, by: 'name', sort: 'asc', byTitle: 'Theo Tên Sản Phẩm', title: 'Từ A-Z' },
        { id: 2, by: 'name', sort: 'desc', byTitle: 'Theo Tên Sản Phẩm', title: 'Từ Z-A' },
        { id: 3, by: 'price', sort: 'asc', byTitle: 'Theo Giá Sản Phẩm', title: 'Giá tăng dần' },
        { id: 4, by: 'price', sort: 'desc', byTitle: 'Theo Giá Sản Phẩm', title: 'Giá giảm dần' },
        { id: 5, by: 'createdAt', sort: 'asc', byTitle: 'Theo Ngày Ra Mắt', title: 'Mới nhất' },
        { id: 6, by: 'createdAt', sort: 'desc', byTitle: 'Theo Ngày Ra Mắt', title: 'Cũ nhất' }
    ]
    const [currentPage, setCurrentPage] = useState(1)

    const [filterInfo, setFilterInfo] = useState({
        categorId: 0,
        materialId: 0,
        sizeIds: [],
        colorIds: [],
        sortId: 1,
        searchText: '',
        minPrice: 0,
        maxPrice: 0
    })

    const onChangeRangeOfPrice = ([value1, value2]) => {
        if (value1 > value2) {
            setFilterInfo({
                ...filterInfo,
                minPrice: value2,
                maxPrice: value1
            })
        } else {
            setFilterInfo({
                ...filterInfo,
                minPrice: value1,
                maxPrice: value2
            })
        }
    }


    const onChangeProductFilterColors = (e) => {
        setFilterInfo({
            ...filterInfo,
            colorIds: [...e]
        })
    }

    const onChangeProductFilterSizes = (e) => {
        setFilterInfo({
            ...filterInfo,
            sizeIds: [...e]
        })
    }


    const onChangeCategoryFilter = (categorId) => {
        setFilterInfo({
            ...filterInfo,
            categorId: categorId
        })
    }

    const onChangeMaterialFilter = (materialId) => {
        setFilterInfo({
            ...filterInfo,
            materialId: materialId
        })
    }

    const onChangeSortFilter = (sortId) => {
        setFilterInfo({
            ...filterInfo,
            sortId: sortId
        })
    }

    const onSearchText = () => {
        if (searchInputValue.trim() !== '') {
            setFilterInfo({
                ...filterInfo,
                searchText: searchInputValue
            })
        }
    }

    const onClearFiler = () => {
        setSearchInputValue('')
        setFilterInfo({
            categorId: 0,
            materialId: 0,
            sizeIds: [],
            colorIds: [],
            sortId: 1,
            searchText: '',
            minPrice: 0,
            maxPrice: 0
        })
    }

    const onChangePage = (e) => {
        setCurrentPage(e)
    }

    const filterProductData = (prList, filter) => {
        let result = [...prList];

        if (filter.searchText !== '') {
            result = [...result.filter(i => i.name.toLowerCase().includes(filter.searchText.toLowerCase()))]
        }

        if (filter?.categorId !== 0) {
            result = [...result.filter(i => i.category.id === filter.categorId)]
        }
        if (filter?.materialId !== 0) {
            result = [...result.filter(i => i.material.id === filter.materialId)]
        }
        if (filter?.colorIds.length > 0) {
            result = [...result.filter(i => {
                let index = filter?.colorIds.findIndex(cId => cId === i.color.id)
                if (index !== -1) {
                    return true;
                } else {
                    return false;
                }
            })]
        }

        if (filter?.sizeIds.length > 0) {
            result = [...result.filter(i => {
                let total = 0;
                for (let index = 0; index < filter?.sizeIds.length; index++) {
                    const check = checkProductExistSize(i, filter?.sizeIds[index]);
                    if(check !== -1){
                        total = total + 1;
                    }
                }
                if(total > 0){
                    return true;
                }else{
                    return false;
                }
            })]
        }

        if (filter.maxPrice !== 0) {
            result = [...result.filter(i => {
                return ((i.price >= filter.minPrice && i.price <= filter.maxPrice))
            })]
        }




        switch (filter.sortId) {
            case (1): {
                result = [...result.sort((a, b) => a.name > b.name ? 1 : -1)];
                break;
            }
            case (2): {
                result = [...result.sort((a, b) => a.name > b.name ? -1 : 1)];
                break;
            }
            case (3): {
                result = [...result.sort((a, b) => a.price - b.price)];
                break;
            }
            case (4): {
                result = [...result.sort((a, b) => b.price - a.price)];
                break;
            }
            case (5): {
                result = [...result.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1)];
                break;
            }
            case (6): {
                result = [...result.sort((a, b) => b.createdAt > a.createdAt ? 1 : -1)];
                break;
            }
            default: {
                break;
            }
        }

        return result;
    }

    const getListByPage = (prList, page) => {
        let result = []

        result = prList.slice((page - 1) * 8, page * 8)

        return result;
    }

    useEffect(() => {
        const newDataList = filterProductData(productData, filterInfo)
        setCurrentPage(1)
        setShowData(newDataList)
    }, [filterInfo, productData])

    useEffect(() => {
        productAPI.getFilterInfo()
            .then(res => {
                if (!res.status) {
                    setCategories(res.categories)
                    setSizes(res.sizes)
                    setMaterials(res.materials)
                    setcolors(res.colors)
                } else {
                    console.log(res);
                }
            })
            .catch(err => console.log(err));


        productAPI.getAllPr()
            .then(res => {
                console.log(res)
                if (!res.status) {
                    setProductData(res)
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
                                Sắp Xếp
                            </div>
                            <div className="web--products__filters--item__body">
                                <Select
                                    style={{
                                        width: '100%',
                                    }}
                                    options={[...sortOptions.map((c) => ({
                                        value: c.id,
                                        label: `${c.byTitle} - ${c.title}`,
                                        key: c.id
                                    }))]}
                                    value={filterInfo.sortId}
                                    onChange={onChangeSortFilter}
                                >
                                </Select>
                            </div>
                        </div>
                        <div className="web--products__filters--item">
                            <div className="web--products__filters--item__title">
                                Thể Loại
                            </div>
                            <div className="web--products__filters--item__body">
                                <Select
                                    showSearch
                                    placeholder="Thể Loại"
                                    optionFilterProp="children"
                                    style={{
                                        width: '100%',
                                    }}
                                    filterOption={(input, option) => {
                                        return (option?.children).toLowerCase().includes(input.toLowerCase())
                                    }
                                    }
                                    value={filterInfo?.categorId}
                                    onChange={onChangeCategoryFilter}
                                >
                                    <Select.Option value={0} key={0}>
                                        Tất cả
                                    </Select.Option>
                                    {
                                        categories.map((c) => (
                                            <Select.Option key={c.id} value={c.id}>
                                                {c.title}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            </div>
                        </div>
                        <div className="web--products__filters--item">
                            <div className="web--products__filters--item__title">
                                Chất Liệu
                            </div>
                            <div className="web--products__filters--item__body">
                                <Select
                                    showSearch
                                    placeholder="Chất liệu"
                                    style={{
                                        width: '100%',
                                    }}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => {
                                        return (option?.children).toLowerCase().includes(input.toLowerCase())
                                    }
                                    }
                                    value={filterInfo.materialId}
                                    onChange={onChangeMaterialFilter}

                                >
                                    <Select.Option value={0} key={0}>
                                        Tất cả
                                    </Select.Option>
                                    {
                                        materials.map((c) => (
                                            <Select.Option key={c.id} value={c.id}>
                                                {c.title}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            </div>
                        </div>
                        <div className="web--products__filters--item">
                            <div className="web--products__filters--item__title">
                                Màu Sắc
                            </div>
                            <div className="web--products__filters--item__body">
                                <Select
                                    mode="multiple"
                                    style={{
                                        width: '100%',
                                    }}
                                    onChange={onChangeProductFilterColors}
                                    value={filterInfo.colorIds}
                                    placeholder="Chọn Màu"
                                >
                                    {
                                        colors.map(c => (
                                            <Select.Option key={c.id} value={c.id}>
                                                <div style={{ width: 20, height: 20, backgroundColor: `${c.colorCode}` }}>
                                                </div>
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            </div>
                        </div>
                        <div className="web--products__filters--item">
                            <div className="web--products__filters--item__title">
                                Sizes
                            </div>
                            <div className="web--products__filters--item__body">
                                <Select
                                    showSearch
                                    mode="multiple"
                                    style={{
                                        width: '100%',
                                    }}
                                    filterOption={(input, option) => {
                                        return (option?.label).toLowerCase().includes(input.toLowerCase())
                                    }
                                    }
                                    options={[...sizes.map((c) => ({
                                        value: c.id,
                                        label: c.title,
                                        key: c.id
                                    }))]}
                                    onChange={onChangeProductFilterSizes}
                                    value={filterInfo.sizeIds}
                                    placeholder="Chọn Size"
                                >
                                </Select>
                            </div>
                        </div>
                        <div className="web--products__filters--item">
                            <div className="web--products__filters--item__title">
                                Khoảng Giá
                            </div>
                            <div className="web--products__filters--item__body">
                                <Slider
                                    range
                                    value={[filterInfo.minPrice, filterInfo.maxPrice]}
                                    min={0} max={5000000}
                                    onChange={onChangeRangeOfPrice}
                                    step={10000}
                                />
                                {
                                    filterInfo.maxPrice !== 0 &&
                                    <div>
                                        <div>
                                            Từ: {
                                                new Intl.NumberFormat("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                }).format(filterInfo.minPrice)
                                            }
                                        </div>
                                        <div>
                                            Đến: {
                                                new Intl.NumberFormat("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                }).format(filterInfo.maxPrice)
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </Col>
                    <Col span={20} className='web--products__list'>
                        <div className="web--products__list--search">
                            <div className="web--products__list--search__container">
                                <Input value={searchInputValue} onChange={e => { setSearchInputValue(e.target.value) }} placeholder="Nhập tên sản phẩm" />
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button style={{ margin: 10 }} icon={<SearchOutlined />} type='primary' onClick={onSearchText}>Tìm Kiếm</Button>
                                    <Button style={{ margin: 10 }} icon={<ReloadOutlined />} danger onClick={() => { onClearFiler() }}>Làm Mới</Button>
                                </div>
                            </div>
                        </div>
                        <div className="web--products__list--content">
                            {
                                showData.length > 0 ?
                                    (
                                        <ProductList list={getListByPage(showData, currentPage)} />
                                    )
                                    :
                                    (
                                        <Empty description={`Không tìm thấy sản phẩm : '${searchInputValue}'`} />
                                    )
                            }
                        </div>
                        <div className="web--products__list--pagination">
                            <Pagination
                                total={showData.length}
                                current={currentPage}
                                showSizeChanger={false}
                                pageSize={8}
                                onChange={onChangePage}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        </Helmet>
    )
}

export default WebProducts