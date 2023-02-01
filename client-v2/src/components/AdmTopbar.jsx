import { BellOutlined, FileAddOutlined } from '@ant-design/icons';
import { Avatar, Badge, Dropdown, Empty, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { orderAPI } from '../apis/orderAPI';
import logoImg from '../assets/imgs/logo.png'
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import moment from 'moment';
import { clearCartAction } from '../redux/actions/CartReducerAction';
import { logOutAction } from '../redux/actions/AuthReducerAction';
var stompClient = null;

const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description: des,
    });
};
const AdmTopbar = () => {

    const auth = useSelector((state) => state.auth.auth);
    const navigate = useNavigate();
    const [notiList, setNotiList] = useState(undefined);
    const dispatch = useDispatch();

    const connectListOrderNoti = () => {
        let Sock = new SockJS("http://localhost:8080/ws");
        stompClient = over(Sock);
        stompClient.connect({}, () => {
            stompClient.subscribe('/noti/adm-order', onListOrderNotiReceived)
            console.log('connect to received orders notification!')
        }, onError);
    }

    const onListOrderNotiReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);
        console.log(payloadData)
        setNotiList((curr) => {
            console.log(curr)
            curr.list = [{ ...payloadData.list[0] }, ...curr.list]
            curr.count = payloadData.count
            return { ...curr }
        })
    }

    const onError = (err) => {
        console.log(err);
    }

    const accountItems = [
        auth?.info?.roles?.rolename &&
        auth?.info?.roles?.rolename === "ROLE_ADMIN" &&
        {
            label: 'Tài Khoản Của Tôi',
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: 'Đăng Xuất',
            key: '3',
            onClick: () => {
                dispatch(clearCartAction());
                dispatch(logOutAction());
                openNotificationWithIcon('info', 'Thông Báo', 'Đăng xuất thành công.');
                navigate("/adm-login");
            }
        },
    ];

    const onOpenNoti = (e) => {
        if (e) {
            orderAPI.seenNotiByAdm().then((res) => {
                if (!res.status) {
                    console.log(res)
                    setNotiList({
                        ...notiList,
                        count: 0
                    })

                } else {
                    console.log(res)
                }
            })
                .catch(err => console.log(err))
        }
    }

    const getNotiItems = (list) => {
        if (list.length > 0) {
            return list.sort((a, b) => a.createdat > b.createdat ? -1 : 1).map((item, index) => ({
                label: (
                    <div
                        style={{ padding: 10, display: 'flex', flexDirection: 'column' }}
                    >
                        <div
                            style={{ width: '100%' }}
                        >
                            {item?.message}
                        </div>
                        <div>
                            {moment(item.createdat).format('DD/MM/YYYY, H:mm:ss')}
                        </div>
                    </div>
                ),
                icon: (
                    <div
                        style={{ padding: 10 }}
                    >
                        <FileAddOutlined style={{ fontSize: 24, color: 'blue' }} />
                    </div>
                ),
                onClick: () => {
                    navigate(item?.navigateLink)
                },
                key: index
            }))
        } else {
            return [
                {
                    label: <Empty description="Không có thông báo" />,
                    key: '0'
                }
            ]
        }

    }

    useEffect(() => {
        console.log(notiList)
    }, [notiList])

    useEffect(() => {
        connectListOrderNoti();
        orderAPI.getOrderNotiList()
            .then(res => {
                if (!res.status) {
                    setNotiList(res)
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="adm--topbar">
            <div className="adm--topbar__logo">
                <img src={logoImg} alt="logo" onClick={() => { navigate("/admin") }} />
            </div>
            <div className="adm--topbar__actions">

                <div className="adm--topbar__actions--item" style={{ marginRight: 30 }}>
                    <Dropdown
                        menu={{
                            items: notiList ? getNotiItems(notiList.list) : []
                        }}
                        trigger={['click']}
                        onOpenChange={onOpenNoti}
                    >
                        <Badge count={notiList ? notiList.count : 0}>
                            <BellOutlined style={{ fontSize: 24 }} />
                        </Badge>
                    </Dropdown>
                </div>
                <div className="adm--topbar__actions--item">
                    <Dropdown
                        menu={{
                            items: accountItems,
                        }}
                        trigger={['click']}
                    >
                        <Avatar src={`http://localhost:8080/api/file/images/${auth?.info?.photo}`} size={40} />
                    </Dropdown>
                </div>
            </div>
        </div>
    )
}

export default AdmTopbar