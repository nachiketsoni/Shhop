import { getProducts,getProductsRequest,getProductsFail } from '../features/productSlice';

import * as api from '../api/index'

export const getProductsAsync=(page,range,category,keyword)=>async (dispatch,getState)=>{
    try{
        dispatch(getProductsRequest());
        let d=await api.fetchProducts(page,range,category,keyword);
        // console.log(d)
        dispatch(getProducts(d.data));

    }catch(err){
        console.log(`error:${err.message}`)
        dispatch(getProductsFail(err.message));
    }

}