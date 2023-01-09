import { EditOutlined, FileDoneOutlined, FileExcelOutlined, PlusOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Modal, notification, Select, Table, Tag, Typography } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../../apis/userAPI';
import Helmet from '../../components/Helmet'


const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description: des,
    });
};
const AdmUserList = () => {

    const [usersData, setUsersData] = useState([]);
    const [usersTableData, setUsersTableData] = useState([]);
    const [userFilterInputValue, setUserFilterInputValue] = useState('');
    const [statusFilter, setStatusFilter] = useState(0);
    const navigate = useNavigate();
    const userColumns = [
        {
            title: 'STT',
            render: (text, record, index) => {
                return (<>{index + 1}</>)
            }
        }
        , {
            title: 'Ảnh',
            width: 80,
            render: (record) => {
                return (
                    <div className="user--table__imgcl">
                        <img src={`http://localhost:8080/api/file/images/${record?.photo}`} alt={record?.fullname} />
                    </div>
                )

            }
        },
        {
            title: 'Tên Tài Khoản',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: 'Họ Và Tên',
            dataIndex: 'fullname',
            key: 'fullname'
        },
        {
            title: 'Số Điện Thoại',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Ngày Tạo',
            dataIndex: 'createdAt',
            render: (text) => {
                return(
                    <>
                        {moment(text).format('DD/MM/YYYY, H:mm:ss')}
                    </>
                )
            }
        },
        {
            title: 'Trạng Thái',
            render: (record) => {
                return (
                    record?.activated ?
                        (
                            <Tag color='blue'>Kích Hoạt</Tag>
                        )
                        :
                        (
                            <Tag color='red'>Hủy Kích Hoạt</Tag>
                        )
                )
            }
        },
        {
            title: 'Thao Tác',
            render: (record) => {
                return (
                    <div className="user--table__actionscl">
                        <Button icon={<EditOutlined />} type={'primary'} onClick={() => navigate(`/admin/user/detail/${record.username}`)}></Button>
                        <Button icon={!record.activated ? <FileDoneOutlined /> : <FileExcelOutlined />} danger style={{marginLeft: 10}} onClick={() => {onClickToggleUserActivated(record)}}></Button>
                    </div>
                )
            }
        }
    ]

    const onClickToggleUserActivated = (user) => {
        Modal.confirm({
            title: 'Hộp Thoại Xác Nhận',
            content: `Bạn có muốn ${user.activated ? 'hủy kích hoạt' : 'kích hoạt'} tài khoản không`,
            okText: 'Xác Nhận',
            cancelText: 'Hủy Bỏ',
            onOk: () => {
                const payload = {
                    username: user.username,
                    activated: !user.activated ? 1 : -1
                };
                userAPI.updateUserActivated(payload)
                .then(res => {
                    if(!res.status){
                        let index = usersData.findIndex(u => u.username === res.username);
                        if(index !== -1){
                            const newData = [...usersData];
                            newData[index] = {...res};
                            setUsersData([...newData]);
                            openNotificationWithIcon('info','Thông Báo',`${!res.activated ? 'Hủy kích hoạt' : 'Kích hoạt'} tài khoản thành công.`);
                        }
                    }else{
                        console.log(res);
                    }
                })
                .catch(err => console.log(err))
            }
        })
    }


    const onClickSearchUser = () => {
        console.log(userFilterInputValue)
        let list = [];

        if(statusFilter !== 0){
            if(statusFilter === 1){
                list = usersData.filter(u => u.activated);
            }else{
                list = usersData.filter(u => !u.activated);
            }
        }else{
            list = [...usersData];
        }

        if (userFilterInputValue.trim() !== '') {
            let newData = list.filter((u) => {
                if (
                    u.username.toLowerCase().includes(userFilterInputValue.trim().toLocaleLowerCase()) ||
                    u.fullname.toLowerCase().includes(userFilterInputValue.trim().toLocaleLowerCase()) ||
                    u.phone.toLowerCase().includes(userFilterInputValue.trim().toLocaleLowerCase()) ||
                    u.email.toLowerCase().includes(userFilterInputValue.trim().toLocaleLowerCase())
                ) {
                    return true;
                } else {
                    return false;
                }
            })
            setUsersTableData([...newData]);
        }
    }

    const onClearUserSearch = () => {
        setUsersTableData(usersData);
        setUserFilterInputValue('');
        setStatusFilter(0);
    }

    useEffect(() => {

        let list = [];

        if(statusFilter !== 0){
            if(statusFilter === 1){
                list = usersData.filter(u => u.activated);
            }else{
                list = usersData.filter(u => !u.activated);
            }
        }else{
            list = [...usersData];
        }

        if (userFilterInputValue.trim() !== '') {
            let newData = list.filter((u) => {
                if (
                    u.username.toLowerCase().includes(userFilterInputValue.trim().toLocaleLowerCase()) ||
                    u.fullname.toLowerCase().includes(userFilterInputValue.trim().toLocaleLowerCase()) ||
                    u.phone.toLowerCase().includes(userFilterInputValue.trim().toLocaleLowerCase()) ||
                    u.email.toLowerCase().includes(userFilterInputValue.trim().toLocaleLowerCase())
                ) {
                    return true;
                } else {
                    return false;
                }
            })
            setUsersTableData([...newData]);
        }else{

            setUsersTableData([...list]);
        }
    }, [usersData, statusFilter])

    useEffect(() => {
        userAPI.getAllUser()
            .then(res => {
                if (!res.status) {
                    setUsersData(res);
                } else {
                    console.log(res);
                }
            })
            .catch(err => console.log(err));
    }, []);
    return (
        <Helmet
            title={"Quản Lý Tài Khoản"}
        >
            <div className="adm--userlist">
                <div className="adm--userlist__title">
                    <Typography.Title level={4}>Danh Sách Tài Khoản</Typography.Title>
                    <Button type='primary' icon={<PlusOutlined />} onClick={() => {navigate('/admin/user/new')}}>Thêm Mới</Button>
                </div>
                <div className="adm--userlist__body">
                    <div className="adm--userlist__body--filters">
                        <div className="adm--userlist__body--filters__search">
                            <div className="adm--userlist__body--filters__search--input">
                                <Input value={userFilterInputValue} onChange={e => setUserFilterInputValue(e.target.value)} />
                            </div>
                            <div className="adm--userlist__body--filters__search--actions">
                                <Button icon={<SearchOutlined />} type='primary' onClick={onClickSearchUser}>Tìm Kiếm</Button>
                                <Button icon={<ReloadOutlined />} danger onClick={onClearUserSearch}>Làm Mới</Button>
                            </div>
                        </div>
                        <div className="adm--userlist__body--filters__options">
                            <div className="adm--userlist__body--filters__options--item">
                                <div className="adm--userlist__body--filters__options--item__label">
                                    Trạng Thái
                                </div>
                                <div className="adm--userlist__body--filters__options--item__content">
                                    <Select
                                        style={{ width: '100%' }}
                                        value={statusFilter}
                                        onChange={e => { setStatusFilter(e) }}
                                    >
                                        <Select.Option value={0}>Tất Cả</Select.Option>
                                        <Select.Option value={-1}>Hủy Kích Hoạt</Select.Option>
                                        <Select.Option value={1}>Kích Hoạt</Select.Option>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="adm--userlist__body--table">
                        <Table bordered columns={userColumns} dataSource={usersTableData} />
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default AdmUserList;