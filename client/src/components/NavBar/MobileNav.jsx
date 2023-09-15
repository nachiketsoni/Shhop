import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import css from './mobileNav.module.scss';
import {setTheme} from '../../features/themeSlice';
import {themeHandler} from '../themeHandler';

const MobileNav = () => {
  const {cartCount}=useSelector((store)=>store.cartData);
  const {theme}=useSelector((store)=>store.themeControl);
  const dispatch=useDispatch();

  const themeFunction=(theme)=>{
    dispatch(setTheme());
    themeHandler(!theme);
}
  return (
    <div id={css.mobileNav}>
        <div id={css.mNLinks}>
        <NavLink to="/" style={{textDecoration:'none'}} 
        className={({isActive})=>isActive?css.active:css.inActive}>
            <i className="ri-home-2-line"></i></NavLink>
            <NavLink to="/browse" style={{textDecoration:'none'}}
              className={({isActive})=>isActive?css.active:css.inActive}>
                <i className="ri-list-check-2"></i></NavLink>
            <NavLink to="/trending" style={{textDecoration:'none'}}
             className={({isActive})=>isActive?css.active:css.inActive} >
                <i className="ri-fire-line"></i></NavLink>
            <NavLink to="/about" style={{textDecoration:'none'}} 
             className={({isActive})=>isActive?css.active:css.inActive}>
                <i className="ri-group-line"></i></NavLink>
              
        </div>
        <div className={css.mUtils}>
        <div className={css.themeChange} onClick={()=>{themeFunction(theme)}}>
            <i className={(theme)?"ri-sun-line":"ri-moon-line"}></i>
        </div>
        <Link to="/cart" style={{textDecoration: 'none'}}>
        <div className={css.cart}>
            <i className="ri-shopping-cart-2-fill"></i>
            <div className={css.cCount}>
                <p>{cartCount}</p>
            </div>
        </div>
        </Link>
        </div>
       
    </div>
  )
}

export default MobileNav