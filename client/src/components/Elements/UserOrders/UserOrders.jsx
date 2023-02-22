import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { fetchUserOrders } from '../../../asyncActions/myOrders';
import Skeleton from '@mui/material/Skeleton';
import makeOrder from '../../../asset/makeOrder.png'

import './uOrders.scss';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { LinearProgress } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#669C96',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  OrderId,
  Status,
  Qty,
  Amount,

) {
  return { OrderId,
    Status,
    Qty,
    Amount, };
}



const UserOrders = () => {

  const {loading,success,myOrders,error}=useSelector((s)=>s.myOrders);
  const dispatch=useDispatch();
  useEffect(()=>{
dispatch(fetchUserOrders());
// console.log(success)
  },[])
  let rows=[]
  if(success){
    rows=myOrders.map((elm)=>createData(elm._id,elm.orderStatus,elm.orderItems.length,elm.paymentInfo.totalPrice))
    // console.log(rows)
  }
  if(myOrders.length===0){
    return <div className="uOrder">
      <div id="noOrder">
      <h1>No orders!</h1>
      <img src={makeOrder} alt="" />
      <p>add items to the cart and create your order!😀</p>
      </div>
    </div>
  }
  return (
    <div className="uOrder">
      <h1>Your Orders</h1>
      
      {
        (loading
          ? <LinearProgress />
          :    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Order Id</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Item Qty</StyledTableCell>
            <StyledTableCell align="right">Amount (inr)</StyledTableCell>
            {/* <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.OrderId}>
              <StyledTableCell component="th" scope="row">
                {row.OrderId}
              </StyledTableCell>
              <StyledTableCell align="right">{row.Status}</StyledTableCell>
              <StyledTableCell align="right">{row.Qty}</StyledTableCell>
              <StyledTableCell align="right">{row. Amount}</StyledTableCell>
              {/* <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>)
      }
  
    </div>
  )
}

export default UserOrders