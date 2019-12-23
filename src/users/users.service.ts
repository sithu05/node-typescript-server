import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportLocalModel } from 'mongoose';

import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

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
        await user.save();

        return user;
    }
}