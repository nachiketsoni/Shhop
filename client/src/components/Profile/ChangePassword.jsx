import {useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Button, LinearProgress } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import { clearErrorAsync, updatePassword } from '../../features/detailsUpdate/userPasswordUpdate';
import { getUserDataAsync } from '../../asyncActions/userAction';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display:'flex',
    flexDirection:"column",
    alignItems:'center',
  };

const ChangePassword = ({open,setOpen}) => {
    const dispatch=useDispatch();
    //   const {user}=useSelector((e)=>e.user);
      const {loading,success,error,successNote }=useSelector((e)=>e.userPasswordUpdate)
      const [details,setDetail]=useState({
          oldPassword:"",
          newPassword:"",
          confirmPassword:"",
  
      })
  
      useEffect((e)=>{
          if(success){
             dispatch(getUserDataAsync());
             alert(successNote)
             setOpen(false);
          }
      },[success])

      useEffect((e)=>{
        if(error){
          alert(error)
          dispatch(clearErrorAsync())
        }
      },[error])
  
      const getValues=(e)=>{
        setDetail({...details,[e.target.name]:e.target.value});
      }
  
      const submitDetails=()=>{
        dispatch(updatePassword(details));
        // console.log(details)
      }
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
       <Typography id="modal-modal-title" variant="h6" component="h2" sx={{paddingBottom:'1em'}}
       color="secondary">
              Change Password here
            </Typography>
            <TextField 
id="oldPassword" 
label="old Password" 
variant="outlined"
onChange={getValues}
name="oldPassword"
type="password"
value={details.oldPassword}
sx={{paddingBottom:'1em'}} />

<TextField 
id="newPassword" 
label="new Password" 
variant="outlined"
onChange={getValues}
name="newPassword"
type="password"
value={details.newPassword}
sx={{paddingBottom:'1em'}} />

<TextField 
id="reEnterPass" 
label="re-enter your Password" 
variant="outlined"
onChange={getValues}
name="confirmPassword"
type="password"
value={details.reEnterPass}
sx={{paddingBottom:'1em'}} />

  
      
       <Button variant="contained" color="secondary" style={{marginTop:"1em"}} onClick={submitDetails}>Submit</Button>
       </Box>
  
  
      </Modal>
    )
}

export default ChangePassword



