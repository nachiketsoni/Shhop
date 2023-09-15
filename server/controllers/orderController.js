import Order from '../models/orderModel.js';
import ProductCard from '../models/products.js';
import Product from '../models/products.js';


//Create new Order
export const newOrder=async(req,res,next)=>{
  try{
      let {shippingInfo,orderItems,paymentInfo}=req.body;
      paymentInfo={...paymentInfo,paidAt:new Date()};
  // console.log(req.body)
const order=await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    user:req.user._id,
    orderStatus:"Processing",
    deliveredAt:new Date(
      Date.now() + 10*24*60*60*1000
  ),
});

res.status(201).json({
    success:true,
    order
})
  }catch(err){
    res.status(400).json({
      message:err.message
    })
  }
  
};

//get single Order
export const getSingleOrder=async (req,res)=>{
  try{
    const order=await Order.findById(req.params.id).populate("user","name email");
    if(!order){
      return res.status(404).json("Order not found with this id");
    }
    return res.status(200).json({
      success:true,
      order
    })

  }catch(err){
    return res.status(404).json({
      success:false,
      message:err.message
    })
  }
}

//get all orders created by a perticular user logged in user orders
export const getUserOrders=async(req,res,next)=>{
  try{
    const order= await Order.find({user:req.user._id});
    res.status(200).json({data:order});

  }catch(err){
    res.status(400).json({message:err.message})
  }
}

//get all orders for admin
export const getOrdersForAdmin=async(req,res,next)=>{
  try{
    let data=await Order.find();
    let totalAmount=0;
    data.forEach((order)=>{
      totalAmount+=order.paymentInfo.itemsPrice;
    })
    res.status(200).json({
      success:true,
      totalAmount,
      orders:data,
    });

  }catch(err){
    res.status(400).json({message:err.message})
  }
}

//update Order Status --admin
export const updateOrder=async(req,res,next)=>{
  try{
    const order=await Order.findById(req.params.id);
    if(!order){
      return res.status(404).json({
        message:"Order not found with this Id"
      })
    }
    if(order.orderStatus==="Delivered"){
      return res.status(400).json({
        message:"You have already delivered this order"
      })
    }
    if(req.body.status==="Shipped"){
      order.orderItems.forEach(async (e)=>{
        await updateStock(e.product,e.quantity);
      })
    }
    order.orderStatus=req.body.status;
    if(req.body.status==="Delivered"){
      order.deliveredAt=Date.now();
    }

    await order.save({validateBeforeSave:false});
    return res.status(200).json({
      success:true,
    })

  }catch(err){
     return res.status(404).json({message:err.message})
  }
}

async function updateStock(id,quantity){
  const product=await ProductCard.findById(id);
  if(!product){
    return;
  }
  product.Stock-=quantity;
  await product.save({validateBeforeSave:false});
}

//delete Order --admin
export const deleteOrder=async(req,res)=>{
  try{
    const order=await Order.findById(req.params.id);
    if(!order){
      return res.status(404).json({message:"Order not found with this Id"});
    }
    await order.remove();
    return res.status(200).json({
      success:true,
    })

  }catch(err){
    return res.status(404).json({
      success:false,
      message:err.message
    })
  }
}