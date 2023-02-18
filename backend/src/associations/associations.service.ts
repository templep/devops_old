import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Association } from './association.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssociationDTO } from './association.dto';
import { Member } from './association.member';
import { RolesService } from 'src/roles/roles.service';
import { Minute } from 'src/minutes/minute.entity';
import { MinutesService } from 'src/minutes/minutes.service';

@Injectable()
export class AssociationsService {
    //Service ajouté pour des besoins particulier du front
    async getEnt(): Promise<Association[]>{
        return await this.assRepository.find()
    }
    //Service ajouté pour des besoins particulier du front
    async getMembersId(idAssociation:number):Promise<number[]>{
        const assos_tab= await this.assRepository.findOne({where: {id: idAssociation}})
        const users=await assos_tab.users
        const tab=[]
        for(let i=0; i<users.length; i++){
            tab.push(users[i].id)
        }
        return tab
    }


    async getAll(): Promise<AssociationDTO[]>{
        const ass_all=await this.assRepository.find()
        const tab=[]
        
        for(let i=0; i<ass_all.length;i++){

            const ass_dto=await this.getById(ass_all[i].id);
            tab.push(ass_dto)
        }
        return tab;
    }

    async getById(idfind:number): Promise<AssociationDTO> {
        const assos=await this.assRepository.findOne({where: {id: idfind}})
        const users=await assos.users
        const tab=[];
        for(let i=0; i<users.length; i++){
            const rol=await this.assos_role.getById(users[i].id, idfind)
            if(rol===null){
                const role=this.assos_role.create(users[i].id, idfind,'new Member')
                const new_mbr= new Member(users[i].firstname,users[i].lastname,users[i].age,(await role).name )
                tab.push(new_mbr)

            }
            else{
                const role=this.assos_role.getById(users[i].id, idfind)
                const new_mbr= new Member(users[i].firstname,users[i].lastname,users[i].age,(await role).name )
                tab.push(new_mbr)

            }
        }
        const ass_dto=new AssociationDTO(assos.name, tab)
        return ass_dto

    }

    async getMembers(id:number): Promise<Member[]>{
        return (await this.getById(id)).members
    }

    async getMinutes(id:number,sort:string,order:string):Promise<Minute[]>{
        if(sort=='date'){
            if(order=='ASC'){
                const min_all=await this.min_serv.getAllByOrderAsc()
                console.log(min_all)
                const min_ord=[]
                for(let i=0;i<(await min_all).length;i++){
                    if(min_all[i].idAssociation===+id){
                        min_ord.push(min_all[i])
                    }
                }
                return min_ord
            }
            else{
                const min_all=await this.min_serv.getAllByOrderDesc()
                console.log(min_all)
                    const min_ord=[]
                    for(let i=0;i<(await min_all).length;i++){
                        if(min_all[i].idAssociation===+id){
                            min_ord.push(min_all[i])
                        }
                }
                return min_ord  
            }
        }
        else{
            //On considère qu'il n'y a pas de tri et qu'il se fait sur la date par ordre aléatoire
            const min_all=await this.min_serv.getAll()
            const min_ord=[]
            for(let i=0;i<(await min_all).length;i++){
                if(min_all[i].idAssociation===+id){
                    min_ord.push(min_all[i])
                }
            }
            return min_ord
        }
    }

    async create(name:string, idUsers:number[]): Promise<Association>{
        const ass =  this.assRepository.create({ 
            name: name
        })
        if(idUsers){
            for(let i=0; i<idUsers.length;i++){
                (await ass.users)[i]=(await this.userservice.getById(idUsers[i]))
            }
        }
        

        return await this.assRepository.save(ass)
    }

    async update(id: number, idUsers: number[], name: string): Promise<Association> {
        const P= await this.assRepository.findOne({where: {id: id}})
        console.log(P)
        for (let i = 0; i < (await P.users).length; i++) {
            (await P.users).splice(i);
        }
        console.log(await P.users)
        if(name){
            P.name=name;
        }
        if(idUsers){
            for(let i=0; i<idUsers.length;i++){
                (await P.users).push(await this.userservice.getById (idUsers[i]))
            }
        }
        console.log(P)
            
            return await this.assRepository.save(P)
    }





    async delete(id:number):Promise<Boolean>{
        await this.assRepository.delete(id)
            return true
    }
    
    constructor(
        @Inject(forwardRef(() => UsersService))
        private userservice: UsersService,
        @Inject(forwardRef(() => RolesService))
        private assos_role:RolesService,
        @Inject(forwardRef(() => MinutesService))
        private min_serv:MinutesService,
        @InjectRepository(Association)
        private assRepository: Repository<Association>
    ) {}

}