import React from 'react'
import CartCard from '../Elements/MainElements/CartCard'
import HomeLayout from '../Elements/MainElements/HomeLayout'
import OrderPlace from '../OrderPage/OrderElements/OrderPlace';
import { useSelector,useDispatch } from 'react-redux';
const CartPage = () => {
  const {cart,cartCount} =useSelector(state=>state.cartData);
  
  return (
    <>
      <HomeLayout
     heading={`You have ${cartCount} items in your cart `}
     cardData={cartCount!==0 && cart.map((elm)=><CartCard key={elm.productId} data={elm}/>)}
     boxStyle={"CartFlex"}
     rightSide={<OrderPlace/>}
     />
     
     </>
  )
}

export default CartPage