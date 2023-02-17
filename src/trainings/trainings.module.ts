import { Module } from '@nestjs/common';
import { TrainingsService } from './trainings.service';
import { TrainingsController } from './trainings.controller';
import { SessionsService } from 'src/sessions/sessions.service';
import { ExercisesService } from 'src/exercises/exercises.service';

@Module({

  controllers: [TrainingsController],
  providers: [TrainingsService],
})
export class TrainingsModule {}
