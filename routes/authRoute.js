import express from "express";
import { createUser, handleRefreshToken } from '../controller/UserController.js';
import {userLogin} from '../controller/UserController.js';
import {getallUser} from '../controller/UserController.js'
import {getSingleUser} from '../controller/UserController.js'
import {deleteSingleUser} from '../controller/UserController.js'
import {updateUser} from '../controller/UserController.js'
import {blockUser} from '../controller/UserController.js'
import { unblockUser } from "../controller/UserController.js";
import { logout } from "../controller/UserController.js";
import { updatePassword } from "../controller/UserController.js";
import { forgetPasswordToken } from "../controller/UserController.js";
import {resetPassword} from "../controller/UserController.js";


// create product
import { createProduct } from "../controller/ProductController.js"; 
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post('/register', createUser);
router.post('/login', userLogin);
router.get('/getallUser', getallUser);
router.get('/getSingleUser/:id', authMiddleware, isAdmin, getSingleUser);
router.delete('/deleteSingleUser/:id', deleteSingleUser );
router.post('/updateUser/:id', authMiddleware, updateUser);
// user blocked and unblocked by admin
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser);
// handle refresh token
router.get('/refresh', handleRefreshToken);
router.get('/logout', logout);

router.put('/updatepassword', authMiddleware, updatePassword);
// forget password
router.post('/forgetPasswordToken', forgetPasswordToken);
router.put('/reset-password/:token', resetPassword);


// product 
router.post('/addProduct', createProduct);

export { router as authRouter };

































// export const authRouter = () => {
//     const router = express.Router();
//     // router.post('/register', createUser);

//     app.use("/", (req,res)=> {
//         res.send("hello from server side");
//         });
// }

