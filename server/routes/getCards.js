import express from 'express';
import { createCard, createProductReview, deleteCard, getCards, getProductDetails, getPRoductReviews, getProductsAdmin, updateProductDetails } from '../controllers/ProductCards.js';
import { authorizeRoles, isAuthenticatedUser } from '../middleware/auth.js';

const router=express.Router();
router.get('/', getCards);
router.get('/details/:id',getProductDetails);
router.get('/reviews',getPRoductReviews)

router.put('/create/review',isAuthenticatedUser,createProductReview);


//admin routes
router.post('/',isAuthenticatedUser,authorizeRoles("admin"),createCard);
router.route('/admin/delete/:id').delete(isAuthenticatedUser, authorizeRoles("admin"),deleteCard);
router.get('/admin/allProducts',isAuthenticatedUser,authorizeRoles('admin'),getProductsAdmin);
router.put('/admin/update/:id',isAuthenticatedUser,authorizeRoles('admin'),updateProductDetails);
export default router;