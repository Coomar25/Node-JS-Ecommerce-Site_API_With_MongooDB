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


// export const likeBlog = expressAsyncHandler (async(req, res) => {
//     const {blogID} = req.body;
//     validateMangoDbId(blogID);  
//     const blog = await Blog.findById(blogID);
//     const loginUserId = req?.user?._id;
//     const alreadyDisliked = blog?.dislikes?.find(
//         (userId) => userId?.toString() === loginUserId?.toString()
//     );

//     if(alreadyDisliked){
//         const blog = await Blog.findByIdAndUpdate(blogID, {
//             $pull: {dislikes: loginUserId},
//             isDisliked: false
//         },
//             { new:true }
//         );
//         res.json(blog);
//     }

//     // channging like status as true or false based on button click
//     const isLiked = blog?.isLiked;
//     if(isLiked){
//         const blog = await Blog.findByIdAndUpdate(blogID, {
//             $pull: { likes: loginUserId},
//             isLiked: false
//         },
//             { new:true }
//         );
//         res.json(blog);
//     }else{
//         const blog = await Blog.findByIdAndUpdate(blogID, {
//             $pull: { likes: loginUserId},
//             isLiked: true
//         },
//             { new:true }
//         );
//         res.json(blog);
//     }
// });


export const likeBlog = expressAsyncHandler(async (req, res) => {
    const { blogID } = req.body;
    validateMangoDbId(blogID);

    const loginUserId = req?.user?._id;
    const blog = await Blog.findById(blogID);

    if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.likes.includes(loginUserId)) {
        // User has already liked the blog, so remove the like.
        blog.likes.pull(loginUserId);
        blog.isLiked = false;
    } else {
        // User has not liked the blog, so add the like.
        blog.likes.push(loginUserId);
        blog.isLiked = true;
        // hamle like garda yadi paila dislike theo vane hatnu parxa 
        if(blog.dislikes.includes(loginUserId)){
          blog.dislikes.pull(loginUserId);
          blog.isDisliked = false;
        }
    }
    const updatedBlog = await blog.save();
    res.json(updatedBlog);
});



// export const dislikesBlog = expressAsyncHandler (async(req, res) => {
//     const {blogID} = req.body;
//     validateMangoDbId(blogID);  
//     const blog = await Blog.findById(blogID);
//     const loginUserId = req?.user?._id;
//     const alreadyliked = blog?.likes?.find(
//         (userId) => userId?.toString() === loginUserId?.toString()
//     );

//     if(alreadyliked){
//         const blog = await Blog.findByIdAndUpdate(blogID, {
//             $pull: {likes: loginUserId},
//             isLiked: false
//         },
//             { new:true }
//         );
//         res.json(blog);
//     }

//     // channging like status as true or false based on button click
//     const isDisliked = blog?.isDisliked;
//     if(isDisliked){
//         const blog = await Blog.findByIdAndUpdate(blogID, {
//             $pull: { dislikes: loginUserId},
//             isDisliked: false
//         },
//             { new:true }
//         );
//         res.json(blog);
//     }else{
//         const blog = await Blog.findByIdAndUpdate(blogID, {
//             $pull: { dislikes: loginUserId},
//             isDisliked: true
//         },
//             { new:true }
//         );
//         res.json(blog);
//     }
// });



export const dislikesBlog = expressAsyncHandler(async (req, res) => {
    const { blogID } = req.body;
    validateMangoDbId(blogID);

    const loginUserId = req?.user?._id;
    const blog = await Blog.findById(blogID);

    if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.dislikes.includes(loginUserId)) {
        // User has already disliked the blog, so remove the dislike.
        blog.dislikes.pull(loginUserId);
        blog.isDisliked = false;
    } else {
        // User has not disliked the blog, so add the dislike.
        blog.dislikes.push(loginUserId);
        blog.isDisliked = true;
        // like remove garne kinaki hamle dislike gareka xaam ni tw
        blog.likes.pull(loginUserId);
        blog.isLiked = false;
    }

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
});





