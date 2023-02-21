import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ForbiddenException, Request, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercises.entity';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TrainingsService } from 'src/trainings/trainings.service';
import { SessionsService } from 'src/sessions/sessions.service';

@Controller('exercises')
export class ExercisesController {
  constructor(
    private readonly exercisesService: ExercisesService,
    private readonly usersService: UsersService,
    private readonly trainingsService: TrainingsService,
    private readonly sessionsService: SessionsService) { }

  /** Création d'un exercice
   * * Nécessite :
   * * d'être connecté/enregistré
   * * d'être un admin
   * * que le Training existe
   * * que la Session existe
   * @param createExerciseDto Dto contenant les données utilisateurs
   * @param req Id du User connecté (req.user.id)
   * @returns Retourne l'Exercice créé
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createExerciseDto: CreateExerciseDto, @Request() req): Promise<Exercise> {


    // Vérifie que le User connecté est un admin
    const userLoggedAdmin = (await this.usersService.findOneById(req.user.id)).admin;

    if (!userLoggedAdmin) {
      throw new ForbiddenException("Vous devez être admin pour créer un Exercice");
    };



    // Vérifie que le Training existe
    const isTrainingExist = await this.trainingsService.findOneById(createExerciseDto.trainingId);

    if (!isTrainingExist) {
      throw new NotFoundException("Training Id inconnu");
    };



    // Vérifie que le Session existe
    const isSessionExist = await this.sessionsService.findById(createExerciseDto.sessionId);

    if (!isSessionExist) {
      throw new NotFoundException("Session Id inconnu");
    };



    // Création du nouvel Exercise
    const exercise = await this.exercisesService.create(createExerciseDto, isSessionExist, isTrainingExist);

    return exercise;
  };



  @Get()
  async findAll() {
    return await this.exercisesService.findAll();
  };



  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.exercisesService.findOne(+id);
  }



  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateExerciseDto: UpdateExerciseDto, @Request() req) {


    // Vérifie que le User connecté est un admin
    const userLoggedAdmin = (await this.usersService.findOneById(req.user.id)).admin;

    if (!userLoggedAdmin) {
      throw new ForbiddenException("Vous devez être admin pour modifier un exercice");
    };


    // Vérifie que l'Exercise à modifier existe
    const isExerciseExist = await this.exercisesService.findOne(+id);

    if (!isExerciseExist) {
      throw new NotFoundException("Exercise Id inconnu");
    };


    // Modifie l'Exercise sélectionné
    return await this.exercisesService.update(isExerciseExist, updateExerciseDto);

  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {

    // Vérifie que le User connecté est un admin
    const userLoggedAdmin = (await this.usersService.findOneById(req.user.id)).admin;

    if (!userLoggedAdmin) {
      throw new ForbiddenException("Vous devez être admin pour supprimer un exercice");
    };

    const exercise = await this.exercisesService.remove(+id)
    if (exercise)
      return {
        statusCode: 200,
        message: 'exercice supprimé',
        data: exercise,

      };
    throw new HttpException('exercice not found', HttpStatus.NOT_FOUND);

  };
}
