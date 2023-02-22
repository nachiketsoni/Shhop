import {useEffect,useRef} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { logOutAsync } from '../../asyncActions/userAction';
import {useNavigate,NavLink} from 'react-router-dom'
import css from './Menu.module.scss';
import './style.scss';
import {gsap} from 'gsap';
const menuUser=['profile','cart','orders','wishlist']
const menuAdmin=['profile','cart','orders','wishlist','dashboard']
const MenuPanel = ({setMToggle}) => {
  const Navigate=useNavigate();
  const dispatch=useDispatch();

  const {admin}=useSelector((e)=>e.user)
  const mElmRef=useRef();
  const mIndexRef=useRef();
  const menuLinks=gsap.utils.selector(mIndexRef);
  const mElms=gsap.utils.selector(mElmRef)
  useEffect((e)=>{
    gsap.to(mElms('.gsapAnim'),{ stagger:.1,
      rotateY:0,
      duration:1,
      opacity:1});
  })
  const logOut=()=>{
    dispatch(logOutAsync());
    Navigate('/');
    setMToggle(false);
  }
  const mouseEnter=(e)=>{
    gsap.to(menuLinks('.mText')[e.target.id].firstChild,{
       color:'#E26849'
    })
  }
  const  mouseLeave=(e)=>{
    gsap.to(menuLinks('.mText')[e.target.id].firstChild,{
      color:'rgba(255, 255, 255, 0.404)'
   })
  
  }
  
  return (
    <>
    <i className="ri-close-line" id={css.mClose} onClick={()=>{setMToggle(false)}}></i>
    <div id={css.mElmContainer}  ref={mElmRef}>
      {
        [1,2,3,4,5].map((e)=> {return <div key={e} className="gsapAnim"/>})
      }
    </div>
    <div id={css.menuContent}>
    <div  id='menuIndex' ref={mIndexRef} >
    <NavLink to={`/profile` } 
    style={{textDecoration:'none'}} 
    onClick={()=>{setMToggle(false)}}
     >
          <div className='mText' onMouseEnter={ mouseEnter}
            onMouseLeave={mouseLeave}>
          <h1 id="0">profile</h1>
          <h5 id="0">profile</h5>
        </div>
    </NavLink>
    <NavLink to={`/myOrders` } style={{textDecoration:'none'}} onClick={()=>{setMToggle(false)}} >
           <div  
           className='mText' 
           onMouseEnter={  mouseEnter}
           onMouseLeave={mouseLeave}
           >
          <h1 id="1">orders</h1>
          <h5 id="1">orders</h5>
        </div>
    </NavLink>
    <NavLink to={`/cart` } style={{textDecoration:'none'}} onClick={()=>{setMToggle(false)}} >
           <div  
           className='mText' 
           onMouseEnter={  mouseEnter}
           onMouseLeave={mouseLeave}
          >
          <h1 id="2">cart</h1>
          <h5 id="2">cart</h5>
        </div>
    </NavLink>
  {
    (admin)
    ? <NavLink to={`admin/dashboard` } style={{textDecoration:'none'}} onClick={()=>{setMToggle(false)}} >
    <div 
    className='mText' 
    onMouseEnter={ mouseEnter}
    onMouseLeave={mouseLeave}
    >
   <h1  id="3">dashboard</h1>
   <h5  id="3">dashboard</h5>
 </div>
</NavLink>
:" "
  }
     

      <div id='logout' onClick={logOut}>LOGOUT</div>
      </div>
    </div>
    </>
  )
}

export default MenuPanel