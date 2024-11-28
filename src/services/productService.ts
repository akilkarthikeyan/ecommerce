import { Product } from '../models/productSchema';
import { pool } from '../db';

export async function getAllProducts(): Promise<Product[]> {
    try {
        const query = 'SELECT * FROM products';
        const [rows] = await pool.query(query);
        const products = rows as Product[];
        return products;
    }
    catch (err: any) {
        throw err;
    }
}

export async function createProduct(product: Product): Promise<Product> {
    try {
        const query = 'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)';
        const values = [product.name, product.description || null, product.price, product.stock];
        const [result] = await pool.query(query, values);
        const productId = (result as any).insertId;
        return getProductById(productId);
    }
    catch (err: any) {
        throw err;
    }
}

export async function getProductById(id: number): Promise<Product> {
    try {
        const query = 'SELECT * FROM products WHERE id = ?';
        const [rows] = await pool.query(query, [id]);
        const products = rows as Product[];
        return products[0];
    }
    catch (err: any) {
        throw err;
    }
}