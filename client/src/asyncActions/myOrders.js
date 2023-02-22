import {
    myOrderRequest,
    myOrderSuccess,
    myOrderFail,
    clearError
} from '../features/myOrderSlice';

import * as api from '../api/index';

export const fetchUserOrders=()=>async(dispatch)=>{
    try{
        dispatch(myOrderRequest());
        const d=await api.fetchMyOrders();
        dispatch(myOrderSuccess(d.data.data));

    }catch(err){
        console.log(err.response)
       dispatch(myOrderFail(err.message))
    }

}


export const clearErrorAsync=()=>(dispatch)=>{
    setTimeout((e)=>{
        dispatch(clearError())
    },2000)
}