import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssociationsService } from 'src/associations/associations.service';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RolesService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private userService:UsersService,
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
    ) {}
    async create(idUser: number, idAssociation:number,name: string): Promise<Role>{
        const ass =  this.roleRepository.create({ 
            name: name,
            idUser:idUser,
            idAssociation: idAssociation
        });

        return await this.roleRepository.save(ass)
    }
    async getAll():Promise<Role[]>{
        return this.roleRepository.find()
    }

    async getById(idUser:number,idAssociation:number): Promise<Role> {
        return await this.roleRepository.findOne({
            where: {
                idUser:idUser,
                idAssociation:idAssociation
            }
        })
    }

    async getNames(name:string): Promise<User[]> {
        const role=await this.roleRepository.find({where:
            {name:name}
        })
        const users=[]
        for(let i=0;i<role.length;i++){
            users.push(await this.userService.getById(role[i].idUser))
        }
        return await users
        
    }
    async update(idUser:number, idAssociation:number,name:string):Promise<Role>{
        const P= await this.getById(idUser,idAssociation)
        if(name){
            P.name=name;
        }
            return await this.roleRepository.save(P)
    }
    async delete(idUser:number, idAssociation):Promise<Boolean>{
        await this.roleRepository.delete({idUser: idUser , idAssociation:idAssociation})
            return true
    }


}
