import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  /****************************************************************************/
  /*                               Constructor                                */
  /****************************************************************************/
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  /****************************************************************************/
  /*                                 Methods                                  */
  /****************************************************************************/
  /**
   * Return all users
   */
  async getUsers(): Promise<User[]> {
    return this.repository.find();
  }

  /**
   * Return user with specific id
   * @param id: number => id to find
   * @return Promise<User> => corresponding user if exist
   */
  async get(id: number): Promise<User> {
    return this.repository.findOne({ where: { id } });
  }

  /**
   * add new user in database
   * @param firstname: string => user firstname
   * @param lastname: string => user lastname
   * @param age: number => user age
   * @param password: string => user password
   */
  add(
    firstname: string,
    lastname: string,
    age: number,
    password: string,
  ): User {
    if (typeof age === 'number') {
      // create new user
      const user: User = this.repository.create({
        age,
        lastname,
        firstname,
        password,
      });

      // add new association in repository
      this.repository
        .insert(user)
        .catch((error) =>
          console.log(
            `Error while attempting to add user {${firstname}, ${lastname}, ${age} ${password}`,
          ),
        );

      // return user
      return user;
    } else {
      throw new TypeError('Age should be a number');
    }
  }

  /**
   * Update association information
   * @param id: number => association's id to update
   * @param firstname: string => new firstname
   * @param lastname: string => new lastname
   * @param age: number => new age
   * @param password: string => new password
   * @return Promise<User> => user with updated fields
   */
  async update(
    id: number,
    firstname: string,
    lastname: string,
    age: number,
    password: string,
  ): Promise<User> {
    // if fields are not empty
    if (
      !(
        firstname == undefined &&
        lastname == undefined &&
        age == undefined &&
        password == undefined
      )
    ) {
      // get the user to update
      const user: User = await this.get(id);
      // if there is a firstname
      if (firstname != undefined) {
        // update user's firstname field
        await this.repository.update(
          { id },
          {
            firstname: firstname,
          },
        );
      }
      // if there is a lastname
      if (lastname != undefined) {
        // update user's lastname field
        await this.repository.update(
          { id },
          {
            lastname: lastname,
          },
        );
      }
      // if there is an age
      if (age != undefined) {
        // update user's age field
        await this.repository.update(
          { id },
          {
            age: age,
          },
        );
      }
      // if there is a password
      if (password != undefined) {
        // update user's password field
        await this.repository.update(
          { id },
          {
            password: password,
          },
        );
      }
    }
    // return user after modification
    return this.get(id);
  }

  /**
   * Delete user
   * @param id: number => user id to delete
   */
  async delete(id: number): Promise<User> {
    // get user
    const user: User = await this.get(id);
    // delete from repository
    this.repository
      .delete(id)
      .catch((error) =>
        console.log(`Error while attempting to delete user with id ${id}`),
      );
    //return deleted user
    return user;
  }
}
