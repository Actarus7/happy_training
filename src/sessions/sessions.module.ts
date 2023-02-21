import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { TrainingsService } from 'src/trainings/trainings.service';
import { ExercisesService } from 'src/exercises/exercises.service';
import { TrainingsModule } from 'src/trainings/trainings.module';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [SessionsController],
  providers: [SessionsService, UsersService, TrainingsService]
})
export class SessionsModule {}
