import { User } from './user.entity';
import { UserInput } from './users.input';
import { UsersService } from './users.service';
export declare class UsersController {
    private service;
    constructor(service: UsersService);
    getAll(): Promise<User[]>;
    getById(param: any): Promise<User>;
    create(input: UserInput): User;
    update(input: UserInput, param: any): Promise<User>;
    delete(param: any): Promise<User>;
}
