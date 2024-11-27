import { Router } from "express";
import * as productController from "../controllers/productController";

const router = Router();

// Example: Get all products
router.get("/", productController.getAllProducts);

// Example: Create a new product
// router.post("/", productController.createProduct);

export default router;
