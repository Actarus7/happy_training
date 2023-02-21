import { Module } from '@nestjs/common';
import { FavoriteTrainingsService } from './favorite-trainings.service';
import { FavoriteTrainingsController } from './favorite-trainings.controller';

@Module({
  controllers: [FavoriteTrainingsController],
  providers: [FavoriteTrainingsService]
})
export class FavoriteTrainingsModule {}
