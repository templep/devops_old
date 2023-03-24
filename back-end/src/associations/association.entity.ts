import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Association {
  /****************************************************************************/
  /*                                Attributes                                */
  /****************************************************************************/
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  //cascade: true,
  @ManyToMany((type) => User, {
    eager: true,
  })
  @JoinTable()
  public users: User[];

  /****************************************************************************/
  /*                               Constructor                                */
  /****************************************************************************/
  /**
   * Association constructor
   * @param name : string => Association name
   * @param users : User[] => Users in the association
   */
  constructor(name: string, users: User[]) {
    this.name = name;
    this.users = users;
  }
}
