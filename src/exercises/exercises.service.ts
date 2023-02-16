import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercises.entity';

@Injectable()
export class ExercisesService {
  save: any;
constructor(private readonly exercisesService:ExercisesService) {}

  async create(createExerciseDto: CreateExerciseDto){ 
    return await this.exercisesService.save(createExerciseDto);
    //'This action adds a new exercice';
  }

  async findAll() {
    return await this.exercisesService.findAll()
    //`This action returns all exercices`;
  }

  async findOne(id: number): Promise<Exercise> {
    return await this.exercisesService.findOne(id);
    //`This action returns a #${id} exercice`;
  }

  async update(id: number, updateExerciseDto: UpdateExerciseDto): Promise<Exercise> {
    await this.exercisesService.update(id, updateExerciseDto);
    return this.exercisesService.findOne(id);
    //`This action updates a #${id} exercice`;
  }

  async remove(id: number): Promise<Exercise> {
    return await this.exercisesService.remove(id);
    //`This action removes a #${id} exercice`;
  }
}
