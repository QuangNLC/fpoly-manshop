import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Modal, notification, Select, Slider, Switch, Table, Tooltip, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { productAPI } from '../../apis/productAPI';
import promotionAPI from '../../apis/promotionAPI';
import Helmet from '../../components/Helmet';
import { useForm } from 'antd/es/form/Form';
import moment from 'moment'
import dayjs from 'dayjs';

const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description: des,
    });
};

const checkProductExistSize = (product, sizeId) => {
    let index = -1;

    if (product?.productsizes.length > 0) {
        index = product?.productsizes.findIndex(s => ((s.size.id === sizeId) && s.isActive && s.quantity > 0));
    }

    return index;
}


const AdmPromotionDetail = () => {
    const auth = useSelector(state => state.auth.auth);
    const { id } = useParams();
    const navigate = useNavigate();
    const [listPr, setListPr] = useState([]);
    const [selectedListPr, setSelectedListPr] = useState([]);
    const [formInitValue, setFormInitValue] = useState(undefined)
    const [isActive, setIsActive] = useState(false);
    const [form] = useForm();
    const listPrColumn = [
        {
            title: 'STT',
            dataIndex: 'index',
        },
        {
            title: 'Ảnh',
            width: 80,
            render: (record) => {
                return (
                    <div>
                        <img style={{ width: '36px', height: '64px', objectFit: 'contain' }} src={`http://localhost:8080/api/file/images/${record?.images[0]?.photo}`} />
                    </div>
                )
            }
        },
        {
            title: 'Tên Sản Phẩm',
            dataIndex: 'name',
        },
        {
            title: 'Mã Sản Phẩm',
            dataIndex: 'id',
        },
        {
            title: 'Loại Sản Phẩm',
            render: (record) => {
                return (
                    <>
                        {record?.category?.title}
                    </>
                )
            }
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            render: (text) => {
                return (
                    <>
                        {text}
                    </>
                )
            }
        },
        ,
        {
            title: 'Thao Tác',
            render: (record) => {
                return (
                    <Checkbox onChange={(e) => { handleClickSelectListPrItem(e, record) }} />
                )
            }
        }
    ]

    const handleClickSelectListPrItem = (e, item) => {
        console.log(e.target.checked, item)
        if (e.target.checked) {
            let index = selectedListPr.findIndex((pr) => pr.id === item.id)
            if (index === -1) {
                selectedListPr.push(item);
                setSelectedListPr([...selectedListPr])
            }
        } else {
            let index = selectedListPr.findIndex((pr) => pr.id === item.id)
            if (index !== -1) {
                selectedListPr.splice(index, 1);
                setSelectedListPr([...selectedListPr])
            }
        }
    }

    const handleDeleteSelectedListPrItem = () => {
        if (selectedListPr) {
            selectedListPr.forEach((item) => {
                let index = listPr.findIndex(pr => pr.id === item.id)
                if (index !== -1) {
                    listPr.splice(index, 1)
                    products.push(item)
                }
            })
            setProducts([...products])
            setListPr([...listPr])
            setSelectedListPr([])
            openNotificationWithIcon('warning', 'Thông Báo', 'Xóa sản phẩm thành công')
        }
    }


    const [products, setProducts] = useState([]);
    const [productsTable, setProductsTable] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [colors, setcolors] = useState([]);
    const sortOptions = [
        { id: 1, by: 'name', sort: 'asc', byTitle: 'Theo Tên Sản Phẩm', title: 'Từ A-Z' },
        { id: 2, by: 'name', sort: 'desc', byTitle: 'Theo Tên Sản Phẩm', title: 'Từ Z-A' },
        { id: 3, by: 'price', sort: 'asc', byTitle: 'Theo Giá Sản Phẩm', title: 'Giá tăng dần' },
        { id: 4, by: 'price', sort: 'desc', byTitle: 'Theo Giá Sản Phẩm', title: 'Giá giảm dần' },
        { id: 5, by: 'createdAt', sort: 'asc', byTitle: 'Theo Ngày Ra Mắt', title: 'Mới nhất' },
        { id: 6, by: 'createdAt', sort: 'desc', byTitle: 'Theo Ngày Ra Mắt', title: 'Cũ nhất' }
    ]

    const [searchProductTableInputValue, setSearchProductTableInputValue] = useState('');
    const [filterProductsInfo, setFilterProductsInfo] = useState({
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
            setFilterProductsInfo({
                ...filterProductsInfo,
                minPrice: value2,
                maxPrice: value1
            })
        } else {
            setFilterProductsInfo({
                ...filterProductsInfo,
                minPrice: value1,
                maxPrice: value2
            })
        }
    }


    const onChangeProductFilterColors = (e) => {
        setFilterProductsInfo({
            ...filterProductsInfo,
            colorIds: [...e]
        })
    }

    const onChangeProductFilterSizes = (e) => {
        setFilterProductsInfo({
            ...filterProductsInfo,
            sizeIds: [...e]
        })
    }

    const onChangeProductMaterialFilter = (materialId) => {
        setFilterProductsInfo({
            ...filterProductsInfo,
            materialId: materialId
        })
    }

    const onChangeProductSortFilter = (sortId) => {
        setFilterProductsInfo({
            ...filterProductsInfo,
            sortId: sortId
        })
    }

    const onChangeProductsCategoryFilter = (categorId) => {
        setFilterProductsInfo({
            ...filterProductsInfo,
            categorId: categorId
        })
    }

    const onSearchProductTableByText = () => {
        if (searchProductTableInputValue.trim() !== '') {
            setFilterProductsInfo({
                ...filterProductsInfo,
                searchText: searchProductTableInputValue
            })
        }
    }

    const onClearProductTableFiler = () => {
        setSearchProductTableInputValue('')
        setFilterProductsInfo({
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
                    if (check !== -1) {
                        total = total + 1;
                    }
                }
                if (total > 0) {
                    return true;
                } else {
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

    const productsColumn = [
        {
            title: 'STT',
            dataIndex: 'index',
        },
        {
            title: 'Ảnh',
            width: 80,
            render: (record) => {
                return (
                    <div>
                        <img style={{ width: '36px', height: '64px', objectFit: 'contain' }} src={`http://localhost:8080/api/file/images/${record?.images[0]?.photo}`} />
                    </div>
                )
            }
        },
        {
            title: 'Tên Sản Phẩm',
            dataIndex: 'name',
        },
        {
            title: 'Mã Sản Phẩm',
            dataIndex: 'id',
        },
        {
            title: 'Loại Sản Phẩm',
            render: (record) => {
                return (
                    <>
                        {record?.category?.title}
                    </>
                )
            }
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            render: (text) => {
                return (
                    <>
                        {text}
                    </>
                )
            }
        },
        {
            title: '',
            render: (record) => {
                return (
                    <Checkbox onChange={(e) => { handleClickSelectProductItem(e, record) }} />
                )
            }
        }
    ]




    const handleClickSelectProductItem = (e, item) => {
        console.log(e.target.checked, item)
        if (e.target.checked) {
            let index = selectedProducts.findIndex((pr) => pr.id === item.id)
            if (index === -1) {
                selectedProducts.push(item);
                setSelectedProducts([...selectedProducts])
            }
        } else {
            let index = selectedProducts.findIndex((pr) => pr.id === item.id)
            if (index !== -1) {
                selectedProducts.splice(index, 1);
                setSelectedProducts([...selectedProducts])
            }
        }
    }

    const handleAddSelectedProductsToList = () => {
        if (selectedProducts) {
            selectedProducts.forEach((item) => {
                let index = products.findIndex(pr => pr.id === item.id)
                if (index !== -1) {
                    products.splice(index, 1)
                }
            })
            setProducts([...products])
            setListPr([...listPr, ...selectedProducts])
            setSelectedProducts([])
            openNotificationWithIcon('success', 'Thông Báo', 'Thêm sản phẩm thành công')
        }

    }


    const handleClickSubmitForm = (value) => {
        console.log(value)
        Modal.confirm({
            title: 'Hộp Thoại Xác Nhận',
            content: 'Bạn có muốn sửa thông tin khuyến mại không.',
            okText: 'Xác Nhận',
            cancelText: 'Hủy Bỏ',
            onOk: () => {
                let payload = {
                    id,
                    title: value?.name,
                    dateafter: new Date(value?.date_after),
                    datebefor: new Date(value?.date_before),
                    users: {
                        username: auth?.info?.username
                    },
                    bypersent: value?.discount,
                    check: 0,
                    listpr: [...listPr.map(item => item.id)],
                    isActive: value?.isactive ? 1 : 0
                }
                console.log(payload)
                promotionAPI.updatePromotion(payload)
                    .then(res => {
                        console.log(res)
                        setIsActive(res.isactive)
                        if (res.promotionProductDTOList && res.promotionProductDTOList.length > 0) {
                            setListPr([...res.promotionProductDTOList.map((item, index) => ({
                                index: index + 1,
                                key: item?.product?.id,
                                ...item?.product
                            }))])
                        }
                        setFormInitValue({
                            name: res?.title,
                            discount: res?.by_persent,
                            date_after: dayjs(res?.dateafter),
                            date_before: dayjs(res?.datebefor),
                            isactive: res?.isactive
                        })
                        if (!res.status) {
                            Modal.success({ title: 'Hộp Thoại Thông Báo', content: 'Cập nhật thông tin khuyến mại thành công', okText: 'Xác Nhận' });
                        } else {
                            console.log(res)
                        }
                    })
                    .catch(err => console.log(err))
            }
        })

    }

    useEffect(() => {
    }, [selectedListPr])

    useEffect(() => {
    }, [selectedProducts])


    useEffect(() => {
        const newDataList = filterProductData(products, filterProductsInfo);
        setProductsTable(newDataList);
    }, [filterProductsInfo, products])

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
        promotionAPI.getProductNotExist()
            .then(res => {
                if (!res.status) {
                    setProducts(res.map((item, index) => ({
                        index: index + 1,
                        key: item.id,
                        ...item
                    })))
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (formInitValue) {
            form.resetFields();
        }
    }, [formInitValue])

    useEffect(() => {
        if (id) {
            promotionAPI.getPromotionDetail(id)
                .then(res => {
                    if (!res.status) {
                        console.log(res)
                        setIsActive(res.isactive)
                        if (res.promotionProductDTOList && res.promotionProductDTOList.length > 0) {
                            setListPr([...res.promotionProductDTOList.map((item, index) => ({
                                index: index + 1,
                                key: item?.product?.id,
                                ...item?.product
                            }))])
                        }
                        console.log(dayjs(res?.dateafter))
                        setFormInitValue({
                            name: res?.title,
                            discount: res?.bypersent,
                            date_after: dayjs(res?.dateafter),
                            date_before: dayjs(res?.datebefor),
                            isactive: res?.isactive
                        })
                    } else {
                        console.log(res)
                    }
                })
                .catch(err => console.log(err))
        }
    }, [id])

    return (
        <Helmet
            title={"Thông Tin Khuyến Mại"}
        >
            <div className="adm--newpromotion">
                <div className="adm--newpromotion__title">
                    <Button type='primary' onClick={() => { navigate('/admin/promotion-list') }}>Danh Sách</Button>
                </div>
                <div className="adm--newpromotion__body">
                    <div className="adm--newpromotion__body--form">
                        <Typography.Title level={5}>Thông Tin Khuyến Mại</Typography.Title>
                        <Form
                            layout='vertical'
                            wrapperCol={{ span: 24 }}
                            labelCol={{ span: 24 }}
                            onFinish={handleClickSubmitForm}
                            form={form}
                            initialValues={formInitValue}
                        >
                            <Form.Item
                                label="Tên Khuyến Mại"
                                name="name"
                                hasFeedback
                                rules={[
                                    { required: true, message: 'Vui lòng nhập tên khuyến mại.' },
                                    { whitespace: true, message: 'Vui lòng không nhập khoảng trống.' }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Mức Giảm Giá (%)"
                                name="discount"
                                hasFeedback
                                rules={[
                                    { required: true, message: 'Vui lòng nhập tên khuyến mại.' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (value < 0) {
                                                return Promise.reject("Vui lòng nhập số lớn hơn 0.")
                                            } else if (value > 100) {
                                                return Promise.reject("Vui lòng nhập số nhỏ hơn 100.")
                                            } else {
                                                return Promise.resolve();
                                            }
                                        }
                                    })
                                ]}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                label="Ngày Bắt Đầu"
                                name="date_after"
                                hasFeedback
                                rules={[
                                    { required: true, message: 'Vui lòng nhập ngày bắt đầu.' }
                                ]}
                            >
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                label="Ngày Kết Thúc"
                                name="date_before"
                                hasFeedback
                                rules={[
                                    { required: true, message: 'Vui lòng nhập ngày kết thúc.' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('date_before') > getFieldValue('date_after')) {
                                                return Promise.resolve()
                                            }
                                            return Promise.reject('Ngày kết thúc phải sau ngày bắt đầu!')
                                        }
                                    })
                                ]}
                            >
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                label="Trạng Thái"
                                name="isactive"
                                valuePropName='checked'
                            >
                                <Switch />
                            </Form.Item>
                            <Form.Item>
                                {
                                    listPr && listPr.length > 0 ?
                                        (
                                            <Button danger htmlType='submit'>Cập Nhật</Button>
                                        )
                                        :
                                        (
                                            <Tooltip
                                                title="Vui lòng chọn sản phẩm khuyến mại."
                                            >
                                                <Button danger htmlType='submit' disabled>Cập Nhật</Button>
                                            </Tooltip>
                                        )
                                }
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="adm--newpromotion__body--tables">
                        <div className="adm--newpromotion__body--tables__discountpr">
                            <div className="adm--newpromotion__body--tables__discountpr--title">
                                <Typography.Title level={5}>Sản Phẩm Khuyến Mại</Typography.Title>
                                <Button type='primary' disabled={!selectedListPr || selectedListPr <= 0} onClick={handleDeleteSelectedListPrItem}>Xoá Sản Phẩm</Button>
                            </div>
                            <Table
                                dataSource={listPr}
                                columns={listPrColumn}
                                scroll={{
                                    y: '40vh'
                                }}
                                bordered
                            />
                        </div>
                        <div className="adm--newpromotion__body--tables__undiscountpr">
                            <div className="adm--newpromotion__body--tables__undiscountpr--title">
                                <Typography.Title level={5}>Danh Sách Sản Phẩm</Typography.Title>
                                <Button type='primary' disabled={!selectedProducts || selectedProducts <= 0} onClick={handleAddSelectedProductsToList}>Thêm Sản Phẩm</Button>
                            </div>
                            <div className="adm--newpromotion__body--tables__undiscountpr--filters">
                                <div className="adm--newpromotion__body--tables__undiscountpr--filters__search">
                                    <Input value={searchProductTableInputValue} onChange={e => { setSearchProductTableInputValue(e.target.value) }} placeholder="Nhập tên sản phẩm" />
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Button style={{ margin: 10 }} icon={<SearchOutlined />} type='primary' onClick={onSearchProductTableByText}>Tìm Kiếm</Button>
                                        <Button style={{ margin: 10 }} icon={<ReloadOutlined />} danger onClick={() => { onClearProductTableFiler() }}>Làm Mới</Button>
                                    </div>
                                </div>
                                <div className="adm--newpromotion__body--tables__undiscountpr--filters__options">
                                    <div className="adm--newpromotion__body--tables__undiscountpr--filters__options--item">
                                        <div className="adm--newpromotion__body--tables__undiscountpr--filters__options--item__label">
                                            Thể Loại
                                        </div>
                                        <div className="adm--newpromotion__body--tables__undiscountpr--filters__options--item__content">
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
                                                value={filterProductsInfo?.categorId}
                                                onChange={onChangeProductsCategoryFilter}
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
                                    <div className="adm--newpromotion__body--tables__undiscountpr--filters__options--item">
                                        <div className="adm--newpromotion__body--tables__undiscountpr--filters__options--item__label">
                                            Chất Liệu
                                        </div>
                                        <div className="adm--newpromotion__body--tables__undiscountpr--filters__options--item__content">
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
                                                value={filterProductsInfo.materialId}
                                                onChange={onChangeProductMaterialFilter}

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
                                    <div className="adm--newpromotion__body--tables__undiscountpr--filters__options--item">
                                        <div className="adm--newpromotion__body--tables__undiscountpr--filters__options--item__label">
                                            Màu Sắc
                                        </div>
                                        <div className="adm--newpromotion__body--tables__undiscountpr--filters__options--item__content">
                                            <Select
                                                mode="multiple"
                                                style={{
                                                    width: '100%',
                                                }}
                                                onChange={onChangeProductFilterColors}
                                                value={filterProductsInfo.colorIds}
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
                                    <div className="adm--newpromotion__body--tables__undiscountpr--filters__options--item">
                                        <div className="adm--newpromotion__body--tables__undiscountpr--filters__options--item__label">
                                            Size
                                        </div>
                                        <div className="adm--newpromotion__body--tables__undiscountpr--filters__options--item__content">
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
                                                value={filterProductsInfo.sizeIds}
                                                placeholder="Chọn Size"
                                            >
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="adm--newpromotion__body--tables__undiscountpr--filters__options--item">
                                        <div className="adm--newpromotion__body--tables__undiscountpr--filters__options--item__label">
                                            Sắp Xếp
                                        </div>
                                        <div className="adm--newpromotion__body--tables__undiscountpr--filters__options--item__content">
                                            <Select
                                                style={{
                                                    width: '100%',
                                                }}
                                                options={[...sortOptions.map((c) => ({
                                                    value: c.id,
                                                    label: `${c.byTitle} - ${c.title}`,
                                                    key: c.id
                                                }))]}
                                                value={filterProductsInfo.sortId}
                                                onChange={onChangeProductSortFilter}
                                            >
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="adm--newpromotion__body--tables__undiscountpr--filters__options--item">
                                        <div className="adm--newpromotion__body--tables__undiscountpr--filters__options--item__label">
                                            Khoảng Giá
                                        </div>
                                        <div className="adm--newpromotion__body--tables__undiscountpr--filters__options--item__content">
                                            <Slider
                                                range
                                                value={[filterProductsInfo.minPrice, filterProductsInfo.maxPrice]}
                                                min={0} max={5000000}
                                                onChange={onChangeRangeOfPrice}
                                                step={10000}
                                            />
                                            {
                                                filterProductsInfo.maxPrice !== 0 &&
                                                <div>
                                                    <div>
                                                        Từ: {
                                                            new Intl.NumberFormat("vi-VN", {
                                                                style: "currency",
                                                                currency: "VND",
                                                            }).format(filterProductsInfo.minPrice)
                                                        }
                                                    </div>
                                                    <div>
                                                        Đến: {
                                                            new Intl.NumberFormat("vi-VN", {
                                                                style: "currency",
                                                                currency: "VND",
                                                            }).format(filterProductsInfo.maxPrice)
                                                        }
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Table
                                dataSource={productsTable}
                                columns={productsColumn}
                                scroll={{
                                    y: '40vh'
                                }}
                                bordered
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default AdmPromotionDetail