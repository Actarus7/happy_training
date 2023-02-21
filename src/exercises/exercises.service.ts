import { Body, HttpException, HttpStatus, Injectable, Param, Patch, Session } from '@nestjs/common';
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
    exercise.video = createExerciseDto.video;
    exercise.image = createExerciseDto.image;
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

  
  async update(id: number, updateExerciseDto: UpdateExerciseDto) {
    const exercise = new Exercise();
    exercise.title = updateExerciseDto.title;
    exercise.content = updateExerciseDto.content;
    exercise.time = updateExerciseDto.time;
    exercise.beginner = updateExerciseDto.beginner;
    exercise.medium = updateExerciseDto.medium;
    exercise.expert = updateExerciseDto.expert;
    exercise.rest_time = updateExerciseDto.rest_time;
    exercise.material = updateExerciseDto.material;
    exercise.video = updateExerciseDto.video;
    exercise.image = updateExerciseDto.image;
    await Exercise.update(id, exercise);
    return await Exercise.findBy({id});
  }

  /* async update(id: number, updateExerciseDto: UpdateExerciseDto): Promise<Exercise> {
    await Exercise.update(id, updateExerciseDto);
    return Exercise.findOneBy({id});
    //`This action updates a #${id} exercice`;
  } */

  async remove(id: number){
    const exercise = await Exercise.findOneBy({id});
    if (exercise)
    {
      return await exercise.remove();
    }

    throw new HttpException('training not found', HttpStatus.NOT_FOUND);
  };
    //`This action removes a #${id} exercice`;
  }

