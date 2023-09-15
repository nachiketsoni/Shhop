import React, { useState } from 'react'
import css from '../Order.module.scss';
import {useSelector} from 'react-redux'
import ShipFormModel from '../../utils/Forms/ShipFormModel';
const ShipInfo = ({SubHeading}) => {

    const {user}=useSelector((e)=>e.user);
    const [toEdit,setToEdit]=useState(false);
  return (<> 
  <ShipFormModel open={toEdit} setOpen={setToEdit}></ShipFormModel>
  <div className={css.ShipInfo}>
        <h4>Shipping Information</h4>
        <p>{SubHeading}</p>
        {
            (user.shippingInfo.writtenBy)
            ? <div>
            <div className={css.sElm}>
                <h6>Address:</h6>
                <p>{user.shippingInfo?.address}</p>

            </div>
            <div className={css.sElm}>
                <h6>City:</h6>
                <p>{user.shippingInfo?.city}</p>

            </div>
            <div className={css.sElm}>
                <h6>State:</h6>
                <p>{user.shippingInfo?.state}</p>

            </div>
            <div className={css.sElm}>
                <h6>Pincode:</h6>
                <p>{user.shippingInfo?.pinCode}</p>

            </div>
            <div className={css.sElm}>
                <h6>Contact No. :</h6>
                <p>{user.shippingInfo?.phoneNo}</p>

            </div>
        </div>
        :" "
        }
       
        <button onClick={()=>{setToEdit(true)}}>{(user.shippingInfo.writtenBy)?"Edit":"Add"} Shipping Information <i className="ri-edit-line"></i></button>
    </div>
  </>
   
  )
}

export default ShipInfo