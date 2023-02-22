import {useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Button, LinearProgress } from '@mui/material';

import { getUserDataAsync } from '../../asyncActions/userAction';
import { updateUserDetails,clearErrorAsync } from '../../features/detailsUpdate/userDetailsUpdate';

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
const EditDetails = ({open,setOpen}) => {


    const dispatch=useDispatch();
    const {user}=useSelector((e)=>e.user);
    const {loading,success,error,successNote }=useSelector((e)=>e.userDetailsUpdate)
    const [details,setDetail]=useState({
        username:user.username,
        email:user.email,
        name:user.name,

    })

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

    const getValues=(e)=>{
      setDetail({...details,[e.target.name]:e.target.value});
    }

    const submitDetails=()=>{
      dispatch(updateUserDetails(details));
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
            Edit user details
          </Typography>
     <TextField 
     id="username" 
     label="Username" 
     variant="outlined"
     onChange={getValues}
     name="username"
     value={details.username}
     sx={{paddingBottom:'1em'}} />

     <TextField 
     id="email" 
     label="email" 
     variant="outlined"
     onChange={getValues}
     name="email"
     value={details.email}
     sx={{paddingBottom:'1em'}} />

     <TextField 
     id="name" 
     label="name" 
     variant="outlined"
     onChange={getValues}
     name="name"
     value={details.name}
     sx={{paddingBottom:'1em'}} />

     <Button variant="contained" color="secondary" style={{marginTop:"1em"}} onClick={submitDetails}>Submit</Button>
     </Box>


    </Modal>
  )
}

export default EditDetails