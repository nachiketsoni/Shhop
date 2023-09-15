import Razorpay from 'razorpay';
import {nanoid} from 'nanoid';
import crypto from 'crypto';

let instance=null;
export const createRaozrpayInstance=(url)=>{
  instance= new Razorpay({ key_id:process.env.RAZORPAY_KEY, key_secret: process.env.RAZORPAY_SECRET, });
}
export const createRazorpayOrder=(req,res,next)=>{
    try{
         var options = {
        amount: req.body.price,  // amount in the smallest currency unit
        currency: "INR",
        receipt: `recpt22~${nanoid()}`
      };
      instance.orders.create(options, function (err, order) {
        // console.log(order);
        res.status(200).json({ success:true,orderId: order.id,receipt:options.receipt });
      });
    }catch(err){
        res.status(400).json({message:err.message})
    }
   
}

export const paymentvarify=(req,res)=>{
    let body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
  

    var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest('hex');
    // console.log("sig received ", req.body.razorpay_signature);
    // console.log("sig generated ", expectedSignature);
    var response = { "signatureIsValid": "false" }
    if (expectedSignature === req.body.razorpay_signature) {
      response = { "signatureIsValid": "true" }
      // emptyCart(req.session.passport.user);
    }
    res.send(response);
}