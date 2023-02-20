import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
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
  async findOneById(id: number): Promise<Training> {
    const training = await Training.findOne({ relations: { users: true }, where: { id: id } });

    if (training) {
      return training;
    };

    return undefined;
  };

  async update(id: number, training: Training) {
    await Training.update(id, training);
    return Training.findBy({ id });
    //`Thi s action updates a #${id} training`;*/
  }


  async addUserToTraining (training: Training, user: User) {
    training.users.push(user);
    await training.save();

    return training;
  };




  async delete(id: number) /*Promise<void>*/ {
    return await Training.delete(id);

    //`This action deletes a #${id} training`;
  }
}
