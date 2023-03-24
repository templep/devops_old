import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { Association } from './association.entity';
import { AssociationsService } from './associations.service';
import { AssociationsController } from './associations.controller';

@Module({
  controllers: [AssociationsController],
  providers: [AssociationsService],
  exports: [AssociationsService],
  imports: [TypeOrmModule.forFeature([Association]), UsersModule],
})
export class AssociationsModule {}
