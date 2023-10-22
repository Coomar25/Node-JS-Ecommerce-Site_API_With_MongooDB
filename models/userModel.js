// !mdbgum
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        // unique:true,
        index:true,
    },
    lastname:{
        type:String,
        required:true,
        // unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        // unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin: {
        type:String,
        default: "user"
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    cart: {
        type: Array,
        default: [],
    },
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    }],
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    refreshToken: {
        type: String,
    },

    passwordChangedAt:Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
},

{
    timestamps:true,
}


);

// Yo code chai password lai encrypt garna lai 
userSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// password match vaxa ki nai vanera check garna
userSchema.methods.isPasswordMatched =  async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.createPasswordResetToken = async function(){
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest("hex");
    this.passwordResetExpires = Date.now() + 30*60*1000;
    return resetToken;
}

//Export the model
// module.exports = mongoose.model('User', userSchema); // yo export method common js method ho tei vayera kaam gardaina kina ki hamle es module use gareko xaaam import export garna.
export default mongoose.model('User', userSchema);