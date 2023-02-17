import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { FriendshipsService } from './friendships.service';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';


@ApiTags('Friendships')
@Controller('friendships')
export class FriendshipsController {
  constructor(
    private readonly friendshipsService: FriendshipsService,
    private readonly usersService: UsersService) { }


  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createFriendshipDto: CreateFriendshipDto, @Request() req) {

    // Recherche du demandeur
    const userSender = await this.usersService.findOneById(req.user.id);

    // Recherche du receveur
    const userReceiver = await this.usersService.findOneByPseudo(createFriendshipDto.userReceiver);




    // Création d'une demande d'amitié
    const newfriendship = await this.friendshipsService.create(userSender, userReceiver);

    return {
      statusCode: 201,
      message: 'Utilisateur enregistré',
      data: newfriendship
    };
  };



  @Get()
  findAll() {
    return this.friendshipsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.friendshipsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFriendshipDto: UpdateFriendshipDto) {
    return this.friendshipsService.update(+id, updateFriendshipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.friendshipsService.remove(+id);
  }
}
