import { Controller, Get, Post, Body } from '@nestjs/common';

import { UsersService } from "./users.service";

@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getUsers() {
        return this.usersService.findAllUsers();
    }

    @Post('test')
    async testAction(@Body() body) {
        const user = await this.usersService.localAuthenticate(body);

        return user;
    }
}
