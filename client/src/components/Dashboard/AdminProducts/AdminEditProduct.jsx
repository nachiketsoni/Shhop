import {useEffect,useState} from 'react'
import { useNavigate,useParams} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { getProductDetailsAsync } from '../../../asyncActions/productDetailsAction';
import noCard from '../../../asset/noCard.png';

import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import { CircularProgress, LinearProgress, Modal } from '@mui/material';
import ProductEditForm from './ProductEditForm';
// import {useAlert} from 'react-alert'
import { AsyncClearStatus, getAdminProductAsync } from '../../../asyncActions/admin/adminProductAction';


const style={
    position:'absolute',
    top:'50%',
    left:'60%',
    transform:'translate(-50%,-50%)',
    overflow:'auto',
    maxHeight:600,
    maxWidth:500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display:'flex',
    flexDirection:"column",
    alignItems:'center',
}
const AdminEditProduct = () => {
    const dispatch=useDispatch();
    // const alert =useAlert();
    const {updateLoading,updateSuccess,updateError,updateSuccessNote}=useSelector((s)=>s.adminProducts)
    const {productDetails,loading,success,} =useSelector((s)=>s.productDetails);
    const [details,setDetails]=useState(null);

    const Navigate=useNavigate();
    const {id}=useParams();

    useEffect((e)=>{
      if(id==='new'){
        setDetails({
          _id:"",
          name:"",
          category:"",
          price:"",
          discount:"",
          oldPrice:"",
          Stock:"",
          tags:[],
          image:"",
          Note:"",
          description:"",
          images:[]
      })
      }else{
        dispatch(getProductDetailsAsync(id));
        if(success){
          setDetails(productDetails);
        }
      }
    },[success])

    useEffect((e)=>{
      if(updateSuccess){
        alert(updateSuccessNote)
        dispatch(getAdminProductAsync());
        dispatch(AsyncClearStatus())
        Navigate(-1)
      }
      if(updateError){
        alert(updateError);
        dispatch(AsyncClearStatus());
      }
    },[updateSuccess,updateError])
  return (
    <>
    <Modal
    sx={{display:'flex',
         justifyContent:'center',
         alignItems:'center'}}
         open={true}
         onClose={()=>{Navigate(-1)}}>

      <Box sx={style}>
      {(updateLoading)?<CircularProgress />:""}

      {
        (id==='new' && details)
        ?<><ProductEditForm details={details} 
        work={'create'}
        setDetails={setDetails}/></>
        :(loading)
        ?<CircularProgress/>
        :(success && details)
        ?<ProductEditForm details={details} setDetails={setDetails}/>
        :<img src={noCard} width="90%"/>

      }
      {(updateLoading)?<CircularProgress />:""}
      

        </Box>
    </Modal>
    </>
  )
}

export default AdminEditProduct