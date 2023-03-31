import { Controller, Get, Body, Post, Param, Put, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { debug } from 'console';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UserInput } from './user.input';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('users')
@Controller('users')
export class UsersController {

    public constructor(private readonly service: UsersService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    public async getUsers(): Promise<User[]> {
        return await this.service.getUsers();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    @ApiParam({ name: 'id', type: Number})
    public async getUserById(@Param() parameter : any): Promise<User>{

        let u = await this.service.getUserById(+parameter.id);
        
        if(u === null)
            throw new HttpException('Users Id does not exist', HttpStatus.NOT_FOUND);
            
        return u;
    }

    @Post()
    public async create(@Body() input: UserInput): Promise<User> {
        return await this.service.create(input.lastname, input.firstname, input.age, input.email, input.password);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    @ApiParam({ name: 'id', type: Number})
    public async setValueUserById(@Param() parameter : any, @Body() input: UserInput): Promise<User>{

        if(await this.service.getUserById(+parameter.id) === null)
            throw new HttpException('Users Id does not exist', HttpStatus.NOT_FOUND);

        let u = await this.service.setValueUserById(+parameter.id, input.lastname, input.firstname, input.age, input.email, input.password);

        return u;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    @ApiParam({ name: 'id', type: Number})
    public async deleteUserById(@Param() parameter : any): Promise<boolean>{
        if(await this.service.getUserById(+parameter.id) === null)
            throw new HttpException('Users Id does not exist', HttpStatus.NOT_FOUND);

        return await this.service.deleteUserById(parameter.id);
    }

}