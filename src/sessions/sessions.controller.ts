import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ForbiddenException, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from './entities/session.entity';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TrainingsService } from 'src/trainings/trainings.service';


@Controller('sessions')
export class SessionsController {
  constructor(
    private readonly sessionsService: SessionsService,
    private readonly usersService: UsersService,
    private readonly trainingsService: TrainingsService) { }


  /** Création d'une session   
   * Nécessite :
   * * d'être connecté/enregistré
   * * d'être une admin
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createSessionDto: CreateSessionDto, @Request() req) {
    // Vérifie que le User connecté est un admin
    const userLoggedAdmin = (await this.usersService.findOneById(req.user.id)).admin;

    if (!userLoggedAdmin) {
      throw new ForbiddenException("Vous devez être admin pour créer un session");
    };


    // Vérifie que le Training existe
    const isTrainingExists = await this.trainingsService.findOneById(createSessionDto.trainingId);

    if (!isTrainingExists) {
      throw new NotFoundException("Training Id inconnu");
    };


    // Création du nouveau Training
    const session = await this.sessionsService.create(createSessionDto);
    return {
      statusCode: 201,
      message: 'session créée',
      data: session
    };
  };



  @Get()
  async findAll() {
    return await this.sessionsService.findAll();
  };



  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.sessionsService.findById(+id);
  };



  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateSessionDto: UpdateSessionDto, @Request() req): Promise<any> {
    // Vérifie que le User connecté est un admin
    const userLoggedAdmin = (await this.usersService.findOneById(req.user.id)).admin;

    if (!userLoggedAdmin) {
      throw new ForbiddenException("Vous devez être admin pour créer une session");
    };


    // Vérifie que la Session existe
    const isSessionExists = await this.sessionsService.findById(id);

    if (!isSessionExists) {
      throw new NotFoundException("Session Id inconnu");
    };


    // Modifie la session sélectionnée
    const updatedSession = await this.sessionsService.update(isSessionExists, updateSessionDto);

    return updatedSession;

  };




  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {

    // Vérifie que le User connecté est un admin
    const userLoggedAdmin = (await this.usersService.findOneById(req.user.id)).admin;

    if (!userLoggedAdmin) {
      throw new ForbiddenException("Vous devez être admin pour supprimer une session");
    };

    const session = await this.sessionsService.delete(+id);

    if (session)
      return {
        statusCode: 200,
        message: 'session supprimée',
        data: session,
      };

    throw new HttpException('session not found', HttpStatus.NOT_FOUND);
  };
};
