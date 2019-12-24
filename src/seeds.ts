/**
 * this file for seeding the data when database is completely new
 *
 * - roles will be seeded
 */

import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';

import { RoleSchema } from './roles/schemas/role.schema';
import { IRole } from './roles/interfaces/role.interface';
import { UserSchema } from './users/schemas/user.schema';
import { IUser } from './users/interfaces/user.interface';
import { Permissions } from './roles/permissions';

// initialize the .env values
dotenv.config();

// connect the database
mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// initialize the Model(s)
const RoleModel: mongoose.Model<IRole> = mongoose.model('Role', RoleSchema);
const UserModel: mongoose.PassportLocalModel<IUser> = mongoose.model('User', UserSchema);

async function bootstrap() {
    // set up all permissions for Administrator Role
    let permissions = [];
    Permissions
        .forEach(k => {
            k.permissions.forEach(p => permissions.push(p.key));
        });

    // Application Users Role
    await RoleModel.create({
        name: 'Application Users',
        permissions: [],
        active: true
    });

    // Administration Role
    const adminRole = await RoleModel.create({
        name: 'Administrator',
        permissions: permissions,
        active: true
    });

    // administrator account
    const admin = new UserModel({
        name: 'Administrator',
        email: 'admin@admin.com',
        provider: 'local',
        role: adminRole,
        active: true,
    });

    await admin.setPassword('secret');
    await admin.save();
};

bootstrap().then(() => process.exit(0));