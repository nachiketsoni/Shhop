
import {
    getAdminOrderFail,
    getAdminOrders,
    getAdminOrderRequest,
    clearErrors,

    
    updateOrderStatusRequest,
    updateOrderStatusSuccess,
    updateOrderStatusFail,
    clearUpdateError
} from "../../features/admin/adminOrderSlice"

import * as api from '../../api/admin';

export const getAdminOrdersAsync=()=>async (dispatch)=>{
    try{
        dispatch(getAdminOrderRequest());
        let fetch=await api.getAdminOrders();
        dispatch(getAdminOrders({orders:fetch.data.orders,totalAmount:fetch.data.totalAmount}));

    }catch(err){
       dispatch(getAdminOrderFail(err.message));
    }
}

export const updateOrderStatusAsync=(id,status)=>async (dispatch)=>{
try{
    dispatch(updateOrderStatusRequest());
    const fetch=await api.updateStatus(id,status);
    dispatch(updateOrderStatusSuccess("Status Updated!"))

}catch(err){
    dispatch(updateOrderStatusFail(err.response.data.message))
}
}

export const AsyncClearUpdateErrors=()=>async (dispatch)=>{
   setTimeout((e)=>{
    dispatch(clearUpdateError());
   },2000)
}
