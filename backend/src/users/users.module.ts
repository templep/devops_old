import { forwardRef, Module } from '@nestjs/common';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from 'src/roles/roles.service';
import { RolesModule } from 'src/roles/roles.module';
import { Role } from 'src/roles/role.entity';
import { AssociationsModule } from 'src/associations/associations.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [TypeOrmModule.forFeature([User]),forwardRef(() => RolesModule),forwardRef(() => AssociationsModule),ClientsModule.register([{
    name: 'GREETING_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://user:password@rabbitmq:5672/vhost'],
      queue: 'mail_queue',
      queueOptions: {
        durable: false
      }
    }
  }]),],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}