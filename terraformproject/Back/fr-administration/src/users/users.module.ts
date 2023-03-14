import { forwardRef, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), forwardRef(() =>AuthModule),
    ClientsModule.register([
      {
        name : "MailService",
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://mailuser:mailpassword@rabbitmq:5672'],
          queue: 'mailqueue',
          queueOptions: {
            durable: true
          },
        }
      }
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
