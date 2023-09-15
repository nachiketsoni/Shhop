import {getAdminUserFail,
    getAdminUsersRequest,
    getAdminUsersSuccess,
    clearErrors,

    updateUserRequest,
    updateUserSuccess,
    updateUserError,
    clearUpdateStatus} from '../../features/admin/adminUserSlice';

    import * as api from '../../api/admin';


export const getAdminUsersAsync=()=>async (dispatch)=>{
    try{
        dispatch(getAdminUsersRequest());
        let fetch=await api.getAdminUsers();
        dispatch(getAdminUsersSuccess(fetch.data.users))

    }catch(err){
        dispatch(getAdminUserFail(err.message))

    }
}

export const updateUserRoleAsync=(id,data)=>async(dispatch)=>{
    try{
        dispatch(updateUserRequest());
     let fetch=await api.updateRole(id,data);
    //  console.log(fetch)
     dispatch(updateUserSuccess("Role updated successfully"))

    }catch(err){
        dispatch(updateUserError(err.message))

    }
}

export const AsyncClearStatus=()=>async (dispatch)=>{
    setTimeout((e)=>{
        dispatch(clearUpdateStatus());
    },5000)
}