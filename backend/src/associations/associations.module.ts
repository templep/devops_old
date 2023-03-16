import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Association } from './association.entity';
import { RolesModule } from 'src/roles/roles.module';
import { MinutesModule } from 'src/minutes/minutes.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [TypeOrmModule.forFeature([Association]),forwardRef(() => RolesModule),forwardRef(() => UsersModule),forwardRef(() => MinutesModule),
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
],
  controllers: [AssociationsController],
  providers: [AssociationsService],
  exports:[AssociationsService]
})
export class AssociationsModule {}