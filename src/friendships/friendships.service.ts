import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} friendship`;
  }

  update(id: number, updateFriendshipDto: UpdateFriendshipDto) {
    return `This action updates a #${id} friendship`;
  }

  remove(id: number) {
    return `This action removes a #${id} friendship`;
  }
}
