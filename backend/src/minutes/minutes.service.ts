import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssociationsService } from 'src/associations/associations.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Minute } from './minute.entity';

@Injectable()
export class MinutesService {
    constructor(
        @InjectRepository(Minute)
        private minRepository: Repository<Minute>,
        @Inject(forwardRef(() => UsersService))
        private userservice: UsersService
    ) {}

    async create(idVoters: number[], content: string, idAssociation:number,date: string): Promise<Minute>{
        const min = await this.minRepository.create({ 
            content:content,
            date: date,
            idAssociation:idAssociation
        });
        
        if(idVoters){
            for(let i=0; i<idVoters.length;i++){
                (await min.voters)[i]=(await this.userservice.getById(idVoters[i]) )
            }
        }
        return await this.minRepository.save(min)
    }

    async getById(idMin:number): Promise<Minute> {
        return await this.minRepository.findOneOrFail({
            where: {id: idMin}})
    }

    async getAll():Promise<Minute[]>{
        return await this.minRepository.find()
    }
    async getAllByOrderDesc():Promise<Minute[]>{
        return await this.minRepository.find({order: {date: 'DESC'}})

    }
    async getAllByOrderAsc():Promise<Minute[]>{
        return await this.minRepository.find({order: {date: 'ASC'}})

    }

    async update(idMin:number, idAssociation:number,content:string,date:string,idVoters:number[]):Promise<Minute>{
        const P= await this.getById(idMin)

        if(content){
            P.content=content;
        }
        if(idAssociation){
            P.idAssociation=idAssociation
        }
        if(date){
            P.date=date
        }
        if(idVoters){
            for(let i=0; i<idVoters.length;i++){
                (await P.voters)[i]=(await this.userservice.getById(idVoters[i]) )
            }
        }
            return await this.minRepository.save(P)
    }

    async delete(idMin:number):Promise<Boolean>{
        await this.minRepository.delete(idMin)
            return true
    }


}
