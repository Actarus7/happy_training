import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';


/**décorateur Tag permettant de catégoriser les différentes route dans la doc API Swagger*/
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Request() req) {

    return this.authService.login(req.user);

  };


};
