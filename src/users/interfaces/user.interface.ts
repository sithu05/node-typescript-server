import { PassportLocalDocument } from 'mongoose';

import { IRole } from '../../roles/interfaces/role.interface';

export interface IUser extends PassportLocalDocument {
    name: string;
    email: string;
    provider: string;
    active: boolean;
    createdAt: Date;
    role: IRole
}