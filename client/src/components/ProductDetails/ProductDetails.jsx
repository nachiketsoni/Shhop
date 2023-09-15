import { Alert, Avatar, Box, Button, Chip, CircularProgress, IconButton, Paper, Rating, Skeleton } from '@mui/material';
import {useEffect, useState,useRef} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import { useParams,useNavigate} from 'react-router-dom'
import {getProductDetailsAsync} from '../../asyncActions/productDetailsAction';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Carousel from 'react-material-ui-carousel'

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack'
import './productDetails.scss'
import RatingModel from './RatingModel';
import { getProductReviewsAsync } from '../../asyncActions/reviewAction';
import { addToTheCart, removeFromTheCart } from '../../features/cartSlice';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';

const ProductDetails = () => {
  const [scrollFlag, setScrollFlag] = useState(false);
  const Navigate=useNavigate();
  let mediaQuery = window.matchMedia("(max-width: 813px)");
const handleScroll = () => {
    const position = window.pageYOffset;
    let parameter=scrollRef.current.offsetHeight-520;
    if(position>parameter){
      setScrollFlag(true)
    }else{
      setScrollFlag(false)
    }
};

    const cOptions={
      animation:'slide',
      autoPlay:false
    }

    const scrollRef=useRef();
    const {id}=useParams();
    const {cart} =useSelector(state=>state.cartData);
    const {user}=useSelector((s)=>s.user);
    const {productDetails,loading,success}=useSelector((e)=>e.productDetails)
    const ReviewData=useSelector((s)=>s.productReview);
    const dispatch=useDispatch();
    const [rating,setRating]=useState({
      rating:0,
      comment:""
    });
    const [ratingModel,setRatingModel]=useState(false)

    useEffect((s)=>{
         dispatch(getProductDetailsAsync(id))
         dispatch(getProductReviewsAsync({id}));
         if(ReviewData.success || ReviewData.updateSuccess ){
          let elm=ReviewData.productReviews.find((elm)=>elm.user._id===user?._id)
          if(elm){
            setRating({
              rating:elm.rating,
              comment:elm.comment
            })
          }
         }
         
    },[ReviewData.success,ReviewData.updateSuccess]);

    useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
  
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);

    const fTimeCart=()=>{
      dispatch(addToTheCart({productId:id,Qty:1,productData:productDetails,pTotal:productDetails.price}));
     }
     const increaseQty=()=>{
      let prevQty=cart.find((elm)=>elm.productId===id).Qty
      if(prevQty<productDetails.Stock){
         prevQty++
      dispatch(addToTheCart({productId:id,Qty:prevQty,pTotal:productDetails.price*prevQty})); 
      }
     
     }

     const decreaseQty=()=>{
      let prevQty=cart.find((elm)=>elm.productId===id).Qty;
      if(prevQty>1){
          prevQty--;
          dispatch(addToTheCart({productId:id,Qty:prevQty,pTotal:productDetails.price*prevQty}));
      } else{
          dispatch(removeFromTheCart({productId:id}))
      }
  
     }
     

    const style={
      position:"absolute",
      width:"20vmax",
      left:"50%",
      transform:'translate(-50%,-50%)',
      zIndex:99,
      top:'50%',

    }

  return (
    <div className='productDetails'>
      <div id="pdLft">
     

        <div className="mainImg" style={(!mediaQuery.matches)?{position:(scrollFlag?'initial':'fixed'),
      width:(scrollFlag?'100%':'60%')}:{}}>
      
           {
            (loading)
            ?<Skeleton variant="rounded" width={"90%"} height={'40vmax'} />
            :<>
            <div id="imgContainer">
            <img src={productDetails?.image} alt="" />

            </div>
           
             
              <Carousel sx={style} {...cOptions}>
          {
            productDetails?.images.map((e)=><Paper key={e.public_id}
            style={{padding:'1em',
             width:'100%'}}>
              <img src={e.url} alt="imge" width="50vmax"/>
            </Paper>)
          }
              </Carousel>
              <div id="pOvly">
      </div>
              <i className="ri-arrow-left-s-line" id="pBack" onClick={()=>Navigate(-1)}></i>
             </>
        
           }
              
      
        </div>
     
       
      </div>
     
      <div id="pdRt" ref={scrollRef}>
         <div id="pDetails">
         <Stack direction="row" spacing={1}>
          {/* <Skeleton width={"90%"}/> */}
          {
            productDetails?.tags.map((e,i)=> <Chip key={i} color='primary' label={e} />)
          }
         </Stack>

         <Paper sx={{marginTop:'1em',padding:"1em"}} elevation={0}>
         <Typography variant="subtitle2" component="h6" color="secondary">{productDetails?.category.toUpperCase()}</Typography>
         <Typography variant="body2" component="h2">{productDetails?.Note}</Typography>
         <Typography variant="h3" component="h1">{productDetails?.name.toUpperCase()}</Typography>
         <Rating name="read-only" value={productDetails?.ratings || 0} size="small" precision={0.5} readOnly />
         <Typography variant="caption" component="p">({productDetails?.numOfReviews} Reviews)</Typography>
         {/* <Typography variant="h6" component="h6"><Skeleton></Skeleton></Typography>
         <Typography variant="subtitle2" component="h2"><Skeleton></Skeleton></Typography>
         <Typography variant="h3" component="h1"><Skeleton></Skeleton></Typography> */}
         {/* <Rating name="read-only" value={3.5} size="small" precision={0.5} readOnly /> */}
         {/* <Typography variant="caption" component="p"><Skeleton></Skeleton></Typography> */}




         </Paper>
         <Box mt={4}>
          {
            productDetails?.Stock!==0
            ?<>
            {
            (cart.find((e)=>(e.productId===id)))
            ?<Stack direction="row" spacing={1}>
              <IconButton aria-label="add" onClick={increaseQty}>
              <AddCircleIcon />
              </IconButton>
              <Typography variant="h5" component="h6" color="secondary">{cart.find((e)=>(e.productId===id)).Qty}</Typography>
              <IconButton aria-label="subtract" onClick={decreaseQty}>
              <DoNotDisturbOnIcon />
              </IconButton>
            
             </Stack>
            : <Button variant="contained" 
            color="primary" 
            endIcon={<ShoppingCartRoundedIcon />}
            onClick={fTimeCart}>ADD TO CART</Button>
          }
            
            </> 
            :<Alert severity="info">This item is currently out of stock</Alert>
          }
          
        

         </Box>
         <Paper sx={{marginTop:'1em',padding:"1em"}} elevation={0}>
         <Typography variant="subtitle2" component="h2">ITEM DESCRIPTION</Typography>
         <Typography variant="body2" mt={2} component='p' paragraph>{productDetails?.description}</Typography>
         <Typography variant="body2" mt={2} component='p' paragraph>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, rerum ratione iure aliquam harum maxime alias? Fugiat voluptate voluptatem minus quia officiis. Quos quod accusantium nulla molestiae ullam mollitia qui!</Typography>

         </Paper>
         <Box sx={{display:'flex',alignItems:'center',justifyContent:"space-around"}} mt={4}>
         <Rating name="no-value" value={rating.rating} size="large"  onChange={(event, newValue) => {
             setRating({...rating,rating:newValue});
            }} />
         <Button variant="contained" color="secondary" endIcon={<EditRoundedIcon />} onClick={()=>setRatingModel(true)}>REVIEW PRODUCT</Button>

         </Box>
         <Paper sx={{display:'flex',flexDirection:'column',alignItems:'center',padding:'1em 0',marginTop:'1em'}}
           elevation={0}>
            <Box sx={{display:'flex',flexDirection:'column',width:'80%'}}>

           <Typography variant="subtitle2" component="h2">USER REVIEWS</Typography>

          {
            (ReviewData && ReviewData.loading)
            ?<Skeleton/>
            :(ReviewData.productReviews.length!==0)
                ?ReviewData?.productReviews.map((e)=> 
                   <Paper key={e?._id} sx={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:"1em",marginTop:'1em'}} elevation={3}>
            <Avatar src={e.user.avatar.url} alt={e.user.username} sx={{ width: 56, height: 56 }}></Avatar>
            <Box sx={{display:'flex',flexDirection:'column',marginLeft:'1em',width:"70%"}}>
                <Typography variant="subtitle2" component="h3">{e.user.name}</Typography>
                <Rating name="no-value" value={e.rating} size="small" />
                <Typography variant="caption" component='p'>{e.comment}</Typography>

           </Box>
                   </Paper>)
                :  <Typography variant="body2" component="h6" color="secondary">Be the first one to review this produtct</Typography>

           
          }
         
        </Box>
         </Paper>
       
          
        

         
          
        
      
         </div>
      </div>
      <RatingModel open={ratingModel} setOpen={setRatingModel} rating={rating}  setRating={setRating} />
       
    </div>
  )
}

export default ProductDetails