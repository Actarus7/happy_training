import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, NotFoundException, UseGuards, Request, ForbiddenException } from '@nestjs/common';
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
    private readonly usersService: UsersService
  ) { }


  /** Création d'un nouveau Training   
   * Nécessite :
   * * d'être connecté/enregistré
   * * d'être une admin
   */
  @UseGuards(JwtAuthGuard)
  @Post()
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
  async findAll() {

    return await this.trainingsService.findAll();

  }



  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.trainingsService.findById(+id);
  }



  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTrainingDto: UpdateTrainingDto) {
    const training = new Training();
    training.title = updateTrainingDto.title;
    training.description = updateTrainingDto.description;
    return await this.trainingsService.update(+id, training);

    /*  if (!training) {
        throw new NotFoundException(`Training with id ${id} not found.`);
       }
      return this.trainingsService.save(training);
      */
  }



  @Delete(':id')
  async remove(@Param('id') id: string) /* Promise<void>*/ {
    const training = await this.trainingsService.delete(+id);

    if (training)
      return {
        statusCode: 200,
        message: 'training supprimé',
        data: training,

      };
    throw new HttpException('training not found', HttpStatus.NOT_FOUND);
  }
}
