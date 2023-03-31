import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { Association } from './associations.entity';
import { AssociationsService } from './associations.service';
import { ApiCreatedResponse, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AssociationInput } from './associations.input';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('associations')
@Controller('associations')
export class AssociationsController {

    public constructor(private readonly service : AssociationsService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    @ApiCreatedResponse({
        description: 'Association returned successfully'
    })
    public async getAssociations() : Promise<Association[]>{
        return await this.service.getAssociations();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    @ApiCreatedResponse({
        description: 'Association returned successfully'
    })
    @ApiParam({ name: 'id', type: Number})
    public async getAssociationById(@Param() parameter : any) : Promise<Association>{

        let a = await this.service.getAssociationById(+parameter.id);

        if(a === null)
            throw new HttpException('Association id not exists', HttpStatus.NOT_FOUND);

        return a;
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiCreatedResponse({
        description: 'Association created successfully'
    })
    @Post()
    public async postAssociation(@Body() input : AssociationInput) : Promise<Association>{
        return await this.service.addAssociation(input.idUsers, input.name);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    @ApiCreatedResponse({
        description: 'Association added successfully'
    })
    @ApiParam({ name: 'id', type: Number})
    public async putAssociation(@Param() parameter : any, @Body() input : any) : Promise<Association>{

        if(await this.service.getAssociationById(+parameter.id) === null)
            throw new HttpException('Association id does not exist', HttpStatus.NOT_FOUND);

        return await this.service.putAssociation(+parameter.id, input.users, input.name);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiCreatedResponse({
        description: 'Association deleted successfully'
    })
    @Delete(':id')
    @ApiParam({ name: 'id', type: Number})
    public async deleteAssociation(@Param() parameter : any) : Promise<boolean>{

        if(await this.service.getAssociationById(+parameter.id) === null)
            throw new HttpException('Association id does not exist', HttpStatus.NOT_FOUND);

        return await this.service.deleteAssociation(+parameter.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id/members')
    @ApiCreatedResponse({
        description: 'Association members returned successfully'
    })
    @ApiParam({ name: 'id', type: Number})
    public async getMembers(@Param() parameter : any): Promise<User[]> {

        if(await this.service.getAssociationById(+parameter.id) === null)
            throw new HttpException('Association id does not exist', HttpStatus.NOT_FOUND);

        return await this.service.getMembers(+parameter.id);
    }

}
