import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import ServerSettings from '../models/serverSettings.model';
import { logActivity } from '../controllers/logs.controller';

export const getServerSettings = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { guildId } = req.params;
        let settings = await ServerSettings.findOne({ guildId });
        
        if (!settings) {
            settings = new ServerSettings({ guildId });
        }
        res.status(200).json({ status: 'success', data: { settings } });
    } catch (error) {
        next(error);
    }
};

export const updateServerSettings = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { guildId } = req.params;
        const { prefix, welcomeMessage, welcomeChannelId } = req.body;

        const settings = await ServerSettings.findOneAndUpdate(
            { guildId },
            { prefix, welcomeMessage, welcomeChannelId },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        // Emit an activity log behind the scenes
        await logActivity(guildId, 'SETTINGS_UPDATED', req.user.discordId, `Configuration updated. Prefix is now ${prefix}`);

        res.status(200).json({ status: 'success', data: { settings } });
    } catch (error) {
        next(error);
    }
};
