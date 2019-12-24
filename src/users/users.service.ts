import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportLocalModel } from 'mongoose';
import * as moment from 'moment';

import { IUser } from './interfaces/user.interface';
import { IProfile } from './interfaces/profile.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: PassportLocalModel<IUser>) {}

    async findAllUsers(): Promise<IUser[]> {
        return this.userModel.find({}).lean().exec();
    }

    async createNewUser(createUserDto: CreateUserDto): Promise<IUser> {
        const user = new this.userModel({
            name: createUserDto.name,
            email: createUserDto.email,
            provider: createUserDto.provider,
            active: true,
        });

        await user.setPassword(createUserDto.password);
        return await user.save();
    }

    async localAuthenticate(loginUserDto: LoginUserDto): Promise<IUser> {
        try {
            const findByEmail = await this.userModel.findOne({
                email: loginUserDto.email,
            });

            if (!findByEmail) {
                throw new Error('Password or username are incorrect.');
            }

            const { user } = await findByEmail.authenticate(loginUserDto.password);

            if (!user) {
                throw new Error('Password or username are incorrect.');
            }

            return user;
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    async getProfile(_id: string): Promise<IProfile> {
        const user: IUser = await this.userModel.findById(_id);

        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: moment(user.createdAt).fromNow()
        };
    }
}