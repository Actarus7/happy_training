import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseIntPipe, Bind, NotFoundException, UseInterceptors, ClassSerializerInterceptor, ForbiddenException, BadRequestException, ConflictException } from '@nestjs/common';
import { FriendshipsService } from './friendships.service';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
// import { UpdateFriendshipDto } from './dto/update-friendship.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';


@ApiTags('Friendships')
@Controller('friendships')
export class FriendshipsController {
  constructor(
    private readonly friendshipsService: FriendshipsService,
    private readonly usersService: UsersService) { }




  /** Création d'une demande d'amitié   
   * La relation est créée par défaut à false.   
   * Le receveur doit faire un update du status à true pour accepter la demande.   
   * Nécessite :   
   * * d'être connecté/enregistré
   * * que le receveur existe
   * * que le receveur ne soit pas le demandeur
   * * que la demande n'existe pas, dans un sens comme dans l'autre
   * @param createFriendshipDto Dto contenant les données de la requête (userReceiver: string (pseudo))
   * @param req req.user.id = Id du User connecté
   * @returns Retourne la nouvelle demande d'amitié
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(ClassSerializerInterceptor) // permet de ne pas renvoyer le password
  async create(@Body() createFriendshipDto: CreateFriendshipDto, @Request() req) {

    // Recherche du demandeur
    const userSender = await this.usersService.findOneById(req.user.id);



    // Vérifie que le User/Receveur existe
    const userReceiver = await this.usersService.findOneByPseudo(createFriendshipDto.userReceiver);

    if (!userReceiver) {
      throw new NotFoundException("Le User que vous tentez d'ajouter n'existe pas");
    };



    // Vérifie que le User/Receveur n'est pas le demandeur
    if (userReceiver.id === req.user.id) {
      throw new BadRequestException("Vous ne pouvez pas vous demander en ami");
    };



    // Vérifie que la demande n'existe pas déjà
    const isFriendshipExists = await this.friendshipsService.findAllByIds(userSender, userReceiver);

    if (isFriendshipExists) {
      throw new ConflictException("Une demande d'amitié entre ces deux membres existe déjà");
    };



    // Création d'une demande d'amitié
    const newfriendship = await this.friendshipsService.create(userSender, userReceiver);

    return {
      statusCode: 201,
      message: "Demande d'ami enregistrée",
      data: newfriendship
    };
  };



  /** Récupération de toutes les demandes d'amitiés en attente de réponse   
     * Récupère toutes les demandes d'amitiés en false où le User est receveur   
     * Nécessite :
     * * d'être connecté/enregistré
     * @param req req.user.id = Id du User connecté
     * @returns Retourne un tableau de toutes les demandes d'amitiés en attente de réponse
     */
  @UseGuards(JwtAuthGuard)
  @Get('user/waiting')
  @UseInterceptors(ClassSerializerInterceptor) // permet de ne pas renvoyer le password
  async findAllFriendships(@Request() req) {

    // Récupère le pseudo du User connecté
    const pseudoUser = (await this.usersService.findOneById(req.user.id)).pseudo;


    // Récupère toutes les demandes en attente
    const waitingFriendships = await this.friendshipsService.findByUserReceiver(pseudoUser);

    if (waitingFriendships.length === 0) {
      throw new NotFoundException("Aucune demande en attente");
    };

    return {
      statusCode: 200,
      message: "Vous avez des demandes en attente",
      data: waitingFriendships
    };
  };




