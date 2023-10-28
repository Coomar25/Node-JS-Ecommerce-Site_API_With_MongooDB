// import express from "express"
// import {createBlog} from "../controller/BlogController.js"
// import {updateBlog} from "../controller/BlogController.js"
// import {getBlog} from "../controller/BlogController.js"
// import { deleteBlog } from "../controller/BlogController.js"
// import {getAllBlogs} from "../controller/BlogController.js"
// import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";


import express from "express";
import { createBlog, updateBlog, getBlog, deleteBlog, getAllBlogs } from "../controller/BlogController.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";



const blogROuter = express.Router();

blogROuter.get('/create-blog', authMiddleware, isAdmin, createBlog);
blogROuter.put('/update-blog/:id', authMiddleware, isAdmin, updateBlog);
blogROuter.get('/get-a-blog/:id', getBlog);
blogROuter.get('/get-all-blog', getAllBlogs);
blogROuter.delete('/delete-blog/:id', authMiddleware, isAdmin, deleteBlog);

export {blogROuter as blogROuter}

