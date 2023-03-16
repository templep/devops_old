import { Controller, Get, Body, Param, Post, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { Association } from './association.entity';
import { User } from 'src/users/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { AssociationDTO } from './association.dto';
import { Member } from './association.member';
import { Minute } from 'src/minutes/minute.entity';

@ApiTags('associations')
@Controller('associations')
export class AssociationsController {
    @Get()
    async getAll(): Promise<AssociationDTO[]>{
        return await this.service.getAll();
    }
    //controller ajouté pour des besoins particulier du front
    @Get('/ent')
    async getEnt():Promise<Association[]>{
        return await this.service.getEnt();
    }
    //Controller ajouté pour des besoins particulier du front
    @Get(':id/IdMembers')
    async getMembersId(@Param() parameter):Promise<number[]>{
        return await this.service.getMembersId(parameter.id)
    }

    @Get(':id')
    async getById(@Param() parameter): Promise<AssociationDTO> {
        try {
            return await this.service.getById(parameter.id);
          } catch (e) {
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND)
          }
    }
    
    @Get(':id/members')
    async getMembers(@Param() parameter):Promise<Member[]>{
        return await this.service.getMembers(parameter.id)
    }
    @Get(':id/mails')
    async getMail(@Param() parameter):Promise<string[]>{
        return await this.service.destinatorEmail(parameter.id)
    }

    @Get(':id/minutes')
    async getMinutes(@Param() parameter,@Body() input: any):Promise<Minute[]>{
        console.log(input.sort)
        return await this.service.getMinutes(parameter.id,input.sort,input.order)
        
    }

    @Post()
    async create(@Body() input: any): Promise<Association>{
        return await this.service.create(input.name,input.idUsers)
    }
    @Put(':id')
    update(@Param() parameter,@Body() input: any):Promise<Association> {
            if (true) {
                return this.service.update(parameter.id,input.idUsers,input.name)   
            }
            else{
                throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND)
            }
    }

    @Delete(':id')
    async delete(@Param() parameter):Promise<Boolean>{
        if (this.service.delete(parameter.id)) {
            return await this.service.delete(parameter.id)
        }
        else{
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND)
        }
    }
    @Post('/message')
    async publishEvent(@Param() parameter,@Body() input: any) {
      return await this.service.publishMessage(input.topic,input.message,input.destinators);
    }

    constructor(
        private service: AssociationsService
    ) {}
}