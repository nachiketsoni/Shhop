import React from 'react'
import img from '../../asset/Error.png';
import './utilStyle.scss';
import { Link } from 'react-router-dom';
const ErrorPage = () => {
  return (
    <div id="ErrorPage">
        <img src={img} alt="" height={400} />
        <Link to="/" style={{textDecoration:'none'}}><h2>BACK TO HOME</h2></Link>

    </div>
  )
}

export default ErrorPage