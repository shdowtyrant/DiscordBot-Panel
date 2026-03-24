import mongoose, { Schema, Document } from 'mongoose';

export interface IActivityLog extends Document {
    guildId: string;
    action: string;
    details?: string;
    discordId: string;
}

const ActivityLogSchema: Schema = new Schema({
    guildId: { type: String, required: true },
    action: { type: String, required: true },
    details: { type: String },
    discordId: { type: String, required: true },
}, {
    timestamps: true
});

export default mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema);
