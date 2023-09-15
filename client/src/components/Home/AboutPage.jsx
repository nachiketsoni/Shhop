import {useState,useEffect} from 'react'
import './about.scss';
import axios from 'axios';

const AboutPage = () => {
  // const [img,setImg]=useState(null);
  // useEffect((s)=>{
  //   axios.get('https://images.unsplash.com/photo-1535957998253-26ae1ef29506?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80')
  //   .then((s)=>{
  //     setImg(s.data);
  //   }).catch((s)=>{
  //     console.log(s);
  //   })

  // })

  return (
    <div id="aboutPage">
      <div id="alft">
        <h1>Hi! I'm Nachiket </h1>
        <h4>The developer and designer of this site .</h4>
        <h2>Hope you have a great experience 
with this site. I have made this with great 
enthusiasm and pleasure during my learning 
phase of react js 😁. </h2>
<h6>Connect me:</h6>
<div id="myLinks">
<div className="linkElm">
<i className="ri-mail-line"></i>
  <a target='blank' href="https://mail.google.com/mail/u/0/?fs=1&to=nxchikxt@gmail.com&tf=cm">gmail</a>
  </div>
  <div className="linkElm">
  <i className="ri-github-fill"></i>
  <a target='blank'  href="https://github.com/nachiketsoni">gitHub</a>
  </div>
  <div className="linkElm">
  <i className="ri-linkedin-fill"></i>
  <a target='blank'  href="https://www.linkedin.com/in/nachiket-soni-2868a2225/">linkedin </a>
  </div>
  <div className="linkElm">
  <i className="ri-terminal-box-fill"></i>
  <a target='blank'  href="https://www.hackerrank.com/nxchikxt">HackerRank</a>
  </div>
  
</div>
      </div>
      <div id="art">
        <div id="orngShade">

        </div>
        <div id="frameImg">
          <img src='https://images.unsplash.com/photo-1535957998253-26ae1ef29506?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80' alt="" />

        </div>
        <div id="greenShade"></div>
      </div>

    </div>
  )
}

export default AboutPage