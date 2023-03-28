import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User{
        @PrimaryGeneratedColumn('increment')
        id:number
        @Column()
        lastname: string
        @Column()
        firstname: string
        @Column()
        age: number
        @Column()
        email:string
        @Column({nullable: true})
        password: string
        
}