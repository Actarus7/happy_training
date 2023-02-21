import { Module } from '@nestjs/common';
import { TrainingsService } from './trainings.service';
import { TrainingsController } from './trainings.controller';
import { SessionsService } from 'src/sessions/sessions.service';
import { ExercisesService } from 'src/exercises/exercises.service';
import { UsersService } from 'src/users/users.service';

@Module({

  controllers: [TrainingsController],
  providers: [TrainingsService, UsersService],
})
export class TrainingsModule { }
