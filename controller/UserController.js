import User from "../models/userModel.js"


export const createUser = async (req, res) => {
    const email = req.body.email;
    const findUser = await User.find({email: email});
    if(!findUser){
        const newUser = User.create(req.body);
        res.json(newUser);
    }else{
        res.json({
            message: "User already exists",
            success: false,
        })
    }
};

// module.exports= { createUser };