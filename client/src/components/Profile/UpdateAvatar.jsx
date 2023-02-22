import React, { useEffect } from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import UploadImg from '../utils/Forms/UploadImg';
import { CircularProgress, LinearProgress } from '@mui/material';
import { useSelector,useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrorAsync } from '../../features/detailsUpdate/userAvatarUpdate';
import { getUserDataAsync } from '../../asyncActions/userAction';
// import { updateStatusReset } from '../../features/DetailsUpdate';

const UpdateAvatar = ({open,setOpen}) => {
  const dispatch=useDispatch();
  const {loading,success,error,successNote }=useSelector((e)=>e.userAvatarUpdate);

  useEffect((e)=>{
    if(success){
       dispatch(getUserDataAsync());
       dispatch(clearErrorAsync());
       alert("User details successfully edited");
       setOpen(false);
    }
    if(error){
      alert(error)
      dispatch(clearErrorAsync());
    }
},[success,error])
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display:'flex',
    flexDirection:"column",
    alignItems:'center',
  };  
    return (
    <Modal
    open={open}
    onClose={()=>{setOpen(!open)}}>
         <Box sx={style}>
         {
            (loading)
            ?  <Box sx={{ width: '100%',margin:'1em 0' }}>
            <LinearProgress />
            </Box>
            :""
          }
            <UploadImg></UploadImg>
            
        </Box>
    </Modal>
    
  )
}

export default UpdateAvatar