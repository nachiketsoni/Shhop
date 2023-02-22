import {createSlice} from '@reduxjs/toolkit';

const initialState={
    cart:JSON.parse(localStorage.getItem("cart"))?JSON.parse(localStorage.getItem("cart")).cart:[],
    cartCount:JSON.parse(localStorage.getItem("cart"))?JSON.parse(localStorage.getItem("cart")).cartCount:0,
    subTotal:JSON.parse(localStorage.getItem("cart"))?JSON.parse(localStorage.getItem("cart")).subTotal:0,
    totalItems:JSON.parse(localStorage.getItem("cart"))?JSON.parse(localStorage.getItem("cart")).totalItems:0,
  
}
export const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToTheCart:(state,action)=>{
            if(!state.cart.find((elm)=>elm.productId===action.payload.productId)){
                let tmp={
                    productId:action.payload.productId,
                    Qty:action.payload.Qty,
                    ProductData:action.payload.productData,
                    pTotal:action.payload.pTotal,
                 }
                 state.cart=[...state.cart,tmp];
                 state.cartCount=state.cart.length;
                 state.subTotal=state.cart.reduce((acc,elm)=>acc+elm.pTotal,0);
                 state.totalItems=state.cart.reduce((acc,elm)=>acc+elm.Qty,0);

                 localStorage.setItem("cart",JSON.stringify({
                    cart:state.cart,
                    cartCount:state.cartCount,
                    subTotal:state.subTotal,
                    totalItems: state.totalItems}));
                
            }else{
                state.cart=state.cart.map((elm)=>{
                    if(elm.productId===action.payload.productId){
                        elm.Qty=action.payload.Qty;
                        elm.pTotal=action.payload.pTotal;
                        // state.subTotal+=(elm.productData.price*action.payload.Qty);

                        return elm
                    }
                    return elm
                })
                state.subTotal=state.cart.reduce((acc,elm)=>acc+elm.pTotal,0);
                state.totalItems=state.cart.reduce((acc,elm)=>acc+elm.Qty,0);

                localStorage.setItem("cart",JSON.stringify({
                    cart:state.cart,
                    cartCount:state.cartCount,
                    subTotal:state.subTotal,
                    totalItems: state.totalItems}));
            

            }
             
        },
        removeFromTheCart:(state,action)=>{
            state.cart=state.cart.filter((elm)=>elm.productId!==action.payload.productId);
            state.cartCount=state.cart.length
            state.subTotal=state.cart.reduce((acc,elm)=>acc+elm.pTotal,0);
            state.totalItems=state.cart.reduce((acc,elm)=>acc+elm.Qty,0);

            localStorage.setItem("cart",JSON.stringify({
                cart:state.cart,
                cartCount:state.cartCount,
                subTotal:state.subTotal,
                totalItems: state.totalItems}));
        },
        clearCart:(state,action)=>{
            state.cart=[];
            state.cartCount=0;
            state.subTotal=0;
            state.totalItems=0;
            localStorage.setItem("cart",JSON.stringify({
                cart:state.cart,
                cartCount:state.cartCount,
                subTotal:state.subTotal,
                totalItems: state.totalItems}));
        }
    }
})

export const {addToTheCart,removeFromTheCart,clearCart} =cartSlice.actions;
export default cartSlice.reducer;