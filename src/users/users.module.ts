import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from './schemas/user.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RoleModule } from '../roles/roles.module';

@Module({
    imports: [
        RoleModule,
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule { }