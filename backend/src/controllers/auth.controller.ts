import { Request, Response, NextFunction } from 'express';
import { getDiscordOAuthURL, exchangeCodeForToken, getDiscordUser } from '../services/discord.service';
import User from '../models/user.model';
import { generateToken } from '../utils/jwt';
import { env } from '../config/env';

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const url = getDiscordOAuthURL();
        res.redirect(url); // Redirect user to Discord Auth Screen
    } catch (error) {
        next(error);
    }
};

export const callback = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { code } = req.query;
        if (!code) throw new Error('No authorization code provided by Discord');

        // 1. Tukar Code dengan Access Token
        const tokenData = await exchangeCodeForToken(code as string);
        
        // 2. Ambil data user dari Discord
        const discordUser = await getDiscordUser(tokenData.access_token);

        // 3. Simpan atau Update ke database (Upsert)
        let user = await User.findOne({ discordId: discordUser.id });
        if (!user) {
            user = await User.create({
                discordId: discordUser.id,
                username: discordUser.username,
                email: discordUser.email,
                avatar: discordUser.avatar,
                refreshToken: tokenData.refresh_token,
            });
        } else {
            user.refreshToken = tokenData.refresh_token;
            user.avatar = discordUser.avatar; 
            await user.save();
        }

        // 4. Generate internal JWT dan set ke HTTP-Only Cookie untuk frontend
        const jwtToken = generateToken(user.id);
        res.cookie('jwt', jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // Redirect user sukses ke Dashboard
        res.redirect(`${env.FRONTEND_URL}/dashboard`);
    } catch (error) {
        console.error('OAuth Callback Error:', error);
        res.redirect(`${env.FRONTEND_URL}/?error=auth_failed`);
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie('jwt');
        res.status(200).json({ status: 'success', message: 'Logout successful' });
    } catch (error) {
        next(error);
    }
};