  /** Récupération d'une demande d'amitié par son Id
   * 
   * @param id Id de la demande à retourner
   * @returns Retourne la demande d'amitié
   */
  @Get(':id')
  @Bind(Param('id', new ParseIntPipe())) // Renvoie une erreur si le paramètre n'est pas un number
  @UseInterceptors(ClassSerializerInterceptor) // Permet de ne pas renvoyer le password
  async findOne(@Param('id') id: number) {

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





  /** Récupération de tous les amis d'un User (pseudos)   
   * Récupère toutes les demandes d'amitiés en true où le User est demandeur ou receveur   
   * Nécessite :
   * * d'être connecté/enregistré
   * 
   * @param id Id de la demande d'amitié
   * @param req req.user.id = Id du User connecté
   * @returns Retourne un tableau de tous les pseudos amis du User
   */
  @UseGuards(JwtAuthGuard)
  @Get('user/friends')
  // @Bind(Param('id', new ParseIntPipe())) // renvoie une erreur si le paramètre n'est pas un number
  @UseInterceptors(ClassSerializerInterceptor) // permet de ne pas renvoyer le password
  async findAllUserPseudosFriends(@Request() req) {

    // Récupère le pseudo du User connecté
    const pseudoUser = (await this.usersService.findOneById(req.user.id)).pseudo;



    const userFriends = await this.friendshipsService.findAllPseudosFriends(req.user.id, pseudoUser);

    if (!userFriends) {
      throw new NotFoundException("Vous n'avez aucun ami à afficher pour le moment");
    };

    return {
      statusCode: 200,
      message: "Vous avez des amis !",
      data: userFriends
    };
  };






  /** Récupération de tous les amis d'un User (users)   
  * Récupère toutes les demandes d'amitiés en true où le User est demandeur ou receveur   
  * Nécessite :
  * * d'être connecté/enregistré
  * 
  * @param id Id de la demande d'amitié
  * @param req req.user.id = Id du User connecté
  * @returns Retourne un tableau de tous les pseudos amis du User
  */
  @UseGuards(JwtAuthGuard)
  @Get('user/:id/friends')
  @Bind(Param('id', new ParseIntPipe())) // renvoie une erreur si le paramètre n'est pas un number
  @UseInterceptors(ClassSerializerInterceptor) // permet de ne pas renvoyer le password
  async findAllUserFriends(@Param('id') id: number, @Request() req) {

    // Récupère le pseudo du User connecté
    const pseudoUser = (await this.usersService.findOneById(req.user.id)).pseudo;



    const userFriends = await this.friendshipsService.findAllFriends(req.user.id, pseudoUser);

    if (!userFriends) {
      throw new NotFoundException("Vous n'avez aucun ami à afficher pour le moment");
    };

    return {
      statusCode: 200,
      message: "Vous avez des amis !",
      data: userFriends
    };
  };





  /** Modification d'une demande d'ami (accepter)   
   * Nécessite :
   * * d'être connecté/enregistré
   * * que la demande d'ami existe
   * * d'être le receveur de la demande d'ami
   *     
   * @param id Id de la demande d'ami à modifier
   * @returns La demande d'ami modifiée
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
      throw new ForbiddenException("Vous ne pouvez pas modifier cette demande d'ami car vous n'êtes pas le receveur");
    };


    // Modifie la demande d'ami / Passage du status à true
    const updatedFriendship = await this.friendshipsService.update(isFriendshipExists);



    return {
      statusCode: 200,
      message: "Demande d'ami acceptée",
      data: updatedFriendship
    };

  };




  /** Suppression d'une demande d'amitié (Refus du receveur)   
   * Nécessite :
   * * d'être connecté/enregistré
   * * d'être le receveur de la demande d'amitié
   * 
   * @param id Id de la demande d'amitié
   * @param req Id du User connecté (req.user.id)
   * @returns Retourne la demande d'amitié supprimé
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @Bind(Param('id', new ParseIntPipe())) // renvoie une erreur si le paramètre n'est pas un number
  @UseInterceptors(ClassSerializerInterceptor) // permet de ne pas renvoyer le password
  async refuseFriendship(@Param('id') id: number, @Request() req) {

    // Vérifie que la demande d'amitié existe
    const isFriendshipExists = await this.friendshipsService.findOneById(+id);

    if (!isFriendshipExists) {
      throw new NotFoundException('Friendship Id inconnu');
    };


    // Vérifie que le User connecté est bien le receveur de la demande d'amitié
    if (isFriendshipExists.userReceiver.id !== req.user.id) {
      throw new ForbiddenException("Vous ne pouvez pas refuser cette demande d'ami car vous n'êtes pas le receveur");
    };



    // Suppression de la demande (refus)
    const deletedFriendship = await this.friendshipsService.remove(+id);


    return {
      statusCode: 200,
      message: "Demande d'ami supprimée",
      data: deletedFriendship
    };
  };

};
