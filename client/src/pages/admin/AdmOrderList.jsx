import ordersAPI from '../../api/ordersAPI';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Helmet from '../../components/Helmet'
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {useSelector} from 'react-redux'
import {formatter} from '../../utils/index'

const Container = styled.div`
    width: 100%;
`
const Wrapper = styled.div`
    width: 100%;
    padding: 50px;
`
const Title = styled.h2`
    width: 100%;
    text-align: center;
    text-transform: capitalize;
    font-size: 40px;
    font-weight: 300;
    margin-bottom: 50px;
`
const ListContainer = styled.div`
    width: 100%;
    padding: 50px;
    margin-top: 50px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`
const ProductImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;

`

function createData(name, calories, fat, carbs, protein, price) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        price,
        history: [
            {
                date: '2020-01-05',
                customerId: '11091700',
                amount: 3,
            },
            {
                date: '2020-01-02',
                customerId: 'Anonymous',
                amount: 1,
            },
        ],
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell align="right">{row.createdDate}</TableCell>
                <TableCell align="right">{row.total_price}</TableCell>
                <TableCell align="right">{row.statusOrders ? row.statusOrders.title : ''}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Chi Tiết Đơn Hàng
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Sản Phẩm</TableCell>
                                        <TableCell align="right">Size</TableCell>
                                        <TableCell align="right">Giá Bán</TableCell>
                                        <TableCell align="right">Số Lượng</TableCell>
                                        <TableCell align="right">Thành Tiền</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.orderDetail.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <ProductImg src={item.product.images[0].photo} />
                                            </TableCell>
                                            <TableCell align="right">{item.size}</TableCell>
                                            <TableCell align="right">{item.product.export_price}</TableCell>
                                            <TableCell align="right">{item.quantity}</TableCell>
                                            <TableCell align="right">
                                                {formatter.format(item.quantity * item.product.export_price)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const AdmOrderList = () => {
    const [data, setData] = useState([]);


    useEffect(() => {
        ordersAPI.getAll()
        .then(res => {
            if(!res.status){
                setData(res);
            }else{
                console.log(res)
            }
        })
        .catch(err => console.log(err));
    }, [])
    return (
        <Helmet
            title="Danh Sách Đơn Hàng"
        >
            <Container>
                <Wrapper>
                    <ListContainer>
                    <Title>danh sách đơn hàng</Title>
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell>Id</TableCell>
                                        <TableCell align="right">Ngày Tạo</TableCell>
                                        <TableCell align="right">Thanh Toán</TableCell>
                                        <TableCell align="right">Trạng Thái</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.length > 0 && data.map((item, index) => (
                                        <Row key={item.id} row={item} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </ListContainer>
                </Wrapper>
            </Container>
        </Helmet>
    )
}

export default AdmOrderList