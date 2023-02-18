import { Entity, PrimaryGeneratedColumn , Column, OneToOne, JoinTable, ManyToMany, ManyToOne, JoinColumn, PrimaryColumn} from "typeorm";
import { User } from 'src/users/user.entity';
import { Association } from 'src/associations/association.entity';
@Entity()
export class Role{

    @PrimaryColumn()
    idUser:number

    @PrimaryColumn()
    idAssociation:number

    @Column()
    name: string
    
    //Lien avec User et Association

    /*@ManyToOne(type => User,user => user.id)
    @JoinTable()
    user: Promise<User[]>;
    
    @ManyToMany(type => Association, association => association.id )
    @JoinTable()
    association: Promise<Association>; */
}  