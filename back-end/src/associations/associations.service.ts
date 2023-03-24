import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Association } from './association.entity';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AssociationsService {
  /****************************************************************************/
  /*                               Constructor                                */
  /****************************************************************************/
  constructor(
    @InjectRepository(Association)
    private repository: Repository<Association>,
    private service: UsersService,
  ) {}

  /****************************************************************************/
  /*                                 Methods                                  */
  /****************************************************************************/
  /**
   * Return all associations
   */
  async getAssociations(): Promise<Association[]> {
    return this.repository.find();
  }

  /**
   * Return association with specific id
   * @param id: number => id to find
   * @return Promise<Association> => corresponding association if exist
   */
  async get(id: number): Promise<Association> {
    return this.repository.findOne({ where: { id } });
  }

  /**
   * get member of association with specific id
   * @param id: number => id to find
   * @return Promise<User[]> => Association's users if exists
   */
  async getMembers(id: number): Promise<User[]> {
    // get association with id
    const association: Association = await this.get(id);
    // return user array
    return association.users;
  }

  /**
   * add new association in database
   * @param name: string => association name
   * @param usersId: number[] => user's ids
   */
  async add(name: string, usersId: number[]): Promise<Association> {
    const usersIdNumber: number[] = this.toNumber(usersId);
    // create new empty user array
    const users: User[] = new Array<User>();
    // fill array with users
    for (let i = 0; i < usersIdNumber.length; i++) {
      users.push(await this.service.get(usersIdNumber[i]));
    }
    // create new association
    const association: Association = this.repository.create({
      name,
      users,
    });

    // add new association in repository
    this.repository
      .save(association)
      .catch((error) =>
        console.log(`Error while attempting to add user {${name}, ${users}}`),
      );

    // return association
    return association;
  }

  /**
   * Update association information
   * @param id: number => association's id to update
   * @param name: string => new name
   * @param usersId: number[] => new users id
   * @return Promise<Association> => association with updated fields
   */
  async update(
    id: number,
    name: string,
    usersId: number[],
  ): Promise<Association> {
    //const usersIdNumber = this.toNumber(usersId);
    // if fields are not empty
    if (!(usersId == undefined && name == undefined)) {
      // get the association to update
      const association: Association = await this.get(id);

      // if there is a new user list
      if (usersId != undefined) {
        // create empty user array
        const users: User[] = new Array<User>();
        // fill with selected users
        for (let i = 0; i < usersId.length; i++) {
          users.push(await this.service.get(usersId[i]));
        }

        // update association users field
        association.users = users;
        await this.repository.save(association);
      }
      // if there is a new name
      if (name != undefined) {
        // update association name field
        await this.repository.update(
          { id },
          {
            name: name,
          },
        );
      }
    }
    // return association after modification
    return this.get(id);
  }

  private toNumber(ids: number[]): number[] {
    const ret: number[] = [];
    for (let i = 0; i < ids.length; i++) {
      ret.push(+ids[i]);
    }
    console.log(ret);
    return ret;
  }

  /**
   * Delete association
   * @param id: number => association id to delete
   */
  async delete(id: number): Promise<Association> {
    // get association
    const association: Association = await this.get(id);
    // delete from repository
    try {
      await this.repository.delete(id);
      // return deleted association
      return association;
    } catch (error) {
      console.log(error);
      `Error while attempting to delete association with id ${id}`;
    }
  }
}
