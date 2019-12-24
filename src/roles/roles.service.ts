import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IRole } from './interfaces/role.interface';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
    constructor(@InjectModel('Role') private readonly roleModel: Model<IRole>) { }

    async findById(id: string): Promise<IRole> {
        return await this.roleModel.findById(id).lean().exec();
    }

    async findOne(query: any): Promise<IRole> {
        return await this.roleModel.findOne(query).lean().exec();
    }

    async createRole(createRoleDto: CreateRoleDto): Promise<IRole> {
        try {
            const role = new this.roleModel({
                name: createRoleDto.name,
                permissions: createRoleDto.permissions,
                active: createRoleDto.active
            });

            return await role.save();
        } catch (err) {
            throw new BadRequestException('This role name already created.');
        }
    }
}