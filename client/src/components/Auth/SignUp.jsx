import {useState} from 'react'
import css from './Register.module.scss';
import {useDispatch} from 'react-redux';
import {registerAsync} from '../../asyncActions/userAction';


const SignUp = ({rToggle,setRToggle,signUpInfo,setSignUpInfo}) => {


  const [pToggle,setPtoggle]=useState(true);
  const dispatch=useDispatch();

    const getData=(e)=>{
        setSignUpInfo({...signUpInfo,[e.target.name]:e.target.value});
      }
    const submitionHandler=async (e)=>{
        e.preventDefault();
        dispatch(registerAsync(signUpInfo));
      }
  return (
    <form method="post" className={css.authForm} onSubmit={submitionHandler}>
    <div className={css.fElm}>
      <h1>SIGNUP</h1>
    </div>
    <div className={css.fElm}>
    <i className="ri-user-fill"></i>
    <input 
    type="text"
    placeholder="name"
    name="name"
    onChange={getData}
    value={signUpInfo.name}
    
    />

    </div>
    <div className={css.fElm}>
    <i className="ri-user-fill"></i>
    <input 
    type="text"
    placeholder="username"
    name="username"
    onChange={getData}
    value={signUpInfo.username}
    
    />

    </div>
    <div className={css.fElm}>
    <i className="ri-mail-fill"></i>
    <input 
    type="email"
    placeholder="email"
    name="email"
    onChange={getData}
    value={signUpInfo.email}
    
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
    value={signUpInfo.password}
    
    />
    <i className={(pToggle?"ri-eye-close-line":"ri-eye-line")} onClick={()=>{setPtoggle(!pToggle)}}></i>
    </div>
  

    </div>
    <br />
    <div id={css.fBtn} className={css.fElm}>
    <button type="submit"><i className="ri-arrow-right-line"></i></button>

    </div>
    <div className={css.fElm}>
    <p onClick={()=>{setRToggle(!rToggle)}}>Already have account? Login here.</p>


    </div>

  </form>
  )
}

export default SignUp