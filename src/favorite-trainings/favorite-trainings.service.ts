import { Injectable } from '@nestjs/common';
import { CreateFavoriteTrainingDto } from './dto/create-favorite-training.dto';
import { UpdateFavoriteTrainingDto } from './dto/update-favorite-training.dto';

@Injectable()
export class FavoriteTrainingsService {
  create(createFavoriteTrainingDto: CreateFavoriteTrainingDto) {
    return 'This action adds a new favoriteTraining';
  };

  findAll() {
    return `This action returns all favoriteTrainings`;
  };

  findOne(id: number) {
    return `This action returns a #${id} favoriteTraining`;
  };

  update(id: number, updateFavoriteTrainingDto: UpdateFavoriteTrainingDto) {
    return `This action updates a #${id} favoriteTraining`;
  };

  remove(id: number) {
    return `This action removes a #${id} favoriteTraining`;
  };
};
