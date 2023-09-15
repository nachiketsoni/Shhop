import { useState } from 'react';
import css from '../styles/Elements.module.scss';
import  '../styles/MainElements.scss';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {addToTheCart, removeFromTheCart} from '../../../features/cartSlice';
import ReactStars from 'react-rating-stars-component';
import { Rating, Skeleton } from '@mui/material';

const ProductCard = ({data}) => {
    const dispatch=useDispatch();
    const {loading}=useSelector(state=>state.products)
    const {theme}=useSelector(state=>state.themeControl)
    const {cart} =useSelector(state=>state.cartData);
    
const options={
    edit:false,
    color:'#d6ae2c8e',
    activeColor:'#d6ae2c',
    value:data?.ratings  ,
    isHalf:true,
    size:10,

}
   const fTimeCart=(id,data)=>{
    dispatch(addToTheCart({productId:id,Qty:1,productData:data,pTotal:data.price}));
   }
   const increaseQty=(id,data)=>{
    let prevQty=cart.find((elm)=>elm.productId===id).Qty
    if(prevQty<data.Stock){
       prevQty++
    dispatch(addToTheCart({productId:id,Qty:prevQty,pTotal:data.price*prevQty})); 
    }
    

   
   }
   const decreaseQty=(id)=>{
    let prevQty=cart.find((elm)=>elm.productId===id).Qty;
    if(prevQty>1){
        prevQty--;
        dispatch(addToTheCart({productId:id,Qty:prevQty,pTotal:data.price*prevQty}));
    } else{
        dispatch(removeFromTheCart({productId:id}))
    }

   }

   if(loading){
    return <Skeleton variant="rounded" width={210} height={60} />
   }
  return (
    <div className={css.card}>
         <Link to={`product/details/${data?._id}`} className="linkStyle">
          <div className={css.cImg}>
   {(!theme)? <div className={css.cOverly}></div>:""}
       
        <div className={css.cTag}>
           <p> {data?.tags[0]}</p>
        </div>
        <img src={data?.image} alt=""/>
    </div>
         </Link>
   
    <div className={css.cHead}>
        <h1>{data?.name}</h1>
        <p>{data?.category.slice(0,9)} collection</p>
       
        <div className={css.cStar}>
        <ReactStars {...options}/>
            
        </div>

    </div>
    <div className={css.cAction}>
        <div className={css.cPrice}>
             <span></span><h6>Rs.{data?.price}</h6>
        </div>
        <div className={css.cDis}>
            <h4>{data?.oldPrice} <span></span></h4>
            <h5>({data?.discount}%)</h5>

        </div>
        <div className={css.cNote}>
             <p>{data?.Note}</p>
        </div>
        {/* <div className={css.cBtn}>
        <i className="ri-shopping-cart-fill"  onClick={()=>{fTimeCart(data?._id)}} ></i>   
            <i className="ri-add-line" id={css.authIndicator}></i>
        </div> */}

       {data?.Stock!==0
        ?<div className={css.cBtn} >
            {(cart.find((e)=>(e.productId===data._id)))
            ? <div> <i className="ri-subtract-line" id={css.cDelete}onClick={()=>{decreaseQty(data?._id,data)}}></i>
            <p>{cart.find((e)=>(e.productId===data._id)).Qty}</p> <i className="ri-add-circle-fill" id={css.cAdd}  onClick={()=>{increaseQty(data?._id,data)}}></i></div> 
            :<><i className="ri-shopping-cart-fill"  onClick={()=>{fTimeCart(data?._id,data)}} ></i>   
            <i className="ri-add-line" id={css.authIndicator} onClick={()=>{fTimeCart(data?._id,data)}}></i> </>
        }     
        </div> 
        : <div className="outOfStackTag">
           <p>Out of Stock</p>
        </div>
}
    </div>
</div>
  )
}

export default ProductCard

