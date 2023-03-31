import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    public constructor(private service: UsersService, private jwtService: JwtService){}

    public async validateUser(id: number, password: string) : Promise<User> {
        
        let u = await this.service.getUserById(id);

        if(u !== null && await bcrypt.compare(password, u.password))
            return u;
        else
            return undefined;
    }

    async login(user: any) {
        const payload = { username: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
