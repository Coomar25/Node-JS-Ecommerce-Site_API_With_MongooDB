import Product from '../models/productModel.js'
import expressAsyncHandler from 'express-async-handler'
import {validateMangoDbId} from '../utils/validateMangoDbId.js'
import slugify from 'slugify';




 export const createProduct = expressAsyncHandler(async(req, res)=> {
    try{
        if(req.body.title){
            req.body.slug = slugify(req.body.title);
        }
        const createProd = await Product.create(req.body);
        if(createProd){
            return res.status(200).json({
                message: "product has been add successfully"
            });
        }
    }catch(error){
        throw new Error(error);
    }
});


export const updateProduct = expressAsyncHandler(async(req, res)=> {
    const {id} = req.params;
    console.log(id);
    try{
        if(req.body.title){
            req.body.slug = slugify(req.body.title);
        }
        const updateProduct = await Product.findByIdAndUpdate(id , req.body, {new:true});
        if (!updateProduct) {
            return res.status(404).json({
                message: "Product not found",
            });
        }
        res.json(updateProduct);
    }catch(error){
        throw new Error(error);
    }
});


export const deleteProduct = expressAsyncHandler(async(req, res)=> {
    const {id} = req.params;
    try{
        const deleteProduct= await Product.findByIdAndDelete(id , req.body, {new:true});
        if (!deleteProduct) {
            return res.status(404).json({
                message: "Product not found",
            });
        }
        return res.status(200).json({
            message: "Product has been deleted successfully"
        });
    }catch(error){
        throw new Error(error);
    }
});



export const getProductById = expressAsyncHandler(async(req, res)=> {
    const {id} = req.params;
    validateMangoDbId(id);
    try{
        const findProduct =  await Product.findById(id);
        res.json(findProduct);

    }catch(error){
        throw new Error(error);
    }
});

// This is simple filtering from a query parameter //First Way of filtering
// export const getAllProduct = expressAsyncHandler(async(req, res) => {
//     // console.log(req.query);
//     try{
//         const allProduct = await Product.find(req.query);
//         res.json(allProduct);
//     }catch(error){
//         throw new Error(error);
//     }

// });



// Second Way of filtering the product
// export const getAllProduct = expressAsyncHandler(async(req, res) => {
//     // console.log(req.query);
//     try{
//         const allProduct = await Product.find({
//             brand: req.query.brand,
//             category: req.query.category
//         });
//         res.json(allProduct);
//     }catch(error){
//         throw new Error(error);
//     }

// });


// third way of filtering
// export const getAllProduct = expressAsyncHandler(async(req, res) => {
//     try{
//         const allProduct = await Product.where("category").equals(req.query.category);
//         res.json(allProduct);
//     }catch(error){
//         throw new Error(error);
//     }

// });


export const getAllProduct = expressAsyncHandler(async(req, res) => {
    try{
        const allProduct = await Product.where("category").equals(req.query.category);
        res.json(allProduct);
    }catch(error){
        throw new Error(error);
    }

});






