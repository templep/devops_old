import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private service;
    private jwtService;
    constructor(service: UsersService, jwtService: JwtService);
    validateUser(id: number, password: string): Promise<User>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
