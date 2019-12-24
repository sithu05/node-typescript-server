import { Controller, Post, Body, Request, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) {}
    
    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    async getProfile(@Request() req) {
        return req.user;
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async localLogin(@Request() req) {
        return this.authService.generateToken(req.user);
    }

    @Post('register')
    async create(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.createNewUser(createUserDto);

        return user;
    }
}