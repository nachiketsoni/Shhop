import {createSlice} from '@reduxjs/toolkit';

const initialState={
    paymentInfo:{},
    error:null,
    loading:false,
    paymentPrograss:false,
    success:false,
    orderPlaced:false,
    started:false,

}
export const orderSlice=createSlice({
    name:"Order",
    initialState,
    reducers:{
        getPaymentInfoRequest:(state,action)=>{
            state.loading=true;
            state.started=true;
        },
        getPaymentInfo:(state,action)=>{
            state.paymentInfo={
                id:action.payload.id,
                status:'initiated',
                itemsPrice:action.payload.price,
                taxPrice:0,
                shippingPrice:0,
                totalPrice:action.payload.price,

            }
            state.loading=false;
            state.success=true;
            state.error=null
            
        },
        getPaymentInfoFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
            state.success=false
        },

        paymentRequest:(state,action)=>{
           state.paymentPrograss=true;
        },
        paymentStatusSuccess:(state,action)=>{
             state.paymentInfo={...state.paymentInfo,status:"done"};
             state.paymentPrograss=false;
        },
        paymentFail:(state,action)=>{
             state.paymentPrograss=false;
             state.success=false;
             state.paymentInfo={};
             state.error=action.payload;
        },

        getOrderPlacedRequest:(state,action)=>{
            state.loading=true;
        },
        getOrderPlaced:(state,action)=>{
            state.orderPlaced=true;
            state.loading=false;
            state.success=true;
        },
        getOrderPlacedFail:(state,action)=>{
            state.orderPlaced=false;
            state.error=action.payload;
            state.success=false;
            state.loading=false;
        },
        clearError:(state,action)=>{
            state.error=null;
        },
        clearStatus:(state,action)=>{
            state.orderPlaced=false;
            state.paymentInfo={};
            state.shippingInfo={};
            state.success=false;
            state.loading=false;
            state.error=null;
            state.started=false;
        }
    }
})

export const {getPaymentInfo,
              getPaymentInfoRequest,
              getPaymentInfoFail,

              addShipInfo,

              getOrderPlacedRequest,
              getOrderPlaced,
              getOrderPlacedFail,

              paymentStatusSuccess,
              paymentRequest,
              paymentFail,

              clearError,
              clearStatus}=orderSlice.actions;
export default orderSlice.reducer;