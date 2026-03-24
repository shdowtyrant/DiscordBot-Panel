import mongoose, { Schema, Document } from 'mongoose';

export interface IServerSettings extends Document {
    guildId: string;
    prefix: string;
    welcomeMessage: string;
    welcomeChannelId?: string;
}

const ServerSettingsSchema: Schema = new Schema({
    guildId: { type: String, required: true, unique: true },
    prefix: { type: String, default: '!' },
    welcomeMessage: { type: String, default: 'Welcome to the server, {user}!' },
    welcomeChannelId: { type: String }
}, {
    timestamps: true
});

export default mongoose.model<IServerSettings>('ServerSettings', ServerSettingsSchema);
