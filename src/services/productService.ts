import { Product } from '../models/productSchema';
import { pool } from '../db';

export async function getAllProducts(search: string): Promise<Product[]> {
    try {
        let query = 'SELECT * FROM products';
        let values: string[] = []
        if (search) {
            query += ` WHERE LOWER(name) LIKE ? OR LOWER(description) LIKE ? OR LOWER(category) LIKE ?`;
            values = [`%${search.toLowerCase()}%`, `%${search.toLowerCase()}%`, `%${search.toLowerCase()}%`];
        }
        const [rows] = await pool.query(query, values);
        const products = rows as Product[];
        return products;
    }
    catch (err: any) {
        throw err;
    }
}

export async function createProduct(product: Product): Promise<Product> {
    try {
        const query = 'INSERT INTO products (name, description, category, price) VALUES (?, ?, ?, ?)';
        const values = [product.name, product.description || null, product.category, product.price];
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

export async function updateProduct(id: number, product: Product): Promise<Product | null> {
    try {
        const query = 'UPDATE products SET name = ?, description = ?, category = ?, price = ? WHERE id = ?';
        const values = [product.name, product.description || null, product.category, product.price, id];
        const [result] = await pool.query(query, values);
        if ((result as any).affectedRows > 0) {
            return getProductById(id);
        }
        return null;
    }
    catch (err: any) {
        throw err;
    }
}

export async function deleteProduct(id: number): Promise<boolean> {
    try {
        const query = 'DELETE FROM products WHERE id = ?';
        const [result] = await pool.query(query, [id]);
        return (result as any).affectedRows > 0;
    }
    catch (err: any) {
        throw err;
    }
}