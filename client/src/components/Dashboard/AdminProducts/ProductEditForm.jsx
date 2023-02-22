import React, { useState } from 'react'


import './adminProduct.scss';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Avatar, Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import Chip from '@mui/material/Chip';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import {useSelector,useDispatch} from 'react-redux';
import { createNewProductAsync, updateProductDetailsAsync } from '../../../asyncActions/admin/adminProductAction';


const ProductEditForm = ({details,work,setDetails}) => {
    const dispatch=useDispatch();



    const [images,setImages]=useState([]);
    const [previewImg,setPreviewImage]=useState([]);
    const getValues=(e)=>{
      setDetails({...details,[e.target.name]:e.target.name==='tags'?e.target.value.split(" "):e.target.value});
    }
    const submitDetails=()=>{
      let form=new FormData();
      let data={...details};
        delete data._id;
        delete data.images;
        delete data.reviews;

      for(let i in data){
        form.set(i,data[i])
      }
      images.forEach((s)=>{
        form.append("images",s)
      })
      // for(let i of form.entries()){
      //   console.log(i)
      // }
      if(work==='create'){
        dispatch(createNewProductAsync(form));
      }else{
        dispatch(updateProductDetailsAsync(details._id,form));
      }
    }
    const productImagesHandler=(e)=>{
       const files=Array.from(e.target.files);
       files.forEach((file)=>{
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setPreviewImage((old) => [...old, reader.result]);
            setImages([...images,reader.result])
          }
        };
          reader.readAsDataURL(file);
       })
    }

    
  return (
    <>
     <div id="pModelHeader">
      <Typography color="secondary" variant="h6" component="h2">{work} product! </Typography>
      {(work!=='create')
        ?<Typography color="primary" variant="caption" component="p">Product id: {details._id}</Typography>
        :""}
      </div>  
      <div id="pModelBody">
        <div className="pElm">
        <Avatar alt={details.name} src={details.image} sx={{ width: 100, height: 100,marginRight:'1em' }} />
          <div>
            <TextField 
      
     id="name" 
     label="name" 
     size="small"
     variant="outlined"
     onChange={getValues}
     name="name"
     value={details.name}
     sx={{paddingBottom:'1em',width:"100%"}} />
     
     <FormControl sx={{width:'100%' }}>
     <InputLabel id={'category'}>category</InputLabel>
      <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={details.category}
    name="category"
    label="category"
    onChange={getValues}
    size="small"
  >
    <MenuItem value={'footwear'}>footwear</MenuItem>
    <MenuItem value={'stationary'}>stationary</MenuItem>
    <MenuItem value={'beauty'}>beauty</MenuItem>
    <MenuItem value={'groceries'}>groceries</MenuItem>
    <MenuItem value={'fashion'}>fashion</MenuItem>
    <MenuItem value={'electronics'}>electronics</MenuItem>
  </Select>
     </FormControl>
          </div>
            
        </div>
       
     <div className="pElm">
      <TextField 
     id="oldPrice" 
     label="oldPrice" 
     variant="outlined"
     onChange={getValues}
     name="oldPrice"
     size="small"
     value={details.oldPrice}
     sx={{paddingBottom:'1em',flexBasis:'30%'}} />
         <TextField 
     id="discount" 
     label="discount" 
     variant="outlined"
     onChange={getValues}
     name="discount"
     size="small"
     value={details.discount}
     sx={{paddingBottom:'1em',flexBasis:'30%'}} />
     
<TextField 
     id="Stock" 
     label="Stock" 
     variant="outlined"
     onChange={getValues}
     name="Stock"
     size="small"
     value={details.Stock}
     sx={{paddingBottom:'1em',flexBasis:'30%'}} />
     </div>
    
    <TextField 
     id="Note" 
     label="Note" 
     variant="outlined"
     onChange={getValues}
     name="Note"
     size="small"
     value={details.Note}
     sx={{paddingBottom:'1em',width:"90%"}} />
     <TextField
          label="Description"
          multiline
          maxRows={4}
          name="description"
          value={details.description}
          onChange={getValues}
          sx={{paddingBottom:'1em',width:"90%"}}
        />
       
        <TextField 
     id="imageLink" 
     label="Image Link" 
     variant="outlined"
     onChange={getValues}
     name="image"
     size="small"
     value={details.image}
     sx={{paddingBottom:'1em',width:"90%"}}
      />
      <div className="pElm">
        <TextField
          label="Tags"
          name="tags"
          onChange={getValues}
          size="small"
          value={details.tags.join(" ")}
          sx={{width:'30%'}}
        />
        <div id="pTags">
          {
            details.tags.map((e,i)=> (e.length!==0)?<Chip key={i} label={e} color="primary" size="small"/>:"")

          }
        </div>
        
          
     

        </div>
        <div className="pImgs">
        <Button sx={{marginBottom:"1em"}} variant="contained" component="label" endIcon={<CloudUploadIcon  />}>
          Upload
          <input hidden accept="image/*" type="file"  name="images"
            onChange={productImagesHandler} />
        </Button>
        <Grid container spacing={2}>
          {
            previewImg?.map((img,i)=><Grid key={i} item >
            <Avatar alt="Remy Sharp" src={img} />
            </Grid>)
          }
  
      </Grid>
        </div>
      </div>
      <Button variant="contained" color="secondary" style={{marginTop:"1em"}} onClick={submitDetails}>Submit</Button>
    
    </>
  )
}

export default ProductEditForm