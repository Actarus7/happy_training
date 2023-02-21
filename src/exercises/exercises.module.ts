import { Module } from '@nestjs/common';
import { SessionsService } from 'src/sessions/sessions.service';
import { TrainingsService } from 'src/trainings/trainings.service';
import { UsersService } from 'src/users/users.service';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';

@Module({
  controllers: [ExercisesController],
  providers: [ExercisesService, UsersService, SessionsService, TrainingsService]
})
export class ExercisesModule {}
