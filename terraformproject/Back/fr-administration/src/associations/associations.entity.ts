import { User } from "src/users/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Association{

    @PrimaryGeneratedColumn()
    public id : number;

    @ManyToMany(() => User, {eager: true})
    @JoinTable()
    public users : User[];

    @Column()
    public name : string;

    public constructor(id : number, users : User[], name : string){
        this.id = id;
        this.users = users;
        this.name = name;
    }

}