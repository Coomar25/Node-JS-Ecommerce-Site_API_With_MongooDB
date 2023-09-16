import express from "express";
import { createUser } from '../controller/UserController.js';

const router = express.Router();

router.post('/register', createUser);


export { router as authRouter };

































// export const authRouter = () => {
//     const router = express.Router();
//     // router.post('/register', createUser);

//     app.use("/", (req,res)=> {
//         res.send("hello from server side");
//         });
// }

