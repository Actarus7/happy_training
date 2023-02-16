import { PartialType } from '@nestjs/mapped-types';
import { CreateFrienshipDto } from './create-frienship.dto';

export class UpdateFrienshipDto extends PartialType(CreateFrienshipDto) {}
