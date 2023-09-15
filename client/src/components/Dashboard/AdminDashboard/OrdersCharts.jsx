import React from 'react'

import { Chart } from "react-google-charts";



const OrdersCharts = ({Data}) => {
  
const options = {
  title: "No. of orders per day basis",
  hAxis: { title: `${Data[0][0]}`},
  vAxis: { title:`${Data[0][1]}`},
  legend: "none",
};
  return (
    <div><Chart
    chartType="LineChart"
    data={Data}
    options={options}
    width="60vw"
    height="400px"
    legendToggle
  /></div>
  )
}

export default OrdersCharts