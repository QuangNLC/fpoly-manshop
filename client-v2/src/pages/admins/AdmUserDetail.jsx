import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Helmet from '../../components/Helmet'
import { userAPI } from '../../apis/userAPI';
import { Button, Modal, Tag, Typography, Upload } from 'antd';
import moment from 'moment';
import { DeleteOutlined } from '@ant-design/icons';

const AdmUserDetail = () => {

    const { username } = useParams();
    const [info, setInfo] = useState(undefined);
    const navigate = useNavigate();




    useEffect(() => {
        userAPI.getUser(username)
            .then(res => {
                if (!res.status) {
                    console.log(res)
                    setInfo({ ...res });
                } else {
                    console.log(res);
                }
            })
            .catch(err => console.log(err))
    }, [username])

    return (
        <Helmet
            title={"Quản Lý Tài Khoản"}
        >
            <div className="adm--userdetail">
                <div className="adm--userdetail__title">
                    <Typography.Title level={4}>Thông Tin Tài Khoản</Typography.Title>
                    <Button type='primary' onClick={() => {navigate("/admin/user-list")}}>Danh Sách</Button>
                </div>
                <div className="adm--userdetail__body">
                    <div className="adm--userdetail__body--avt">
                        <div className="adm--userdetail__body--avt__preview">
                            {
                                info &&
                                <img src={`http://localhost:8080/api/file/images/${info?.photo}`} />
                            }
                        </div>
                    </div>
                    <div className="adm--userdetail__body--info">
                        <div className="adm--userdetail__body--info__item">
                            <div className="adm--userdetail__body--info__item--label">Tên Tài Khoản</div>
                            <div className="adm--userdetail__body--info__item--content">{info?.username}</div>
                        </div>
                        <div className="adm--userdetail__body--info__item">
                            <div className="adm--userdetail__body--info__item--label">Họ Và Tên</div>
                            <div className="adm--userdetail__body--info__item--content">{info?.fullname}</div>
                        </div>
                        <div className="adm--userdetail__body--info__item">
                            <div className="adm--userdetail__body--info__item--label">Số Điện Thoại</div>
                            <div className="adm--userdetail__body--info__item--content">{info?.phone}</div>
                        </div>
                        <div className="adm--userdetail__body--info__item">
                            <div className="adm--userdetail__body--info__item--label">Ngày Tạo</div>
                            <div className="adm--userdetail__body--info__item--content">{moment(info?.createdAt).format('DD/MM/YYYY, H:mm:ss')}</div>
                        </div>
                        <div className="adm--userdetail__body--info__item">
                            <div className="adm--userdetail__body--info__item--label">Trạng Thái</div>
                            <div className="adm--userdetail__body--info__item--content"><Tag color={info?.activated ? 'blue' : 'red'}>{info?.activated ? 'Kích Hoạt' : 'Hủy Kích Hoạt'}</Tag></div>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default AdmUserDetail