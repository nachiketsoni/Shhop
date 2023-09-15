import {useState} from 'react'
import css from './Register.module.scss';
import {useDispatch} from 'react-redux';
import {loginAsync} from '../../asyncActions/userAction';

const Login = ({rToggle,setRToggle,logInInfo,setlogInInfo}) => {


  const [pToggle,setPtoggle]=useState(true);
  const getData=(e)=>{
    setlogInInfo({...logInInfo,[e.target.name]:e.target.value});
  }
  const dispatch=useDispatch();
  const submitionHandler=async (e)=>{
    e.preventDefault();
    dispatch(loginAsync(logInInfo));
  }
 
    
  return (
    <form method="post" className={css.authForm} onSubmit={submitionHandler}>
    <div className={css.fElm}>
      <h1>LOGIN</h1>
    </div>
    <div className={css.fElm}>
    <i className="ri-user-fill"></i>
    <input 
    type="text"
    placeholder="username"
    name="username"
    onChange={getData}
    value={logInInfo.username}
    
    />

    </div>
    <div className={`${css.fElm} ${css.password}`}>
    <i className="ri-lock-fill"></i>
    <div>
    <input 
    type={(pToggle?"password":"text")}
    placeholder="password"
    name="password"
    onChange={getData}
    value={logInInfo.password}
    
    />
    <i className={(pToggle?"ri-eye-close-line":"ri-eye-line")} onClick={()=>{setPtoggle(!pToggle)}}></i>
    </div>
  

    </div>
    <div className={css.fElm}>
    <p>forget password?</p>

    </div>
    <div id={css.fBtn} className={css.fElm}>
    <button type="submit"><i className="ri-arrow-right-line"></i></button>

    </div>
    <div className={css.fElm}>
    <p onClick={()=>{setRToggle(!rToggle)}}>New User? create your account here</p>


    </div>

  </form>
  )
}

export default Login