import {createSlice} from '@reduxjs/toolkit';

const initialState={
    productReviews:[],
    loading:false,
    error:null,
    success:false,

    updateLoading:false,
    updateSuccess:false,
    updateError:null,
}

export const ReviewSlice=createSlice({
    name:'productReviews',
    initialState,
    reducers:{
        getReviewRequest:(state)=>{
            state.loading=true;
        },
        getReviewSuccess:(state,action)=>{
            state.productReviews=action.payload;
            state.loading=false;
            state.success=true;
        },
        getReviewFail:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        clearError:(state,action)=>{
            state.error=null;
        },

        addReviewRequest:(state)=>{
            state.updateLoading=true;
        },
        addReviewSuccess:(state)=>{
            state.updateLoading=false;
            state.updateSuccess=true;
        },
        addReviewFail:(state,action)=>{
            state.updateError=action.payload;
        },
        resetUpdateStatus:(state)=>{
            state.updateLoading=null;
            state.updateSuccess=false;
            state.updateError=null
        }
    }

})


export const {
    getReviewRequest,
    getReviewSuccess,
    getReviewFail,
    clearError,
    addReviewRequest,
    addReviewSuccess,
    addReviewFail,
    resetUpdateStatus
}=ReviewSlice.actions;
export default ReviewSlice.reducer;