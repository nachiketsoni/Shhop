import React from 'react';
import css from "../Order.module.scss";
import {Link} from 'react-router-dom'
const OrderSuccess = () => {
  return (
    <div className={css.OrderSuccess}>
            <h1>Order Placed Successfully!</h1>
        <i className="ri-checkbox-circle-fill"></i>
       
    </div>
  )
}

export default OrderSuccess