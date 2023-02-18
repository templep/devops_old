import { Controller, Get, Body, Param, Post, Put, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserInput } from './user.input';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/roles/role.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
    @Get(':id')
    //@UseGuards(AuthGuard('jwt'))
    async getById(@Param() parameter): Promise<User> {
        if (this.service.getById(parameter.id)) {
            return this.service.getById(parameter.id)
        }
        else{
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND)
        }

    }
    @Get()
    //@UseGuards(AuthGuard('jwt'))
    async getAll(): Promise<User[]>{
        return this.service.getAll();
    }
    
    @Get(':id/roles')
    async getRoles(@Param() parameter): Promise<Role[]> {
        return await this.service.getRoles(parameter.id)
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The user has been successfully created.'
    })
    async create(@Body() input:UserInput): Promise<User>{
        return this.service.create(input.lastname, input.firstname,input.age,input.password)
    }
    @Put(':id')
    async update(
        @Param() parameter,
        @Body() input: UserInput):Promise<User> {
            if (this.service.update(input.firstname,input.lastname,input.age,parameter.id,input.password)) {
                return this.service.update(input.firstname,input.lastname,input.age,parameter.id,input.password)
            }
            else{
                throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND)
            }
    }

    @Delete(':id')
    async delete(@Param() parameter):Promise<Boolean>{
        if (this.service.delete(parameter.id)) {
            return this.service.delete(parameter.id)
        }
        else{
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND)
        }
    }
    constructor(
        private service: UsersService
    ) {}
}