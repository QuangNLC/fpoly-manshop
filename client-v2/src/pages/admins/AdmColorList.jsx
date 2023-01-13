import { EditOutlined, FileDoneOutlined, FileExcelOutlined, FileSyncOutlined, PlusOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, notification, Select, Switch, Table, Tag, Tooltip, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import colorAPI from '../../apis/colorAPI'
import Helmet from '../../components/Helmet'
import { SketchPicker } from 'react-color'

const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description: des,
    });
};
const AdmColorList = () => {

    const [colorData, setColorData] = useState([])
    const [colorTableData, setColorTableData] = useState([])
    const [inputValue, setInputValue] = useState('')
    const sortOptions = [
        { id: 1, by: 'name', sort: 'asc', byTitle: 'Theo Tên Sản Phẩm', title: 'Từ A-Z' },
        { id: 2, by: 'name', sort: 'desc', byTitle: 'Theo Tên Sản Phẩm', title: 'Từ Z-A' },
        { id: 3, by: 'createdAt', sort: 'asc', byTitle: 'Theo Ngày Ra Mắt', title: 'Mới nhất' },
        { id: 4, by: 'createdAt', sort: 'desc', byTitle: 'Theo Ngày Ra Mắt', title: 'Cũ nhất' }
    ]
    const [filterInfo, setFilterInfo] = useState({
        actitveType: 0,
        sortId: 3,
        searchText: ''
    })

    const onSearchText = () => {
        if (inputValue.trim() !== '') {
            setFilterInfo({
                ...filterInfo,
                searchText: inputValue
            })
        }
    }

    const onClearFilter = () => {
        setInputValue('')
        setFilterInfo({
            actitveType: 0,
            sortId: 3,
            searchText: ''
        })
    }

    const onChangeSortFilter = (sortId) => {
        setFilterInfo({
            ...filterInfo,
            sortId: sortId
        })
    }

    const onChangeActiveFilter = (value) => {
        setFilterInfo({
            ...filterInfo,
            actitveType: value
        })
    }

    const colorColumns = [
        {
            title: 'STT',
            render: (text, record, index) => {
                return (<>{index + 1}</>)
            }
        },
        {
            title: 'Màu',
            render: (record) => {
                return (
                    <div style={{ width: 30, height: 30, backgroundColor: `${record?.colorCode}` }}></div>
                )
            }
        },
        {
            title: 'Mô tả',
            render: (record) => {
                return (
                    <Tag>{record?.description}</Tag>
                )
            }
        },
        {
            title: 'Code',
            render: (record) => {
                return (
                    <Tag>{record?.colorCode}</Tag>
                )
            }
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
            title: '',
            render: (record) => {
                return (

                    <>
                        <Tooltip title={'Cập Nhật'}>
                            <Button icon={<EditOutlined />} type={'primary'} onClick={() => onClickEditColor(record)}></Button>
                        </Tooltip>

                        <Tooltip title={record?.isActive ? 'Ngừng Kinh Doanh' : 'Kích Hoạt'}>
                            <Button
                                style={{ marginLeft: 10 }}
                                danger
                                type={`${record?.isActive ? 'primary' : 'default'}`}
                                icon={!record?.isActive ? <FileDoneOutlined /> : <FileExcelOutlined />}
                                onClick={() => onToggleColorActive(record)}
                            >
                            </Button>
                        </Tooltip>
                    </>
                )
            }
        }
    ]





    const filterColorData = (cateList, filter) => {
        let result = [...cateList];

        if (filter.searchText !== '') {
            result = [...result.filter(i => (i.colorCode.toLowerCase().includes(filter.searchText.toLowerCase()) || i.description.toLowerCase().includes(filter.searchText.toLowerCase())))]
        }

        if (filter?.actitveType !== 0) {
            result = [...result.filter(i => {
                if (filter.actitveType === 1) {
                    return i.isActive
                } else {
                    return !i.isActive
                }
            })]
        }


        switch (filter.sortId) {
            case (1): {
                result = [...result.sort((a, b) => a.title > b.title ? -1 : 1)];
                break;
            }
            case (2): {
                result = [...result.sort((a, b) => a.title > b.title ? 1 : -1)];
                break;
            }
            case (3): {
                result = [...result.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)];
                break;
            }
            case (4): {
                result = [...result.sort((a, b) => b.createdAt > a.createdAt ? 1 : -1)];
                break;
            }
            default: {
                break;
            }
        }

        return result;
    }


    const onToggleColorActive = (item) => {
        const payload = {
            ...item,
            isActive: !item?.isActive
        }
        Modal.confirm({
            title: 'Hộp Thoại Xác Nhận',
            content: `Bạn có muốn ${item.isActive ? 'hủy kích hoạt' : 'kích hoạt'} màu không`,
            okText: 'Xác Nhận',
            cancelText: 'Hủy Bỏ',
            onOk: () => {
                colorAPI.updateColor(payload)
                    .then(res => {
                        if (!res.status) {
                            let index = colorData.findIndex(c => c.id === res.id);
                            if (index !== -1) {
                                colorData[index] = { ...res };
                                setColorData([...colorData]);
                                openNotificationWithIcon('info', 'Thông Báo', `${!res.activated ? 'Hủy kích hoạt' : 'Kích hoạt'} màu thành công.`);
                            }
                        } else {
                            console.log(res)
                        }
                    })
                    .catch(err => console.log(err))
            }
        })
    }


    // create && edit color modal 
    const [isColorModal, setIsColorModal] = useState(false);
    const [editingColor, setEditingColor] = useState(undefined);
    const [colorForm] = useForm();
    const [selectColor, setSelectColor] = useState("#fff");

    const onClickCreateColorBtn = () => {
        setEditingColor(undefined);
        colorForm.setFieldValue('colorCode', selectColor);
        setIsColorModal(true);
    }

    const onCloseColorModal = () => {
        setIsColorModal(false);
        setEditingColor(undefined);
    }

    const onClickEditColor = (color) => {
        console.log(color)
        setEditingColor(color);
        setSelectColor(color.colorCode);
        colorForm.setFieldsValue({
            id: color.id,
            colorCode: color?.colorCode,
            description: color?.description,
            isActive: color?.isActive
        })
        setIsColorModal(true);
    }

    const onChangeColorCode = (color) => {
        setSelectColor(color.hex);
        colorForm.setFieldValue('colorCode', color.hex)
    }

    const onFinishColorForm = (value) => {
        if (!editingColor) {
            let payload = {
                ...value
            }
            console.log(value)
            colorAPI.createColor(payload)
                .then(res => {
                    if (!res.status) {
                        setColorData([{ ...res }, ...colorData]);
                        openNotificationWithIcon('info', 'Thông Báo', 'Thêm màu mới thành công.');
                        onCloseColorModal();
                    }
                })
        } else {
            let payload = {
                ...value,
                id: editingColor?.id
            }
            console.log(payload)
            Modal.confirm({
                title: "Hộp Thoại Xác Nhận",
                content: "Bạn có muốn cập nhật thông tin màu.",
                okText: 'Xác Nhận',
                cancelText: 'Hủy Bỏ',
                onOk: () => {
                    colorAPI.updateColor(payload)
                        .then(res => {
                            if (!res.status) {
                                let index = colorData.findIndex(c => c.id === res.id);
                                if (index !== -1) {
                                    colorData[index] = { ...res };
                                    setColorData([...colorData]);
                                    openNotificationWithIcon('info', 'Thông Báo', 'Cập nhật thông tin màu.');
                                    onCloseColorModal();
                                }
                            } else {
                                console.log(res)
                            }
                        })
                        .catch(err => console.log(err))
                }
            })
        }
    }

    //end create && edit mate modal
    useEffect(() => {
        const newData = filterColorData(colorData, filterInfo)
        setColorTableData(newData.map((item) => ({ ...item, key: item.id })))
    }, [colorData, filterInfo])

    useEffect(() => {
        colorAPI.getAllColor()
            .then(res => {
                if (!res.status) {
                    console.log(res)
                    setColorData(res)
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Helmet
            title={"Quản Lý Màu Sắc"}
        >
            <div className="adm--matelist">
                <div className="adm--matelist__title">
                    <Typography.Title level={4}>Danh Sách Màu Sắc</Typography.Title>
                    <Button icon={<PlusOutlined />} type={'primary'} onClick={onClickCreateColorBtn}>Thêm Mới</Button>
                </div>
                <div className="adm--matelist__body">
                    <div className="adm--matelist__body--filters">
                        <div className="adm--matelist__body--filters__search">
                            <Input value={inputValue} onChange={e => setInputValue(e.target.value)} />
                            <Button type='primary' icon={<SearchOutlined />} style={{ marginLeft: 20 }} onClick={onSearchText}>Tìm Kiếm</Button>
                            <Button type='dashed' icon={<RedoOutlined />} style={{ marginLeft: 20 }} onClick={onClearFilter}>Làm Mới</Button>
                        </div>
                        <div className="adm--matelist__body--filters__item">
                            <div className="adm--matelist__body--filters__item--label">
                                Sắp Xếp
                            </div>
                            <div className="adm--matelist__body--filters__item--content">
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
                        <div className="adm--matelist__body--filters__item">
                            <div className="adm--matelist__body--filters__item--label">
                                Trạng Thái
                            </div>
                            <div className="adm--matelist__body--filters__item--content">
                                <Select
                                    style={{
                                        width: '100%',
                                    }}
                                    value={filterInfo.actitveType}
                                    onChange={onChangeActiveFilter}
                                >
                                    <Select.Option
                                        value={0}
                                    >
                                        Tất Cả
                                    </Select.Option>
                                    <Select.Option
                                        value={1}
                                    >
                                        Kinh Doanh
                                    </Select.Option>
                                    <Select.Option
                                        value={-1}
                                    >
                                        Ngừng Kinh Doanh
                                    </Select.Option>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className="adm--matelist__body--table">
                        <Table
                            columns={colorColumns}
                            dataSource={colorTableData}
                            bordered
                        />
                    </div>
                </div>
            </div>
            <Modal
                open={isColorModal}
                centered
                width={800}
                footer={false}
                onCancel={onCloseColorModal}
            >
                <Form
                    form={colorForm}
                    layout={'vertical'}
                    onFinish={onFinishColorForm}
                >
                    {
                        editingColor ?
                            (
                                <>
                                    <Typography.Title level={4}>Cập Nhật Màu</Typography.Title>
                                    <Form.Item>
                                        <SketchPicker onChangeComplete={onChangeColorCode} color={selectColor} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Code"
                                        name="colorCode"
                                    >
                                        <Input placeholder='Nhập hex code' value={selectColor} disabled />
                                    </Form.Item>
                                    <Form.Item
                                        label="Mô Tả"
                                        name="description"
                                    >
                                        <Input.TextArea placeholder='Nhập mô tả' />
                                    </Form.Item>
                                    <Form.Item
                                        label="Trạng Thái"
                                        name="isActive"
                                        valuePropName='checked'
                                    >
                                        <Switch
                                            checkedChildren={<Tag color='green'>Kinh Doanh</Tag>}
                                            unCheckedChildren={<Tag color='red'>Ngừng Kinh Doanh</Tag>}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                    >
                                        <Button icon={<FileSyncOutlined />} danger htmlType='submit'>Cập Nhật</Button>
                                    </Form.Item>
                                </>
                            )
                            :
                            (
                                <>
                                    <Typography.Title level={4}>Thêm Màu Mới</Typography.Title>
                                    <Form.Item>
                                        <SketchPicker onChangeComplete={onChangeColorCode} color={selectColor} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Code"
                                        name="colorCode"
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập tên chất liệu.!' },
                                            { whitespace: true, message: 'Vui lòng không nhập khoảng trống.!' }
                                        ]}
                                    >
                                        <Input placeholder='Nhập hex code' value={selectColor} disabled />
                                    </Form.Item>
                                    <Form.Item
                                        label="Mô Tả"
                                        name="description"
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập mô tả màu.!' },
                                            { whitespace: true, message: 'Vui lòng không nhập khoảng trống.!' }
                                        ]}
                                    >
                                        <Input.TextArea placeholder='Nhập mô tả' />
                                    </Form.Item>
                                    <Form.Item
                                    >
                                        <Button icon={<PlusOutlined />} type={'primary'} htmlType='submit'>Tạo Mới</Button>
                                    </Form.Item>
                                </>
                            )
                    }
                </Form>
            </Modal>
        </Helmet>
    )
}

export default AdmColorList