import { createSlice } from "@reduxjs/toolkit";
import * as api from '../../api/updateDetails';

const initialState={
    loading:false,
    success:false,
    error:null,
    successNote:null,
}

export const detailUpdateSlice=createSlice({
name:'userAvatarUpdate',
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


export const uploadAvatarAsync=(data)=>async (dispatch,getState)=>{
    try{
        dispatch(updateRequest());
        let fetch=await api.uploadAvatar(data);
        dispatch(updateSuccess("Avatar is successfully set!"))


    }catch(err){
        dispatch(updateFail(err.response.data.message||err.message));
    }
}

export const updloadAvatarViaLink=(data)=>async(dispatch)=>{
    try{
        dispatch(updateRequest());
        let fetch=await api.updloadAvatarViaLink(data);
        dispatch(updateSuccess("Avatar is successfully set!"))

    }catch(err){
        dispatch(updateFail(err.response.data.message||err.message));
    }

}

export const clearErrorAsync=(alert)=>(dispatch,getState)=>{
    setTimeout((e)=>{
        dispatch(clearError())
    },2000)
}
