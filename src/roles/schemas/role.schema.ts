import { Schema } from 'mongoose';

export const RoleSchema = new Schema({
    name: {
        type: String,
        unique: true,
        trim: true
    },
    permissions: Array,
    active: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});