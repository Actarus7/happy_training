import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserFriendListDto } from './dto/update-user-friend-list.dto';
import * as bcrypt from 'bcrypt';
import { ApiTags } from '@nestjs/swagger';



@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    const saltOrRounds = 10;

    const isPseudoExist = await this.usersService.findOneByPseudo(createUserDto.pseudo);
    if (isPseudoExist)
      throw new ConflictException(
        'Pseudo déjà utilisé, veuillez changer de pseudo',
      );

    const isEmailExist = await this.usersService.findOneByEmail(createUserDto.email);
    if (isEmailExist)
      throw new ConflictException(
        'E-mail déjà utilisé, veuillez entrer un e-mail valide',
      );


    // Hashage du password
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);

    // Création du user
    const user = await this.usersService.create(createUserDto, hash);

    return {
      statusCode: 201,
      message: 'Utilisateur enregistré',
      data: user
    };
  };




  @Get()
  async findAll() {
    const users = await this.usersService.findAll();

    return users;

  };

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserFriendListDto) {
    return this.usersService.updateFriendList(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
