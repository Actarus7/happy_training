import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class RemoveFromFavoritesDto extends PartialType(CreateUserDto) {

    @IsNumber()
    training: number;
};