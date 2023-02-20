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
  }
 
  async findAll() {
    return await Training.find();
    //`This action returns all trainings`;
  }
  async findById(id: number): Promise<Training> {
      return await Training.findOneBy({id});
    
  }

   async update(id: number, training: Training) {
      await Training.update(id, training);
     return Training.findBy({id});
    //`Thi s action updates a #${id} training`;*/
  }

  async delete(id: number) /*Promise<void>*/ {
    return await Training.delete(id);
    
    //`This action deletes a #${id} training`;
  } 
}
