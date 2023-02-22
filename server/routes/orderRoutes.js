import express from 'express';
import {deleteOrder, getOrdersForAdmin, getSingleOrder, getUserOrders, newOrder, updateOrder} from '../controllers/orderController.js'
import { authorizeRoles, isAuthenticatedUser } from '../middleware/auth.js';
const router=express.Router();

router.post("/",isAuthenticatedUser,newOrder);
router.get("/userOrders",isAuthenticatedUser,getUserOrders);

router.get("/admin/allOrders",isAuthenticatedUser,authorizeRoles("admin"),getOrdersForAdmin); //admin route
router.put("/admin/update/status/:id",isAuthenticatedUser,authorizeRoles("admin"),updateOrder)
router.delete("/admin/delete/:id",isAuthenticatedUser,authorizeRoles("admin"),deleteOrder);
router.get("/admin/order/:id",isAuthenticatedUser,authorizeRoles('admin'),getSingleOrder)
export default router;