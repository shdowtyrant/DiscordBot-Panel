import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import User from '../models/user.model';

export interface AuthRequest extends Request {
    user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ status: 'error', message: 'Not authorized to access this route' });
        }

        const decoded: any = verifyToken(token);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ status: 'error', message: 'User belonging to this token no longer exists' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ status: 'error', message: 'Not authorized, token failed' });
    }
};
