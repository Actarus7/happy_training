import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoriteTrainingDto } from './create-favorite-training.dto';

export class UpdateFavoriteTrainingDto extends PartialType(CreateFavoriteTrainingDto) {}
