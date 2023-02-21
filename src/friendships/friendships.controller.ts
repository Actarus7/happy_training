import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseIntPipe, Bind, NotFoundException, UseInterceptors, ClassSerializerInterceptor, ForbiddenException } from '@nestjs/common';
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
  @UseInterceptors(ClassSerializerInterceptor) // permet de ne pas renvoyer le password
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


  /** Récupération d'une demande d'amitié par son Id */
  @Get(':id')
  @Bind(Param('id', new ParseIntPipe())) // renvoie une erreur si le paramètre n'est pas un number
  @UseInterceptors(ClassSerializerInterceptor) // permet de ne pas renvoyer le password
  async findOne(@Param('id') id: string) {

    const friendship = await this.friendshipsService.findOneById(+id);

    if (!friendship) {
      throw new NotFoundException('Friendship Id inconnu');
    };

    return {
      statusCode: 201,
      message: "Demande d'amitié sélectionnée",
      data: friendship
    };
  };



  /** Modification d'une demande d'ami (accepter)   
   * Nécessite :
   * * d'être connecté/enregistré
   * * que la demande d'ami existe
   * * d'être le receveur de la demande d'ami
   *     
   * 2 étapes: 
   * * ajout le demandeur dans la liste d'ami du receveur
   * * ajout du receveur dans la liste d'ami du demandeur
   * @param id Id de la demande d'ami à modifier
   * @returns 
   */
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @Bind(Param('id', new ParseIntPipe())) // renvoie une erreur si le paramètre n'est pas un number
  @UseInterceptors(ClassSerializerInterceptor) // permet de ne pas renvoyer le password
  async update(@Param('id') id: number, @Request() req) {


    // Vérifie que la demande d'amitié existe
    const isFriendshipExists = await this.friendshipsService.findOneById(+id);

    if (!isFriendshipExists) {
      throw new NotFoundException('Friendship Id inconnu');
    };


    // Vérifie que le User connecté est bien le receveur de la demande d'amitié
    if (isFriendshipExists.userReceiver.id !== req.user.id) {
      throw new ForbiddenException("Vous ne pouvez pas modifier cette demande d'ami");
    };


    // Modifie la demande d'ami / Passage du status à true
    const updatedFriendship = await this.friendshipsService.update(isFriendshipExists);





    return {
      statusCode: 201,
      message: "Demande d'ami acceptée",
      data: updatedFriendship
    };

  };




  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.friendshipsService.remove(+id);
  }
}
