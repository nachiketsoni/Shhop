import {useState,useEffect} from 'react';
import './adminProduct.scss';
import {NumericFormat} from "react-number-format";

import {useSelector, useDispatch} from 'react-redux';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Box, CircularProgress, LinearProgress } from '@mui/material';
import { AsyncClearStatus, deleteProductCardAsync, getAdminProductAsync } from '../../../asyncActions/admin/adminProductAction';

// import AdminProductModel from './AdminProductModel';


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
  id,
  name,
  ctg,
  price,
  oldPrice,
  discount,
  stock,
  createdAt

) {
  return {id,
    name,
    ctg,
    price,
    oldPrice,
    discount,
    stock,
    createdAt };
}
const linkStyle={
  textDecoration:'none'
}

const AdminProducts = () => {
  const dispatch=useDispatch();
  const {products,
    loading,
   productsCount,
   updateLoading,updateSuccess,updateError,updateSuccessNote}=useSelector((store)=>store.adminProducts);


  let rows=[]
  if(!loading){
    rows=products.map((elm)=>createData(
      elm._id,
      elm.name,
      elm.category,
      elm.price,
      elm.oldPrice,
      elm.discount,
      elm.Stock,
      elm.createdAt
      ))
    // console.log(rows)
  }
  useEffect((e)=>{
    if(updateSuccess){
      alert(updateSuccessNote);
      dispatch(getAdminProductAsync());
        dispatch(AsyncClearStatus())

    }
    if(updateError){
      alert(updateError)
      dispatch(AsyncClearStatus())
    }
  },[updateSuccess,updateError])

  const deleteProductHandler=(id)=>{
    dispatch(deleteProductCardAsync(id));
  }

  return (
    <>
    <Outlet></Outlet>
       <div id="aProduct">
      <h1>Product Lists</h1>
      <Link to="new"  style={linkStyle}><button>Create</button></Link>
    </div>
    <Box sx={{ width: '100%',marginBottom:'.5em'}}>{updateLoading?<LinearProgress />:" "}</Box>
    {
      (loading
        ? <CircularProgress />
        :    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 500 }} aria-label="customized table">
      <TableHead>
        <TableRow>
        <StyledTableCell>#</StyledTableCell>
          <StyledTableCell align="right">Product Id</StyledTableCell>
          <StyledTableCell align="right">Product Name</StyledTableCell>
          <StyledTableCell align="right">Price (inr)</StyledTableCell>
          <StyledTableCell align="right">Old Price (inr)</StyledTableCell>
          <StyledTableCell align="right">Discount(%)</StyledTableCell>
          <StyledTableCell align="right">Stock</StyledTableCell>
          <StyledTableCell align="right">Created At</StyledTableCell>
          <StyledTableCell align="right">Edit product</StyledTableCell>
          <StyledTableCell align="right">Remove the Product</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row,i) => (
          <StyledTableRow key={row.id}>
             <StyledTableCell component="th" scope="row">{i+1}</StyledTableCell>
            <StyledTableCell align="right" >
              {row.id}
            </StyledTableCell>
            <StyledTableCell align="right">{row.name}</StyledTableCell>
            <StyledTableCell align="right"><NumericFormat
    value={row.price}
    displayType={"text"}
    thousandSeparator={true}
    className="numFormat"/></StyledTableCell>
            <StyledTableCell align="right"><NumericFormat
    value={row.oldPrice}
    displayType={"text"}
    thousandSeparator={true}
    className="numFormat"/></StyledTableCell>  
            <StyledTableCell align="right">{row.discount}</StyledTableCell>
            <StyledTableCell align="right">{row.stock}</StyledTableCell>
            <StyledTableCell align="right">{row.createdAt}</StyledTableCell>
            <StyledTableCell align="right"><Link to={`${row.id}`} style={linkStyle}><i className="ri-edit-box-line adminPrductUpdate"></i></Link> </StyledTableCell>
            <StyledTableCell align="right"><i className="ri-delete-bin-line adminProductDelete" onClick={()=>deleteProductHandler(row.id)}></i></StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>)
    }

   
    
    </>
    
  )
}

export default AdminProducts