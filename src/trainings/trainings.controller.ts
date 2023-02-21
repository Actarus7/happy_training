import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
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
      message: 'training créé',
      data: newTraining
    };
  }

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
console.log(training);

    if (training)
      return {
        statusCode: 200,
        message: 'training supprimé',
        data:training ,

      };
      throw new HttpException('training not found', HttpStatus.NOT_FOUND);
  }
}
