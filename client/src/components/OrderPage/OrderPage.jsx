import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import css from './Order.module.scss';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Link} from "react-router-dom";
import { useState,useEffect } from 'react';

import ShippingForm from './OrderElements/OrderStepShipping';
import PaymentForm from './OrderElements/PaymentForm';
import { StepButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {useSelector}from 'react-redux';
const OrderPage = () => {
  const { started}=useSelector((s)=>s.orderData);
  const matches=useMediaQuery('(max-width:800px)')
  let [activeStep,setActiveStep]=useState(1);

  const Navigate=useNavigate();
  const HandleBack=()=>{
    let tmp=activeStep-1;
    setActiveStep(tmp)

  }
  const HandleNext=()=>{
       let tmp=activeStep+1;
       setActiveStep(tmp)
  }
  useEffect((e)=>{
    if(!started){
      Navigate('/');
    }
  })


  return (
    <>
    <div className={css.OrderPage}>
    <Link to="/" style={{textDecoration: 'none'}}><h3 className={css.logo}>Shhop<span>.</span></h3></Link>
    <Box sx={{
      width:"80%",
    }}>
    <Stepper activeStep={activeStep} orientation={matches?"vertical":"horizontal"}>
    <Step>
    <StepButton onClick={()=>Navigate('/cart')}>
       <StepLabel>
        Order Requested
      </StepLabel>
    </StepButton>
     
    </Step>
    <Step>
      <StepLabel>
        Shipping Info
      </StepLabel>
    </Step>
    <Step>
      <StepLabel>
        Payment
      </StepLabel>
    </Step>
    </Stepper>

    </Box>

   
    <div className={css.stepsPage}>

      {
      (activeStep===1)?<ShippingForm activeStep={activeStep} setActiveStep={setActiveStep}/>
      :<PaymentForm/>
     } 
    ~





    </div>

    </div>
   
  

    </>
  )
}

export default OrderPage