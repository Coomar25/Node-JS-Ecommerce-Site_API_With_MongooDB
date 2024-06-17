import express from "express";
import { createProduct } from "../controller/ProductController.js";
import { getProductById } from "../controller/ProductController.js";
import { getAllProduct } from "../controller/ProductController.js";
import { updateProduct } from "../controller/ProductController.js";
import { deleteProduct } from "../controller/ProductController.js";

import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
import {
  createCategory,
  getallCategory,
  getCategory,
  updateCategory,
} from "../controller/CategoryController.js";

const productRouter = express.Router();

productRouter.post("/add", authMiddleware, isAdmin, createProduct);
productRouter.put("/:id", authMiddleware, isAdmin, updateProduct);
productRouter.delete("/:id", authMiddleware, isAdmin, deleteProduct);
productRouter.get("/getallproducts", getAllProduct);
productRouter.get("/:id", getProductById);
//Routes for Category
productRouter.post("/category", authMiddleware, isAdmin, createCategory);
productRouter.put("/category/:id", authMiddleware, isAdmin, updateCategory);
productRouter.get("/category/:id", getCategory);
productRouter.get("/category", getallCategory);

export { productRouter as productRouter };
