import {useState,useEffect} from 'react'

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { statesName } from '../Json/StatesNames';
import {useSelector,useDispatch} from 'react-redux';
import { Alert, Checkbox, FormControlLabel } from '@mui/material';
import { updateShippingInfo } from '../../../features/detailsUpdate/userShipInfoUpdate';
const ShipForm = ({shipData,setShipData}) => {
    const {user}=useSelector((s)=>s.user);
    const dispatch=useDispatch();

   
    const fStyle={
        width:"100%",
        marginTop:'1em'
    }
    const validationSchema = Yup.object().shape({
      address: Yup.string().required('address is required'),
      city: Yup.string()
        .required('City is required'),
      state: Yup.string()
        .required('State is required'),
        phoneNo: Yup.number()
        .required('phone number is required'),
        pinCode: Yup.number()
        .required('pincode is required')
    });
    const {
      register,
      control,
      handleSubmit,
      formState: { errors }
    } = useForm({
      resolver: yupResolver(validationSchema)
    });

     const onSubmitHandler=(data)=>{
       dispatch(updateShippingInfo(data));
       setShipData(data)
     }
  return (
  <>
  
   <Box
            component="form"
            sx={{width:"100%"}}
            >
            <Typography variant='h6' 
            component='h2' 
            color="secondary" 
            align="center"
            sx={{marginBottom:'1em'}}>{user.shippingInfo.writtenBy?"Edit":"Add"} the shipping Information</Typography>

           <TextField
               required
               id="outlined-textarea"
               label="Address"
               placeholder="Enter your address"
               multiline
               style={fStyle}
               name="address"
               {...register('address',{value:shipData.address})}
               error={errors.address ? true : false}
             />
             <TextField
               required
               id="outlined-required"
               placeholder="Enter your city"
               label="City"
               size="small"
               style={fStyle}
               name="city"
               {...register('city',{value:shipData.city})}
               error={errors.city ? true : false}
               
             />
          <FormControl fullWidth 
          style={fStyle}
          >
        <InputLabel id="state-label">State</InputLabel>
        <Select
          labelId="state-label"
          id="state-label"
          label="State"
          name="state"
          defaultValue=""
          {...register('state',{value:shipData.state})}
          error={errors.state ? true : false}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            Object.keys(statesName).map((e)=>{
              return <MenuItem key={e} value={`${statesName[e]}`}>{statesName[e]}</MenuItem>
            })
          }
        </Select>
      </FormControl>
             <Box
             sx={{
               width:"100%",
               display:'flex',
               justifyContent:"space-between",
               marginTop:"1em",
               marginBottom:'1em'
             }
             }>
             <TextField
               required
               placeholder="Enter mobile no."
               id="outlined-required"
               label="Phone no."
               size="small"
               style={{width:"45%"}}
               {...register('phoneNo',{value:shipData?.phoneNo})}
               error={errors.phoneNo ? true : false}
     
               
             />
              <TextField
               required
               placeholder="Enter pincode"
               id="outlined-required"
               label="Pincode"
               size="small"
               style={{width:"45%"}}
               {...register('pinCode',{value:shipData?.pinCode})}
               error={errors.pinCode ? true : false}
             />
     
             </Box>
             <Paper elevation={0} sx={{display:'flex',
             justifyContent:'center',
             flexDirection:'column',
             alignItems:'center'}}>
             <FormControlLabel
                control={
                  <Controller
                    control={control}
                    name="writtenBy"
                    defaultValue={user.shippingInfo.writtenBy}
                    inputRef={register()}
                    render={({ field: { onChange } }) => (
                      " "
                    )}
                  />
                }
                label={
                  <Alert severity="info">Please fill all the details correctly</Alert>
                }
              />
           
             <Button variant="contained" sx={{margin:'0 auto',marginTop:"1em"}} onClick={handleSubmit(onSubmitHandler)}>Submit</Button>
             </Paper>
    </Box> 
  </>
  )
}

export default ShipForm