import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async localLogin(@Request() req, @Body() body) {
        return req.user;
    }

    @Post('register')
    async create(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.createNewUser(createUserDto);

        return user;
    }
}