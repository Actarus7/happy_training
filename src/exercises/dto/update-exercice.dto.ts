import { PartialType } from '@nestjs/mapped-types';
import { CreateExerciseDto } from './create-exercice.dto';

export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {}
