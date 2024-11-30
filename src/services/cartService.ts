import { pool } from "../db";
import { Product } from "../models/productSchema";
import { CartItem } from "../models/cartItemSchema";
import stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY as string);

export async function addToCart(userId: number, productId: number, quantity: number): Promise<boolean> {
    try {
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [productId]);
        const products = rows as Product[];
        if(products.length === 0) {
            return false;
        }
        const query = 'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?';
        const values = [userId, productId, quantity, quantity];
        await pool.query(query, values);
        return true;
    }
    catch (err: any) {
        throw err;
    }
}

export async function removeFromCart(userId: number, productId: number): Promise<boolean> {
    try {
        const query = 'DELETE FROM cart WHERE user_id = ? AND product_id = ?';
        const values = [userId, productId];
        const [result] = await pool.query(query, values);
        return (result as any).affectedRows > 0;
    }
    catch (err: any) {
        throw err;
    }
}

export async function getCart(userId: number): Promise<CartItem[]> {
    try {
        const query = 'SELECT p.id, p.name, p.description, p.category, p.price, c.quantity, c.quantity * p.price total_price FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?';
        const values = [userId];
        const [rows] = await pool.query(query, values);
        const cartItems = rows as CartItem[];
        return cartItems;
    }
    catch (err: any) {
        throw err;
    }
}

export function calculateTotal(cartItems: CartItem[]): number {
    return cartItems.reduce((acc, item) => acc + (item.total_price ?? 0), 0);
}

export async function checkout(userId: number): Promise<string> {
    try {
        const cart = await getCart(userId);
        const lineItems = cart.map(item => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name as string,
                },
                unit_amount: (item.price ?? 0) * 100,
            },
            quantity: item.quantity,
        }));

        const session = await stripeClient.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.HOST}:${process.env.PORT}/success.html`,
            cancel_url: `${process.env.HOST}:${process.env.PORT}/cancel.html`,
        });

        await deleteCart(userId);

        return session.url as string;
    }
    catch (err: any) {
        throw err;
    }
}

export async function deleteCart(userId: number): Promise<void> {
    try {
        const query = 'DELETE FROM cart WHERE user_id = ?';
        const values = [userId];
        await pool.query(query, values);
    }
    catch (err: any) {
        throw err;
    }
}