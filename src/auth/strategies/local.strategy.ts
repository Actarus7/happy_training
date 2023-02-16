import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService) {
    super({ usernameField: 'pseudo' });
  }


  async validate(pseudo: string, password: string): Promise<any> {

    // Vérifie si le Pseudo existe dans la BDD
    const isUserExist = await this.usersService.findOneByPseudo(pseudo);

    if (!isUserExist) throw new BadRequestException('Pseudo incorrect');


    // Vérifie le password
    const user = await this.authService.validateUser(pseudo, password);

    if (!user) { throw new UnauthorizedException(); };

    return user;

  };

};
