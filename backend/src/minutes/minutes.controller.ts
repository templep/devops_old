import { Controller, Get, Body, Param, Post, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { MinutesService } from './minutes.service';
import { MinuteInput } from './minute.input';
import { MinuteUpdate } from './minute.update';
import { Minute } from './minute.entity';

@Controller('minutes')
export class MinutesController {

    constructor(
        private service: MinutesService
    ) {}
    @Get()
    async getAll():Promise<Minute[]>{
        return this.service.getAll()
    }

    @Get(':idMin')
    async getById(@Param() parameter): Promise<Minute> {
        try {
            return await this.service.getById(parameter.idMin);
          } catch (e) {
            throw new HttpException(`Could not find a minute with the id ${parameter.id}`, HttpStatus.NOT_FOUND)
          }
                   
    }
    @Post()
    async create(@Body() input:MinuteInput): Promise<Minute>{
        return this.service.create(input.idVoters, input.content,input.idAssociation,input.date)
    }

    @Put(':idMin')
    async update(@Param() parameter,@Body() input: MinuteUpdate):Promise<Minute> {
            if (this.service.update(parameter.idMin,input.idAssociation,input.content,input.date,input.idVoters)) {
                return this.service.update(parameter.idMin,input.idAssociation,input.content,input.date,input.idVoters)  
            }
            else{
                throw new HttpException(`Could not find a minute with the id ${parameter.id}`, HttpStatus.NOT_FOUND)
            }
    }

    @Delete(':idMin')
    async delete(@Param() parameter):Promise<Boolean>{
        if (this.service.delete(parameter.idMin)) {
            return this.service.delete(parameter.idMin)
        }
        else{
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND)
        }
    }

}
