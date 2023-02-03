import { Button, Select, Spin, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import Helmet from '../../components/Helmet'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { userStatsData } from '../../assets/data/data';
import { productAPI } from '../../apis/productAPI';
import { userAPI } from '../../apis/userAPI';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import reportAPI from '../../apis/reportAPI';

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


const getPieColor = (name) => {
    let color = '#FFBB28'

    switch (name) {
        case ('Chờ Xác Nhận'): {
            color = '#FFBB28';
            break;
        }
        case ('Đã Xác Nhận'): {
            color = '#00C49F';
            break;
        }
        case ('Đang Giao'): {
            color = '#FF8042';
            break;
        }
        case ('Hoàn Tất'): {
            color = '#0088FE';
            break;
        }
        case ('Đang Chờ'): {
            color = '#fa0505';
            break;
        }
    }
    return color;
}


const AdmDashboard = () => {

    const [prData, setPrData] = useState([]);
    const [userData, setUserData] = useState([]);

    const [barchartYear, setBarchartYear] = useState(2022);
    const [barchartLoading, setBarchartLoading] = useState(true);
    const [barchartData, setBarchartData] = useState([]);

    const [orderToday, set0rderToday] = useState(0);
    const [orderTodayLoading, set0rderTodayLoading] = useState(true);

    const [totalSellThisMonth, setTotalSellThisMonth] = useState(0);
    const [totalSellThisMonthLoading, setTotalSellThisMonthLoading] = useState(true);

    const [totalSellThisDay, setTotalSellThisDay] = useState(0);
    const [totalSellThisDayLoading, setTotalSellThisDayLoading] = useState(true);

    const [pieChartData, setPieChartData] = useState([]);
    const [pieChartLoading, setPieChartLoading] = useState(true);

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

    const onChangeBarchartYear = (value) => {
        setBarchartYear(value);
    };

    useEffect(() => {
        setBarchartLoading(true);
        reportAPI.getBarChartData(barchartYear)
            .then((res) => {
                if (!res.status) {
                    setBarchartData(res.map((item, index) => {
                        return ({
                            month: `Tháng ${item.month}`,
                            turnover: item.turnover
                        })
                    }))
                    setBarchartLoading(false);
                    console.log(res)
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }, [barchartYear])

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
        setBarchartLoading(true);
        reportAPI.getBarChartData(2022)
            .then((res) => {
                if (!res.status) {
                    setBarchartData(res.map((item, index) => {
                        return ({
                            month: `Tháng ${item.month}`,
                            turnover: item.turnover
                        })
                    }))
                    setBarchartLoading(false);
                    console.log(res)
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
        reportAPI.getTodayOrderCount()
            .then(res => {
                if (!res.status) {
                    console.log(res)
                    set0rderToday(res);
                    set0rderTodayLoading(false);
                } else {
                    if (res.status === 200) {
                        set0rderToday(res.data);
                        set0rderTodayLoading(false);
                    }
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
        reportAPI.getProductSellThisMonth()
            .then(res => {
                if (!res.status) {
                    setTotalSellThisMonth(res)
                    setTotalSellThisMonthLoading(false)
                } else {
                    if (res.status === 200) {
                        console.log(res)
                        setTotalSellThisMonth(0)
                        setTotalSellThisMonthLoading(false)
                    }
                    console.log(res)
                }
            }
            )
            .catch(err => console.log(err))
        setTotalSellThisDayLoading(true);
        reportAPI.getTodaySell()
            .then(res => {
                if (!res.status) {
                    setTotalSellThisDay(res)
                    setTotalSellThisDayLoading(false)
                } else {
                    if (res.status === 200) {
                        console.log(res)
                        setTotalSellThisDay(0)
                        setTotalSellThisDayLoading(false)
                    }
                    console.log(res)
                }
            }
            )
            .catch(err => console.log(err))

        reportAPI.getOrderStat()
            .then(res => {
                if (!res.status) {
                    console.log(res)
                    setPieChartData(res.map((item, index) => ({
                        ...item,
                        color: getPieColor(item.name)
                    })))
                    setPieChartLoading(false)
                } else {
                    console.log(res)
                }
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
                        {
                            !orderTodayLoading ?
                                (
                                    <div className="adm--dashboard__widgets--item__content">{orderToday}</div>
                                )
                                :
                                (
                                    <Spin />
                                )
                        }

                    </div>
                    <div className="adm--dashboard__widgets--item">
                        <div className="adm--dashboard__widgets--item__label">Sản Phẩm Bán Tháng Này</div>
                        {
                            !totalSellThisMonthLoading ?
                                (
                                    <div className="adm--dashboard__widgets--item__content">{totalSellThisMonth}</div>
                                )
                                :
                                (
                                    <Spin />
                                )
                        }
                    </div>
                    <div className="adm--dashboard__widgets--item">
                        <div className="adm--dashboard__widgets--item__label">Doanh Thu Hôm Nay</div>
                        <div className="adm--dashboard__widgets--item__content">
                            {
                                !totalSellThisDayLoading ?
                                    (
                                        <div className="adm--dashboard__widgets--item__content">{totalSellThisDay}</div>
                                    )
                                    :
                                    (
                                        <Spin />
                                    )
                            }
                        </div>
                    </div>
                </div>
                <div className="adm--dashboard__barchart">
                    <div className="adm--dashboard__barchart--title">
                        <Typography.Title level={5}>Biểu đồ thống kê doanh thu</Typography.Title>
                        <div className="adm--dashboard__barchart--title__actions">
                            <Typography.Title level={5}>Năm</Typography.Title>
                            <Select
                                style={{ width: '120px' }}
                                value={barchartYear}
                                onChange={onChangeBarchartYear}
                            >
                                <Select.Option value={2020}>2020</Select.Option>
                                <Select.Option value={2021}>2021</Select.Option>
                                <Select.Option value={2022}>2022</Select.Option>
                                <Select.Option value={2023}>2023</Select.Option>
                            </Select>
                        </div>
                    </div>
                    <div className="adm--dashboard__barchart--chart">
                        {
                            !barchartLoading ?
                                (
                                    <ResponsiveContainer width="100%" height="100%" aspect={4 / 1}>
                                        <BarChart
                                            data={barchartData}
                                            margin={{
                                                top: 5,
                                                right: 30,
                                                left: 20,
                                                bottom: 5,
                                            }}
                                        >
                                            <XAxis dataKey="month" stroke='#5550bd' />
                                            <YAxis dataKey="turnover" />
                                            <Bar dataKey="turnover" fill="#8884d8" />
                                            <Tooltip />
                                        </BarChart>
                                    </ResponsiveContainer>
                                )
                                :
                                (
                                    <Spin />

                                )
                        }

                    </div>
                </div>
                {/* <div className="adm--dashboard__tables">
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
                </div> */}
                <div className="adm--dashboard__piechart">
                    <div className="adm--dashboard__piechart--title">
                        <Typography.Title level={5}>Trạng Thái Đơn Hàng</Typography.Title>
                        <div className="adm--dashboard__piechart--title__actions">

                        </div>
                    </div>
                    <div className="adm--dashboard__piechart--chart">
                        {
                            pieChartLoading ?
                                (
                                    <Spin />
                                )
                                :
                                (
                                    <div className="adm--dashboard__piechart--chart__content">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart width={400} height={400}>
                                                <Pie
                                                    data={pieChartData}
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

                                )
                        }
                        {
                            !pieChartLoading &&
                            (

                                <div className="adm--dashboard__piechart--chart__note">
                                    {
                                        pieChartData.map((item, index) => (
                                            <div className="adm--dashboard__piechart--chart__note--item" key={index}>
                                                <div style={{width: 20, height: 20, borderRadius:'50%', backgroundColor: `${item.color}`, marginRight: 10}}></div>
                                                <div>{item.name}</div>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default AdmDashboard