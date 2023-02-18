import { Entity, PrimaryGeneratedColumn , Column, OneToOne, JoinTable, ManyToMany, ManyToOne, JoinColumn, PrimaryColumn} from "typeorm";
import { Association } from 'src/associations/association.entity';
import { User } from "src/users/user.entity";
@Entity()
export class Minute{
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    content: string;

    @Column()
    date: string;

    @Column()
    idAssociation:number;

    @ManyToMany(type => User)
    @JoinTable()
    voters: Promise<User[]>;



   
}