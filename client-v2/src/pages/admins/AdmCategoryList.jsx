import { PlusOutlined, EditOutlined, SearchOutlined, RedoOutlined, FileSyncOutlined, FileDoneOutlined, FileExcelOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, notification, Select, Switch, Table, Tag, Tooltip, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import categoryAPI from '../../apis/categoryAPI'
import Helmet from '../../components/Helmet'
import moment from 'moment'
import { useForm } from 'antd/es/form/Form'


const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description: des,
    });
};
const AdmCategoryList = () => {

    const [cateData, setCateData] = useState([])
    const [cateTableData, setCateTableData] = useState([])
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



    const cateColumns = [
        {
            title: 'STT',
            render: (text, record, index) => {
                return (<>{index + 1}</>)
            }
        },
        {
            title: 'Tên Thể Loại',
            dataIndex: 'title'
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
                            <Button icon={<EditOutlined />} type={'primary'} onClick={() => onClickEditCate(record)}></Button>
                        </Tooltip>

                        <Tooltip title={record?.isActive ? 'Ngừng Kinh Doanh' : 'Kích Hoạt'}>
                            <Button
                                style={{ marginLeft: 10 }}
                                danger
                                type={`${record?.isActive ? 'primary' : 'default'}`}
                                icon={!record?.isActive ? <FileDoneOutlined /> : <FileExcelOutlined />}
                                onClick={() => onToggleCategoryActive(record)}
                            >
                            </Button>
                        </Tooltip>
                    </>
                )
            }
        }
    ]

    const filterCateData = (cateList, filter) => {
        let result = [...cateList];

        if (filter.searchText !== '') {
            result = [...result.filter(i => i.title.toLowerCase().includes(filter.searchText.toLowerCase()))]
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
    // create && edit cate modal 
    const [isCateModal, setIsCateModal] = useState(false);
    const [editingCate, setEditingCate] = useState(undefined);
    const [cateForm] = useForm();

    const onClickCreateCateBtn = () => {
        setEditingCate(undefined);
        setIsCateModal(true);
    }

    const onCloseCateModal = () => {
        setIsCateModal(false);
        setEditingCate(undefined);
    }

    const onClickEditCate = (cate) => {
        console.log(cate)
        setEditingCate(cate);
        cateForm.setFieldsValue({
            id: cate.id,
            title: cate?.title,
            isActive: cate?.isActive
        })
        setIsCateModal(true);
    }

    const onFinishCateForm = (value) => {
        if (!editingCate) {
            categoryAPI.createCate({ title: value.title })
                .then(res => {
                    if (!res.status) {
                        setCateData([...cateData, { ...res }])
                        openNotificationWithIcon('info', 'Thông Báo', 'Tạo thể loại thành công.')
                        onCloseCateModal()
                    } else {
                        console.log(res)
                    }
                })
                .catch(err => console.log(err))
        } else {
            let payload = {
                ...value,
            }
            console.log(payload)
            Modal.confirm({
                title: "Hộp Thoại Xác Nhận",
                content: "Bạn có muốn cập nhật thông tin thể loại không.",
                okText: 'Xác Nhận',
                cancelText: 'Hủy Bỏ',
                onOk: () => {
                    categoryAPI.updateCate(payload)
                        .then(res => {
                            if (!res.status) {
                                let index = cateData.findIndex(c => c.id === res.id);
                                if (index !== -1) {
                                    cateData[index] = { ...res };
                                    setCateData([...cateData]);
                                    openNotificationWithIcon('info', 'Thông Báo', 'Cập nhật thông tin thể loại.');
                                    onCloseCateModal();
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

    const onToggleCategoryActive = (item) => {
        const payload = {
            ...item,
            isActive: !item?.isActive
        }
        Modal.confirm({
            title: 'Hộp Thoại Xác Nhận',
            content: `Bạn có muốn ${item.isActive ? 'hủy kích hoạt' : 'kích hoạt'} thể loại không`,
            okText: 'Xác Nhận',
            cancelText: 'Hủy Bỏ',
            onOk: () => {
                categoryAPI.updateCate(payload)
                    .then(res => {
                        if (!res.status) {
                            let index = cateData.findIndex(c => c.id === res.id);
                            if (index !== -1) {
                                cateData[index] = { ...res };
                                setCateData([...cateData]);
                                openNotificationWithIcon('info', 'Thông Báo', `${!res.activated ? 'Hủy kích hoạt' : 'Kích hoạt'} thể loại thành công.`);
                            }
                        } else {
                            console.log(res)
                        }
                    })
                    .catch(err => console.log(err))
            }
        })
    }

    //end create && edit cate modal




    useEffect(() => {
        const newData = filterCateData(cateData, filterInfo)
        setCateTableData(newData.map((item) => ({ ...item, key: item.id })))
    }, [cateData, filterInfo])

    useEffect(() => {
        categoryAPI.getAllCate()
            .then(res => {
                if (!res.status) {
                    setCateData(res)
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <Helmet
            title={"Quản Lý Thể Loại"}
        >
            <div className="adm--catelist">
                <div className="adm--catelist__title">
                    <Typography.Title level={4}>Danh Sách Thể Loại</Typography.Title>
                    <Button icon={<PlusOutlined />} type={'primary'} onClick={onClickCreateCateBtn}>Thêm Mới</Button>
                </div>
                <div className="adm--catelist__body">
                    <div className="adm--catelist__body--filters">
                        <div className="adm--catelist__body--filters__search">
                            <Input value={inputValue} onChange={e => setInputValue(e.target.value)}  placeholder={'Nhập tên thể loại'}/>
                            <Button type='primary' icon={<SearchOutlined />} style={{ marginLeft: 20 }} onClick={onSearchText}>Tìm Kiếm</Button>
                            <Button type='dashed' icon={<RedoOutlined />} style={{ marginLeft: 20 }} onClick={onClearFilter}>Làm Mới</Button>
                        </div>
                        <div className="adm--catelist__body--filters__item">
                            <div className="adm--catelist__body--filters__item--label">
                                Sắp Xếp
                            </div>
                            <div className="adm--catelist__body--filters__item--content">
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
                        <div className="adm--catelist__body--filters__item">
                            <div className="adm--catelist__body--filters__item--label">
                                Trạng Thái
                            </div>
                            <div className="adm--catelist__body--filters__item--content">
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
                    <div className="adm--catelist__body--table">
                        <Table
                            columns={cateColumns}
                            dataSource={cateTableData}
                            bordered
                        />
                    </div>
                </div>
            </div>
            <Modal
                open={isCateModal}
                centered
                width={800}
                footer={false}
                onCancel={onCloseCateModal}
            >
                <Form
                    form={cateForm}
                    layout={'vertical'}
                    onFinish={onFinishCateForm}
                >
                    {
                        editingCate ?
                            (
                                <>
                                    <Typography.Title level={4}>Cập Nhật Thể Loại</Typography.Title>
                                    <Form.Item
                                        label="Mã Thể Loại"
                                        name="id"
                                    >
                                        <Input value={editingCate.id} disabled />
                                    </Form.Item>
                                    <Form.Item
                                        label="Tên Thể Loại"
                                        name="title"
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập tên thể loại.!' },
                                            { whitespace: true, message: 'Vui lòng không nhập khoảng trống.!' }
                                        ]}
                                    >
                                        <Input placeholder='Nhập tên thể loại' />
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
                                    <Typography.Title level={4}>Tạo Thể Loại Mới</Typography.Title>
                                    <Form.Item
                                        label="Tên Thể Loại"
                                        name="title"
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập tên thể loại.!' },
                                            { whitespace: true, message: 'Vui lòng không nhập khoảng trống.!' }
                                        ]}
                                    >
                                        <Input placeholder='Nhập tên thể loại' />
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

export default AdmCategoryList