import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    myOrders:[],
    success:false,
    error:null
}

export const myOrderSlice=createSlice({
    name:"myOrders",
    initialState,
    reducers:{
        myOrderRequest:(state,action)=>{
            state.loading=true;
        },
        myOrderSuccess:(state,action)=>{
            state.loading=false;
            state.success=true;
            state.myOrders=action.payload;},
        myOrderFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
            state.succuss=false;
        },
        clearError:(state,action)=>{
            state.loading=false;
            state.error=null;
        }
    }
})

export const{
    myOrderRequest,
    myOrderSuccess,
    myOrderFail,
    clearError


}=myOrderSlice.actions;
export default myOrderSlice.reducer;