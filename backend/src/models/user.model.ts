import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    discordId: string;
    username: string;
    avatar: string;
    email?: string;
    role: 'user' | 'admin';
    refreshToken: string;
}

const UserSchema: Schema = new Schema({
    discordId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    avatar: { type: String },
    email: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    refreshToken: { type: String }
}, {
    timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema);
