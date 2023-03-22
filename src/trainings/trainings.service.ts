import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { Training } from './entities/training.entity';

@Injectable()
export class TrainingsService {


  //création d'un nouveau training
  async create(createTrainingDto: CreateTrainingDto): Promise<Training> {
    const newTraining = new Training();

    newTraining.title = createTrainingDto.title;
    newTraining.description = createTrainingDto.description;

    await newTraining.save()

    return newTraining;
  };


  // récuperation de tous les trainings
  async findAll(): Promise<Training[]> {
    const trainings = await Training.find({ relations: ['users', 'comments', 'sessions', 'exercises'] });

    if (trainings.length === 0) throw new NotFoundException('Aucun training dans la base de données');

    return trainings;
  };


  // récuperation du premier training de la base de données
  async findFirstTraining(): Promise<Training> {
    const trainings = await Training.find({ relations: ['users', 'comments', 'sessions', 'exercises'] });
    return trainings[0];
  };


  // récupération d'un training par son id
  async findOneById(id: number): Promise<Training> {
    return await Training.findOne({ relations: { users: true, sessions: true, comments: true }, where: { id } });
  };


  // modification training 
  async update(training: Training, updateTrainingDto: UpdateTrainingDto): Promise<Training> {

    training.title = updateTrainingDto.title;
    training.description = updateTrainingDto.description;

    await training.save();

    return await Training.findOneBy({ id: training.id });
  };



  /** Ajoute un User au Training */
  async addUserToTraining(training: Training, user: User): Promise<Training> {

    training.users.push(user);
    await training.save();

    return training;
  };



  /** Supprime un User du Training */
  async removeUserFromTraining(trainingId: number, user: User): Promise<Training> {

    // Vérifie que le Training existe
    const training = await Training.findOne({ relations: { users: true }, where: { id: trainingId } });
    // console.log(training);


    if (!training) {
      throw new NotFoundException("Training Id inconnu");
    };


    // Crée un nouveau tableau de Users sans le User à supprimer
    const newUsersList = training.users.map(user => {
      if (user.id !== user.id) {
        return user;
      };
    });


    // Remplace le tableau de Users du Training par le nouveau tableau
    training.users = newUsersList;

    training.save();

    return training;

  };

  // suppression de training par son id
  async delete(id: number): Promise<Training> {
    const training = await Training.findOneBy({ id });
    if (training) {
      return await training.remove();
    }

  };
};
