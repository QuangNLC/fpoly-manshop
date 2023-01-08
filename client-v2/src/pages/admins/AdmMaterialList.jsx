import { EditOutlined, FileSyncOutlined, PlusOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, notification, Select, Switch, Table, Tag, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import materialAPI from '../../apis/materialAPI'
import Helmet from '../../components/Helmet'


const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description: des,
    });
};
const AdmMaterialList = () => {

    const [mateData, setMateData] = useState([])
    const [mateTableData, setMateTableData] = useState([])
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

    const mateColumns = [
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
            title: 'Mô Tả',
            render: (record) => {
                return (
                    <div>
                        <Typography.Text level={5}>
                            {record?.descriptions}
                        </Typography.Text>
                    </div>
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
                    <Button icon={<EditOutlined />} danger onClick={() => onClickEditMate(record)}>Cập Nhật</Button>

                )
            }
        }
    ]





    const filterMateData = (cateList, filter) => {
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



    // create && edit mate modal 
    const [isMateModal, setIsMateModal] = useState(false);
    const [editingMate, setEditingMate] = useState(undefined);
    const [mateForm] = useForm();


    const onClickCreateMateBtn = () => {
        setEditingMate(undefined);
        setIsMateModal(true);
    }

    const onCloseMateModal = () => {
        setIsMateModal(false);
        setEditingMate(undefined);
    }

    const onClickEditMate = (mate) => {
        console.log(mate)
        setEditingMate(mate);
        mateForm.setFieldsValue({
            id: mate.id,
            title: mate?.title,
            descriptions: mate?.descriptions,
            isActive: mate?.isActive
        })
        setIsMateModal(true);
    }

    const onFinishMateForm = (value) => {
        if (!editingMate) {
            materialAPI.createMate({ title: value.title, descriptions: value?.descriptions ? value?.descriptions : '' })
                .then(res => {
                    if (!res.status) {
                        setMateData([{ ...res }, ...mateData]);
                        openNotificationWithIcon('info','Thông Báo','Tạo chất liệu thành công.');
                        onCloseMateModal();
                    }
                })
        } else {
            let payload = {
                ...value,
            }
            console.log(payload)
            Modal.confirm({
                title: "Hộp Thoại Xác Nhận",
                content: "Bạn có muốn cập nhật thông tin chất liệu không.",
                okText: 'Xác Nhận',
                cancelText: 'Hủy Bỏ',
                onOk: () => {
                    materialAPI.updateMate(payload)
                        .then(res => {
                            if (!res.status) {
                                let index = mateData.findIndex(c => c.id === res.id);
                                if (index !== -1) {
                                    mateData[index] = { ...res };
                                    setMateData([...mateData]);
                                    openNotificationWithIcon('info', 'Thông Báo', 'Cập nhật thông tin chất liệu.');
                                    onCloseMateModal();
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
        const newData = filterMateData(mateData, filterInfo)
        setMateTableData(newData.map((item) => ({ ...item, key: item.id })))
    }, [mateData, filterInfo])

    useEffect(() => {
        materialAPI.getAllMate()
            .then(res => {
                if (!res.status) {
                    console.log(res)
                    setMateData(res)
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Helmet
            title={"Quản Lý Chất Liệu"}
        >
            <div className="adm--matelist">
                <div className="adm--matelist__title">
                    <Typography.Title level={4}>Danh Sách Chất Liệu</Typography.Title>
                    <Button icon={<PlusOutlined />} type={'primary'} onClick={onClickCreateMateBtn}>Thêm Mới</Button>
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
                            columns={mateColumns}
                            dataSource={mateTableData}
                            bordered
                        />
                    </div>
                </div>
            </div>
            <Modal
                open={isMateModal}
                centered
                width={800}
                footer={false}
                onCancel={onCloseMateModal}
            >
                <Form
                    form={mateForm}
                    layout={'vertical'}
                    onFinish={onFinishMateForm}
                >
                    {
                        editingMate ?
                            (
                                <>
                                    <Typography.Title level={4}>Cập Nhật Chất Liệu</Typography.Title>
                                    <Form.Item
                                        label="Mã Chất Liệu"
                                        name="id"
                                    >
                                        <Input value={editingMate.id} disabled />
                                    </Form.Item>
                                    <Form.Item
                                        label="Tên Chất Liệu"
                                        name="title"
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập tên chất liệu.!' },
                                            { whitespace: true, message: 'Vui lòng không nhập khoảng trống.!' }
                                        ]}
                                    >
                                        <Input placeholder='Nhập tên chất liệu' />
                                    </Form.Item>
                                    <Form.Item
                                        label="Mô Tả"
                                        name="descriptions"
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
                                    <Typography.Title level={4}>Tạo Chất Liệu Mới</Typography.Title>
                                    <Form.Item
                                        label="Tên Chất Liệu"
                                        name="title"
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập tên chất liệu.!' },
                                            { whitespace: true, message: 'Vui lòng không nhập khoảng trống.!' }
                                        ]}
                                    >
                                        <Input placeholder='Nhập tên chất liệu' />
                                    </Form.Item>
                                    <Form.Item
                                        label="Mô Tả"
                                        name="descriptions"
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

export default AdmMaterialList