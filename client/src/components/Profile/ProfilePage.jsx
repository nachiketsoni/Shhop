import {useState,useEffect} from 'react'
import axios from 'axios';

import {useSelector} from 'react-redux'
import './Profile.scss'
import EditDetails from './EditDetails';
import ChangePassword from './ChangePassword';
import ShipInfo from '../OrderPage/OrderElements/ShipInfo';
import UpdateAvatar from './UpdateAvatar';

const ProfilePage = () => {

  const [img,setImg]=useState(null);


  const {user}=useSelector((s)=>s.user);
  const [detailModel,setDetailModel]=useState(false);
  const [chngPass,setChngPass]=useState(false);
  const [updateAvatar,setUpdateAvatar]=useState(false);




  return (
      <div id="profile">
        {
          (updateAvatar)
        ? <UpdateAvatar open={updateAvatar} setOpen={setUpdateAvatar}></UpdateAvatar>
        :""

        }
        {
          (detailModel)
        ? <EditDetails open={detailModel} setOpen={setDetailModel}/>
        : ""
      
        }
        {
          (chngPass)
        ? <ChangePassword open={chngPass} setOpen={setChngPass}></ChangePassword>
        :""
        }
      <div id="pTop">
        {/* <img src={imgLink} alt="" /> */}
        <div id="orangeShade">
          <h1>Have an auspicious day!</h1>
        </div>
      </div>
      <div id="picContainer">
     <div id="profilePic">
      <img src={user.avatar.url} alt="" />
      <button id="changePicBtn" onClick={()=>{setUpdateAvatar(true)}}>
      <i className="ri-image-edit-fill"></i>
      </button>
     </div>
      </div>
      <div id="pBottom">
        <div id="profileDetails">
          <div id="pHeading">
          <h1>PROFILE DETAILS</h1>
          <h4 onClick={()=>{setChngPass(true)}}>change password <span></span></h4>
          </div>
          <div id="uDetails">
             <div id="pDetails">
              <h4>User Details</h4>
              <p>You can Edit your details</p>
              <div>
                 <div className="pElm">
             <h6>Username:&nbsp; </h6> <p>{user.username}</p>
            </div>
            <div className="pElm">
             <h6>Name:&nbsp; </h6> <p>{user.name}</p>
            </div>
            <div className="pElm">
             <h6>Email:&nbsp; </h6> <p>{user.email}</p>
            </div>
              </div>
           
            <button onClick={()=>{setDetailModel(true)}}>Edit <i className="ri-edit-line"></i></button>
            
          </div>
          <ShipInfo SubHeading={"Here's your Shipping details"}></ShipInfo>
          </div>
         

        </div>

      </div>
      </div>
  
  )
}

export default ProfilePage