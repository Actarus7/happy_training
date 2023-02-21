import { Injectable } from '@nestjs/common';
import { Training } from 'src/trainings/entities/training.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {


  /** Crée un nouveau User */
  async create(createUserDto: CreateUserDto, hash: string): Promise<User> {
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



  /** Récupère tous les Users */
  async findAll(): Promise<User[]> {
    const users = await User.find();

    if (users.length > 0) {
      return users;
    };

    return undefined;
  };



  /** Récupère un User par son pseudo */
  async findOneByPseudo(pseudo: string): Promise<User> {
    const user = await User.findOne({ where: { pseudo: pseudo } });

    if (user) {
      return user;
    };

    return undefined;
  };



  /** Récupère un User par son email */
  async findOneByEmail(email: string): Promise<User> {
    const user = await User.findOne({ where: { email: email } });

    if (user) {
      return user;
    };

    return undefined;
  };



  /** Récupère un User par son Id */
  async findOneById(id: number): Promise<User> {
    const user = await User.find({ relations: { trainings: true }, where: { id: id } });

    if (user) {
      return user[0];
    };

    return undefined;
  };



  /** Ajoute un Training au User */
  async addToFavorites(user: User, training: Training): Promise<User> {

    user.trainings.push(training)
    await user.save()

    return await User.findOne({ relations: { trainings: true }, where: { id: user.id } });

  };



  /** Supprime un Training d'un User */
  async removeFromFavorites(user: User, trainingId: number): Promise<User> {

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



  /** Supprime un User */
  async remove(id: number): Promise<User> {
    const deleteUser = await User.findOneBy({ id });

    await deleteUser.remove();

    if (deleteUser) {
      return deleteUser;
    };

    return undefined;
  };


};



/*  // INUTILE
 async update(id: number, userToAdd: User) {
   const updateUser = await User.findOneBy({ id });
 
   updateUser.save();
 
 }; */

