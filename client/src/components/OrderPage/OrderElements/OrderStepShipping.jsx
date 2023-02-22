import { CircularProgress, LinearProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { clearErrorAsync } from '../../../asyncActions/detailsUpdateStatusAction';
import { getUserDataAsync } from '../../../asyncActions/userAction';
// import { updateStatusReset } from '../../../features/DetailsUpdate';
import ShipForm from '../../utils/Forms/ShipForm';
import {useAlert} from 'react-alert'
import { OrderClearErrorAsync } from '../../../asyncActions/paymentAction';
import { useNavigate } from 'react-router-dom';
import { clearErrorAsync } from '../../../features/detailsUpdate/userShipInfoUpdate';
const ShippingForm = ({activeStep,setActiveStep}) => {
  const Navigate=useNavigate();
  const alert=useAlert();
  const {loading,success,error,successNote}=useSelector((s)=>s.userShipInfoUpdate);
  const orderProcess=useSelector((s)=>s.orderData)
  const {user}=useSelector((s)=>s.user);
  const dispatch=useDispatch();
  const [shipData,setShipData]=useState(null)
  useEffect((e)=>{
    if(user.shippingInfo.writtenBy){
      setShipData(user.shippingInfo);
  }else{
    setShipData({
      address:'',
      city:'',
      state:"",
      phoneNo:+91,
      pinCode:0
    })
  }

  },[])
  useEffect((e)=>{
    if(success){
      dispatch(getUserDataAsync());
      setActiveStep(activeStep+1);
   }
   if(error){
     dispatch(clearErrorAsync());
     alert.error(error);
   }

  },[success,error])


  //Razorpay error ko yhan handle karenge
  useEffect((e)=>{
    if(orderProcess.error){
       alert(orderProcess(orderProcess.error));
       dispatch(OrderClearErrorAsync())
       Navigate('/cart')
    }

  },[orderProcess.error])
  if(orderProcess.loading){
    return (<CircularProgress color="secondary"/>)
  }
  return (
    <>
    <div>{
      (shipData)?
      <ShipForm shipData={shipData} setShipData={setShipData}/>
      :''}</div>
      {(loading)
      ?<LinearProgress />:" "}
    </>
    
  )
}

export default ShippingForm