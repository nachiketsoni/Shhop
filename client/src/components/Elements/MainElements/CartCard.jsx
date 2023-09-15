import React, { useEffect } from 'react'
import css from '../styles/Elements.module.scss';
import { useSelector,useDispatch } from 'react-redux';
import {addToTheCart, removeFromTheCart} from "../../../features/cartSlice";
import ReactStars from 'react-rating-stars-component';


const CartCard = ({data}) => {
   
    const {ProductData,Qty}=data;
    const {image,name,price,description,category}=ProductData;
    const dispatch=useDispatch();
    const {cart} =useSelector(state=>state.cartData);
    const {theme}=useSelector(state=>state.themeControl);
    const options={
        edit:false,
        color:'#d6ae2c8e',
        activeColor:'#d6ae2c',
        value:ProductData?.ratings,
        isHalf:true,
        size:10
    
    }
    const increaseQty=(id,d)=>{
        let prevQty=cart.find((elm)=>elm.productId===id).Qty
        prevQty++
        // console.log(prevQty)
        dispatch(addToTheCart({productId:id,Qty:prevQty,pTotal:d.price*prevQty}));
    
       
       }
       const decreaseQty=(id,data)=>{
        let prevQty=cart.find((elm)=>elm.productId===id).Qty;
        if(prevQty>1){
            prevQty--;
            dispatch(addToTheCart({productId:id,Qty:prevQty,pTotal:data.price*prevQty}));
        } else{
            dispatch(removeFromTheCart({productId:id}))
        }
    
       }
    
  return (
    <div className={css.cartCard}>
        <div className={css.cCElm}>
            <div className={css.cCImg}>
       {(!theme)?<div className={css.cOverly}></div>:" "}
                <img src={image} alt=""/>
            </div>
        </div>
        <div className={css.cCElm}>
                        <div>
                            <h1>{name}</h1>
                            <h6>{category} COLLECTION</h6>
                            <div>
                                <div className={css.cStar}>
                                <ReactStars {...options}/>

                                </div>
                                <p>{ProductData?.numOfReviews} Review</p>
                            </div>
                        </div>
                       
                        <p>{description}</p>
                       

        </div>
        <div className={css.cCElm}>
                        <div className={css.cTotal}>
                            <div className={css.cTElm}>
                                <h3>Price:</h3>
                                <h1> &#x20B9; {price}</h1>
                            </div>
                            <div className={css.cTElm}>
                                <h3>Qty:</h3>
                                <h1> {Qty}</h1>
                            </div>
                            <hr/>
                            <div className={css.cTElm}>
                                <h3>Total:</h3>
                                <h1>&#x20B9; {price*Qty}</h1>
                            </div>
                            <div className={css.cCAction}>
                                <div className={`${css.cAdd} ${css.aElm}`} onClick={()=>{increaseQty(data.productId,ProductData)}} >
                                    <i className="ri-add-line"></i>
                                </div>
                                <div className={`${css.cValue} ${css.aElm}`}>
                                  <p>{data.Qty}</p>
                                </div>
                                <div className={`${css.cDelete} ${css.aElm}`} onClick={()=>{decreaseQty(data.productId,ProductData)}} >
                                    <i className="ri-subtract-line"></i>
                                </div>
                            </div>
                        </div>
        </div>
        <i className="ri-close-circle-fill" 
           id={css.cartRemove} 
           onClick={()=>{dispatch(removeFromTheCart({productId:data?.productId}))}}></i>

    </div>
  )
}

export default CartCard