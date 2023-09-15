import styled from '@emotion/styled';
import { Button, Divider, FormControl, FormHelperText, InputAdornment, OutlinedInput, Paper, Stack, Switch, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system'
import React, { useState,useRef} from 'react'
import LinkIcon from '@mui/icons-material/Link';
import {useSelector,useDispatch} from 'react-redux'
import { updloadAvatarViaLink, uploadAvatarAsync } from '../../../features/detailsUpdate/userAvatarUpdate';


const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

const UploadImg = () => {

  let mediaQuery = window.matchMedia("(min-width: 813px)");

  const fileForm=useRef(null);
  const dispatch=useDispatch();
  const [fileLink,setFileLink]=useState({
    url:""
  });
    const [checked,setChecked]=useState(false)

    const handleChange=(e)=>{
      setChecked(e.target.checked)
    }

    const fileSubmitViaLinkHandler=()=>{
      dispatch(updloadAvatarViaLink(fileLink));
    }
    const fileUploadSubmition=(e)=>{
        e.preventDefault();
        let form=new FormData();
        form.set("avatar",e.target[0].files[0])
        dispatch(uploadAvatarAsync(form))
    }
    const FileChangeHandler=()=>{
        
        fileForm?.current.dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
          );
    }

    const style={
      width: 500,
      marginTop:'1em',
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
      flexDirection:(mediaQuery)?'column':'row'
    
    
    }
  return (
    <>
    <Typography variant="h6" component={'h2'} color="secondary" mb={2}>Upload Avatar</Typography>
    <Paper elevation={0}>
         <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Uplaod Via link</Typography>
        <AntSwitch inputProps={{ 'aria-label': 'ant design' }}  
        onChange={handleChange}
        checked={checked}/>
        <Typography>Uplaod the file</Typography>
      </Stack>
    </Paper>
     
      <Box sx={style}>

          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-weight"
            disabled={!checked?false:true}
            value={fileLink.url}
            name="url"
            onChange={(e)=>setFileLink({[e.target.name]:e.target.value})}
            endAdornment={<InputAdornment position="end"><LinkIcon color='secondary'></LinkIcon></InputAdornment>}
            aria-describedby="link"
            inputProps={{
              'aria-label': 'link',
            }}
          />
          <FormHelperText id="link">Paste Here image Link (e.g unsplash link)</FormHelperText>
          <Button variant="contained" disabled={!checked?false:true} onClick={fileSubmitViaLinkHandler}>Submit</Button>
          </FormControl>
          <Divider variant="middle" orientation="vertical" flexItem />
           <form onSubmit={(e)=>fileUploadSubmition(e)} ref={fileForm}>
               <Button variant="contained" component="label" disabled={checked?false:true}>
                 Upload
                 <input hidden name="avatar" type="file" onChange={FileChangeHandler} />
                </Button>
           </form>
     
      
      </Box>
    
    </>
  )
}

export default UploadImg