import {useState} from 'react'
import NavBar from '../NavBar/NavBar';
import css from './Hero.module.scss';
import {useSelector} from 'react-redux';
import { Outlet } from 'react-router-dom';

import HomeLayout from '../Elements/MainElements/HomeLayout';
import ProductCard from '../Elements/MainElements/ProductCard';
import HomeElements from '../Elements/MainElements/HomeElements';
import Footer from '../Footer.jsx/Footer';
import MobileNav from '../NavBar/MobileNav';
import { Box, Hidden, LinearProgress } from '@mui/material';



const Hero = () => {
  const {products,loading}=useSelector((store)=>store.products);
  const {user}=useSelector((store)=>store.user);

  return (
    <>
    <main>
  
    <NavBar></NavBar>
    <MobileNav/>
    {
      (loading)? <Box sx={{width:'100%',
    position:"absolute",
    top:'10vh',
    zIndex:'99',
    backgroundColor:'yellow',
    }}><LinearProgress x={{
    position:"absolute",
    bottom:0,
    }} color="primary"/></Box>
    :""
    }
   
    <Outlet/>
    <Footer/>
    
    </main>
  
    </>
  )
}

export default Hero