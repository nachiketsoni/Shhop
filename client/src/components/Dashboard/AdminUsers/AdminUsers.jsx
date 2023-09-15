import { CircularProgress, LinearProgress,Box } from '@mui/material';
import {useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { AsyncClearStatus, getAdminUsersAsync } from '../../../asyncActions/admin/adminUserAction';

import { useAlert } from 'react-alert';


import AdminUserTable from './AdminUserTable';
const AdminUsers = () => {
  const dispatch=useDispatch();
  
  // const alert=useAlert();
  const {usersList,loading,success,
    updateLoading,
    updateSuccess,
  updateError,
updateSuccessNote}=useSelector((s)=>s.adminUsers);

useEffect((s)=>{
if(updateSuccess){
  alert(updateSuccessNote);
  dispatch(getAdminUsersAsync());
  dispatch(AsyncClearStatus());

}
if(updateError){
  alert(updateError);
  dispatch(AsyncClearStatus())
}

},[success,updateSuccess,updateError])

  return (
    <>
      <div id="aOrderHeader">
      <h1>All Users Details</h1>
    </div>
    {
      (updateLoading)
      ?<Box sx={{ width: '100%',marginBottom:'.5em'}}>
      <LinearProgress />
    </Box>
    :""
    }



    {
      (!loading && success)
    ?<AdminUserTable rows={usersList}></AdminUserTable>
    :<CircularProgress />
    }
    
    </>
  
  )
}

export default AdminUsers