import {useState} from 'react'
import css from '../styles/Elements.module.scss';
import { useParams } from 'react-router-dom';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider} from '@mui/material/styles';

import {getProductsAsync} from '../../../asyncActions/productAction';
import {useSelector,useDispatch} from 'react-redux'
import { useEffect } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E26849',
    },
  },
});

const HomeElements = () => {
  let {keyword}=useParams()
  const {products,resultPerPage,productsCount,filteredProductsCount,loading}=useSelector((store)=>store.products)
    const [currentPage,setCurrentPage]=useState(1);
    const [range, setRange] = useState([0, 75000]);
    const [categories,setCategories]=useState(["All","footwear","stationary","beauty","groceries","fashion","electronics"])
    const [category,setCategory]=useState(null);
    const dispatch=useDispatch();
    const handleRange = (event, newValue) => {
      setRange(newValue);
    };

    const setCurrentPageNo=(e,page)=>{
        setCurrentPage(page);
    }
    useEffect((e)=>{
    dispatch(getProductsAsync(currentPage,range,category,keyword));
    },[currentPage,range,category,keyword])
  return (
    <>
    <div className={css.blank}></div>
    <div className={css.SidePanel}>
 
    <div className={css.Filter}>
    <h3 className={css.eHeading}>Price Range</h3>
   
    <Box width={200}>
    <Slider
        size={"small"}
        getAriaLabel={() => 'Price Range'}
        value={range}
        min={0}
        max={75000}
        onChange={handleRange}
        valueLabelDisplay="auto"
      />
    </Box> 
   
   
    <h3 className={css.eHeading}>Categories</h3>
    {
        categories.map((e,i)=>{
            return <p key={i} className={css.Ctg} onClick={()=>{(e!=='All')?setCategory(e):setCategory(null)}}>{e}</p>
        })
    }
    
    </div>
   {(productsCount)?
    <div className={css.Pagination}>
          <Box
          
           sx={{
            marginTop:"1em",
            width:"100%",
          }}>
            <Pagination 
            count={Math.ceil(filteredProductsCount/resultPerPage)} 
            size="small" 
            color="primary"
            onChange={setCurrentPageNo}
            page={currentPage}
            sx={
              {
                position:'initial'
              }
            }
        
            /> 
          </Box>
    </div>
    :" "
   }
    

 
    </div>
    
    </>
  )
}

export default HomeElements