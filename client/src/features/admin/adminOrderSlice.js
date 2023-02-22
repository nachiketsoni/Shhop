import {createSlice} from '@reduxjs/toolkit';

const initialState={
    orders:[],
    loading:false,
    error:null,
    totalAmount:null,
    success:false,

    updateLoading:false,
    updateSuccess:false,
    updateError:null,
    updateSuccessNote:null
}

export const adminOrderSlice=createSlice({
    name:"admin_orders",
    initialState,
    reducers:{
        getAdminOrderRequest:(state)=>{
            state.loading=true;
        },
        getAdminOrders:(state,action)=>{
            state.loading=false;
            state.success=true;
            state.orders=action.payload.orders;
            state.totalAmount=action.payload.totalAmount;

        },
        getAdminOrderFail:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        clearErrors:(state)=>{
            state.loading=false;
            state.error=null;
        },

        updateOrderStatusRequest:(state,action)=>{
            state.updateLoading=true
        },
        updateOrderStatusSuccess:(state,action)=>{
            state.updateSuccess=true;
            state.updateLoading=false;
            state.updateSuccessNote=action.payload;
        },
        updateOrderStatusFail:(state,action)=>{
            state.updateError=action.payload;
            state.updateLoading=false;
        },
        clearUpdateError:(state,action)=>{
            state.updateError=null;
            state.updateSuccessNote=null;
            state.loading=false;
            state.updateSuccess=false;
        }
    }
})


export const {
    getAdminOrderFail,
    getAdminOrders,
    getAdminOrderRequest,
    clearErrors,

    updateOrderStatusRequest,
    updateOrderStatusSuccess,
    updateOrderStatusFail,
    clearUpdateError
}=adminOrderSlice.actions;
export default adminOrderSlice.reducer;