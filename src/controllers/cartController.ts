import { Request, Response } from "express";
import { cartItemSchema, CartItem } from "../models/cartItemSchema";
import * as cartServive from "../services/cartService";
import logger from "../utils/logger";

export async function addToCart(req: Request, res: Response): Promise<void> {
    let cartItem;
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const userId = req.user.id;
    // validate
    try {
        cartItem = cartItemSchema.parse(req.body);
    }
    catch (err: any) {
        const errorMessages = err.errors.map((error: any) => `${error.message} at ${error.path.join('.')}`);
        res.status(400).json({ message: errorMessages.join(', ') });
        return;
    }
    try {
        const added = await cartServive.addToCart(userId, cartItem.id, cartItem.quantity);
        if(!added) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(201).json({ message: "Item added to cart successfully" });
        return;
    }
    catch (err: any) {
        logger.error(err);
        res.status(500).json({ message: "An unexpected error occurred" });
        return;
    }
}


