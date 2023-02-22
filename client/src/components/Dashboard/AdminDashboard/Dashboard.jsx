import {useEffect, useState} from 'react'
import {useSelector,useDispatch} from 'react-redux';

import {NumericFormat} from "react-number-format";

import OrdersCharts from './OrdersCharts';


function dates(i){
  let date=new Date();
  date.setDate(date.getDate()-i);
  return date;
}
const datesSeries=[];
for(let i=0;i<5;i++){
  datesSeries.push(dates(i));
}
const Dashboard = () => {
 const [orderDateWise,setOrderDateWise]=useState(null);
 const [graphData,setGraphData]=useState(null);

  const orderData=useSelector((s)=>s.adminOrders);
  const productData=useSelector((s)=>s.adminProducts);
  const userData=useSelector((s)=>s.adminUsers);
  
  useEffect((s)=>{
    if(orderData.success){
      let hash={}
       orderData.orders.forEach((e)=>{
        let tmp=e.createdAt.slice(0,10);
        if(Object.keys(hash).length<=5){
           if( hash[tmp]){
        hash[tmp]++;
        }else{
          hash[tmp]=1;
        }
        }
      
       })
       let graphData=[];
       graphData=Object.keys(hash).map((e)=>{
        return [e,hash[e]]
       })
       graphData.unshift(["Date","No. of Orders"])
       setGraphData(graphData);
    }
  },[orderData])

  return (
    <div className='dashboard'>
         <div id="aOrderHeader">
      <h1>Admin Dashboard</h1>
    </div>
    <div id="totalAmount">
      <h2>Total Amount</h2>
    <NumericFormat
    value={orderData?.totalAmount}
    displayType={"text"}
    thousandSeparator={true}
    prefix={"Rs "}
    className="numFormat"/>
      </div>
      <div id="fullTally">
        <div className="fTElm">
          <h3>Total No. of Products</h3>
          <h1>{productData.productsCount}</h1>
        </div>
        <div className="fTElm">
          <h3>Total No. of Orders</h3>
          <h1>{orderData?.orders.length}</h1>

        </div>
        <div className="fTElm">
          <h3>Total No. of Users</h3>
          <h1>{userData?.usersCount}</h1>

        </div>
      </div>
      
      {
      (graphData)
      ?<OrdersCharts Data={graphData}/>
      :" "
    }

      
      </div>
  )
}

export default Dashboard