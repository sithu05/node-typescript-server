import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';
import { IUser } from 'src/users/interfaces/user.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<IUser> {
        return await this.usersService.localAuthenticate({ email, password });
    }

    async generateToken(user: IUser) {
        return {
            access_token: this.jwtService.sign({
                _id: user._id
            })
        }
    }
}