import app from './app';
import { env } from './config/env';
import mongoose from 'mongoose';

const PORT = env.PORT || 5000;

const startServer = async () => {
    try {
        // Database Connection Setup
        if (env.MONGO_URI) {
            await mongoose.connect(env.MONGO_URI);
            console.log('🍃 MongoDB connected successfully');
        } else {
            console.warn('⚠️ MONGO_URI is not defined, skipping DB connection for now.');
        }

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Error starting server:', error);
        process.exit(1);
    }
};

startServer();
