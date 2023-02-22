import express from 'express';
const router=express.Router()

import {paymentvarify,createRazorpayOrder} from '../controllers/paymentController.js'
router.route('/order').post(createRazorpayOrder);
router.route('/verify').post(paymentvarify);

export default router;