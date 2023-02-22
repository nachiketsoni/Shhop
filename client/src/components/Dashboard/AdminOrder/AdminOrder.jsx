import {useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {AsyncClearUpdateErrors, getAdminOrdersAsync} from '../../../asyncActions/admin/adminOrderAction';


import CircularProgress from '@mui/material/CircularProgress';

import './AdminOrder.scss';
import AdminOrderTable from './AdminOrderTable';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/material';
import { useAlert } from 'react-alert';

function createData(
  id,
  createdAt,
  Qty,
  orderStatus,
  totalPrice,
  shippingInfo

) {
  return { id,
      createdAt,
      Qty,
      orderStatus,
      totalPrice,
      shippingInfo };
}
const AdminOrder = () => {
  // const alert=useAlert();

  const {orders,loading,success,updateLoading,updateSuccess,updateError,updateSuccessNote}=useSelector((s)=>s.adminOrders);
  const oData=useSelector((s)=>s.adminOrders)
  const dispatch=useDispatch();
  const [row,setRow]=useState(null);


  useEffect((e)=>{
      if(!loading && success){
        let rows=orders.map((elm)=>createData(
          elm._id,
          elm.createdAt,
          elm.orderItems.length,
          elm.orderStatus,
          elm.paymentInfo.totalPrice,
          {
            state:elm.shippingInfo.state,
            mob:elm.shippingInfo.phoneNo,
            address:elm.shippingInfo.address,
            pinCode:elm.shippingInfo.pinCode,
            city:elm.shippingInfo.city
          }
          ))
          rows.sort((a,b)=>{
            if(a.orderStatus!=="Delivered" && b.orderStatus==="Delivered"){
              return -1;
           }else if(a.orderStatus==="Delivered" && b.orderStatus!=="Delivered"){
              return 1;
           }else{
              return new Date(b.createdAt.slice(0,10))-new Date(a.createdAt.slice(0,10))
           }
          })
          
          setRow(rows);
      }
      // console.log(oData);
  },[success,updateSuccess])
  useEffect((e)=>{
    if(updateSuccess){
      alert(updateSuccessNote);
      dispatch(getAdminOrdersAsync());
      dispatch(AsyncClearUpdateErrors());

    }
    if(updateError){
      alert(updateError)
      dispatch(AsyncClearUpdateErrors());
    }
  },[updateSuccess,updateError])


  return (
    <>
    <div id="aOrderHeader">
      <h1>All Orders</h1>
    </div>
    {
      (updateLoading)
      ?<Box sx={{ width: '100%',marginBottom:'.5em'}}>
      <LinearProgress />
    </Box>
      :""
    }
    

    {
      (!loading && success && row)
    ?<AdminOrderTable rows={row}></AdminOrderTable>
    :<CircularProgress />

    }
    </>
  )
}

export default AdminOrder