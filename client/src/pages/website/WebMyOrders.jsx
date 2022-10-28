// import React, { useEffect, useState } from 'react'
// import styled from 'styled-components'
// import Helmet from '../../components/Helmet'
// import Box from '@mui/material/Box';
// import Collapse from '@mui/material/Collapse';
// import IconButton from '@mui/material/IconButton';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import { useSelector } from 'react-redux'
// import { formatter } from '../../utils/index'
// import { Navigate, useNavigate } from 'react-router-dom';

// const Container = styled.div`
//     width: 100%;
// `
// const Wrapper = styled.div`
//     width: 100%;
//     padding: 50px;
// `
// const Title = styled.h2`
//     width: 100%;
//     text-align: center;
//     text-transform: capitalize;
//     font-size: 40px;
//     font-weight: 300;
//     margin-bottom: 50px;
// `
// const ListContainer = styled.div`
//     width: 100%;
//     padding: 50px;
//     margin-top: 50px;
//     -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
//     box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
// `
// const ProductImg = styled.img`
//     width: 50px;
//     height: 50px;
//     border-radius: 50%;
//     margin-right: 20px;
// `

// function createData(name, calories, fat, carbs, protein, price) {
//     return {
//         name,
//         calories,
//         fat,
//         carbs,
//         protein,
//         price,
//         history: [
//             {
//                 date: '2020-01-05',
//                 customerId: '11091700',
//                 amount: 3,
//             },
//             {
//                 date: '2020-01-02',
//                 customerId: 'Anonymous',
//                 amount: 1,
//             },
//         ],
//     };
// }

// function Row(props) {
//     const { row } = props;
//     const [open, setOpen] = React.useState(false);
//     return (
//         <React.Fragment>
//             <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
//                 <TableCell>
//                     <IconButton
//                         aria-label="expand row"
//                         size="small"
//                         onClick={() => setOpen(!open)}
//                     >
//                         {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//                     </IconButton>
//                 </TableCell>
//                 <TableCell component="th" scope="row">
//                     {row.id}
//                 </TableCell>
//                 <TableCell align="right">{row.createdDate}</TableCell>
//                 <TableCell align="right">{row.total_price}</TableCell>
//                 <TableCell align="right">{row.statusOrders.title}</TableCell>
//             </TableRow>
//             <TableRow>
//                 <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//                     <Collapse in={open} timeout="auto" unmountOnExit>
//                         <Box sx={{ margin: 1 }}>
//                             <Typography variant="h6" gutterBottom component="div">
//                                 Chi Tiết Đơn Hàng
//                             </Typography>
//                             <Table size="small" aria-label="purchases">
//                                 <TableHead>
//                                     <TableRow>
//                                         <TableCell>Id</TableCell>
//                                         <TableCell>Sản Phẩm</TableCell>
//                                         <TableCell align="right">Size</TableCell>
//                                         <TableCell align="right">Giá Bán</TableCell>
//                                         <TableCell align="right">Số Lượng</TableCell>
//                                         <TableCell align="right">Thành Tiền</TableCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {row.orderDetail.map((item, index) => (
//                                         <TableRow key={item.id}>
//                                             <TableCell component="th" scope="row">
//                                                 {item.id}
//                                             </TableCell>
//                                             <TableCell>
//                                                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                                                     <ProductImg src={item.product.images[0].photo} />
//                                                     {item.product.name}
//                                                 </div>
//                                             </TableCell>
//                                             <TableCell align="right">{item.size}</TableCell>
//                                             <TableCell align="right">{item.product.export_price}</TableCell>
//                                             <TableCell align="right">{item.quantity}</TableCell>
//                                             <TableCell align="right">
//                                                 {formatter.format(item.quantity * item.product.export_price)}
//                                             </TableCell>
//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         </Box>
//                     </Collapse>
//                 </TableCell>
//             </TableRow>
//         </React.Fragment>
//     );
// }

// const WebMyOrders = () => {
//     const auth = useSelector(state => state.auth.auth);
//     const isAuth = useSelector(state => state.auth.isAuth);
//     const { username } = auth ? auth.info : "";
//     const [data, setData] = useState([]);
//     const navigate = useNavigate();


//     useEffect(() => {
//         if (auth) {
//             ordersAPI.getMyOrders(username)
//                 .then(res => {
//                     if (!res.status) {
//                         setData(res);
//                     } else {
//                         console.log(res)
//                     }
//                 })
//                 .catch(err => console.log(err));
//         }else{
//             navigate("/login")
//         }

