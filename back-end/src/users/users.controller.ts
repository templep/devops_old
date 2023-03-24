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

import { User } from './user.entity';
import { UserInput } from './users.input';
import { UsersService } from './users.service';
import { ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@ApiTags('users')
export class UsersController {
  /****************************************************************************/
  /*                               Constructor                                */
  /****************************************************************************/
  /**
   * User controller constructor
   * @param service : UsersService
   */
  constructor(private service: UsersService) {}

  /****************************************************************************/
  /*                              GET End points                              */
  /****************************************************************************/
  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiCreatedResponse({
    description: 'All the users has been successfully returned.',
  })
  async getAll(): Promise<User[]> {
    return await this.service.getUsers();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'User unique id',
  })
  @ApiCreatedResponse({
    description: 'The user has been successfully returned.',
  })
  async getById(@Param() param): Promise<User> {
    // get user from service
    const user: User = await this.service.get(+param.id);
    // assert response is not empty
    // otherwise => not found error
    if (user === null) {
      throw new HttpException(
        `Could not find a user with the id ${param.id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    // return found user
    return user;
  }

  /****************************************************************************/
  /*                              POST End point                              */
  /****************************************************************************/
  @Post()
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
  })
  create(@Body() input: UserInput): User {
    return this.service.add(
      input.firstname,
      input.lastname,
      +input.age,
      input.password,
    );
  }

  /****************************************************************************/
  /*                              PUT End point                               */
  /****************************************************************************/
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiCreatedResponse({
    description: 'The user has been successfully updated.',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'User unique id',
  })
  async update(@Body() input: UserInput, @Param() param): Promise<User> {
    // get user from service
    const user: User = await this.service.get(+param.id);
    // assert user is not empty
    // otherwise => return not found error
    if (user === null) {
      throw new HttpException(
        `Could not find a user with the id ${param.id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    // update user with given values
    return this.service.update(
      +param.id,
      input.firstname,
      input.lastname,
      +input.age,
      input.password,
    );
  }

  /****************************************************************************/
  /*                            DELETE End points                             */
  /****************************************************************************/
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiCreatedResponse({
    description: 'The user has been successfully deleted.',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'User unique id',
  })
  async delete(@Param() param): Promise<User> {
    // get user from service
    const user: User = await this.service.get(+param.id);
    // assert user is not empty
    // otherwise => return not found error
    if (user === null) {
      throw new HttpException(
        `Could not find a user with the id ${param.id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    // delete user
    return this.service.delete(+param.id);
  }
}
