import { createSlice } from "@reduxjs/toolkit";
import * as api from '../../api/updateDetails';

const initialState={
    loading:false,
    success:false,
    error:null,
    successNote:null,
}

export const detailUpdateSlice=createSlice({
name:'userShipInfoUpdate',
initialState,
reducers:{
    updateRequest:(state,action)=>{
        state.loading=true
    },
    updateSuccess:(state,action)=>{
        state.success=true;
        state.loading=false;
        state.successNote=action.payload
    },
    updateFail:(state,action)=>{
        state.error=action.payload;
        state.loading=false;
    },
    clearError:(state,action)=>{
        state.loading=false;
        state.success=false;
        state.error=null;
        state.successNote=null;
    }
}
})

export const {
    updateRequest,
    updateSuccess,
    updateFail,
    clearError,
    updateStatusReset


}=detailUpdateSlice.actions;
export default detailUpdateSlice.reducer;


export const updateShippingInfo=(data)=>async (dispatch,getState)=>{
    try{
        dispatch(updateRequest());
        // console.log(data)
        let fetch=await api.updateShippingInfo(data);
        let {user}=getState((e)=>e.user);
        dispatch(updateSuccess(`Shipping information is successfully ${user.user.shippingInfo.writtenBy?"Edited":"Added"}!`))

    }catch(err){
        console.log(err)
        dispatch(updateFail(err.message));

    }
}

export const clearErrorAsync=(alert)=>(dispatch,getState)=>{
    setTimeout((e)=>{
        dispatch(clearError())
    },2000)
}
