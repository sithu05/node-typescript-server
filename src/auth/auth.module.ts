import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
    imports: [PassportModule.register({ session: false }), UsersModule],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy],
    exports: []
})
export class AuthModule {}