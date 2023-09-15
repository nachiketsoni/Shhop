import { getPaymentInfo,
         getPaymentInfoRequest,
         getPaymentInfoFail,

         getOrderPlacedRequest,
         getOrderPlaced,
         getOrderPlacedFail,

         clearStatus,
         clearError
         } from '../features/OrderSLice';
import * as api from '../api/index'

export const getRazoOrderIdAsync=(price)=>async (dispatch)=>{
    try{
        dispatch(getPaymentInfoRequest());
        let fetch=await api.createRazorpayOrderId(price);
        // console.log(fetch.data);
        dispatch(getPaymentInfo({id:fetch.data.orderId,price}));

    }catch(err){
        dispatch(getPaymentInfoFail(err.message));
    }
}

export const getOrderPlaceAsync=(data)=>async (dispatch)=>{
    try{
        dispatch(getOrderPlacedRequest());
        let fetch=await api.createOrder(data);
        console.log(fetch);
        dispatch(getOrderPlaced(fetch.data.order))

    }catch(err){
        dispatch(getOrderPlacedFail(err.response.data.message));
    }
}

export const OrderClearErrorAsync=()=>(dispatch)=>{
    setTimeout((e)=>{
        dispatch(clearError());
    },2000)
}
export const clearStatusAsync=()=>(dispatch)=>{
    setTimeout((e)=>{
        dispatch(clearStatus());
    },2000)
}