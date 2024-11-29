import { pool } from "../db";
import { Product } from "../models/productSchema";

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