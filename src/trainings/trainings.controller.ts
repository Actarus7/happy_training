import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrainingsService } from './trainings.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { Training } from './entities/training.entity';

@Controller('trainings')
export class TrainingsController {
  constructor(private readonly trainingsService: TrainingsService) {}

  @Post()
  create(@Body() createTrainingDto: CreateTrainingDto): Promise<Training> {
    const training = new Training();
    training.title = createTrainingDto.title;
    training.description = createTrainingDto.description;
    return this.trainingsService.create(training);
  }

  @Get()
  async findAll(){
    return this.trainingsService.findAll();
    
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.trainingsService.findById(+id);
  }

  @Patch(':id')
   async update(@Param('id') id: string, @Body() updateTrainingDto: UpdateTrainingDto) {
    const training = new Training();
    training.title = updateTrainingDto.title;
    training.description = updateTrainingDto.description;
    return this.trainingsService.update(+id, training);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainingsService.remove(+id);
  }
}
