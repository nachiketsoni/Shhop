import { Box, Button, LinearProgress, Modal, Rating, TextField } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { addReviewAsync, asyncUpdateStatus, getProductReviewsAsync } from '../../asyncActions/reviewAction';
import { useEffect } from 'react';
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
const RatingModel = ({open,setOpen,rating,setRating}) => {
  const {id}=useParams();
  const {updateLoading,updateSuccess,updateError}=useSelector((s)=>s.productReview);
  const dispatch=useDispatch();
  useEffect(()=>{
    if(updateSuccess){
      dispatch(getProductReviewsAsync({id}))
      dispatch(asyncUpdateStatus())
      setOpen(false)
    }

    if(updateError){
      alert(updateError)
      dispatch(asyncUpdateStatus())
    }

  },[updateSuccess,updateError])

  const handleSubmit=()=>{
    let data={...rating,['productId']:id}
    dispatch(addReviewAsync(data));
  }
  return (
    <Modal
    open={open}
    onClose={()=>{setOpen(!open)}}>
         <Box sx={style}>
         <Rating name="read-only" value={rating.rating} size="small" precision={0.5} readOnly />
         <TextField
          sx={{margin:'1em 0'}}
          label="Your comment"
          multiline
          rows={4}
          value={rating.comment}
          onChange={(e)=>{setRating({...rating,['comment']:e.target.value})}}
        />
        <Button variant="contained" disableElevation
        onClick={handleSubmit}>
            Submit
      </Button>
      {
        (updateLoading)
        ?<Box sx={{width:'80%'}} mt={2}><LinearProgress color="secondary"/></Box>
        :""
      
      }

         </Box>

    </Modal>
  )
}

export default RatingModel