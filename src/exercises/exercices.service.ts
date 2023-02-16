import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercice.dto';
import { UpdateExerciseDto } from './dto/update-exercice.dto';

@Injectable()
export class ExercicesService {
  create(createExerciseDto: CreateExerciseDto) {
    return 'This action adds a new exercice';
  }

  findAll() {
    return `This action returns all exercices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exercice`;
  }

  update(id: number, updateExerciseDto: UpdateExerciseDto) {
    return `This action updates a #${id} exercice`;
  }

  remove(id: number) {
    return `This action removes a #${id} exercice`;
  }
}
