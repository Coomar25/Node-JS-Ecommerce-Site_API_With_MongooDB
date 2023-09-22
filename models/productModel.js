import mongoose from "mongoose";


// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    productname:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    description:{
        type:String,
        required:true,
        unique:true,
    },
    quantity:{
        type:String,
        required:true,
        unique:true,
    },
    price:{
        type: String,
        required:true,
    },
});

//Export the model
// module.exports = mongoose.model('Product', userSchema);

export default mongoose.model('Product', userSchema);
