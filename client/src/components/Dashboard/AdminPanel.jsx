import {useEffect} from 'react'
import './AdminPanel.scss';
import css from './dashboard.module.scss';
import AMobNav from './AMobNav';

import {useSelector,useDispatch} from 'react-redux';
import {getAdminOrdersAsync} from '../../asyncActions/admin/adminOrderAction';
import { getAdminUsersAsync } from '../../asyncActions/admin/adminUserAction';
import { getAdminProductAsync } from '../../asyncActions/admin/adminProductAction';

import {getProductsAsync} from '../../asyncActions/productAction';

import { Link,NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
const AdminPanel = () => {

  const dispatch=useDispatch();
  useEffect((e)=>{
    dispatch(getAdminOrdersAsync());
    dispatch(getAdminUsersAsync());
    dispatch(getAdminProductAsync());
  },[])

  const linkStyle={textDecoration: 'none',width:'80%'}
  const navActiveHandler=(isActive)=>{
    return {
      textDecoration:'none',
      backgroundColor:`${(isActive)?'#E26849':'transparent'}`,
      width: '100%',
      borderRadius:'2em',
      marginTop:'1em',


    }
  }
  return (
   <div id="AdminPanel">
    <AMobNav/>
          <nav id="AdminNav">
            <div id="content">
            <Link to="/" style={{textDecoration: 'none'}}><h3 className={css.logo}>Shhop<span>.</span></h3></Link>
           <div id="adminNavLinks">
            <Link to="/admin/dashboard" style={linkStyle}>
            <div className="dashMainLink">
            <i className="ri-dashboard-fill"></i> <h3>Dashboard</h3>
            </div>
            </Link>
            
            <div id="adminOtherLinks">
              <NavLink to="/admin/dashboard/products" style={({isActive})=>(navActiveHandler(isActive))}>
              <div className="dashLink">
                <h3>Products</h3> <i className="ri-arrow-right-s-line"></i>
               </div>
              </NavLink>
              <NavLink to="/admin/dashboard/orders" style={({isActive})=>(navActiveHandler(isActive))}> <div className="dashLink">
            <h3>Orders</h3> <i className="ri-arrow-right-s-line"></i>
            </div></NavLink>
            <NavLink to="/admin/dashboard/users" style={({isActive})=>(navActiveHandler(isActive))}>
            <div className="dashLink">
            <h3>Users</h3> <i className="ri-arrow-right-s-line"></i>
            </div>
              </NavLink>
           
            </div>
           </div>
           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, laudantium veritatis eos quos veniam nemo illum reprehenderit? Cupiditate, modi tenetur.</p>
            </div>
        
          </nav> 
           <div id="adminDashboard">
           <Link to="/" style={{textDecoration: 'none'}}><h3 className='alogo'>Shhop<span>.</span></h3></Link>
            <h6>(Only for admin)</h6>
            <Outlet></Outlet>
          </div>
   </div>
  )
}

export default AdminPanel