import {getAdminProductRequest,
    getAdminProductSuccess,
    getAdminProductFail,
    clearErrors,


    updateRequest,
    updateSuccess,
    updateError,
    clearUpdateStatus} from '../../features/admin/adminProductSlice';

    import * as api from '../../api/admin';

export const getAdminProductAsync=()=>async (dispatch)=>{
    try{
        dispatch(getAdminProductRequest());
        let fetch=await api.getAdminProducts();
        // console.log(fetch);
        dispatch(getAdminProductSuccess({productsCount:fetch.data.ProductCount,
        products:fetch.data.allProducts}))

    }catch(err){
     dispatch(getAdminProductFail(err.message));
    }
}

export const createNewProductAsync=(data)=>async (dispatch)=>{
    try{
        dispatch(updateRequest())
      let fetch=await api.createProduct(data);
      dispatch(updateSuccess("new product is successfully created"))
    }
    catch(err){
        console.log(err)
       dispatch(updateError(err.response.data.message||err.message))
    }
}

export const updateProductDetailsAsync=(id,data)=>async (dispatch)=>{
    try{
        dispatch(updateRequest())
        let fetch=await api.updateProduct(id,data);
        console.log(fetch);
        dispatch(updateSuccess("Product Edited successfully"));
    }catch(err){
        console.log(err);
        dispatch(updateError(err.response.data.message||err.message));

    }
}

export const deleteProductCardAsync=(id,data)=>async (dispatch)=>{
    try{
        dispatch(updateRequest())
        let fetch=await api.deleteProduct(id);
        dispatch(updateSuccess("Product Deleted successfully"));
    }catch(err){
        console.log(err);
        dispatch(updateError(err.response.data.message||err.message));

    }

}
export const AsyncClearStatus=()=>async (dispatch)=>{
    setTimeout((e)=>{
        dispatch(clearUpdateStatus());
    },2000)
}