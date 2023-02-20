import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, ConflictException, Bind, ParseIntPipe, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserFriendListDto } from './dto/update-user-friend-list.dto';
import * as bcrypt from 'bcrypt';
import { ApiTags } from '@nestjs/swagger';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common/exceptions';
import { AddToFavoritesDto } from './dto/add-to-favorites.dto';
import { TrainingsService } from 'src/trainings/trainings.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';



@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly trainingsService: TrainingsService) { }



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



  /** Permet d'ajouter un Training en favori   
   * Ajoute le Training dans le User et le User dans le Training   
   * Nécessite :
   * * d'être connecté/enregistré
   * * que le Training à ajouter existe et ne soit pas déjà en favori
   */
  @UseGuards(JwtAuthGuard)
  @Patch(':id/favorites')
  @UseInterceptors(ClassSerializerInterceptor) // permet de ne pas renvoyer le password
  async addToFavorites(@Param('id') id: number, @Body() addToFavorites: AddToFavoritesDto) {

    // Récupère le User connecté
    const userLogged = await this.usersService.findOneById(id);


    // Vérifie si le Training à ajouter existe
    const isTrainingToAdd = await this.trainingsService.findOneById(addToFavorites.training);

    if (!isTrainingToAdd) {
      throw new NotFoundException('Training Id inconnu');
    };



    // Vérifie que le Training n'est pas déjà un favori du User en comparant la liste des favoris du User avec le Training à ajouter
    const allUserFavorites = userLogged.trainings.map(elm => elm.id);

    if (allUserFavorites.includes(isTrainingToAdd.id)) {
      throw new BadRequestException('Programme déjà ajouté aux favoris');
    };

    // Ajoute le User au Training
    const addUserToTraining = await this.trainingsService.addUserToTraining(isTrainingToAdd, userLogged);

    // Ajoute le Training au User
    const addTrainingToFavoritesUser = await this.usersService.addToFavorites(userLogged, isTrainingToAdd);

    return {
      statusCode: 201,
      message: 'Programme ajouté aux favoris',
      data: addTrainingToFavoritesUser
    };
  };



  /** Suppression d'un User   
   * Nécessite: 
   * * d'être admin (et donc connecté/enregistré)
   * @param id Id du User à supprimer (inscrit dans la barre url)
   * @returns renvoie les données du User supprimé
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @Bind(Param('id', new ParseIntPipe())) // renvoie une erreur si le paramètre n'est pas un number
  @UseInterceptors(ClassSerializerInterceptor) // permet de ne pas renvoyer le password
  async remove(@Param('id') id: string, @Request() req): Promise<any> {


    // Vérifie que le User connecté est un admin
    const isUserLoggedAdmin = (await this.usersService.findOneById(req.user.id)).admin;

    if (!isUserLoggedAdmin) {
      throw new ForbiddenException("Vous ne disposez pas des droits nécessaires pour supprimer un utilisateur");
    };


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




  // INUTILE POUR LE MOMENT
  // @Patch(':id')
  // async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserFriendListDto): Promise<any> {
  //   // return this.usersService.updateFriendsList(+id, updateUserDto);
  // }
};
