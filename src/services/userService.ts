import { pool } from '../db';
import { hashPassword } from '../utils/auth';
import { UserSignUp, User } from '../models/userSchemas';

export async function createUser(user: UserSignUp): Promise<User> {
    try {
        const hashedPassword = await hashPassword(user.password);
        const query = 'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)';
        const values = [user.name, user.email, hashedPassword];
        const [result] = await pool.query(query, values);
        const userId = (result as any).insertId;
        return getUserById(userId);
    }
    catch (err: any) {
        throw err;
    }
}

export async function getUserById(id: number): Promise<User> {
    try {
        const query = 'SELECT u.id, u.name, u.email, u.role, u.created_at, u.updated_at FROM users u WHERE id = ?';
        const [rows] = await pool.query(query, [id]);
        const users = rows as User[];
        return users[0];
    }
    catch (err: any) {
        throw err;
    }
}
