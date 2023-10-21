import express from "express"
import {createProduct} from '../controller/ProductController.js'
import {getProductById} from '../controller/ProductController.js'
import {getAllProduct} from '../controller/ProductController.js'
import {updateProduct} from '../controller/ProductController.js'
import {deleteProduct} from '../controller/ProductController.js'

import {authMiddleware, isAdmin} from '../middlewares/authMiddleware.js'


const productRouter = express.Router();

productRouter.post('/add',authMiddleware, isAdmin, createProduct);
productRouter.put('/:id',authMiddleware, isAdmin, updateProduct);
productRouter.delete('/:id', authMiddleware, isAdmin, deleteProduct);
productRouter.get('/getallproducts', getAllProduct);
productRouter.get('/:id', getProductById);


export { productRouter as productRouter };
