import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercises.entity';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  async create(@Body() createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    const exercise = await this.exercisesService.create(createExerciseDto);
    return Exercise.save(exercise)
  }

  @Get()
  async findAll() {
    return await this.exercisesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.exercisesService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateExerciseDto: UpdateExerciseDto) {
    return await this.exercisesService.update(+id, updateExerciseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string)/*: Promise<Exercise>*/{
    return await this.exercisesService.remove(+id);
  }
}
