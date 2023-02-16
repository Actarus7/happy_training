import { Module } from '@nestjs/common';
import { ExercicesService } from './exercices.service';
import { ExercicesController } from './exercices.controller';

@Module({
  controllers: [ExercicesController],
  providers: [ExercicesService]
})
export class ExercicesModule {}
