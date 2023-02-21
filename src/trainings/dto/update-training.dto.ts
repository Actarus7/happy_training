import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateTrainingDto } from './create-training.dto';

export class UpdateTrainingDto extends PartialType(CreateTrainingDto) {

    
    @IsString()
    title: string;


    @IsString()
    description: string;


};
