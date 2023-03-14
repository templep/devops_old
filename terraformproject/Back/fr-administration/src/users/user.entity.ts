import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public lastname: string;

    @Column()
    public firstname: string;

    @Column()
    public age: number;

    @Column()
    public email: string;

    @Column()
    public password: string;

    constructor(id: number, lastname: string, firstname: string, age : number, email: string, password: string){
        this.id = id;
        this.lastname = lastname;
        this.firstname = firstname;
        this.age = age;
        this.email = email;
        this.password = password;
    }

}