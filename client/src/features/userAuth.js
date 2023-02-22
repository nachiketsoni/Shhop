import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    user:{},
    isAuthenticated:false,
    error:null,
    admin:false,
    isShipInfo:false,
}
export const userAuthSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        //regist user
        registerRequest:(state,action)=>{
            state.loading=true;
        },
        registerSuccess:(state,action)=>{
            state.loading=false;
            state.isAuthenticated=true;
            state.user=action.payload;
            state.error=null;
            state.admin=action.payload.role==='admin'?true:false;

        },
        registerFail:(state,action)=>{
            state.loading=false;
            state.isAuthenticated=false;
            state.user=null;
            state.error=action.payload;
            state.admin=false;

        },

        //login user
        loginRequest:(state,action)=>{
            state.loading=true;
        },
        loginSuccess:(state,action)=>{
            state.loading=false;
            state.user=action.payload;
            state.isAuthenticated=true;
            state.error=null;
            state.admin=action.payload.role==='admin'?true:false;

        },
        loginFail:(state,action)=>{
            state.loading=false;
            state.isAuthenticated=false;
            state.error=action.payload;
            state.user=null;
            state.admin=false;
        },

        //logout
        logoutUser:(state,action)=>{
            state.user=null;
            state.isAuthenticated=false
        },

        //loading user data
        loadUserRequest:(state,action)=>{
            state.loading=true;
        },
        loadUserSuccess:(state,action)=>{
            state.loading=false;
            state.user=action.payload;
            state.isAuthenticated=true;
            state.admin=action.payload.role==='admin'?true:false;
        },
        loadUserFail:(state,action)=>{
            state.loading=false;
            state.isAuthenticated=false;
            state.error=action.payload;
            state.user=null;
            state.admin=false;
        },

        //clear Errors
        clearError:(state,action)=>{
            state.loading=false;
            state.error=null;

        }
    }
})


export const { loginRequest,
               loginSuccess, 
               loginFail,
               logoutUser,
               loadUserRequest, 
               loadUserSuccess, 
               loadUserFail,
               registerRequest,
               registerSuccess,
               registerFail,
            clearError}=userAuthSlice.actions;
export default userAuthSlice.reducer;