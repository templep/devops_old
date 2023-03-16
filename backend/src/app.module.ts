import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssociationsModule } from './associations/associations.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MinutesModule } from './minutes/minutes.module';
import { RolesModule } from './roles/roles.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices'
@Module({ 
  imports:[
    ConfigModule.forRoot({isGlobal: true, envFilePath: '../.env'}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('POSTGRES_HOST'),
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('POSTGRES_DB'),
        port: 5432, 
        entities: [__dirname + 'dist/*/.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }), 
    }),
    ClientsModule.register([{
      name: 'GREETING_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:password@rabbitmq:5672/vhost'],
        queue: 'mail_queue',
        queueOptions: {
          durable: false
        }
      }
    }]),
  UsersModule, AssociationsModule, AuthModule, MinutesModule, RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}