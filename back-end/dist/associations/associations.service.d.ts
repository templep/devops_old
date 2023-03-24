import { Repository } from 'typeorm';
import { Association } from './association.entity';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
export declare class AssociationsService {
    private repository;
    private service;
    constructor(repository: Repository<Association>, service: UsersService);
    getAssociations(): Promise<Association[]>;
    get(id: number): Promise<Association>;
    getMembers(id: number): Promise<User[]>;
    add(name: string, usersId: number[]): Promise<Association>;
    update(id: number, name: string, usersId: number[]): Promise<Association>;
    private toNumber;
    delete(id: number): Promise<Association>;
}
