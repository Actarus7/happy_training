import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, NotFoundException, UseGuards, Request, ForbiddenException, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { TrainingsService } from './trainings.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { Training } from './entities/training.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';

@Controller('trainings')
export class TrainingsController {
  constructor(
    private readonly trainingsService: TrainingsService,
    private readonly usersService: UsersService) { };


  /** Création d'un nouveau Training   
   * Nécessite :
   * * d'être connecté/enregistré
   * * d'être une admin
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(ClassSerializerInterceptor) // permet de ne pas renvoyer le password
  async create(@Body() createTrainingDto: CreateTrainingDto, @Request() req): Promise<any> {


    // Vérifie que le User connecté est un admin
    const userLoggedAdmin = (await this.usersService.findOneById(req.user.id)).admin;

    if (!userLoggedAdmin) {
      throw new ForbiddenException("Vous devez être admin pour créer un Training");
    };



    // Création du nouveau Training
    const newTraining = await this.trainingsService.create(createTrainingDto);

    return {
      statusCode: 201,
      message: 'training créé',
      data: newTraining
    };
  };


  @Get()
  @UseInterceptors(ClassSerializerInterceptor) // permet de ne pas renvoyer le password
  async findAll() {
    const trainings = await this.trainingsService.findAll();
    if (!trainings) {
      throw new NotFoundException(`Trainings not found.`);
    }
    return trainings;
  };


  @Get('first')
  @UseInterceptors(ClassSerializerInterceptor) // permet de ne pas renvoyer le password
  async findFirstTraining() {
    const training = await this.findFirstTraining();
    if (!training) {
      throw new NotFoundException(`Training not found.`);
    }
    return training;
  };


  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor) // permet de ne pas renvoyer le password
  async findById(@Param('id') id: string) {
    const training = await this.trainingsService.findOneById(+id);
    if (!training) {
      throw new NotFoundException(`Training with id ${id} not found.`);
    };

    return training;
  };


  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor) // permet de ne pas renvoyer le password
  async update(@Param('id') id: string, @Body() updateTrainingDto: UpdateTrainingDto, @Request() req): Promise<any> {


    // Vérifie que le User connecté est un admin
    const userLoggedAdmin = (await this.usersService.findOneById(req.user.id)).admin;

    if (!userLoggedAdmin) {
      throw new ForbiddenException("Vous devez être admin pour modifier un training");
    };



    // Vérifie que le Training existe
    const isTrainingExist = await this.findById(id);

    if (!isTrainingExist) {
      throw new NotFoundException(`Training with id ${id} not found.`);
    };



    // Modification d'un Training
    const updateTraining = await this.trainingsService.update(isTrainingExist, updateTrainingDto);

    return updateTraining;

  };


  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor) // permet de ne pas renvoyer le password
  async remove(@Param('id') id: string, @Request() req) /* Promise<void>*/ {

    // Vérifie que le User connecté est un admin
    const userLoggedAdmin = (await this.usersService.findOneById(req.user.id)).admin;

    //vérifie et envoie message erreur si l'User n'est pas Admin
    if (!userLoggedAdmin) {
      throw new ForbiddenException("Vous devez être admin pour supprimer un training");
    };


    // Vérifie que le Training à supprimer existe
    const deletedTraining = await this.trainingsService.findOneById(+id);

    if (!deletedTraining) {
      throw new HttpException('training not found', HttpStatus.NOT_FOUND);
    };


    // Vérifie si le Training a été ajouté aux favoris de User(s)
    if (deletedTraining.users.length > 0) {
      deletedTraining.users.map(user => this.usersService.removeFromFavorites(user, +id))
    };



    // Supprime le Training
    const training = await this.trainingsService.delete(+id);

    return {
      statusCode: 200,
      message: 'training supprimé',
      data: training,

    };
  };
};
