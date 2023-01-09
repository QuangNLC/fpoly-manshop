import { Button, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import Helmet from '../../components/Helmet'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { userStatsData } from '../../assets/data/data';
import { productAPI } from '../../apis/productAPI';
import { userAPI } from '../../apis/userAPI';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const COLORS = ['#FFBB28', '#00C49F', '#FF8042', '#0088FE', '#fa0505'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};


const pieChartDataBase = [
    { name: 'Group A', value: 400, color: '#FFBB28' },
    { name: 'Group B', value: 300, color: '#00C49F' },
    { name: 'Group C', value: 300, color: '#FF8042' },
    { name: 'Group D', value: 200, color: '#fa0505' },
];



const AdmDashboard = () => {

    const [prData, setPrData] = useState([]);
    const [userData, setUserData] = useState([]);

    const [pieChartData, setPieChartData] = useState([]);

    const navigate = useNavigate();

    const prColumn = [
        {
            title: 'STT',
            render: (text, record, index) => {
                return (<>{index + 1}</>)
            }
        },
        {
            title: 'Ảnh',
            render: record => {
                return (
                    <div>
                        <img style={{ width: '40px' }} src={`http://localhost:8080/api/file/images/${record?.images[0]?.photo}`} />
                    </div>
                )
            }
        },
        {
            title: 'Tên Sản Phẩm',
            dataIndex: 'name'
        },
        {
            title: 'Giá Bán',
            render: (record) => {
                return (
                    <div>
                        {
                            new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(record?.price)
                        }
                    </div>
                )
            }
        },
        {
            title: 'Doanh số',
            render: (record) => {
                return (
                    <div>10</div>
                )
            }
        }
    ]
    const userColumn = [
        {
            title: 'STT',
            render: (text, record, index) => {
                return (<>{index + 1}</>)
            }
        },
        {
            title: 'Tên Tài Khoản',
            render: (record) => {
                return (
                    <div>{record?.username}</div>
                )
            }
        },
        {
            title: 'Họ Và Tên',
            render: (record) => {
                return (
                    <div>{record?.fullname}</div>
                )
            }
        },
        {
            title: 'Ngày Tạo',
            render: (record) => {
                return (
                    <div>
                        {moment(record.createAt).format('DD/MM/YYYY, H:mm:ss')}
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        productAPI.getAllPr()
            .then(res => {
                setPrData(res.slice(0, 5));
            })
            .catch(err => console.log(err))
        userAPI.getAllUser()
            .then(res => {
                setUserData(res.slice(0, 5))
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Helmet
            title={"Thống Kê"}
        >
            <div className="adm--dashboard">
                <div className="adm--dashboard__widgets">
                    <div className="adm--dashboard__widgets--item">
                        <div className="adm--dashboard__widgets--item__label">Đơn Hôm Nay</div>
                        <div className="adm--dashboard__widgets--item__content">3 Đơn Hàng</div>
                    </div>
                    <div className="adm--dashboard__widgets--item">
                        <div className="adm--dashboard__widgets--item__label">Sản Phẩm Bán Tháng Này</div>
                        <div className="adm--dashboard__widgets--item__content">15 Sản Phẩm</div>
                    </div>
                    <div className="adm--dashboard__widgets--item">
                        <div className="adm--dashboard__widgets--item__label">Doanh Thu Hôm Nay</div>
                        <div className="adm--dashboard__widgets--item__content">{
                            new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(123000)
                        }</div>
                    </div>
                </div>
                <div className="adm--dashboard__barchart">
                    <div className="adm--dashboard__barchart--title">
                        <Typography.Title level={5}>Biểu đồ thống kê doanh thu</Typography.Title>
                        <div className="adm--dashboard__barchart--title__actions">

                        </div>
                    </div>
                    <div className="adm--dashboard__barchart--chart">
                        <ResponsiveContainer width="100%" height="100%" aspect={4 / 1}>
                            <BarChart
                                data={userStatsData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <XAxis dataKey="name" stroke='#5550bd' />
                                <YAxis dataKey="activeUser" />
                                <Bar dataKey="activeUser" fill="#8884d8" />
                                <Tooltip />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="adm--dashboard__tables">
                    <div className="adm--dashboard__tables--item">
                        <div className="adm--dashboard__tables--item__label">
                            <Typography.Title level={5}>Sản Phẩm Bán Chạy Trong Tháng</Typography.Title>
                        </div>
                        <div className="adm--dashboard__tables--item__content">
                            <Table bordered columns={prColumn} dataSource={prData} pagination={false} />
                        </div>
                        <div className="adm--dashboard__tables--item__actions">
                            <Button type='primary' onClick={() => { navigate("/admin/product-list") }}>Xem Tất Cả</Button>
                        </div>
                    </div>
                    <div className="adm--dashboard__tables--item">
                        <div className="adm--dashboard__tables--item__label">
                            <Typography.Title level={5}>Người Dùng Mới</Typography.Title>
                        </div>
                        <div className="adm--dashboard__tables--item__content">
                            <Table bordered columns={userColumn} dataSource={userData} pagination={false} />
                        </div>
                        <div className="adm--dashboard__tables--item__actions">
                            <Button type='primary' onClick={() => { navigate("/admin/user-list") }}>Xem Tất Cả</Button>
                        </div>
                    </div>
                </div>
                <div className="adm--dashboard__piechart">
                    <div className="adm--dashboard__piechart--title">
                        <Typography.Title level={5}>Trạng Thái Đơn Hàng</Typography.Title>
                        <div className="adm--dashboard__piechart--title__actions">

                        </div>
                    </div>
                    <div className="adm--dashboard__piechart--chart">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={pieChartDataBase}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieChartDataBase.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default AdmDashboard