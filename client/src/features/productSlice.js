import {createSlice} from '@reduxjs/toolkit';
const initialState={
    products:[],
    loading:false,
    error:null,
    productsCount:null,
    resultPerPage:0,
    filteredProductsCount:0
}
export const productSlice=createSlice({
    name:"Products",
    initialState,
    reducers:{
        getProductsRequest:(state)=>{
            state.products=[];
            state.loading=true;
            state.error=null;
        },
        getProducts:(state,action)=>{
            state.products=action.payload.products;
            state.loading=false;

            state.productsCount=action.payload.productsCount;
            state.resultPerPage=action.payload.resultPerPage;
            state.filteredProductsCount=action.payload.filteredProductsCount;
        },
        getProductsFail:(state,action)=>{
            state.loading=false;

            state.error=action.payload;
            state.products=[];

        },
        clearError:(state,action)=>{
            state.error=null;
        }
    }
});
export const {getProducts,getProductsRequest,getProductsFail}=productSlice.actions;


export default productSlice.reducer;