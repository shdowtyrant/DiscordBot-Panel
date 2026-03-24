import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { refreshDiscordToken, getDiscordUserGuilds } from '../services/discord.service';

export const getMe = async (req: AuthRequest, res: Response) => {
    res.status(200).json({ 
        status: 'success', 
        data: { 
            user: {
                id: req.user.id,
                discordId: req.user.discordId,
                username: req.user.username,
                email: req.user.email,
                avatar: req.user.avatar,
            } 
        } 
    });
};

export const getMyServers = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user.refreshToken) {
            return res.status(401).json({ status: 'error', message: 'No refresh token available' });
        }

        // 1. Refresh discord token to perform actions
        const tokens = await refreshDiscordToken(req.user.refreshToken);
        
        // 2. Persist new refresh token
        req.user.refreshToken = tokens.refresh_token;
        await req.user.save();

        // 3. Fetch servers
        const guilds = await getDiscordUserGuilds(tokens.access_token);
        
        // 4. Return only managed servers (Owner or MANAGE_GUILD flag 0x20)
        const managedGuilds = guilds.filter((guild: any) => guild.owner || (guild.permissions & 0x20) === 0x20);

        res.status(200).json({ status: 'success', data: { guilds: managedGuilds } });
    } catch (error) {
        next(error);
    }
};
