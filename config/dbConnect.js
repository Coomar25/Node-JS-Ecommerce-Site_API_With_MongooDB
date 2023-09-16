
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

export const dbConnect = async () => {
    try{
        const mongodburi = process.env.MONGODB_URI;
        
        await mongoose.connect(mongodburi, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('connected to mongodb');
    }catch(error){
        console.error('Error connecting to mongodb:', error);
    }
};
// dbConnect();
// module.exports= dbConnect;