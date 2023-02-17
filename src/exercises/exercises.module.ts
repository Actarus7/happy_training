import { Module } from '@nestjs/common';
import { SessionsService } from 'src/sessions/sessions.service';
import { TrainingsService } from 'src/trainings/trainings.service';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';

@Module({
  controllers: [ExercisesController],
  providers: [ExercisesService]
})
export class ExercisesModule {}
