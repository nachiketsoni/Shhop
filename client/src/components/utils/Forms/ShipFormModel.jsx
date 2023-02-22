import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
// import ShippingForm from '../../Elements/OrderInfo/ShippingForm';
import ShipForm from './ShipForm';

import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { getUserDataAsync } from '../../../asyncActions/userAction';
import { CircularProgress } from '@mui/material';
import { clearErrorAsync } from '../../../features/detailsUpdate/userShipInfoUpdate';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const ShipFormModel = ({open,setOpen}) => {
  const {loading,success,error,successNote}=useSelector((s)=>s.userShipInfoUpdate);
  const {user,isShipInfo}=useSelector((s)=>s.user);
  const dispatch=useDispatch();
  const [shipData,setShipData]=useState({
    address:'',
    city:'',
    state:"",
    phoneNo:+91,
    pinCode:0
  })
  useEffect(()=>{
    if(user.shippingInfo.writtenBy){
        setShipData(user.shippingInfo);
    }
},[])

  useEffect((e)=>{
    if(success){
      dispatch(getUserDataAsync());
      alert(successNote);
      setOpen(false);
   }
   if(error){
     dispatch(clearErrorAsync());
     alert(error);
   }

  },[success,error,successNote])
  return (
    <Modal
    open={open}
    onClose={()=>setOpen(!open)}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
     <Box sx={style}>
        <ShipForm shipData={shipData} setShipData={setShipData}></ShipForm>
        {(loading)
        ?<CircularProgress />
      :""}
        </Box>

  </Modal>
  )
}

export default ShipFormModel