import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  /****************************************************************************/
  /*                               Constructor                                */
  /****************************************************************************/
  constructor(private service: UsersService, private jwtService: JwtService) {}

  /****************************************************************************/
  /*                                 Methods                                  */
  /****************************************************************************/
  /**
   * Validate user password
   * @param id: number => login
   * @param password: string => password
   */
  public async validateUser(id: number, password: string): Promise<User> {
    const user: User = await this.service.get(id);

    if (user != undefined && user.password === password) {
      return user;
    }
    return undefined;
  }

  /**
   * login user with jwt strategy
   * @param user: any
   * @return user token
   */
  async login(user: any) {
    const found: User = await this.validateUser(user.username, user.password);
    if (found != undefined) {
      const payload = { username: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new HttpException(`Wrong id or password`, HttpStatus.UNAUTHORIZED);
    }
  }
}
