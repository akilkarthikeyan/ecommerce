import { Request, Response } from "express";
import { cartItemSchema } from "../models/cartItemSchema";
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
        res.status(200).json({ message: "Item added to cart successfully" });
        return;
    }
    catch (err: any) {
        logger.error(err);
        res.status(500).json({ message: "An unexpected error occurred" });
        return;
    }
}

export async function removeFromCart(req: Request, res: Response): Promise<void> {
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const userId = req.user.id;
    const productId = Number(req.params.id);
    try {
        const removed = await cartServive.removeFromCart(userId, productId);
        if(!removed) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json({ message: "Item removed from cart successfully" });
        return;
    }
    catch (err: any) {
        logger.error(err);
        res.status(500).json({ message: "An unexpected error occurred" });
        return;
    }
}

export async function getCart(req: Request, res: Response): Promise<void> {
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const userId = req.user.id;
    try {
        const cart = await cartServive.getCart(userId);
        const totalPrice = cartServive.calculateTotal(cart);
        res.status(200).json({message: "Cart retrieved successfully", data: {cart, total_price: totalPrice }});
        return;
    }
    catch (err: any) {
        logger.error(err);
        res.status(500).json({ message: "An unexpected error occurred" });
        return;
    }
}

export async function checkout(req: Request, res: Response): Promise<void> {
    // validate
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const userId = req.user.id;
    try {
        const url = await cartServive.checkout(userId);
        res.status(200).json({ message: "Checkout successful", data: { url } });
    }
    catch (err: any) {
        logger.error(err);
        res.status(500).json({ message: "An unexpected error occurred" });
    }
}

