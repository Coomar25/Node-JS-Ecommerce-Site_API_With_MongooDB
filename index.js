import express from "express";
import {dbConnect} from './config/dbConnect.js'
const app = express();
import dotenv from 'dotenv';
dotenv.config();




const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> {
    console.log(`server is running on port http://localhost:${PORT}`);
});

app.use("/", (req,res)=> {
    res.send("hello from server side");
});

dbConnect();
