import { Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth';
import { User } from '../models/userSchemas';
import CustomRequest from '../models/customRequestSchema';
import logger from '../utils/logger';

export function authenticateToken(req: CustomRequest, res: Response, next: NextFunction): void {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        try {
            let user: User = verifyToken(token);
            req.user = user;
            next();
        }
        catch (err: any) {
            res.status(403).json({ message: "Forbidden" });
            return;
        }
    }
    catch (err: any) {
        logger.error(err);
        res.status(500).json({ message: "An unexpected error occurred" });
        return;
    }
}