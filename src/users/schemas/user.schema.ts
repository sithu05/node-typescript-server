import { Schema, PassportLocalSchema } from 'mongoose';
import * as PassportLocalMongoose from 'passport-local-mongoose';

export const UserSchema: PassportLocalSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    provider: {
        type: String,
        trim: true
    },
    active: {
        type: Boolean,
        default: false
    },
    role: { type: Schema.Types.ObjectId, ref: 'Role' }
}, {
    timestamps: true
});

UserSchema.plugin(PassportLocalMongoose, {
    usernameField: 'email',
    usernameUnique: false,
    limitAttempts: true,
    maxAttempts: 30,
    findByUsername: function (model, queryParameters) {
        return model.findOne({ ...queryParameters, active: true, provider: 'local' });
    }
});