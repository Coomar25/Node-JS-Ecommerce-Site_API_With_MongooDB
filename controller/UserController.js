import { generateToken } from "../config/jwtToken.js";
import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"


export const createUser = async (req, res) => {
    try {
        const email = req.body.email;
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
                success: false,
            });
        }
        // Create a new user
        const newUser = await User.create(req.body);
        return res.status(201).json({
            message: "User created successfully",
            success: true,
            user: newUser,
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

// module.exports= { createUser };

// update user
export const updateUser = asyncHandler(async(req, res)=> {
    const {id} = req.params;
    try{
        const userToUpdate = await User.findById(id);
        if(!userToUpdate){
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        userToUpdate.firstname = req.body.firstname || userToUpdate.firstname;
        userToUpdate.lastname = req.body.lastname || userToUpdate.lastname;
        userToUpdate.email = req.body.email || userToUpdate.email;
        userToUpdate.mobile = req.body.mobile || userToUpdate.mobile;

        await userToUpdate.save();

        return res.status(200).json({
            message: "User updated successfully",
            success: true,
            user: userToUpdate,
        });
    }catch(error){
        console.error("Error updating user", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }     
});

// Easy way to update 
// export const updateUser = asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const updateData = req.body; // Data to update
//     try {
//         const userToUpdate = await User.findByIdAndUpdate(
//             id,
//             updateData,
//             { new: true } // This option returns the updated user
//         );
//         if (!userToUpdate) {
//             return res.status(404).json({
//                 message: "User not found",
//                 success: false,
//             });
//         }
//         return res.status(200).json({
//             message: "User updated successfully",
//             success: true,
//             user: userToUpdate,
//         });
//     } catch (error) {
//         console.error("Error updating user", error);
//         return res.status(500).json({
//             message: "Internal server error",
//             success: false,
//         });
//     }
// });




// login user
export const userLogin = asyncHandler(async (req, res) => {
    const{email, password} = req.body;
    const findUser = await User.findOne({email});
    if(findUser && await findUser.isPasswordMatched(password)){
        // res.json(findUser);
        res.json({
            // ?. syntax is called optional chaining introduced on ecma script in 2020
            _id :findUser?._id,
            firstname : findUser?.firstname,
            lastname : findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id)
        });
    }else{
        throw new Error("Invalid Credentials");
    }
});


// CRUD Operations

// Get all users
export const getallUser = asyncHandler(async(req,res) => {
    try{
        const getUsers = await User.find();
        res.json(getUsers);
    }catch(error){
        throw new Error(error);
    }
});


//Single users line aava

export const getSingleUser = asyncHandler(async(req,res)=> {
    const {id} = req.params;
    try{
        const singleUser = await User.findById(id);
        if (!singleUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(singleUser);
    }catch(error){
        throw new Error(error);
    }
});

// delete user

export const deleteSingleUser = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try{
        const deleteSingleUser = await User.findByIdAndDelete(id);
        res.json({
            'message': 'User has deleted successfully',
        });
    }catch(error){
        throw new Error(error);
    }
});






