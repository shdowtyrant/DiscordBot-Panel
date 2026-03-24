import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import ActivityLog from '../models/activityLog.model';

// Log activity directly from other backend functions
export const logActivity = async (guildId: string, action: string, discordId: string, details?: string) => {
    try {
        await ActivityLog.create({ guildId, action, discordId, details });
    } catch (e) { 
        console.error('Error logging activity', e);
    }
};

export const getGuildLogs = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { guildId } = req.params;
        const logs = await ActivityLog.find({ guildId }).sort({ createdAt: -1 }).limit(20);
        res.status(200).json({ status: 'success', data: { logs } });
    } catch (error) {
        next(error);
    }
};

export const getGlobalLogs = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // Fetch logs performed by this user globally across all managed servers for the dashboard
        const logs = await ActivityLog.find({ discordId: req.user.discordId }).sort({ createdAt: -1 }).limit(8);
        res.status(200).json({ status: 'success', data: { logs } });
    } catch (error) {
        next(error);
    }
};
