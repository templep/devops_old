import { User } from './user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private repository;
    constructor(repository: Repository<User>);
    getUsers(): Promise<User[]>;
    get(id: number): Promise<User>;
    add(firstname: string, lastname: string, age: number, password: string): User;
    update(id: number, firstname: string, lastname: string, age: number, password: string): Promise<User>;
    delete(id: number): Promise<User>;
}
