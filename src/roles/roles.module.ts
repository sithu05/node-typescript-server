import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RolesController } from './roles.controller';
import { RoleSchema } from './schemas/role.schema';
import { RolesService } from './roles.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Role', schema: RoleSchema }])
    ],
    controllers: [RolesController],
    providers: [RolesService],
    exports: [RolesService]
})
export class RoleModule { }