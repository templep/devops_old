import { User } from '../users/user.entity';
import { Association } from './association.entity';
import { AssociationsInput } from './associations.input';
import { AssociationsService } from './associations.service';
export declare class AssociationsController {
    private service;
    constructor(service: AssociationsService);
    getAll(): Promise<Association[]>;
    getById(param: any): Promise<Association>;
    getMembers(parameter: any): Promise<User[]>;
    create(input: AssociationsInput): Promise<Association>;
    update(input: AssociationsInput, param: any): Promise<Association>;
    delete(param: any): Promise<Association>;
}
