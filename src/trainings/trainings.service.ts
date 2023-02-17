import { Injectable } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { Training } from './entities/training.entity';

@Injectable()
export class TrainingsService {


  async create(createTrainingDto: CreateTrainingDto) {
    const newTraining = new Training();

    newTraining.title = createTrainingDto.title;
    newTraining.description = createTrainingDto.description;

    await newTraining.save()

    return newTraining;

    // return await Training.create(createTrainingDto);
    //'This action adds a  training';
  }

  // async findAll() {
  //   return await this.trainingsService.findAll();
  //   //This action returns all trainings;
  // }
  // async findById(id: number) {
  //   return await this.trainingsService.findById(id);
  // }

  // async update(id: number, training: Training) {
  //   await this.trainingsService.update(id, training);
  //   return this.trainingsService.findById(id);
  //   //This action updates a #${id} training;
  // }

  // async delete(id: number) {
  //   return await this.trainingsService.delete(id);
  //   //This action deletes a #${id} training;
  // }
}