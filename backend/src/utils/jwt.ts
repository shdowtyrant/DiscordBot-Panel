import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export const generateToken = (userId: string): string => {
    return jwt.sign({ id: userId }, env.JWT_SECRET, {
        expiresIn: '7d', // Session valid for 7 days
    });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, env.JWT_SECRET);
};
