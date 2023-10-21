import dotenv from 'dotenv';
import mongoose from 'mongoose';


dotenv.config();
export const dbConnect = async () => {
    try{
        const mongodburi = process.env.MONGODB_URI;
        await mongoose.connect(mongodburi, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('connected to mongodb');
    }catch(error){
        console.log('Failed in connecting to mongo db');
        console.error('Error connecting to mongodb:', error);
    }
};

// dbConnect();
// module.exports= dbConnect;