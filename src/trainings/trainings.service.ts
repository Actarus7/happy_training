import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { Training } from './entities/training.entity';

@Injectable()
export class TrainingsService {
  trainingsSservice: any;
  save(training: Training) {
    throw new Error('Method not implemented.');
  }


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
  async findById(id: number) {
    const training = await this.trainingsSservice.findOne(id);
    await Training.findOneBy({ id });
    /* if (!training) {
      throw new NotFoundException(`Training with id ${id} not found.`);
    } */
    return training;
  }

  async update(id: number, training: Training) {
    await Training.update(id, training);
     return await Training.findBy({ id });
   
    //`Thi s action updates a #${id} training`;*/
  }


  async addUserToTraining(training: Training, user: User) {
    training.users.push(user);
    await training.save();

    return training;
  };




  async delete(id: number) /*Promise<void>*/ {
    const training = await Training.findOneBy({ id });
    if (training) {
      return await training.remove();
    }

    throw new HttpException('training not found', HttpStatus.NOT_FOUND);
  };

  //`This action deletes a #${id} training`;
}

