// import { Injectable } from '@nestjs/common';
// import { Training } from 'src/trainings/entities/training.entity';
// import { User } from 'src/users/entities/user.entity';
// import { CreateFavoriteTrainingDto } from './dto/create-favorite-training.dto';
// import { UpdateFavoriteTrainingDto } from './dto/update-favorite-training.dto';
// import { FavoriteTraining } from './entities/favorite-training.entity';


// @Injectable()
// export class FavoriteTrainingsService {

//   async create(userLogged: User, trainingToAdd: Training) {

//     const newFavoriteTraining = new FavoriteTraining();

//     newFavoriteTraining.user = userLogged;
//     newFavoriteTraining.training = trainingToAdd;

//     await newFavoriteTraining.save();

//     return newFavoriteTraining;
//   };



//   /** Récupère tous les programmes ajoutés en favoris */
//   async findAll() {
//     const favoriteTrainings = await FavoriteTraining.find({relations: {user: true, training: true}});

//     if (favoriteTrainings) {
//       return favoriteTrainings;
//     };

//     return undefined;
//   };



//   /** Récupère un programme ajouté en favori */
//   async findOne(id: number) {
//     const favoriteTraining = await FavoriteTraining.findOneBy({ id });

//     if (favoriteTraining) {
//       return favoriteTraining;
//     };

//     return undefined;
//   };




//   update(id: number, updateFavoriteTrainingDto: UpdateFavoriteTrainingDto) {
//     return `This action updates a #${id} favoriteTraining`;
//   };


//   /** Supprime un programme des favoris */
//   async remove(id: number) {
//     const deleteFavoriteTraining = await FavoriteTraining.findOneBy({ id });

//     await deleteFavoriteTraining.remove();
    
//     return deleteFavoriteTraining;
//   };
// };