//     }, [auth])
//     return (
//         <Helmet
//             title="Đơn Hàng Của Tôi"
//         >
//             <Container>
//                 <Wrapper>
//                     {
//                         isAuth ?
//                             (
//                                 <ListContainer>
//                                     <Title>danh sách đơn hàng của tôi</Title>
//                                     <TableContainer component={Paper}>
//                                         <Table aria-label="collapsible table">
//                                             <TableHead>
//                                                 <TableRow>
//                                                     <TableCell />
//                                                     <TableCell>Id</TableCell>
//                                                     <TableCell align="right">Ngày Tạo</TableCell>
//                                                     <TableCell align="right">Thanh Toán</TableCell>
//                                                     <TableCell align="right">Trạng Thái</TableCell>
//                                                 </TableRow>
//                                             </TableHead>
//                                             <TableBody>
//                                                 {data.length > 0 && data.map((item, index) => (
//                                                     <Row key={item.id} row={item} />
//                                                 ))}
//                                             </TableBody>
//                                         </Table>
//                                     </TableContainer>
//                                 </ListContainer>
//                             )
//                             :
//                             (
//                                 <>
//                                     Loading...
//                                 </>
//                         )
//                     }

//                 </Wrapper>
//             </Container>
//         </Helmet>
//     )
// }


import { Button, Form, Input, Spin, Typography, Upload, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import Helmet from '../../components/Helmet'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ordersAPI from '../../api/ordersAPI';

const Container = styled.div`
    width: 100%;
    background-color: rgba(0,0,0 ,0.15);
    min-height: 100vh;
`
const Wrapper = styled.div`
    width: 100%;
    padding: 50px;
    display: flex;
    align-items: top;
    justify-content: space-between;
`
const NavContainer = styled.div`
    flex: 1;
    padding: 20px;
`
const Nav = styled.ul`
`
const NavItem = styled.li`
    color:  black;
    font-size:  18px;
    margin-bottom: 10px;
    text-transform: capitalize;
    cursor:  pointer;
    transition:  all  0.25s  ease-in;
    font-weight: 500;

    ${props => props.actived ? "color:  red;" : ''}

    &:hover{
        color: red;
    }
`
const ContentContainer = styled.div`
    flex: 4;
    padding: 20px;
    background-color: white;
    border-radius:  20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`
const Top = styled.div`
    border-bottom:  0.5px solid lightgray;
    padding-bottom: 5px;
    margin-top: 10px;
`
const Bottom = styled.div`
    display: flex;
    align-items: top;
    justify-content: space-betwwen;
`
const FormContainer = styled.div`
    flex: 3;
    padding: 20px;
    border-right: 1px  solid lightgray;
`
const AvatarContainer = styled.div`
    flex: 1;
    padding: 20px;
`
const PreviewImg = styled.div`
    width: 100%;
    display:  flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`
const Avt = styled.img`
    width:  130px;
    height: 130px;
    border-radius:  50%;
    object-fit: cover;
    object-position: center;
`
const UploadButton = styled.div`
    width: 100%;
    display: flex;
    flex-direction:  column;
    justify-content: center;
    align-items:  center;
`

const WebMyOrders = () => {

    const auth = useSelector(state => state.auth.auth);
    const isAuth = useSelector(state => state.auth.isAuth);
    const [data, setData] = useState([]);
    const { username } = auth ? auth.info : "";
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (auth) {
            ordersAPI.getMyOrders(username)
                .then(res => {
                    if (!res.status) {
                        console.log(res)
                        setData(res);
                    } else {
                        console.log(res)
                    }
                })
                .catch(err => console.log(err));
        } else {
            navigate("/login")
        }

    }, [auth])


    return (
        <Helmet
            title="Danh sách đơn hàng"
        >
            <Container>
                <Wrapper>
                    {
                        isAuth ?
                            (
                                <>
                                    <NavContainer>
                                        <Nav>
                                            <Link
                                                to="/my-account"
                                                style={{ color: 'inherit' }}
                                            >
                                                <NavItem actived={location.pathname === '/my-account'}>
                                                    tài  khoản  của tôi
                                                </NavItem>
                                            </Link>
                                            <Link
                                                to="/change-password"
                                                style={{ color: 'inherit' }}
                                            >
                                                <NavItem actived={location.pathname === '/change-password'}>
                                                    đổi mật khẩu
                                                </NavItem>
                                            </Link>
                                            <Link
                                                to="/my-orders"
                                                style={{ color: 'inherit' }}
                                            >
                                                <NavItem actived={location.pathname === '/my-orders'}>
                                                    đơn  hàng
                                                </NavItem>
                                            </Link>
                                        </Nav>
                                    </NavContainer>
                                    <ContentContainer>
                                    </ContentContainer>
                                </>
                            )
                            :
                            (
                                <>
                                    <Spin />
                                </>
                            )
                    }

                </Wrapper>
            </Container>
        </Helmet>
    )
}

export default WebMyOrders