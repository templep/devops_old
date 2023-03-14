import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Equal, Repository } from 'typeorm';
import { Association } from './associations.entity';

@Injectable()
export class AssociationsService {

    public constructor(private service: UsersService, 
        @InjectRepository(Association)
        private associationsRepository: Repository<Association>
    ){}

    public async getAssociations() : Promise<Association[]>{
        return await this.associationsRepository.find();
    }
    
    public async getAssociationById(id : number) : Promise<Association>{
        return await this.associationsRepository.findOne({where: {id: Equal(id)}});
    }

    public async addAssociation(idUsers : number[], name : string) : Promise<Association>{

        let users : User[] = [];
        for(let i = 0; i < idUsers.length; i++)
            users[i] = await this.service.getUserById(idUsers[i]);

        let a = this.associationsRepository.create({
            name: name,
            users: users
        });

        await this.associationsRepository.save(a);

        return a;
    }

    public async putAssociation(id : number, idUsers : number[], name : string) : Promise<Association>{

        let a = await this.getAssociationById(id);

        let users : User[] = [];
        for(let i = 0; i < idUsers.length; i++)
            users[i] = await this.service.getUserById(idUsers[i]);

        if(idUsers !== undefined)
            a.users = users;
        if(name !== undefined)
            a.name = name;

        await this.associationsRepository.save(a);

        return a;
    }

    public async deleteAssociation(id : number) : Promise<boolean>{
        
        let a = await this.getAssociationById(id);
        await this.associationsRepository.delete(a.id);

        return true;
    }

    public async getMembers(id : number) : Promise<User[]>{

        let asso = await this.getAssociationById(id);
        let users : User[] = [];

        for(let user of asso.users)
            users.push(user);

        return users;
    }

}
