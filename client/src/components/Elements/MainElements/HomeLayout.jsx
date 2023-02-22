import React from 'react'
import css from '../styles/Elements.module.scss';
import { Link } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { getRazoOrderIdAsync } from '../../../asyncActions/paymentAction';
const HomeLayout = ({cardData,heading,boxStyle,rightSide}) => {
  const {isAuthenticated}=useSelector((s)=>s.user);
  const {subTotal,totalItems} =useSelector((s)=>s.cartData);
  const dispatch=useDispatch()

  const createRazorpayOrderId=()=>{
      dispatch(getRazoOrderIdAsync(subTotal));
  }
  return (
    <div className={css.hero}>
    <div className={css.lft}>
    
        <div className={css.hText}>
        
          <div>
          {boxStyle==="grid"?<h1>Welcome</h1>:""}
          <h3>{heading} <span>.</span></h3>

          </div>
        </div>
        <div className={css[boxStyle]}>
        {cardData}
                   
        </div>
    </div>
    <div className={css.rt}>
      {
        boxStyle!=='grid'?  <div className={css.blank}>
        </div>:" "
      }
  
      {
        (rightSide)?rightSide:" "
      }
       {(boxStyle!=="grid"&&totalItems!==0)?  <Link to={(isAuthenticated?"/order":"/auth")} style={{textDecoration: 'none'}} className={css.signBtn}>
            <button className={css.oBtn} onClick={createRazorpayOrderId}>
            {(isAuthenticated?"Place Order":"Login Here")}
            </button>
            </Link>:""}
    

    </div>
    
    </div>
  )
}

export default HomeLayout