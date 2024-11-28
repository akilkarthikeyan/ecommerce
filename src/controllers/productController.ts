import { Request, Response, RequestHandler } from "express";
import logger from "../utils/logger";
import * as productService from "../services/productService";
import { Product, productSchema } from "../models/productSchema";

export async function getAllProducts(req: Request, res: Response): Promise<void> {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json({ message: "Products fetched successfully", data: products });
    }
    catch (err: any) {
        logger.error(err);
        res.status(500).json({ message: "An unexpected error occurred" });
    }
}

export async function createProduct(req: Request, res: Response): Promise<void> {
    // validate
    let product;
    try {
        product = productSchema.parse(req.body);
    }
    catch (err: any) {
        const errorMessages = err.errors.map((error: any) => `${error.message} at ${error.path.join('.')}`);
        res.status(400).json({ message: errorMessages.join(', ') });
        return;
    }
    try {
        const newProduct = await productService.createProduct(product);
        res.status(201).json({ message: "Product created successfully", data: newProduct });
    }
    catch (err: any) {
        logger.error(err);
        res.status(500).json({ message: "An unexpected error occurred" });
    }
}
