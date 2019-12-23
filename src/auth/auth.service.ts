import { Injectable } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { IUser } from 'src/users/interfaces/user.interface';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    async validateUser(email: string, password: string): Promise<IUser> {
        return await this.usersService.localAuthenticate({ email, password });
    }
}