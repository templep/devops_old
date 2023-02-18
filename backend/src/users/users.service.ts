import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/role.entity';
import { Association } from 'src/associations/association.entity';
import * as bcrypt from 'bcrypt';
import { AssociationsService } from 'src/associations/associations.service';
@Injectable()
export class UsersService {
    constructor(
        @Inject(forwardRef(() => RolesService))
        private role_service:RolesService,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        ) {}

    async getAll(): Promise<User[]>{
        return await this.usersRepository.find();
    }

    async getById(idfind:number): Promise<User> {
        return await this.usersRepository.findOne({where: {id: idfind}})

    }
    async getRoles(id:number): Promise<Role[]>{

        const role_all=await this.role_service.getAll()
        const role_tab=[]
        let old_id=role_all[0].idAssociation
        role_tab.push(await this.role_service.getById(id,old_id))

        for(let i=1; i<role_all.length;i++){
            if(old_id!=role_all[i].idAssociation){
                const role=await this.role_service.getById(id,role_all[i].idAssociation)
                old_id=role_all[i].idAssociation
                role_tab.push(role)
            }
            
        }
        
        return role_tab  
    }

    async create(lastname: string, firstname: string, age: number, password: string): Promise<User>{
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        const newUser = await this.usersRepository.create({ 
            lastname: lastname, 
            firstname: firstname, 
            age: age,
            password: hash
        })
        return await this.usersRepository.save(newUser)
    }
    
    async update(lastname: string, firstname: string, age: number,id:number, password:string):Promise<User>{
        const P= await this.getById(id)
        if(lastname){
            P.lastname=lastname;
        }
        if(firstname){
            P.firstname=firstname
        }
        if(age){
            P.age=age
        }
        if(password){
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(password, saltOrRounds);
            P.password=hash
        }
        return await this.usersRepository.save(P)
    
    }

    async delete(idfind:number):Promise<Boolean>{
        await this.usersRepository.delete(idfind)
        return true
    }

           
}
    