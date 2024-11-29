import { Request, Response } from 'express';
import { userSignUpSchema } from '../models/userSchemas';
import logger from '../utils/logger';
import * as userService from '../services/userService';

export async function createUser(req: Request, res: Response): Promise<void> {
    // validate
    let user;
    try {
        user = userSignUpSchema.parse(req.body);
    }
    catch (err: any) {
        const errorMessages = err.errors.map((error: any) => `${error.message} at ${error.path.join('.')}`);
        res.status(400).json({ message: errorMessages.join(', ') });
        return;
    }
    try {
        const newUser = await userService.createUser(user);
        res.status(201).json({ message: "User created successfully", data: newUser });
        return;
    }
    catch (err: any) {
        logger.error(err);
        res.status(500).json({ message: "An unexpected error occurred" });
        return;
    }
}