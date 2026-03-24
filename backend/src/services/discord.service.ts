import { env } from '../config/env';

const DISCORD_API = 'https://discord.com/api/v10';

export const getDiscordOAuthURL = (): string => {
    const params = new URLSearchParams({
        client_id: env.DISCORD_CLIENT_ID,
        redirect_uri: env.DISCORD_REDIRECT_URI,
        response_type: 'code',
        scope: 'identify email guilds',
    });
    return `${DISCORD_API}/oauth2/authorize?${params.toString()}`;
};

export const exchangeCodeForToken = async (code: string) => {
    const data = new URLSearchParams({
        client_id: env.DISCORD_CLIENT_ID,
        client_secret: env.DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: env.DISCORD_REDIRECT_URI,
    });

    const response = await fetch(`${DISCORD_API}/oauth2/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data.toString(),
    });

    if (!response.ok) throw new Error('Failed to exchange Discord token');
    return response.json();
};

export const refreshDiscordToken = async (refreshToken: string) => {
    const data = new URLSearchParams({
        client_id: env.DISCORD_CLIENT_ID,
        client_secret: env.DISCORD_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
    });

    const response = await fetch(`${DISCORD_API}/oauth2/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data.toString(),
    });

    if (!response.ok) throw new Error('Failed to refresh Discord token');
    return response.json();
};

export const getDiscordUser = async (accessToken: string) => {
    const response = await fetch(`${DISCORD_API}/users/@me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) throw new Error('Failed to fetch Discord user');
    return response.json();
};

export const getDiscordUserGuilds = async (accessToken: string) => {
    const response = await fetch(`${DISCORD_API}/users/@me/guilds`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) throw new Error('Failed to fetch Discord guilds');
    return response.json();
};
