import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Equal, Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { AppModule } from 'src/app.module';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';

@Injectable()
export class UsersService {

    public constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @Inject('MailService')
        private rabbitmqClient: ClientProxy
    ) {}

    public async getUsers(): Promise <User[]> {
        return await this.userRepository.find();
    }

    public async getUserById(id : number): Promise<User>{
        let u = await this.userRepository.findOne({where: {id: Equal(id)}});
        return u;
    }

    public async create(lastname : string, firstname : string, age : number,  email : string, password : string): Promise<User> {
        
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);

        let u = this.userRepository.create({
            lastname: lastname,
            firstname: firstname,
            age: age,
            email: email,
            password: hash,
        });

        await this.userRepository.save(u);

        await this.sendMail(email, "Bienvenue sur notre site "+firstname , "Vous êtes maintenant inscrit sur notre site");

        return u;
    }

    public async setValueUserById(id : number, lastname : string, firstname : string, age : number, email : string, password : string): Promise<User>{

        let u = await this.getUserById(id);

        if(lastname !== undefined)
            u.lastname = lastname;

        if(firstname !== undefined)
            u.firstname = firstname;
        
        if(age !== undefined)
            u.age = age;

        if(email !== undefined)
            u.email = email;
        
        if(password !== undefined){
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(password, saltOrRounds);
            u.password = hash;
        }
            
        u = await this.userRepository.save(u);

        await this.sendMail(email, "Modification Profil", "Confirmation de la modification de profil");

        return u;
    }

    public async deleteUserById(id : number): Promise<boolean>{
        let u = await this.userRepository.findOne({where: {id: Equal(id)}})
        this.userRepository.delete(u);

        await this.sendMail(u.email, "Ce n'est qu'un aurevoir "+u.firstname, "Confirmation de la suppression de profil");

        return true;
    }

    public async sendMail(email : string, subject : string, message : string){

        let mail = [email, subject, message]

        const record = new RmqRecordBuilder(JSON.stringify(mail))
        .setOptions({
            contentType: "application/json"
        })
        .build();

        this.rabbitmqClient.emit('mail', record);

    }
}
