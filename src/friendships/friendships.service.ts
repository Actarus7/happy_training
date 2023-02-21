import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';
import { Friendship } from './entities/friendship.entity';

@Injectable()
export class FriendshipsService {


  async create(userSender: User, userReceiver: User) {
    const newFriendship = new Friendship()

    newFriendship.userSender = userSender;
    newFriendship.userReceiver = userReceiver;


    await newFriendship.save();

    return newFriendship;
  };



  findAll() {
    return `This action returns all friendships`;
  }


  /** Récupère une demande d'amitié par son Id */
  async findOneById(id: number) {
    const friendship = await Friendship.find({ relations: { userSender: true, userReceiver: true }, where: { id } });



    if (friendship.length > 0) {
      return friendship[0];
    };

    throw new NotFoundException('Friendship Id inconnu');
  };



  async update(friendship: Friendship) {

    friendship.status = true;
    friendship.save();

    return friendship;
  };



  remove(id: number) {
    return `This action removes a #${id} friendship`;
  }
}
