import User from "../models/userModel.js"


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