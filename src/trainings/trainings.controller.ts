import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrainingsService } from './trainings.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { Training } from './entities/training.entity';

@Controller('trainings')
export class TrainingsController {
  constructor(private readonly trainingsService: TrainingsService) { }




  @Post()
  async create(@Body() createTrainingDto: CreateTrainingDto): Promise<any> {

    const newTraining = await this.trainingsService.create(createTrainingDto);

    return {
      statusCode: 201,
      message: 'Utilisateur enregistré',
      data: newTraining
    };
  };




  // @Get()
  // async findAll() {
  //   return this.trainingsService.findAll();

  // }

  // @Get(':id')
  // async findById(@Param('id') id: string) {
  //   return this.trainingsService.findById(+id);
  // }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() updateTrainingDto: UpdateTrainingDto) {
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string): Promise<void> {
  //   return this.trainingsService.delete(+id);
  // }
}