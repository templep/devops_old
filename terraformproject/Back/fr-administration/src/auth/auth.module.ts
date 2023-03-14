import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [ forwardRef(() => UsersModule), PassportModule, JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '300s' },
        })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})

export class AuthModule {}
