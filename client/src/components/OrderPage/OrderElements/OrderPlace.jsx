import React from 'react'
import css from '../Order.module.scss'
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'

const OrderPlace = () => {
  const {totalItems, subTotal}=useSelector((e)=>e.cartData);
  const {isAuthenticated}=useSelector((e)=>e.user);
  return (
    <>
    {  (totalItems!==0)?
    <>
       
        <div className={css.orderSummary}>
            <h4>Order Summary</h4>
            <p>you are going to purchase {totalItems} items.</p>
            <div className={css.oData}>
                <div className={css.oElm}>
                    <h6>SubTotal:</h6>
                    <h4>&#8377; {subTotal}</h4>
                </div>
                <div className={css.oElm}>
                    <h6>Shipping charges:</h6>
                    <h4>FREE</h4>
                </div>
                <div className={css.oElm}>
                    <h6>Tax include:</h6>
                    <h4>&#8377; 0.00</h4>
                </div>
                <br/>
                <hr/>
                <div className={css.oElm}>
                    <h6>Total:</h6>
                    <h4>&#8377; {subTotal}</h4>
                </div>
        
            </div>
        </div>
    
    </>:" "
        

    }

    
    </>
  )
}

export default OrderPlace