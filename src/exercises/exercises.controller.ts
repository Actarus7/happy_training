import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercises.entity';

@Controller('exercices')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  async create(@Body() createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    const exercise = new Exercise();
    exercise.title = createExerciseDto.title;
    exercise.content = createExerciseDto.content;
    exercise.time = createExerciseDto.time;
    exercise.beginner = createExerciseDto.beginner;
    exercise.medium = createExerciseDto.medium;
    exercise.expert = createExerciseDto.expert;
    exercise.rest_time = createExerciseDto.rest_time;
    exercise.material = createExerciseDto.material;
    return  await this.exercisesService.create(exercise);
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
    const exercise = new Exercise();
    exercise.title = updateExerciseDto.title;
    exercise.content = updateExerciseDto.content;
    exercise.time = updateExerciseDto.time;
    exercise.beginner = updateExerciseDto.beginner;
    exercise.medium = updateExerciseDto.medium;
    exercise.expert = updateExerciseDto.expert;
    exercise.rest_time = updateExerciseDto.rest_time;
    exercise.material = updateExerciseDto.material;
    return await this.exercisesService.update(+id, exercise);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Exercise>{
    return await this.exercisesService.remove(+id);
  }
}
