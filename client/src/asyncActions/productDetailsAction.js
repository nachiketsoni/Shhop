import {getProductDetails,
    getProductDetailsFail,
    getProductDetailsRequest,
    clearError} from '../features/productDetailSlice';

    import * as api from '../api/index';

export const getProductDetailsAsync=(id)=>async (dispatch)=>{
try{
    dispatch(getProductDetailsRequest());
    const fetch=await api.fetchProductDetails(id);
    if(fetch.status===200){
        dispatch(getProductDetails(fetch.data.product))
    }
}catch(err){
  dispatch(getProductDetailsFail(err.message));
}
}