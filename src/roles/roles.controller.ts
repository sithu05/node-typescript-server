import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Permissions } from './permissions';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@Controller('api/roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createRole(@Body() body: CreateRoleDto) {
        return await this.rolesService.createRole(body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('permissions')
    async getPermissions() {
        return Permissions;
    }
}