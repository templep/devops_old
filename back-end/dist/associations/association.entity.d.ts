import { User } from '../users/user.entity';
export declare class Association {
    id: number;
    name: string;
    users: User[];
    constructor(name: string, users: User[]);
}
