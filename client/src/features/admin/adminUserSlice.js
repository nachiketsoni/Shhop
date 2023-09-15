import { createSlice } from "@reduxjs/toolkit";

const initialState={
    usersList:[],
    loading:false,
    error:null,
    usersCount:null,
    success:false,

    updateLoading:false,
    updateSuccess:false,
    updateError:null,
    updateSuccessNote:null
}

export const adminUserSlice=createSlice({
    name:"admin_users",
    initialState,
    reducers:{
        getAdminUsersRequest:(state)=>{
            state.loading=true;
        },
        getAdminUsersSuccess:(state,action)=>{
            state.loading=false;
            state.success=true;
            state.usersList=action.payload;
            state.usersCount=action.payload.length;
        },
        getAdminUserFail:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        clearErrors:(state)=>{
            state.error=null;
        },

        updateUserRequest:(state,action)=>{
            state.updateLoading=true;
        },
        updateUserSuccess:(state,action)=>{
            state.updateSuccess=true;
            state.updateLoading=false;
            state.updateSuccessNote=action.payload;
        },
        updateUserError:(state,action)=>{
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

export const {
    getAdminUserFail,
    getAdminUsersRequest,
    getAdminUsersSuccess,
    clearErrors,

    updateUserRequest,
    updateUserSuccess,
    updateUserError,
    clearUpdateStatus


}=adminUserSlice.actions;
export default adminUserSlice.reducer;