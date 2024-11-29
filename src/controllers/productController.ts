import { Request, Response, RequestHandler } from "express";
import logger from "../utils/logger";
import * as productService from "../services/productService";
import { Product, productSchema } from "../models/productSchema";
import redisClient from "../cache";

export async function getAllProducts(req: Request, res: Response): Promise<void> {
    try {
        const search = req.query.search as string | "";
        const cacheKey = `products:${search}`;
        
        // Check cache
        const cachedProducts = await redisClient.get(cacheKey);
        if (cachedProducts) {
            // console.log("Cache Hit")
            res.status(200).json({ message: "Products fetched successfully", data: JSON.parse(cachedProducts) });
            return;
        }

        // console.log("Cache Miss")
        // Fetch from database
        const products = await productService.getAllProducts(search);

        // Store in cache
        await redisClient.set(cacheKey, JSON.stringify(products), { EX: 3600 });

        res.status(200).json({ message: "Products fetched successfully", data: products });
        return;
    }
    catch (err: any) {
        logger.error(err);
        res.status(500).json({ message: "An unexpected error occurred" });
        return;
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
        return;
    }
    catch (err: any) {
        logger.error(err);
        res.status(500).json({ message: "An unexpected error occurred" });
        return;
    }
}

export async function updateProduct(req: Request, res: Response): Promise<void> {
    // validate
    if(req.params.id === undefined) {
        res.status(400).json({ message: "Product id is required" });
        return;
    }
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
        const updatedProduct = await productService.updateProduct(parseInt(req.params.id), product);
        if (updatedProduct) {
            res.status(200).json({ message: "Product updated successfully", data: updatedProduct });
            return;
        }
        else {
            res.status(404).json({ message: "Product not found" });
            return;
        }
    }
    catch (err: any) {
        logger.error(err);
        res.status(500).json({ message: "An unexpected error occurred" });
        return;
    }
}

export async function deleteProduct(req: Request, res: Response): Promise<void> {
    if(req.params.id === undefined) {
        res.status(400).json({ message: "Product id is required" });
        return;
    }
    try {
        const deleted = await productService.deleteProduct(parseInt(req.params.id));
        if (!deleted) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json({ message: "Product deleted successfully" });
        return;
    }
    catch (err: any) {
        logger.error(err);
        res.status(500).json({ message: "An unexpected error occurred" });
        return;
    }
}
