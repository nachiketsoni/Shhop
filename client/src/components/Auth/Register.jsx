import {useState,useEffect} from 'react'
import css from './Register.module.scss';
import { Link } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import {useSelector,useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { clearErrorAsync} from '../../asyncActions/userAction';
import { Box } from '@mui/system';
import { LinearProgress } from '@mui/material';
// import { useAlert } from 'react-alert';
const Register = () => {

  // const alert=useAlert();
  const {isAuthenticated,error,loading}=useSelector((store)=>store.user)
  const nevigate=useNavigate();
  const dispatch=useDispatch();

  const [rToggle,setRToggle]=useState(false);
  const [signUpInfo,setSignUpInfo]=useState({
    name:"",
    username:"",
    email:"",
    password:""
  })
  const [logInInfo,setlogInInfo]=useState({
    username:"",
    password:""
  })


  useEffect((e)=>{
    if(isAuthenticated){
      alert("Login Successful!")
      nevigate('/');
    }
    if(error){
       alert(error)
      dispatch(clearErrorAsync())
    }
    
  },[isAuthenticated,error])


  let authElement=(rToggle)
  ?<SignUp rToggle={rToggle} 
           setRToggle={setRToggle} 
           signUpInfo={signUpInfo}
           setSignUpInfo={setSignUpInfo}
           />
  : <Login rToggle={rToggle} 
           setRToggle={setRToggle}
           logInInfo={logInInfo}
           setlogInInfo={setlogInInfo}
            />
  return (
    <div className={css.register}>
      <div className={css.overlay}>
        <div className={css.auth}>
          {
            (loading)
            ?  <Box sx={{ width: '100%' }}>
            <LinearProgress />
            </Box>
            :""
          }
      
        <Link to="/" style={{textDecoration: 'none',marginTop:'2em'}}><h3 className={css.logo}>Shhop<span>.</span></h3></Link>
          {authElement}
        </div>
      </div> 
  
    
    </div>
  )
}

export default Register;