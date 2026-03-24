import dotenv from 'dotenv';
dotenv.config();

export const env = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI || '',
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID || '',
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET || '',
    DISCORD_REDIRECT_URI: process.env.DISCORD_REDIRECT_URI || '',
    JWT_SECRET: process.env.JWT_SECRET || 'your_fallback_jwt_secret',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
};
