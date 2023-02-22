import {useState} from 'react'
import css from './Navbar.module.scss';
import User from './User';
import {Link,NavLink} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import {themeHandler} from '../themeHandler';
import {setTheme} from '../../features/themeSlice'
import { useEffect } from 'react';
import MenuPanel from './MenuPanel';

import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';

const NavBar = () => {
    const {theme}=useSelector((store)=>store.themeControl);
    const {user,isAuthenticated}=useSelector((s)=>s.user);
    const {cartCount}=useSelector((store)=>store.cartData);

    const [mToggle,setMToggle]=useState(false);
    const manu={
        display:'flex'
      }

    const dispatch=useDispatch();
    const themeFunction=(theme)=>{
        dispatch(setTheme());
        themeHandler(!theme);
    }

    useEffect((e)=>{
        themeHandler(JSON.parse(localStorage.getItem("theme")));
    },[])
  return (
    <>
        <Modal
    open={mToggle}
    onClose={()=>{setMToggle(true)}}>
        <Box sx={{width:'100%'}}>
            <MenuPanel setMToggle={setMToggle}/>
        </Box>
    </Modal>
    <nav>
    <div id={css.nlft}>
     <Link to="/" style={{textDecoration: 'none'}}><h3 className={css.logo}>Shhop<span>.</span></h3></Link>
        <div className={css.nLinks}>
            <NavLink to="/" style={({isActive})=>({borderBottom:!isActive?'1px solid #E26849':'none'})}>Home</NavLink>
            <NavLink to="/browse" style={({isActive})=>({borderBottom:isActive?'1px solid #E26849':'none'})}>Browse</NavLink>
            <NavLink to="/trending" style={({isActive})=>({borderBottom:isActive?'1px solid #E26849':'none'})}>Trending</NavLink>
            <NavLink to="/about" style={({isActive})=>({borderBottom:isActive?'1px solid #E26849':'none'})}>About</NavLink>
        </div>
    </div>
    <div id={css.nrt}>
        <div className={css.nSrch}>
            <input type="search" name="q" placeholder="search items"/>
        </div>
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
        {(isAuthenticated)?<User user={user} mToggle={mToggle} setMToggle={setMToggle}></User> :
        <Link to="/auth" style={{textDecoration: 'none'}} className={css.signBtn}>
        <p>
        SignIn/SignUp
        </p>
    
        </Link>}
   
      
    </div>
   
    </nav>
    
    </>
 
  )
}

export default NavBar