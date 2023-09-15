import {createSlice} from '@reduxjs/toolkit';

const initialState={
    productDetails:null,
    loading:false,
    error:null,
    success:false,
}

export const productDetailSlice=createSlice({
    name:'productDetails',
    initialState,
    reducers:{
        getProductDetailsRequest:(state)=>{
            state.loading=true;
        },
        getProductDetails:(state,action)=>{
            state.productDetails=action.payload;
            state.loading=false;
            state.success=true;
        },
        getProductDetailsFail:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        clearError:(state,action)=>{
            state.error=null;
        }
    }
});

export const {getProductDetails,
              getProductDetailsFail,
              getProductDetailsRequest,
              clearError}=productDetailSlice.actions;

export default productDetailSlice.reducer;