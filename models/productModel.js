import mongoose from "mongoose";


// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim: true,
    },
   slug: {
    type: String,
    required: true,
    unique:true,
    lowercase: true,
   },
   description: {
    type:String,
    required: true,
   },
   price: {
    type: Number,
    required: true,
   },
   category: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    required: true,
    ref:"Category",
   },

    brand: {
        type:String,
        // enum: ['Apple', 'Samsung', 'Lenovo']
        required: true,
    },

    quantity: {
        type:Number,
        required: true
    },

    sold: {
        type: Number,
        default: 0,
        select: false
    },

    images: {
        type: Array,
    },
    color: {
        type: String,
        // enum:['Black', 'Brown', 'Red'],
        required: true
    },
    // ratings: [{
    //     star: Number,
    //     postedBy: {
    //         types: mongoose.Schema.Types.ObjectId,
    //         ref: "User"
    //     },
    // }]

    
},{timestamps: true}



);

//Export the model
// module.exports = mongoose.model('Product', userSchema);

export default mongoose.model('Product', userSchema);
