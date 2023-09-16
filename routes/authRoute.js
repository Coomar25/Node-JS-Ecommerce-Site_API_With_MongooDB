import express from "express"
const {createUser} = require("../controller/UserController");




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

