import {useState,useEffect} from 'react'
import css from './Navbar.module.scss'

const User = ({user,mToggle,setMToggle}) => {
 
 
  

  // useEffect((e)=>{
  //   if(mToggle){
  //     document.body.style.overflow = "hidden";
  //   }else{
  //     document.body.style.overflow='initial';

  //   }

  // },[mToggle])

  

  return (
   <>
    
        <div className={css.user}>
            <div className={css.uDp}>
                <img src={user?.avatar?.url} onClick={()=>{setMToggle(true)}}  alt=""/>
            </div>
            <div className={css.uText}>
                <h4>Hi!</h4>
                <h3>{user?.name?.split(" ")[0]}</h3>
            </div>
        </div>
        {/* <i className="ri-menu-fold-line" id={css.menu} onClick={()=>{setMToggle(true)}} ></i> */}
        

   </>
  )
}

export default User