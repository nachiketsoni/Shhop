import {createSlice} from '@reduxjs/toolkit';
const initialState={
    products:[],
    loading:false,
    error:null,
    productsCount:null,
    success:false,

    updateLoading:false,
    updateSuccess:false,
    updateError:null,
    updateSuccessNote:null
}


export const adminProductSlice=createSlice({
    name:"admin_products",
    initialState,
    reducers:{
        getAdminProductRequest:(state)=>{
            state.loading=true;
        },
        getAdminProductSuccess:(state,action)=>{
            state.loading=false;
            state.success=true;
            state.products=action.payload.products;
            state.productsCount=action.payload.productsCount;
        },
        getAdminProductFail:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        clearErrors:(state)=>{
            state.loading=false;
            state.error=null;
        },

        updateRequest:(state,action)=>{
            state.updateLoading=true;
        },
        updateSuccess:(state,action)=>{
            state.updateSuccess=true;
            state.updateLoading=false;
            state.updateSuccessNote=action.payload;
        },
        updateError:(state,action)=>{
            state.updateError=action.payload;
            state.updateLoading=false;
        },
        clearUpdateStatus:(state,action)=>{
            state.updateError=null;
            state.updateSuccessNote=null;
            state.loading=false;
            state.updateSuccess=null;
        }
    }
})


export const {getAdminProductRequest,
              getAdminProductSuccess,
              getAdminProductFail,
              clearErrors,
            
              updateRequest,
              updateSuccess,
              updateError,
              clearUpdateStatus}=adminProductSlice.actions;
export default adminProductSlice.reducer;