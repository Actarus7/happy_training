import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TrainingsService } from 'src/trainings/trainings.service';
import { ImagesService } from 'src/images/images.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, TrainingsService, ImagesService],
  
})
export class UsersModule {}
