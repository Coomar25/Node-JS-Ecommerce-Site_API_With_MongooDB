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



// k hunxa vaane
// For example, if you want to find all products with a price greater than $50, you might construct a query like this:
// Product.find({ price: { $gt: 50 } }) // $gte = greater than or equal


export const getAllProduct = expressAsyncHandler(async(req, res) => {
    try{
        // fILTERING GAREKO
        const queryObject = { ...req.query};
        const excludeFields = ["page", "sort", "limit", "fileds"];
        const queryObject2 = excludeFields.forEach((el) => delete queryObject[el]);
        let queryString = JSON.stringify(queryObject);
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        let query = Product.find(JSON.parse(queryString));

        // aaava shorting garne
        if(req.query.sort){
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        }else{
            query = query.sort("-createdAt");
        }

        // limiting a fileds

        if(req.query.fields){
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);
        }else{
            query = query.select('-__v');

        }

        // pagination 

        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page-1)*limit;
        query = query.skip(skip).limit(limit);
        if(req.query.page){
            const productCount = await Product.countDocuments();
            if( skip >= productCount) throw new Error("THis page does not exist");
        }
        console.log(page, limit, skip);







        const allProduct = await query;
        res.json(allProduct);
    }catch(error){
        throw new Error(error);
    }

});






