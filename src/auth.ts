import bcrypt from 'bcrypt';
import { User } from './models/userSchemas';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET || 'secret';

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

export function generateToken(user: User) {
    const payload = { id: user.id, role: user.role };
    return jwt.sign(payload, secretKey, { expiresIn: "4h" });
}
