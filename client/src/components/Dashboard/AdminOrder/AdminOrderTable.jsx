import {useState,useEffect} from 'react';
import {NumericFormat} from "react-number-format";
import {useDispatch} from 'react-redux';
import { updateOrderStatusAsync } from '../../../asyncActions/admin/adminOrderAction';
import {useAlert} from 'react-alert';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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


const AdminOrderTable = ({rows}) => {
  const dispatch=useDispatch();
  const [status,setStatus]=useState(null);
  const [anchorEl, setAnchorEl]=useState(null);
  const [selectedId,setId]=useState(null);

  const open=Boolean(anchorEl);
  const handleSelection=(e,id)=>{
    setAnchorEl(e.currentTarget);
    setId(id);
  }
  const handleClose=(e,rndm)=>{
    if(selectedId && !rndm){
      dispatch(updateOrderStatusAsync(selectedId,e.target.innerText))
    }
    setAnchorEl(null)
    setId(null);
    
  }



  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 500 }} aria-label="customized table">
      <TableHead>
        <TableRow>
        <StyledTableCell>#</StyledTableCell>
          <StyledTableCell align="right">Order Id</StyledTableCell>
          <StyledTableCell align="right">Order Recieving Date</StyledTableCell>
          <StyledTableCell align="right">Quantity</StyledTableCell>
          <StyledTableCell align="right">Order Status</StyledTableCell>
          <StyledTableCell align="right">Total Amount (Inr)</StyledTableCell>
          <StyledTableCell align="right">Shipping Info</StyledTableCell>

        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row,i) => (
          <StyledTableRow key={row.id}>
             <StyledTableCell component="th" scope="row">{i+1}</StyledTableCell>
            <StyledTableCell align="right" >
              {row.id}
            </StyledTableCell>
            <StyledTableCell align="right">{row.createdAt}</StyledTableCell>
            <StyledTableCell align="right">{row.Qty}</StyledTableCell>
            <StyledTableCell align="right">
            <Button
        id="change-status"
        aria-controls={open ? 'change-status' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={(e)=>handleSelection(e,row.id)}
      >
        {row.orderStatus}
            </Button>
             <Menu
      // sx={{boxShadow:'0 0 10px red'}}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={(e)=>{handleClose(e,'surface')}}
        MenuListProps={{
          'aria-labelledby': 'change-status',
        }}
      >
        <MenuItem onClick={(e)=>{handleClose(e)}}>Confirmed</MenuItem>
        <MenuItem onClick={(e)=>{handleClose(e)}}>Shipped</MenuItem>
        <MenuItem onClick={(e)=>{handleClose(e)}}>Delivered</MenuItem>
             </Menu>
            </StyledTableCell>  
            <StyledTableCell align="right"> <NumericFormat
    value={row.totalPrice}
    displayType={"text"}
    thousandSeparator={true}
    className="numFormat"/></StyledTableCell>
            <StyledTableCell align="right">{row.shippingInfo.address} {row.shippingInfo.city},{row.shippingInfo.state},{row.shippingInfo.pinCode}</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default AdminOrderTable