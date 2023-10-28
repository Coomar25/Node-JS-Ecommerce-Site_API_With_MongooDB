import express from "express";
import {dbConnect} from './config/dbConnect.js'
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import {authRouter} from './routes/authRoute.js'
import {productRouter} from './routes/productRoute.js';
import { blogROuter } from "./routes/blogRoute.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";


const app = express();
const PORT = process.env.PORT || 4000;
dotenv.config();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.listen(PORT, ()=> {
    console.log(`server is listening on port http://localhost:${PORT}`);
});

dbConnect();
app.use('/api/user', authRouter);
app.use('/api/product', productRouter);
app.use('/api/blog', blogROuter);
// app.use("/", (req,res)=> {
//     res.send("hello from server side");
// });