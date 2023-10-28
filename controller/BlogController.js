import Blog from "../models/blogModel.js"
import User from "../models/userModel.js"
import { validateMangoDbId } from "../utils/validateMangoDbId.js"

import expressAsyncHandler from "express-async-handler"


export const createBlog = expressAsyncHandler(async(req, res)=> {
    try{
        const newBlog = await Blog.create(req.body);
        res.json({
            status: "success",
            newBlog,
        });
    }catch(error){
        throw new Error(error);
    }

});


export const updateBlog = expressAsyncHandler(async(req, res)=> {
    const {id} = req.params;
    try{
        const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {new:true});
        res.json(updateBlog);
    }catch(error){
        throw new Error(error);
    }
});

export const getBlog = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id);

        if (blog) {
            blog.numViews++; // Increment numViews by 1
            await blog.save();
            res.json(blog);
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        throw new Error(error);
    }
});


export const getAllBlogs = expressAsyncHandler(async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.json(blogs);
    } catch (error) {
        throw new Error(error);
    }
});


export const deleteBlog = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        throw new Error(error);
    }
});


export const likeBlog = expressAsyncHandler (async(req, res) => {
    const {blogID} = req.body;
    validateMangoDbId(blogID);
    const blog = await Blog.findById(blogID);
    const loginUserId = req?.user?._id;

});





