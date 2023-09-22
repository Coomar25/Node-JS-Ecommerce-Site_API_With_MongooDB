import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import expressAsyncHandler from "express-async-handler"


export const authMiddleware =  expressAsyncHandler( async (req, res, next)=> {

    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")){

        token= req.headers.authorization.split(" ")[1];
        try{
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decoded?.id);
                req.user = user;
                next();
            }
        }catch(error){
            throw new Error(" Not authorized token expired, Please login again");
        }
    }else{
        throw new Error("There is no token attached to header");
    }

});



export const isAdmin = expressAsyncHandler(async(req, res, next)=> {
        console.log(req.user);
});