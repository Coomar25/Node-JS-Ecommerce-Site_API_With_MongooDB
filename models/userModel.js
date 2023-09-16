// !mdbgum
import mongoose from "mongoose";
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    lastname:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
});

//Export the model
// module.exports = mongoose.model('User', userSchema); // yo export method common js method ho tei vayera kaam gardaina kina ki hamle es module use gareko xaaam import export garna.
export default mongoose.model('User', userSchema);