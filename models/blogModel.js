import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
   title: {
    type:String,
    required: true,
   },

   description: {
    type: String,
    required:true
   },

   category: {
    type:String,
    required: true,
   },
   numViews: {
    type: Number,
    default: 0,
   },
   isLiked: {
    type: Boolean,
    default: false,
   },

   isDisliked : {
    type:Boolean,
    default: false,
   },

   likes: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
   ],

   dislikes: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
   ],

   image: {
    type: String,
    default: "https://imgs.search.brave.com/5AB5cJ4Cm6AydorbZp5EkQNmcLasXofilAmbsInn41c/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMy8w/OS8yNS8yMC8xMS9i/b2F0LTgyNzU5NjJf/NjQwLmpwZw"
   },

   author: {
    type: String,
    default: "Admin"
   },

}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true,
    },
    timestamps: true
});

//Export the model
// module.exports = mongoose.model('Blog', blogSchema);
export default mongoose.model('Blog', blogSchema);
