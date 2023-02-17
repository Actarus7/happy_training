import { PartialType } from '@nestjs/mapped-types';
import { CreateProgressionDto } from './create-progression.dto';

export class UpdateProgressionDto extends PartialType(CreateProgressionDto) {}
