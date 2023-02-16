import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService) { }


  async validateUser(pseudo: string, pass: string): Promise<any> {

    const user = await this.usersService.findOneByPseudo(pseudo);

    const isMatch = await bcrypt.compare(pass, user.password);

    if (isMatch) {
      const { password, ...result } = user;

      return result;

    };

    throw new ForbiddenException('Password incorrect');
  };


  async login(user: any) {

    const payload = { pseudo: user.pseudo, sub: user.id };

    return {
      statusCode: 200,
      message: 'Connection réussie',
      data: { 
        username: payload.pseudo,
        access_token: this.jwtService.sign(payload) },
    };

  };

};
