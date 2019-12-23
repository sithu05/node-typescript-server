import { Controller, Post, Body } from '@nestjs/common';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    async create(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.createNewUser(createUserDto);

        return user;
    }
}