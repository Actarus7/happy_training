import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, ConflictException, Bind, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserFriendListDto } from './dto/update-user-friend-list.dto';
import * as bcrypt from 'bcrypt';
import { ApiTags } from '@nestjs/swagger';
import { NotFoundException } from '@nestjs/common/exceptions';



@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  /** Création d'un nouveau User
   * * pseudo unique
   * * email unique
   * * hashage du password
   * @param createUserDto Dto contenant les données de la requête (Insomnia par exemple)
   * @returns renvoie les data du nouveau User
   */
  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor) // permet de ne pas renvoyer le password
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    const saltOrRounds = 10;

    // Vérifie que le pseudo fournit n'existe pas déjà // Le DTO ne renvoie pas d'erreur à ce sujet - Voir pour qu'il le fasse
    const isPseudoExist = await this.usersService.findOneByPseudo(createUserDto.pseudo);
    if (isPseudoExist)
      throw new ConflictException(
        'Pseudo déjà utilisé, veuillez changer de pseudo',
      );

    // Vérifie que l'email fournit n'existe pas déjà
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



  /** Récupère la liste de TOUS les Users inscrits
   * 
   * @returns renvoie la liste de tous les Users inscrits (sans les passwords)
   */
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(): Promise<any> {
    const users = await this.usersService.findAll();

    return users;

  };



  /** Récupération d'un User par son id
   * 
   * @param id Id du User sélectionné (number inscrit dans la barre url)
   * @returns renvoir le User sélectionné (sans le password)
   */
  @Get(':id')
  @Bind(Param('id', new ParseIntPipe())) // renvoie une erreur si le paramètre n'est pas un number
  @UseInterceptors(ClassSerializerInterceptor) // permet de ne pas renvoyer le password
  async findOneById(@Param('id') id: number): Promise<any> {
    const user = await this.usersService.findOneById(+id);

    if (!user) {
      throw new NotFoundException("User id inexistant");
    };

    return {
      statusCode: 200,
      message: 'Affichage du User sélectionné',
      data: user
    };
  };




  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserFriendListDto): Promise<any> {
    return this.usersService.updateFriendList(+id, updateUserDto);
  }



  /** Suppression d'un User   
   * Nécessite: 
   * * d'être admin (et donc connecté/enregistré)
   * @param id Id du User à supprimer (inscrit dans la barre url)
   * @returns renvoie les données du User supprimé
   */
  @Delete(':id')
  @Bind(Param('id', new ParseIntPipe())) // renvoie une erreur si le paramètre n'est pas un number
  @UseInterceptors(ClassSerializerInterceptor) // permet de ne pas renvoyer le password
  async remove(@Param('id') id: string): Promise<any> {

    // Vérifie que le User à supprimer existe
    const isUserExists = await this.usersService.findOneById(+id);

    if (!isUserExists) {
      throw new NotFoundException('User id inexistant');
    };


    // Supprime le User sélectionné
    await this.usersService.remove(+id);

    return {
      statusCode: 200,
      message: 'Affichage du User supprimé',
      data: isUserExists
    };
  };

};
