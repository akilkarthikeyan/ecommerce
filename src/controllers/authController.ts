import { Request, Response } from 'express';
import { userLoginSchema } from '../models/userSchemas';
import * as authService from '../services/authService';

export async function loginUser(req: Request, res: Response): Promise<void> {
    // validate
    let user;
    try {
        user = userLoginSchema.parse(req.body);
    }
    catch (err: any) {
        const errorMessages = err.errors.map((error: any) => `${error.message} at ${error.path.join('.')}`);
        res.status(400).json({ message: errorMessages.join(', ') });
        return;
    }
    try {
        const token = await authService.loginUser(user);
        res.status(200).json({ message: "User logged in successfully", data: { accessToken: token } });
        return;
    }
    catch (err: any) {
        res.status(401).json({ message: err.message });
        return;
    }
}

