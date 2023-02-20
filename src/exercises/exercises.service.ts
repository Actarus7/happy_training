import { Body, Injectable, Param, Patch } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercises.entity';

@Injectable()
export class ExercisesService {
  save: any;

  async create(createExerciseDto: CreateExerciseDto): Promise<Exercise>{ 
      const exercise = new Exercise();
      exercise.title = createExerciseDto.title;
      exercise.content = createExerciseDto.content;
      exercise.time = createExerciseDto.time;
      exercise.beginner = createExerciseDto.beginner;
      exercise.medium = createExerciseDto.medium;
      exercise.expert = createExerciseDto.expert;
      exercise.rest_time = createExerciseDto.rest_time;
      exercise.material = createExerciseDto.material;
    await exercise.save();
    return exercise;
    //'This action adds a new exercice';
  }

  async findAll() {
    return await Exercise.find()
    //`This action returns all exercices`;
  }

  async findOne(id: number): Promise<Exercise> {
    return await Exercise.findOneBy({id});
    //`This action returns a #${id} exercice`;
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
    return await Exercise.update(id, exercise);
  }

  /* async update(id: number, updateExerciseDto: UpdateExerciseDto): Promise<Exercise> {
    await Exercise.update(id, updateExerciseDto);
    return Exercise.findOneBy({id});
    //`This action updates a #${id} exercice`;
  } */

  async remove(id: number){
    return await Exercise.delete(id);
    //`This action removes a #${id} exercice`;
  }
}
