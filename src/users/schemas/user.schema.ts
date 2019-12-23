import { Schema, PassportLocalSchema } from 'mongoose';
import * as PassportLocalMongoose from 'passport-local-mongoose';

export const UserSchema: PassportLocalSchema = new Schema({
    name: String,
    email: String,
    provider: String,
    active: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

UserSchema.plugin(PassportLocalMongoose, {
    usernameField: 'email',
    usernameUnique: false,
    limitAttempts: true,
    maxAttempts: 30,
    findByUsername: function(model, queryParameters) {
        return model.findOne({ ...queryParameters, active: true });
    }
});