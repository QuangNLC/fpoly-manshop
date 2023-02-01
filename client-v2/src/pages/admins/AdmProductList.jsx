import { EditOutlined, FileDoneOutlined, FileExcelOutlined, PlusOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, Modal, notification, Select, Table, Tag, Tooltip, Typography } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { productAPI } from '../../apis/productAPI'
import Helmet from '../../components/Helmet'


const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description: des,
    });
};
const AdmProductList = () => {


    const [productData, setProductData] = useState([]);
    const [productTableData, setProductTableData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [colors, setColors] = useState([]);
    const [searchInputValue, setSearchInputValue] = useState('');
    const navigate = useNavigate();
    const sortOptions = [
        { id: 1, by: 'name', sort: 'asc', byTitle: 'Theo Tên Sản Phẩm', title: 'Từ A-Z' },
        { id: 2, by: 'name', sort: 'desc', byTitle: 'Theo Tên Sản Phẩm', title: 'Từ Z-A' },
        { id: 3, by: 'price', sort: 'asc', byTitle: 'Theo Giá Sản Phẩm', title: 'Giá tăng dần' },
        { id: 4, by: 'price', sort: 'desc', byTitle: 'Theo Giá Sản Phẩm', title: 'Giá giảm dần' },
        { id: 5, by: 'createdAt', sort: 'asc', byTitle: 'Theo Ngày Ra Mắt', title: 'Mới nhất' },
        { id: 6, by: 'createdAt', sort: 'desc', byTitle: 'Theo Ngày Ra Mắt', title: 'Cũ nhất' }
    ]
    const [filterInfo, setFilterInfo] = useState({
        categorId: 0,
        materialId: 0,
        sizeIds: [],
        colorIds: [],
        sortId: 1,
        searchText: ''
    })
    const productColumns = [
        {
            title: "Ảnh",
            render: (record) => {
                return (
                    <div className="pr--table__imgcl">
                        <img src={`http://localhost:8080/api/file/images/${record?.images[0]?.photo}`} alt={record?.name} />
                    </div>
                )
            },
            width: 120
        },
        {
            title: "Id",
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: "Tên Sản Phẩm",
            dataIndex: 'name'
        },
        {
            title: 'Ngày Tạo',
            render: (record) => {
                return (
                    moment(record.createdAt).format('DD/MM/YYYY, H:mm:ss')
                )
            }
        },
        {
            title: "Giá",
            render: (record) => {
                return (
                    <>{new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    }).format(record?.price)}</>
                )
            }
        },
        {
            title: 'Trạng Thái',
            render: (record) => {
                return (
                    record?.isActive ?
                        (
                            <Tag color='green'>Kinh Doanh</Tag>
                        )
                        :
                        (
                            <Tag color='red'>Ngừng Kinh Doanh</Tag>
                        )
                )
            }
        },
        {
            title: "Thao Tác",
            render: (record) => {
                return (
                    <>
                        <Tooltip title={'Cập Nhật'}>
                            <Button type='primary' onClick={() => { navigate(`/admin/product/edit/${record.id}`) }} icon={<EditOutlined />}></Button>
                        </Tooltip>

                        <Tooltip title={record?.isActive ? 'Ngừng Kinh Doanh' : 'Kích Hoạt'}>
                            <Button
                                style={{ marginLeft: 10 }}
                                danger
                                type={`${record?.isActive ? 'primary' : 'default'}`}
                                icon={!record?.isActive ? <FileDoneOutlined /> : <FileExcelOutlined />}
                                onClick={() => onToggleProductActive(record)}
                            >
                            </Button>
                        </Tooltip>
                    </>
                )
            }
        }
    ]

    const onClickCreateProduct = () => {
        navigate("/admin/product/new")
    }

    const onChangeProductFilterSizes = (e) => {
        console.log([...e])
    }

    const onChangeProductFilterColors = (e) => {
        setFilterInfo({
            ...filterInfo,
            colorIds: [...e]
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
            searchText: ''
        })
    }


    const onToggleProductActive = (item) => {
        console.log(item)
        Modal.confirm({
            title: 'Hộp Thoại Xác Nhận',
            content: `Bạn có muốn ${item.isActive ? 'hủy kích hoạt' : 'kích hoạt'} sản phẩm không`,
            okText: 'Xác Nhận',
            cancelText: 'Hủy Bỏ',
            onOk: () => {
                const payload = {
                    ...item,
                    isActive: !item.isActive,
                    categoryId: item?.category?.id,
                    materialId: item?.material?.id,
                    colorId: item?.color?.id,
                    description: item?.descTitle
                }
                console.log(payload)
                productAPI.updateProduct(payload)
                    .then(res => {
                        if (!res.status) {
                            let index = productData.findIndex(p => p.id === res.id);
                            if (index !== -1) {
                                const newData = [...productData];
                                newData[index] = { ...res };
                                setProductData([...newData]);
                            }
                            openNotificationWithIcon('info', 'Thông Báo', `${!res.activated ? 'Hủy kích hoạt' : 'Kích hoạt'} sản phẩm thành công.`);
                        }
                    })
            }
        })
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

    useEffect(() => {
        const newDataList = filterProductData(productData, filterInfo)
        setProductTableData(newDataList.map((item) => ({ key: item?.id, ...item })))
    }, [filterInfo, productData])

    useEffect(() => {
        productAPI.getAllPr()
            .then(res => {
                if (!res.status) {
                    setProductData(res)
                }
            })
            .catch(err => console.log(err))
        productAPI.getFilterInfo()
            .then(res => {
                if (!res.status) {
                    setCategories(res.categories)
                    setSizes(res.sizes)
                    setMaterials(res.materials)
                    setColors(res.colors)
                } else {
                    console.log(res);
                }
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <Helmet
            title={"Quản Lý Sản Phẩm"}
        >
            <div className="adm--prlist">
                <div className="adm--prlist__title">
                    <Typography.Title level={4}>Danh Sách Sản Phẩm</Typography.Title>
                    <Button icon={<PlusOutlined />} type={'primary'} onClick={onClickCreateProduct}>Thêm Mới</Button>
                </div>
                <div className="adm--prlist__body">
                    <div className="adm--prlist__body--filters">
                        <div className="adm--prlist__body--filters__search">
                            <Input value={searchInputValue} onChange={e => { setSearchInputValue(e.target.value) }} placeholder={'Nhập tên sản phẩm'}/>
                            <Button icon={<SearchOutlined />} type='primary' onClick={onSearchText}>Tìm Kiếm</Button>
                            <Button icon={<ReloadOutlined />} danger onClick={() => { onClearFiler() }}>Làm Mới</Button>
                        </div>
                        <div className="adm--prlist__body--filters__options">
                            <div className="adm--prlist__body--filters__options--item">
                                <div className="adm--prlist__body--filters__options--item__label">
                                    Thể Loại
                                </div>
                                <div className="adm--prlist__body--filters__options--item__content">
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
                            <div className="adm--prlist__body--filters__options--item">
                                <div className="adm--prlist__body--filters__options--item__label">
                                    Chất Liệu
                                </div>
                                <div className="adm--prlist__body--filters__options--item__content">
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
                            <div className="adm--prlist__body--filters__options--item">
                                <div className="adm--prlist__body--filters__options--item__label">
                                    Size
                                </div>
                                <div className="adm--prlist__body--filters__options--item__content">
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
                                    >
                                    </Select>
                                </div>
                            </div>
                            <div className="adm--prlist__body--filters__options--item">
                                <div className="adm--prlist__body--filters__options--item__label">
                                    Màu Sắc
                                </div>
                                <div className="adm--prlist__body--filters__options--item__content">
                                    <Select
                                        mode="multiple"
                                        style={{
                                            width: '100%',
                                        }}
                                        onChange={onChangeProductFilterColors}
                                        value={filterInfo.colorIds}
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
                            <div className="adm--prlist__body--filters__options--item">
                                <div className="adm--prlist__body--filters__options--item__label">
                                    Sắp Xếp
                                </div>
                                <div className="adm--prlist__body--filters__options--item__content">
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
                        </div>
                    </div>
                    <div className="adm--prlist__body--table">
                        <Table
                            columns={productColumns}
                            dataSource={productTableData}
                            bordered
                        />
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default AdmProductList