import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesService } from './services/services.service';
import { UsersModule } from './users/users.module';
import { AssociationsController } from './associations/associations.controller';
import { AssociationsService } from './associations/associations.service';
import { AssociationsModule } from './associations/associations.module';
import { Association } from './associations/associations.entity';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'test',
      entities: [
        User,
        Association
      ],
      synchronize: true,
    }),
    UsersModule, AssociationsModule, AuthModule, PrometheusModule.register()],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
