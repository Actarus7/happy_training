import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TrainingsService } from 'src/trainings/trainings.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, TrainingsService]
})
export class UsersModule {}
