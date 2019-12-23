import { PassportLocalDocument } from 'mongoose';

export interface IUser extends PassportLocalDocument {
    name: string;
    email: string;
    provider: string;
    active: boolean;
}