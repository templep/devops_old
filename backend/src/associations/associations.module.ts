import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Association } from './association.entity';
import { RolesModule } from 'src/roles/roles.module';
import { MinutesModule } from 'src/minutes/minutes.module';
@Module({
  imports: [TypeOrmModule.forFeature([Association]),forwardRef(() => RolesModule),forwardRef(() => UsersModule),forwardRef(() => MinutesModule)],
  controllers: [AssociationsController],
  providers: [AssociationsService],
  exports:[AssociationsService]
})
export class AssociationsModule {}