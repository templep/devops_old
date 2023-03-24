import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  /****************************************************************************/
  /*                                Attributes                                */
  /****************************************************************************/
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public firstname: string;

  @Column()
  public lastname: string;

  @Column()
  public age: number;

  @Column()
  public password: string;

  /****************************************************************************/
  /*                               Constructor                                */
  /****************************************************************************/
  constructor(id: number, firstname: string, lastname: string, age: number) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
  }
}
