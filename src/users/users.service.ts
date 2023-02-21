import { Injectable } from '@nestjs/common';
import { Training } from 'src/trainings/entities/training.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserFriendListDto } from './dto/update-user-friend-list.dto';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {


  async create(createUserDto: CreateUserDto, hash: string) {
    const newUser = new User();

    newUser.pseudo = createUserDto.pseudo;
    newUser.password = hash;
    newUser.email = createUserDto.email;
    newUser.admin = createUserDto.admin;
    newUser.photo = createUserDto.photo;
    newUser.city = createUserDto.city;
    newUser.description = createUserDto.description;

    await newUser.save();

    return newUser;
  };



  async findAll() {
    const users = await User.find();

    if (users.length > 0) {
      return users;
    };

    return undefined;
  };



  async findOneByPseudo(pseudo: string) {
    const user = await User.findOne({ where: { pseudo: pseudo } });

    if (user) {
      return user;
    };

    return undefined;
  };



  async findOneByEmail(email: string) {
    const user = await User.findOne({ where: { email: email } });

    if (user) {
      return user;
    };

    return undefined;
  };



  async findOneById(id: number) {
    const user = await User.find({ relations: { trainings: true }, where: { id: id } });

    if (user) {
      return user[0];
    };

    return undefined;
  };



  async update(id: number, userToAdd: User) {
    const updateUser = await User.findOneBy({ id });

    updateUser.save();

  };



  /** Ajoute un Training au User */
  async addToFavorites(user: User, training: Training) {

    user.trainings.push(training)
    await user.save()

    return await User.findOne({ relations: { trainings: true }, where: { id: user.id } });

  };



  /** Supprime un Training d'un User */
  async removeFromFavorites(user: User, trainingId: number) {

    // Crée un nouveau tableau de Trainings sans le Training à supprimer
    const newTrainingsList = user.trainings.map(training => {
      if (training.id !== trainingId) {
        return training;
      };
    });

    // Remplace le tableau de Users du Training par le nouveau tableau
    user.trainings = newTrainingsList;

    user.save();

    return user;
  };





  async remove(id: number) {
    const deleteUser = await User.findOneBy({ id });

    await deleteUser.remove();

    if (deleteUser) {
      return deleteUser;
    };

    return undefined;
  };

};
