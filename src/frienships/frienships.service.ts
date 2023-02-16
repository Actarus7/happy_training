import { Injectable } from '@nestjs/common';
import { CreateFrienshipDto } from './dto/create-frienship.dto';
import { UpdateFrienshipDto } from './dto/update-frienship.dto';

@Injectable()
export class FrienshipsService {
  create(createFrienshipDto: CreateFrienshipDto) {
    return 'This action adds a new frienship';
  }

  findAll() {
    return `This action returns all frienships`;
  }

  findOne(id: number) {
    return `This action returns a #${id} frienship`;
  }

  update(id: number, updateFrienshipDto: UpdateFrienshipDto) {
    return `This action updates a #${id} frienship`;
  }

  remove(id: number) {
    return `This action removes a #${id} frienship`;
  }
}
