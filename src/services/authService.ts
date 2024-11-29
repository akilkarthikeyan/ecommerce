import { User, UserLogin } from "../models/userSchemas";
import { pool } from "../db";
import { comparePassword, generateToken } from "../utils/auth";

export async function loginUser(user: UserLogin): Promise<string> {
    try {
        const query = 'SELECT u.id, u.role, u.password_hash FROM users u WHERE email = ?';
        const [rows] = await pool.query(query, [user.email]);
        const users = rows as User[];
        if(users.length === 0) {
            throw new Error('User not found');
        }
        const hashedPassword = users[0].password_hash;
        const isValid = await comparePassword(user.password, hashedPassword);
        if(!isValid) {
            throw new Error('Invalid password');
        }
        return generateToken(users[0]);
    }
    catch (err: any) {
        throw err;
    }
}