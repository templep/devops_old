import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';

import { User } from '../users/user.entity';
import { Association } from './association.entity';
import { AssociationsInput } from './associations.input';
import { AssociationsService } from './associations.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { use } from 'passport';

@Controller('associations')
@UseGuards(AuthGuard('jwt'))
@ApiTags('associations')
export class AssociationsController {
  /****************************************************************************/
  /*                               Constructor                                */
  /****************************************************************************/
  /**
   * Association controller constructor
   * @param service : AssociationsService
   */
  constructor(private service: AssociationsService) {}

  /****************************************************************************/
  /*                              GET End points                              */
  /****************************************************************************/
  @Get()
  @ApiCreatedResponse({
    description: 'All the associations has been successfully returned.',
  })
  async getAll(): Promise<Association[]> {
    return await this.service.getAssociations();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Association unique id',
  })
  @ApiCreatedResponse({
    description: 'The association has been successfully returned.',
  })
  async getById(@Param() param): Promise<Association> {
    // get association from service
    const association: Association = await this.service.get(+param.id);
    // assert response is not empty
    // otherwise => not found error
    if (association === null) {
      throw new HttpException(
        `Could not find a user with the id ${param.id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    // return found association
    return association;
  }

  @Get(':id/members')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Association unique id',
  })
  @ApiCreatedResponse({
    description: "The association's users has been successfully returned.",
  })
  async getMembers(@Param() parameter): Promise<User[]> {
    return this.service.getMembers(parameter.id);
  }

  /****************************************************************************/
  /*                              POST End point                              */
  /****************************************************************************/
  @Post()
  @ApiCreatedResponse({
    description: 'The association has been successfully created.',
  })
  async create(@Body() input: AssociationsInput): Promise<Association> {
    const ids: number[] = [];
    for (let i = 0; i < input.users.length; i++) {
      if (!isNaN(input.users[i])) {
        ids.push(input.users[i]);
      }
    }
    console.log(ids);
    return await this.service.add(input.name, ids);
  }

  /****************************************************************************/
  /*                              PUT End point                               */
  /****************************************************************************/
  @Put(':id')
  @ApiCreatedResponse({
    description: 'The association has been successfully updated.',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Association unique id',
  })
  async update(
    @Body() input: AssociationsInput,
    @Param() param,
  ): Promise<Association> {
    // get association from service
    const association: Association = await this.service.get(+param.id);
    // assert association is not empty
    // otherwise => return not found error
    if (association === null) {
      throw new HttpException(
        `Could not find a user with the id ${param.id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    console.log(input.users);
    // update association with given values
    return this.service.update(+param.id, input.name, input.users);
  }

  /****************************************************************************/
  /*                            DELETE End points                             */
  /****************************************************************************/
  @Delete(':id')
  @ApiCreatedResponse({
    description: 'The association has been successfully deleted.',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Association unique id',
  })
  async delete(@Param() param): Promise<Association> {
    // get association from service

    const association: Association = await this.service.get(+param.id);
    // assert association is not empty
    // otherwise => return not found error
    if (association === null) {
      throw new HttpException(
        `Could not find an association with the id ${param.id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    // delete association
    return this.service.delete(+param.id);
  }
}
