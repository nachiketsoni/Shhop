import express from 'express';
import { registerUser,
         Login, 
         LogOut, 
         forgotPassword,
        resetPassword, 
        getUserDetails, 
        updateUserPassword, 
        updateAvatarByLink, 
        updateDetails, 
        updateShipInfo,
        getAllUsers,
        getIndividualUser,
        updateUserRole,
        deleteUser,
        uploadAvatarByFile} from '../controllers/userController.js';
        
import { authorizeRoles, isAuthenticatedUser } from '../middleware/auth.js';
const router=express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(Login);
router.route("/logout").get(LogOut);
router.route('/forgot/password').post(forgotPassword);
router.route('/reset/password/:token').put(resetPassword);
router.route('/details').get(isAuthenticatedUser, getUserDetails);
router.route('/update/password').put(isAuthenticatedUser, updateUserPassword);
router.route('/update/avatarViaLink').put(isAuthenticatedUser,updateAvatarByLink);
router.route('/update/details').put(isAuthenticatedUser,updateDetails);
router.route('/update/shipInfo').put(isAuthenticatedUser,updateShipInfo);

router.route('/upload/avatar').put(isAuthenticatedUser,uploadAvatarByFile);


router.route('/admin/allUsers').get(isAuthenticatedUser,authorizeRoles('admin'),getAllUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles('admin'),getIndividualUser);
router.route('/admin/updateRole/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateUserRole);
router.route('/admin/delete/user/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteUser);

export default router;

