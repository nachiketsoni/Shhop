import React from 'react'
import img from '../../asset/internalServer.png'
const InternalServer = () => {
    const refreshPage=()=>{
        window.location.reload(false);
    }
  return (
    <div id="ErrorPage">
    <img src={img} alt="" height={400} />
    <h2 onClick={refreshPage}>BACK TO HOME</h2>

</div>
  )
}

export default InternalServer