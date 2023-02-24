import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, UsersService]
})
export class ImagesModule {}
