import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Association } from 'src/associations/association.entity';
import { AssociationsModule } from 'src/associations/associations.module';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';
import { Minute } from './minute.entity';
import { MinutesController } from './minutes.controller';
import { MinutesService } from './minutes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Minute]),forwardRef(() => AssociationsModule),forwardRef(() => UsersModule)],
  controllers: [MinutesController],
  providers: [MinutesService],
  exports:[MinutesService]
})
export class MinutesModule {}
