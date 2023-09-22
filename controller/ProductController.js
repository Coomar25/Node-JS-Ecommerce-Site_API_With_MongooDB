import Product from '../models/productModel.js'
import expressAsyncHandler from 'express-async-handler'



 export const createProduct = expressAsyncHandler(async(req, res)=> {
    try{
        const createProd = await Product.create(req.body);
        if(createProd){
                return res.json('success');
        }
        return res.status(200).json({
            message: "priduct has been add successfully"
        });
    }catch(error){
        throw new Error(error);
    }
});




