import { Request, Response } from "express";
import { pool } from "../config/db";

export async function getAllProducts(req: Request, res: Response) {
    const products = await pool.query("SELECT * FROM products");
    res.status(200).json(products);
}