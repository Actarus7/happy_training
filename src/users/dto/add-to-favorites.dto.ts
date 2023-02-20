import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class AddToFavoritesDto extends PartialType(CreateUserDto) {

    @IsNumber()
    training: number;
};
